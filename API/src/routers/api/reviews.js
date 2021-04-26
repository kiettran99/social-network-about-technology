const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Review = require('../../models/review');
const Post = require('../../models/post');
const auth = require('../../middleware/auth');
const upload = require('../../utils/upload');
const storage = require('../../firebase/firebase');

// @route GET /api/reviews
// @desc Get a list reviews
// @access public
router.get('/', async (req, res) => {
    try {
        // Limit post with 5 reviews and if not skip then default value is 0.
        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const reviews = await Review.find({ status: 1 }).limit(limit).skip(skip)
            .sort({ createdAt: 'desc' }).populate('post');

        res.json(reviews);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route GET /api/reviews/:id
// @desc Get a detail review.
// @access public
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Check id is not empty
        if (!id) {
            return res.status(400).send('Review id is empty.');
        }

        // Limit post with 5 reviews and if not skip then default value is 0.
        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const review = await Review.findById(id).limit(limit).skip(skip).populate('post');

        res.json(review);
    }
    catch (e) {
        console.log(e);

        if (e.kind === 'ObjectId') {
            return res.status(404).send('Post is not exists.');
        }

        res.status(500).send('Server is errors.');
    }
});

// @route POST /api/reviews
// @desc Create a new review.
// @access private
router.post('/', auth,
    upload.fields([{ name: 'wallpaper', maxCount: 1 }, { name: 'pictures' }]), [
    body('title', 'title is required.').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        // Check errors is exists
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create new post and attach review.
        const post = await Post.create({
            text: req.body.title,
            user: req.user.id,
            name: req.user.fullname,
            avatar: req.user.avatar,
            type: {}
        });

        // Check post uploaded image.
        if (req.files && req.files.pictures) {

            await Promise.all(req.files.pictures.map(async (file) => {
                //Create a storage ref
                const storageRef = storage.ref(`/posts/${post.id}/${file.originalname}`);

                //Upload image
                await storageRef.put(file.buffer);

                const fileUrl = await storageRef.getDownloadURL();

                post.imageUrls.push(fileUrl);
            }));

            await post.save();
        }

        const reviewObj = {
            post: post._id,
            price: req.body.price,
            descriptions: JSON.parse(req.body.descriptions),
            link: req.body.link
        };

        const review = await Review.create(reviewObj);

        if (req.files && req.files.wallpaper) {
            const file = req.files.wallpaper[0];

            //Create a storage ref
            const storageRef = storage.ref(`/reviews/${review.id}/${file.originalname}`);

            //Upload image
            await storageRef.put(file.buffer);

            const wallpaper = await storageRef.getDownloadURL();

            review.wallpaper = wallpaper;

            await review.save();
        }

        post.type.review = review.id;
        await post.save();

        res.json(review);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route PUT /api/reviews/:id
// @desc Edit a new review.
// @access private
router.put('/:id', auth,
    upload.fields([{ name: 'wallpaper', maxCount: 1 }, { name: 'pictures' }]), [
    body('title', 'title is required.').not().isEmpty()
], async (req, res) => {
    try {
        // Find a review
        const id = req.params.id;

        // Check id is not empty
        if (!id) {
            return res.status(400).send('Review id is empty.');
        }

        const errors = validationResult(req);

        // Check errors is exists
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const review = await Review.findById(id);

        review.price = req.body.price;
        review.descriptions = JSON.parse(req.body.descriptions);
        review.link = req.body.link;

        await review.save();

        // Find and update title when user has changed it
        const post = await Post.findByIdAndUpdate(review.post?._id, { text: req.body.title }, { new: true });

        // Check post uploaded image.
        if (req.files && req.files.pictures) {

            await Promise.all(req.files.pictures.map(async (file) => {
                //Create a storage ref
                const storageRef = storage.ref(`/posts/${post.id}/${file.originalname}`);

                //Upload image
                await storageRef.put(file.buffer);

                const fileUrl = await storageRef.getDownloadURL();

                post.imageUrls.push(fileUrl);
            }));

            await post.save();
        }

        if (req.files && req.files.wallpaper) {
            const file = req.files.wallpaper[0];

            //Create a storage ref
            const storageRef = storage.ref(`/reviews/${review.id}/${file.originalname}`);

            //Upload image
            await storageRef.put(file.buffer);

            const wallpaper = await storageRef.getDownloadURL();

            review.wallpaper = wallpaper;

            await review.save();
        }

        review.post = post;

        res.json(review);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route DELETE /api/reviews/:id
// @desc Remove a review.
// @access private
router.delete('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;

        // Check id is not empty
        if (!id) {
            return res.status(400).send('Group id is empty.');
        }

        const review = await Review.findByIdAndUpdate(id, { status: 0 });

        await Post.findByIdAndUpdate(review.post, { status: 0 });

        res.json({ msg: 'Remove successfully !' });
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

module.exports = router;