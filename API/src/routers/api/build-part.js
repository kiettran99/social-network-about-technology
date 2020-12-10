const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const BuildPart = require('../../models/build-part');
const auth = require('../../middleware/auth');
const { calulateRating } = require('../../utils/build-part/build-part');

// @route GET /api/build-parts/:id
// @desc Get by Id hardwares
// @access public
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send('Id is required.');
        }
        
        const buildPart = await BuildPart.findById(req.params.id);

        res.json(buildPart);
    }
    catch (e) {
        console.log(e);

        if (e.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.status(500).send('Server error.');
    }
});

// @route Put /api/build-parts/:id/rating
// @desc Vote and Rating build parts.
// @access private
router.put('/:id/rating', auth, [
    body('overall', 'Overall is required.').isNumeric()
], async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send('Id is required.');
        }

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        const buildPart = await BuildPart.findById(req.params.id);

        const isRated = buildPart.ratings.filter(rating => rating.user.toString() === req.user.id).length > 0;

        if (!isRated) {
            buildPart.ratings.push({
                user: req.user.id,
                overall: req.body.overall.toFixed(0)
            });
        }
        else {
            buildPart.ratings.forEach(rating => {
                if (rating.user.toString() === req.user.id) {
                    rating.overall = req.body.overall.toFixed(0)
                }
            });
        }

        buildPart.score = calulateRating(buildPart.ratings);

        await buildPart.save();

        res.json(buildPart);
    }
    catch (e) {
        console.log(e);

        if (e.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.status(500).send('Server error.');
    }
});


module.exports = router;