const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const authByRole = require('../../middleware/auth-by-role');
const Hardware = require('../../models/hardware');

// @route GET /api/hardwares
// @desc Get list hardwares
// @access public
router.get('/', async (req, res) => {
    try {
        // Limit post with 5 posts and if not skip then default value is 0.
        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const conditions = req.query;

        // Filter query
        delete conditions.limit;
        delete conditions.skip;

        if (conditions.part) {
            conditions.part = { '$regex': conditions.part, $options: 'i' };
        }

        const hardwares = await Hardware.find(conditions).limit(limit).skip(skip);

        res.json(hardwares.map((hardware => ({
            value: hardware.id,
            label: `${hardware.part} - $${hardware.value} - Score: ${hardware.benchmark ? hardware.benchmark: 'N/A'}`
        }))));
    }
    catch (e) {
        console.log(e);

        if (e.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.status(500).send('Server error.');
    }
});

// @route GET /api/hardwares/:id
// @desc Get All groups
// @access public
router.get('/:id', async (req, res) => {
    try {
        const hardware = await Hardware.findById(req.params.id);

        res.json(hardware);
    }
    catch (e) {
        console.log(e);

        if (e.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.status(500).send('Server error.');
    }
});

// @route GET /api/hardwares
// @desc Get All groups
// @access public
router.post('/', [
    body('category', 'Category is required.').not().isEmpty(),
    body('brand', 'Brand is requried').not().isEmpty(),
    body('part', 'Part is requried').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        const hardware = new Hardware(req.body);
        await hardware.save();

        res.json(hardware);
    }
    catch (e) {
        console.log(e);

        if (e.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.status(500).send('Server error.');
    }
});

// @route GET /api/hardwares
// @desc Get All groups
// @access public
router.delete('/:id', async (req, res) => {
    try {
        const hardware = await Hardware.findByIdAndRemove(req.params.id);

        res.json(hardware);
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