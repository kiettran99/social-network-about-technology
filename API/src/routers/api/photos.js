const router = require('express').Router();
const Post = require('../../models/post');
const auth = require('../../middleware/auth');

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
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $match: { user: req.user._id, status: 1 }
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