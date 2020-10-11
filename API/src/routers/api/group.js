const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Group = require('../../models/group');
const authByRole = require('../../middleware/auth-by-role');

// @route GET /api/groups
// @rotue full GET /api/groups?limt=number&skip=number
// @desc Get All groups
// @access public
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit || 5;
        const skip = req.query.skip || 0;

        const groups = await Group.find({}).limit(limit).skip(skip);

        res.json(groups);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route GET /api/groups/:id
// @desc Get group by id.
// @access public
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Check id is not empty
        if (!id) {
            return res.status(400).send('Group id is empty.');
        }

        const group = await Group.findById(id);

        res.json(group);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route POST /api/groups/:id
// @desc Create a group.
// @access private Admin
router.post('/', authByRole('admin'), [
    body('name').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        // Check errors is exists
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a new instance and save into database
        const group = new Group(req.body);

        group.save();

        res.json(group);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

module.exports = router;