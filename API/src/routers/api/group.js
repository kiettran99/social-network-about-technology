const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const upload = require('../../utils/upload');
const storage = require('../../firebase/firebase');
const Group = require('../../models/group');
const authByRole = require('../../middleware/auth-by-role');
const auth = require('../../middleware/auth');
const { registerGroupNotification, unregisterGroupNotification } = require('../../utils/notification');

// @route GET /api/groups
// @rotue full GET /api/groups?limt=number&skip=number
// @desc Get All groups
// @access public
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const groups = await Group.find({}, {
            members: {
                $slice: [0, 6]
            }
        }).limit(limit).skip(skip).populate('members.user', 'avatar');

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

        const group = await Group.findById(id, {
            members: {
                $slice: [0, 9]
            }
        }).populate('members.user', 'avatar name');

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
router.post('/', authByRole('admin'), upload.single('avatar'), [
    body('name', 'Name is required.').not().isEmpty(),
    body('info', 'Info is required.').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        // Check errors is exists
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a new instance and save into database
        const group = new Group(req.body);

        await group.save();

        if (req.file) {

            // Create a storage ref
            const storageRef = storage.ref(`/groups/${group.id}/avatar/${req.file.originalname}`);

            // Upload Image
            await storageRef.put(req.file.buffer);

            group.avatar = await storageRef.getDownloadURL();

            await group.save();
        }

        res.json(group);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route PUT /api/groups/:id
// @desc update profile a group.
// @access private Admin
router.put('/:id', authByRole('admin'), async (req, res) => {
    try {

        const id = req.params.id;
        const { name, info } = req.body;

        // Check id is not empty
        if (!id) {
            return res.status(400).send('Group id is empty.');
        }

        const group = await Group.findByIdAndUpdate(id, {
            name,
            info
        });

        res.json(group);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route PUT /api/groups/:id/join
// @desc join a group.
// @access private Admin
router.put('/:id/join', auth, async (req, res) => {
    try {
        const id = req.params.id;

        // Check id is not empty
        if (!id) {
            return res.status(400).send('Group id is empty.');
        }

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).send('Group is not exists.');
        }

        // Make sure user liked post yet.
        const isJoinedGroup = group.members.filter(member => member.user._id.toString() === req.user.id).length > 0;

        if (isJoinedGroup) {
            return res.status(400).json({ msg: 'Group is joined already.' });
        }

        group.members.push({ user: req.user.id });
        group.lengthOfMembers += 1;

        const [updatedGroup] = await Promise.all([group.populate('members.user', 'avatar').execPopulate(), group.save()])

        if (updatedGroup) {
            registerGroupNotification(req.user, updatedGroup);
        }

        res.json(updatedGroup.members.slice(0, 5));
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route PUT /api/groups/:id/unjoin
// @desc unjoin a group.
// @access private Admin
router.put('/:id/unjoin', auth, async (req, res) => {
    try {

        const id = req.params.id;

        // Check id is not empty
        if (!id) {
            return res.status(400).send('Group id is empty.');
        }

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).send('Group is not exists.');
        }

        // Make sure user liked post yet.
        const isNotJoined = group.members.filter(member => member.user._id.toString() === req.user.id).length === 0;

        if (isNotJoined) {
            return res.status(400).json({ msg: 'Group has not been joined yet.' });
        }

        // Remove index
        const removeIndex = group.members.map(member => member.user._id.toString()).indexOf(req.user.id);

        group.members.splice(removeIndex, 1);

        group.lengthOfMembers -= 1;

        // Coppy document and populate user to get avatar, slice 0,5 to get 5th user.
        const [updatedGroup] = await Promise.all([group.populate('members.user', 'avatar').execPopulate(), group.save()])

        if (updatedGroup) {
            unregisterGroupNotification(req.user, updatedGroup);
        }

        res.json(updatedGroup.members.slice(0, 5));
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route PUT /api/groups/:id/avatar
// @desc upload avatar
// @access private Admin
router.put('/:id/avatar', [authByRole('admin'), upload.single('avatar')
], async (req, res) => {
    try {

        const id = req.params.id;
        // Check id is not empty
        if (!id) {
            return res.status(400).send('Group id is empty.');
        }

        const group = await Group.findById(id);

        // Check image is uploaded
        if (req.file) {

            const prevStorageRef = storage.ref(`/groups/${group.id}/avatar`);

            // Remove image just uploaded before
            prevStorageRef.listAll().then((res) => {
                res.items.forEach(item => {
                    item.delete();
                })
            }).catch(e => {
                console.log('Fail to remove image Firebase.', e);
            });

            const storageRef = storage.ref(`/groups/${group.id}/avatar/${req.file.originalname}`);

            //Upload image
            await storageRef.put(req.file.buffer);

            group.avatar = await storageRef.getDownloadURL();

            await group.save();
        }

        res.json(group);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route PUT /api/groups/:id/wallpaper
// @desc Edit wallpaper group
// @access private Admin
router.put('/:id/wallpaper', [authByRole('admin'), upload.single('wallpaper')
], async (req, res) => {
    try {

        const id = req.params.id;
        // Check id is not empty
        if (!id) {
            return res.status(400).send('Group id is empty.');
        }

        const group = await Group.findById(id);

        // Check image is uploaded
        if (req.file) {

            const prevStorageRef = storage.ref(`/groups/${group.id}/wallpaper`);

            // Remove image just uploaded before
            prevStorageRef.listAll().then((res) => {
                res.items.forEach(item => {
                    item.delete();
                })
            }).catch(e => {
                console.log('Fail to remove image Firebase.', e);
            });

            const storageRef = storage.ref(`/groups/${group.id}/wallpaper/${req.file.originalname}`);

            //Upload image
            await storageRef.put(req.file.buffer);

            group.wallpaper = await storageRef.getDownloadURL();

            await group.save();
        }

        res.json(group);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route POST /api/groups/:id
// @desc Delete a group.
// @access private Admin
router.delete('/:id', authByRole('admin'), async (req, res) => {
    try {
        const id = req.params.id;

        // Check id is not empty
        if (!id) {
            return res.status(400).send('Group id is empty.');
        }

        const group = await Group.findById(id);

        await group.remove();

        res.json(group);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

module.exports = router;