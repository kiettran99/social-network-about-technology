const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const upload = require('../../utils/upload');
const storage = require('../../firebase/firebase');
const User = require('../../models/user');

// @route GET /api/profile/me
// @desc Get current user profile.
// @access private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user');

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

        const profile = await Profile.findOne({ user: userId }).populate('user');

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

// @route POST /api/profile
// @desc Create user profile
// @access private
router.post('/', auth, async (req, res) => {
    try {
        const profile = await Profile.create({
            user: req.user.id
        });

        res.json(profile);
    }
    catch (e) {
        res.status(500).send('Server error.');
    }
});

// @route PUT /api/profile/me
// @desc Edit user profile
// @access private
router.put('/me', auth, upload.single('avatar'), [
    body('fullname', 'Full Name is required').not().isEmpty()
], async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, dateOfBirth, city, age, maritalStatus,
            address, job, email, gender, country } = req.body;

        const updateProfile = async ({ dateOfBirth, city, age, maritalStatus,
            address, job }) => {
            const profile = await Profile.findOneAndUpdate({ user: req.user.id },
                {
                    dateOfBirth, city, age, maritalStatus,
                    address, job
                });

            return profile;
        };

        const updateUser = async ({ fullname, email, gender, country }) => {
            const user =  await User.findByIdAndUpdate(req.user.id, { fullname, email, gender, country });

            if (req.file) {

                if (user.avatar) {
                    const prevImageRef = storage.ref(`/users/${user.id}/avatar`);

                    // Remove previous images and add new image
                    prevImageRef.listAll().then((res) => {
                        res.items.forEach((itemRef) => {
                            itemRef.delete();
                        })
                    }).catch((e) => {
                        console.log('Fail', e);
                    });
    
                }
               
                //Create a storage ref
                const storageRef = storage.ref(`/users/${user.id}/avatar/${req.file.originalname}`);

                //Upload image
                await storageRef.put(req.file.buffer);

                const avatar = await storageRef.getDownloadURL();        
                
                user.avatar = avatar;

                await user.save();
            }

            return user;
        }

        const [profile] = await Promise.all([updateProfile({
            dateOfBirth, city, age, maritalStatus,
            address, job
        }), updateUser({ fullname, email, gender, country })]);

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

// @route PUT /api/profile/manage-contact
// @desc Edit manage contact
// @access private
router.put('/manage-contact', auth, [
    body('phoneNumber').not().isEmpty(),
    body('email').not().isEmpty()
], async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        });

        const user = req.user;

        const { phoneNumber, email, url } = req.body;

        if (phoneNumber) profile.phoneNumber = phoneNumber;
        if (email) user.email = email;
        if (url) profile.url = url;

        user.save();

        await profile.save();

        res.json(profile);
    }
    catch (e) {
        res.status(500).send('Server error.');
    }
});

module.exports = router;