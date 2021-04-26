const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const moment = require('moment');

const auth = require('../../middleware/auth');
const getUserByToken = require('../../middleware/getUserByToken');
const isEmptyObject = require('../../utils/isEmptyObject');
const { canAddActivity } = require('../../utils/ads/ads');

const Ads = require('../../models/ads');
const Post = require('../../models/post');
const Profile = require('../../models/profile');

// @route GET /api/ads
// @desc Get a ads.
// @access public
router.get('/', getUserByToken, async (req, res) => {
    try {

        const extendPipe = {};

        if (req.user) {
            const profile = await Profile.findOne({ user: req.user.id })
                .select({ dateOfBirth: 1 });

            const userYearsOld = moment().diff(moment(profile.dateOfBirth), 'years');

            extendPipe.$match = {
                'audience.age.from': {
                    $lte: userYearsOld
                },
                'audience.age.to': {
                    $gte: userYearsOld
                },
                $or: [
                    {
                        'audience.gender': {
                            $eq: 'all'
                        }
                    },
                    {
                        $and: [
                            {
                                'audience.gender': {
                                    $ne: 'all'
                                }
                            },
                            {
                                'audience.gender': {
                                    $eq: req.user.gender
                                }
                            }
                        ]
                    }
                ]
            };
        }

        // Find 2 random sample to repose client
        const pipeline = [
            {
                $sample: { size: 2 }
            },
            // Populate post by Id
            {
                $lookup: {
                    from: Post.collection.name,
                    localField: 'post',
                    foreignField: '_id',
                    as: 'post'
                }
            },
            // After populate post became array type, convert to object
            {
                $unwind: '$post'
            },
            {
                $project: {
                    owner: 1,
                    post: 1,
                    name: 1,
                }
            }
        ];

        if (!isEmptyObject(extendPipe)) {
            pipeline.unshift(extendPipe);
        }

        const ads = await Ads.aggregate(pipeline);

        // Response to client
        res.json(ads);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route POST /api/ads
// @desc Create a ads.
// @access private
router.post('/', auth, [
    body('name', 'Name is required').not().isEmpty(),
    body('post', 'Post ID is required').not().isEmpty(),
    body('audience', 'Audience is required').not().isEmpty()
], async (req, res) => {
    try {
        // 1. Validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Find post if owner is current user
        const post = await Post.findOne({ _id: req.body.post, user: req.user._id });

        if (!post) {
            return res.status(400).send('Post is not yours. Please try other posts.');
        }

        // 2. Create and Save
        const ads = await Ads.create({
            name: req.body.name,
            post: post._id,
            owner: req.user._id,
            audience: req.body.audience
        });

        // 3. Response to client
        res.json(ads);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route GET /api/ads/posts
// @desc Find owner post of current user.
// @access private
router.get('/posts', auth, async (req, res) => {
    try {
        // 1. Create filters to find
        const { limit = 5, skip = 0, headline } = req.query;

        const conditions = {
            user: req.user._id,
            'type.user': { $exists: true }
        };

        if (headline) {
            conditions.text = { '$regex': headline, $options: 'i' };
        }
        // 2. Find posts
        const posts = await Post.find(conditions)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // 3. Response to client
        res.json(posts);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route GET /api/ads/check-ads?name=string
// @desc Check If Name Ads compaign is not exsits.
// @access private
router.get('/check-ads', auth, async (req, res) => {
    try {
        const { name = '' } = req.query;

        // Find new name ad compaign not exists.
        const ads = await Ads.findOne({ owner: req.user._id, name });

        // Response to client if ads has existed.
        if (ads) {
            return res.json({ exists: true });
        }

        return res.json({ exists: false });
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route PUT /api/ads/:ads_id/click
// @desc Tracking user click view on ads
// @access public
// non-run
router.put('/:id/click', getUserByToken, async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send('Ads Id is required.');
        }

        // Find new name ad compaign not exists.
        const ads = await Ads.findById(id).sort({ 'activities.date': 'desc' });

        // Response to client if ads has existed.
        if (!ads) {
            return res.status(400).json({ msg: 'Ads is not found.' });
        }

        // Find ads and get recently activity to compute next activity.
        const result = canAddActivity(ads.activities);

        if (result) {
            ads.activities.push({
                user: req.user.id
            });

            await ads.save();
        }

        res.json(ads);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

module.exports = router;