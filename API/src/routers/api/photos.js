const router = require('express').Router();
const Post = require('../../models/post');
const auth = require('../../middleware/auth');
const ObjectId = require('mongoose').Types.ObjectId;

// @route Post api/photos
// @desc Image Collections from Post
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        // Limit post with 6 posts and if not skip then default value is 0.
        const limit = parseInt(req.query.limit) || 6;
        const skip = parseInt(req.query.skip) || 0;

        const posts = await Post.aggregate([
            {
                $match: {
                    user: req.user._id,
                    status: 1,
                    'imageUrls.0': { $exists: true }
                }
            },
            {
                $project: {
                    imageUrls: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]);

        res.json(posts);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors');
    }
});

// @route Post api/photos/:user_id
// @desc Get a List photos by userId
router.get('/:user_id', async (req, res) => {
    try {
        // Get userId to find photos
        const userId = req.params.user_id;

        if (!userId && typeof (userId) !== 'string') {
            return res.status(400).send('UserId is required.');
        }

        // Limit post with 6 photos
        const limit = 6;
        const skip = 0;

        const posts = await Post.aggregate([
            {
                $match: {
                    user: ObjectId(userId), status: 1,
                    "imageUrls.0": { $exists: 1 }
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $project: {
                    imageUrls: 1
                }
            }
        ]);

        res.json(posts);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors');
    }
});

module.exports = router;