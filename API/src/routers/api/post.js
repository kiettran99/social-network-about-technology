const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Post = require('../../models/post');
const auth = require('../../middleware/auth');
const storage = require('../../firebase/firebase');
const upload = require('../../utils/upload');

// @route Get /api/posts/
// @route-full Get /api/posts?limit=number&skip=number
// @desc Feed a post
// @access public
router.get('/', async (req, res) => {
    try {
        // Limit post with 5 posts and if not skip then default value is 0.
        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const posts = await Post.find({}).limit(limit).skip(skip);

        res.send(posts);

    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route Get /api/posts/:id
// @desc Feed a post detail
// @access public
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).send('Post is not exists.');
        }

        res.status(500).send('Server is errors.');
    }
});

// @route Post /api/posts/
// @desc Upload a post
// @access private
router.post('/', auth, upload.single('image'), [
    body('text', 'Text is required.').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newPost = {
            text: req.body.text,
            user: req.user.id,
            name: req.user.fullname,
        }

        // Create a instance post and save it.
        const post = new Post(newPost);
        await post.save();

        // Check post uploaded image.
        if (req.file) {

            //Create a storage ref
            const storageRef = storage.ref(`/posts/${post.id}/${req.file.originalname}`);

            //Upload image
            await storageRef.put(req.file.buffer);

            post.imageUrl = await storageRef.getDownloadURL();

            await post.save();
        }

        res.json(post);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ msg: e });
    }
});

// @route Put /api/posts/:id
// @desc Edit a post By Id
// @access private
router.put('/:id', auth, upload.single('image'), [
    body('text', 'Text is required.').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Find a post
        const post = await Post.findById(req.params.id);

        // Check user
        if (post.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'User is not authorized.' });
        }

        post.text = req.body.text;

        await post.save();

        // Check image upload
        if (req.file) {
            const prevImageRef = storage.ref(`/posts/${post.id}`);

            // Remove previous images and add new image
            prevImageRef.listAll().then((res) => {
                res.items.forEach((itemRef) => {
                    itemRef.delete();
                })
            }).catch((e) => {
                console.log('Fail', e);
            });

            //Create a storage ref
            const storageRef = storage.ref(`/posts/${post.id}/${req.file.originalname}`);

            //Upload image
            await storageRef.put(req.file.buffer);

            post.imageUrl = await storageRef.getDownloadURL();

            await post.save();
        }

        res.json(post);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).send('Post is not exists.');
        }

        res.status(500).send({ msg: e });
    }
});

// @route Delete /api/posts/
// @desc Delete a post
// @access private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send("post is not exists");
        }

        //Find a folder image and remove
        const prevImageRef = storage.ref(`/posts/${post.id}`);

        prevImageRef.listAll().then((res) => {
            res.items.forEach((itemRef) => {
                itemRef.delete();
            })
        }).catch((e) => {
            console.log('Fail', e);
        });

        await post.remove();

        res.send({ "result": "remove successfuly", post });
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).send('Post is not exists.');
        }

        res.status(500).send({ msg: e });
    }
});

// @route Put api/posts/like/:id
// @desc Like a post
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        // Validation params Id
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ msg: 'Post\'\s ID is empty.' });
        }

        // Find a post by Id
        const post = await Post.findById(id);

        // Make sure user is not like post yet.
        const isLiked = post.likes.filter(like => like.user.toString() === req.user.id).length > 0;

        if (isLiked) {
            return res.status(400).json({ msg: 'Post is liked already.' });
        }

        // Push User into Likes array.
        post.likes.unshift({ user: req.user.id });

        await post.save();

        // Response to client
        res.json(post.likes);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post is not exists. ' });
        }

        res.status(500).send('Server is errors.');
    }
});

// @route Put api/posts/unlike/:id
// @desc Unlike a posts
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        // Validation params Id
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ msg: 'post\'\s ID is empty.' });
        }

        // Find a post by Id
        const post = await Post.findById(id);

        // Make sure user liked post yet.
        const isNotLiked = post.likes.filter(like => like.user.toString() === req.user.id).length === 0;

        if (isNotLiked) {
            return res.status(400).json({ msg: 'Post has not been liked yet.' });
        }

        // Remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        // Response to client
        res.json(post.likes);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post is not exists. ' });
        }

        res.status(500).send('Server is errors.');
    }
});

