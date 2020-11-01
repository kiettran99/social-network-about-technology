const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');

// @route GET /api/profile/me
// @desc Get current user profile.
// @access private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('User',
            ['name, avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    }
    catch (e) {
        console.log(e);

        if (e.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.status(500).send('Server error.');
    }
});

// @route GET /api/profile/user/:user_id
// @desc Get user profile by Id.
// @access public
router.get('/user/:user_id', async (req, res) => {
    try {

        const userId = req.params.user_id;

        if (!!!userId) {
            return res.status(400).send('User is not found !');
        }

        const profile = await Profile.findOne({ user: userId }).populate('User',
            ['name, avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    }
    catch (e) {
        console.log(e);

        if (e.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.status(500).send('Server error.');
    }
});

// @route PUT /api/profile/me
// @desc Edit user profile
// @access private
router.put('/me', auth, [
    body('fullname', 'Full Name is required').not().isEmpty()
], async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const profile = await Profile.findOne({ user: req.user.id }).populate('User',
            ['name, avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        // -- Edit Infomation start -- //
        
        const { fullname, dateOfBirth, city, age, maritalStatus, address, job } = req.body;

        profile = await profile.update({ fullname, dateOfBirth, city, age, maritalStatus, address, job });

        // -- Edit Infomation End -- //

        res.json(profile);
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