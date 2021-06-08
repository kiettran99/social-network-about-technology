const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const authByRole = require('../../middleware/auth-by-role');
const Report = require('../../models/report');
const { isExistsCollection } = require('../../utils/report/report');

// @route GET /api/reports
// @desc Get reports. 
// @access Private - Admin role
router.get('/', authByRole('admin'), async (req, res) => {
    try {
        const reports = await Report.find({}).sort({ _id: -1 });

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
router.post('/', auth, [
    body('target', 'Target is required.').not().isEmpty(),
    body('type', 'Type is required.').not().isEmpty(),
    body('description', 'Description is required.').not().isEmpty(),
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

        res.json(report);
    }
    catch (e) {
        console.log(e);

        res.status(500).send('Server is errors.');
    }
});

module.exports = router;