// @route Put /api/posts/comment/:id
// @desc Comment post.
// @access private
router.put('/comment/:id', [auth,
    [
        body('text', 'text is required.').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Find a post by id
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: req.user.name,
            user: req.user.id
        };

        //Newest first page.
        post.comments.push(newComment);

        await post.save();

        res.json(post.comments);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post is not exists. ' });
        }

        res.status(500).send('Server is errors.');
    }
});

// @route Delete /api/posts/comment/:id/:comment_id
// @desc Delete comment on a product.
// @access private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Find comment by id
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment is not found' });
        }

        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Remove Index
        const removeIndex = post.comments.map(comment => comment.id).indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post is not exists. ' });
        }

        res.status(500).send('Server is errors.');
    }
});

// ----
// @route Put api/posts/:post_id/comments/unlike/:comment_id
// @desc Like a comment
// @access Private
router.put('/:post_id/comments/like/:comment_id', auth, async (req, res) => {
    try {
        // Validation params Id
        const postId = req.params.post_id;
        const commentId = req.params.comment_id;

        if (!postId) {
            return res.status(400).json({ msg: 'post\'\s ID is empty.' });
        }

        if (!commentId) {
            return res.status(400).json({ msg: 'Comment\'\s ID is empty.' });
        }

        // Find a post by Id and comments has comment'id
        const post = await Post.findOne({ _id: postId, 'comments._id': commentId });

        // Find Comment by id
        const comment = post.comments.find(comment => comment.id === commentId);

        // Make sure user is not like post yet.
        const isLiked = comment.likes.
            filter(like => like.user.toString() === req.user.id).length > 0;

        if (isLiked) {
            return res.status(400).json({ msg: 'Comment is liked already.' });
        }

        // Push User into Likes array.
        comment.likes.unshift({ user: req.user.id });

        await post.save();

        // Response to client
        res.json(comment);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post is not exists. ' });
        }

        res.status(500).send('Server is errors.');
    }
});

// @route Put api/posts/:post_id/comments/unlike/:comment_id
// @desc UnLike a comment
// @access Private
router.put('/:post_id/comments/unlike/:comment_id', auth, async (req, res) => {
    try {
        // Validation params Id
        const postId = req.params.post_id;
        const commentId = req.params.comment_id;

        if (!postId) {
            return res.status(400).json({ msg: 'Post\'\s ID is empty.' });
        }

        if (!commentId) {
            return res.status(400).json({ msg: 'Comment\'\s ID is empty.' });
        }

        // Find a post by Id and comments has comment'id
        const post = await Post.findOne({ _id: postId, 'comments._id': commentId });

        // Find Comment by id
        const comment = post.comments.find(comment => comment.id === commentId);

        // Make sure user liked post yet.
        const isNotLiked = comment.likes.filter(like => like.user.toString() === req.user.id).length === 0;

        if (isNotLiked) {
            return res.status(400).json({ msg: 'Comment has not been liked yet.' });
        }

        // Remove index
        const removeIndex = comment.likes.map(like => like.user.toString()).indexOf(req.user.id);

        comment.likes.splice(removeIndex, 1);

        await post.save();

        // Response to client
        res.json(comment);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post is not exists. ' });
        }

        res.status(500).send('Server is errors.');
    }
});

// @route Put api/posts/:post_id/comments/reply/:comment_id
// @desc Rely a comment.
// @access private
router.put('/:post_id/comments/reply/:comment_id', [auth,
    [
        body('text', 'text is required.').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Validation params Id
        const postId = req.params.post_id;
        const commentId = req.params.comment_id;

        if (!postId) {
            return res.status(400).json({ msg: 'Post\'\s ID is empty.' });
        }

        if (!commentId) {
            return res.status(400).json({ msg: 'Comment\'\s ID is empty.' });
        }

        // Find a post by Id and comments has comment'id
        const post = await Post.findOne({ _id: postId, 'comments._id': commentId });

        // Find Comment by id
        const comment = post.comments.find(comment => comment.id === commentId);

        const newReply = {
            text: req.body.text,
            name: req.user.name,
            user: req.user.id
        };

        //Newest first page.
        comment.replies.push(newReply);

        await post.save();

        res.json(comment);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post is not exists. ' });
        }

        res.status(500).send('Server is errors.');
    }
});

