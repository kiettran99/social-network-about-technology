const router = require('express').Router();
const { check, validationResult, param } = require('express-validator');

const auth = require('../../middleware/auth');
const authByRole = require('../../middleware/auth-by-role');
const upload = require('../../utils/upload');
const storage = require('../../firebase/firebase');

const Post = require('../../models/post');
const Report = require('../../models/report');
const User = require('../../models/user');
const { isExistsCollection } = require('../../utils/report/report');

// @route GET /api/reports
// @desc Get reports. 
// @access Private - Admin role
router.get('/', authByRole('admin'), async (req, res) => {
    try {
        const reports = await Report.find({})
            .sort({ _id: -1 })
            .populate('owner', 'fullname avatar');

        res.json(reports);
    }
    catch (e) {
        console.log(e);

        res.status(500).send('Server is errors.');
    }
});

// @route POST /api/reports
// @desc Create a report. 
// @access Private
router.post('/', auth, upload.array('images', 10), [
    check('target', 'Target is required.').not().isEmpty(),
    check('type', 'Type is required.').not().isEmpty(),
    check('description', 'Description is required.').not().isEmpty(),
], async (req, res) => {
    try {
        // 1. Validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        const { target, type } = req.body;

        // 2. Check target has exists
        const result = isExistsCollection(target, type);

        if (!result) {
            return res.status(400).json({ msg: 'Target is not found.' });
        }

        // 3. Create report
        const report = await Report.create({
            target,
            type,
            owner: req.user._id,
            description: req.body.description
        });

        // 4. Report User - Get More Informations from images.
        if (req.files) {

            await Promise.all(req.files.map(async (file) => {
                //Create a storage ref
                const storageRef = storage.ref(`/reports/${report.id}/${file.originalname}`);

                //Upload image
                await storageRef.put(file.buffer);

                const fileUrl = await storageRef.getDownloadURL();

                report.images.push(fileUrl);
            }));

            await report.save();
        }

        res.json(report);
    }
    catch (e) {
        console.log(e);

        res.status(500).send('Server is errors.');
    }
});

// @route GET /user/:user_Id
// @desc Get infomation user and post.
// @access Private - Admin role
router.get('/user/:user_id', authByRole('admin'), [
    param('user_id', 'Post is required').not().isEmpty()
], async (req, res) => {
    try {
        // 1. Validation req.params
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        // 2. Find user and a count post has locked
        const userId = req.params.user_id;

        const [user, posts] = await Promise.all([
            User.findById(userId).select('fullname avatar email status'),
            Post.find({ user: userId, status: 2 }).select('status')
        ])

        // 3. Response client
        res.json({ user, posts });
    }
    catch (e) {
        console.log(e);

        res.status(500).send('Server is errors.');
    }
});

// @route PATCH /block/post/:postId
// @desc Reports - Block a post
// @access Private - Admin role
router.patch('/block/post/:postId', authByRole('admin'), [
    param('postId', 'Post is required').not().isEmpty()
], async (req, res) => {
    try {
        // 1. Validation req.params
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        // 2. Block post
        const postId = req.params.postId;

        const post = await Post.findByIdAndUpdate(postId, { status: 2 });

        // 3. Response to client
        res.json(post);
    }
    catch (e) {
        console.log(e);

        res.status(500).send('Server is errors.');
    }
});

// @route PATCH /block/post/:postId
// @desc Reports - Remove Block a post
// @access Private - Admin role
router.patch('/unblock/post/:postId', authByRole('admin'), [
    param('postId', 'Post is required').not().isEmpty()
], async (req, res) => {
    try {
        // 1. Validation req.params
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        // 2. Block post
        const postId = req.params.postId;

        const post = await Post.findByIdAndUpdate(postId, { status: 1 });

        // 3. Response to client
        res.json(post);
    }
    catch (e) {
        console.log(e);

        res.status(500).send('Server is errors.');
    }
});

module.exports = router;