// @route Delete api/posts/:post_id/comments/reply/:comment_id/:reply_id
// @desc Remove rely a comment.
// @access private
router.delete('/:post_id/comments/reply/:comment_id/:reply_id', auth, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Validation params Id
        const postId = req.params.post_id;
        const commentId = req.params.comment_id;
        const replyId = req.params.reply_id;

        if (!postId) {
            return res.status(400).json({ msg: 'Post\'\s ID is empty.' });
        }

        if (!commentId) {
            return res.status(400).json({ msg: 'Comment\'\s ID is empty.' });
        }

        // Find a post by Id and comments has comment'id
        const post = await Post.findOne({ _id: postId, 'comments._id': commentId });

        // Find Comment by id
        const comment = post.comments.find(comment => comment.id === commentId);

        // Find Reply by id
        const reply = comment.replies.find(reply => reply.id === replyId);

        // Check user
        if (reply.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Remove Index
        const removeIndex = comment.replies.map(reply => reply.id).indexOf(replyId);

        comment.replies.splice(removeIndex, 1);

        await post.save();

        res.json(comment);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post is not exists. ' });
        }

        res.status(500).send('Server is errors.');
    }
});

// @route Put api/posts/:post_id/comments/:comment_id/reply/like/:reply_id
// @desc Like a reply
// @access Private
router.put('/:post_id/comments/:comment_id/reply/like/:reply_id', auth, async (req, res) => {
    try {
        // Validation params Id
        const postId = req.params.post_id;
        const commentId = req.params.comment_id;
        const replyId = req.params.reply_id;

        if (!postId) {
            return res.status(400).json({ msg: 'Post\'\s ID is empty.' });
        }

        if (!commentId) {
            return res.status(400).json({ msg: 'Comment\'\s ID is empty.' });
        }

        // Find a post by Id and comments has comment'id
        const post = await Post.findOne({ _id: postId, 'comments._id': commentId });

        // Find Comment by id
        const comment = post.comments.find(comment => comment.id === commentId);

        // Find Reply by id
        const reply = comment.replies.find(reply => reply.id === replyId);

        if (!reply) {
            return res.status(404).json({ msg: 'Reply is not found !' });
        }

        // Make sure user is not like post yet.
        const isLiked = reply.likes.
            filter(like => like.user.toString() === req.user.id).length > 0;

        if (isLiked) {
            return res.status(400).json({ msg: 'Reply is liked already.' });
        }

        // Push User into Likes array.
        reply.likes.unshift({ user: req.user.id });

        await post.save();

        // Response to client
        res.json(comment);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post is not exists. ' });
        }

        res.status(500).send('Server is errors.');
    }
});

// @route Put api/posts/:post_id/comments/:comment_id/reply/unlike/:reply_id
// @desc UnLike a reply
// @access Private
router.put('/:post_id/comments/:comment_id/reply/unlike/:reply_id', auth, async (req, res) => {
    try {
        // Validation params Id
        const postId = req.params.post_id;
        const commentId = req.params.comment_id;
        const replyId = req.params.reply_id;

        if (!postId) {
            return res.status(400).json({ msg: 'Post\'\s ID is empty.' });
        }

        if (!commentId) {
            return res.status(400).json({ msg: 'Comment\'\s ID is empty.' });
        }

        // Find a post by Id and comments has comment'id
        const post = await Post.findOne({ _id: postId, 'comments._id': commentId });

        // Find Comment by id
        const comment = post.comments.find(comment => comment.id === commentId);

        // Find Reply by id
        const reply = comment.replies.find(reply => reply.id === replyId);

        if (!reply) {
            return res.status(404).json({ msg: 'Reply is not found !' });
        }

        // Make sure user liked post yet.
        const isNotLiked = reply.likes.filter(like => like.user.toString() === req.user.id).length === 0;

        if (isNotLiked) {
            return res.status(400).json({ msg: 'Reply has not been liked yet.' });
        }

        // Remove index
        const removeIndex = reply.likes.map(like => like.user.toString()).indexOf(req.user.id);

        reply.likes.splice(removeIndex, 1);

        await post.save();

        // Response to client
        res.json(comment);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post is not exists. ' });
        }

        res.status(500).send('Server is errors.');
    }
});

module.exports = router;