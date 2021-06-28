const router = require('express').Router();
const { body, validationResult, param } = require('express-validator');

const Group = require('../../models/group');

const upload = require('../../utils/upload');
const storage = require('../../firebase/firebase');
const auth = require('../../middleware/auth');
const { registerNotification, unregisterNotification,
    registerNotifications } = require('../../utils/notification');

// @route GET /api/groups
// @rotue full GET /api/groups?limt=number&skip=number&name=string
// @desc Get All groups
// @access public
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        // Get name to search
        const name = req.query.name;

        const conditions = {};

        if (name) {
            conditions.name = { '$regex': name, $options: 'i' };
        }

        const groups = await Group.find(conditions, {
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

// @route GET /api/groups/me
// @rotue full GET /api/groups/me?limt=number&skip=number&name=string&group=string
// @desc Get a list group by filter tab
// @access private
router.get('/me', auth, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        // Get name to search
        const name = req.query.name;
        const group = req.query.group;  // Filter group

        const groupsAdmin = ['5f82ab8dd98386195097a92d',
            '5f95024e0d4f742610d18062',
            '5fd0caf7e9e81e0015cb5adb'];

        const conditions = {};

        switch (group) {
            case 'joined':
                conditions['members.user'] = req.user._id;
                break;
            case 'discovery':
                conditions['$and'] = [{
                    'members.user': {
                        $nin: [req.user._id]
                    }
                }, {
                    '_id': {
                        $nin: groupsAdmin
                    }
                }, {
                    isPublic: true
                }];
                break;
            default:
                conditions['_id'] = {
                    $in: groupsAdmin
                };
                break;
        }

        if (name) {
            conditions.name = { '$regex': name, $options: 'i' };
        }

        const groupsPromise = Group.find(conditions, {
            members: {
                $slice: [0, 6]
            }
        }).limit(limit).skip(skip).populate('members.user', 'avatar');

        const lengthPromise = Group.countDocuments(conditions);

        const [groups, length] = await Promise.all([
            groupsPromise,
            lengthPromise
        ])

        res.json({ groups, length });
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

// @route POST /api/groups
// @desc Create a group.
// @access private
router.post('/', auth, upload.fields([
    { name: 'avatar', maxCount: 1 }, { name: 'wallpaper', maxCount: 1 }
]), [
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
        const group = await Group.create({
            ...req.body,
            wallpaper: '/images/page-img/profile-bg8.jpg',
            avatar: '/images/page-img/profile-bg8.jpg',
            owner: req.user._id
        });

        if (req.user.role !== 'admin') {
            group.members.push({ user: req.user.id });
            group.lengthOfMembers += 1;

            registerNotification(req.user, group, 'GROUP');

            await group.save();
        }

        if (req.files && req.files.avatar) {
            const file = req.files.avatar[0];

            // Create a storage ref
            const storageRef = storage.ref(`/groups/${group.id}/avatar/${file.originalname}`);

            // Upload Image
            await storageRef.put(file.buffer);

            group.avatar = await storageRef.getDownloadURL();

            await group.save();
        }

        // Check image is uploaded
        if (req.files && req.files.wallpaper) {
            const file = req.files.wallpaper[0];

            const storageRef = storage.ref(`/groups/${group.id}/wallpaper/${file.originalname}`);

            //Upload image
            await storageRef.put(file.buffer);

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

// @route PUT /api/groups/:id
// @desc update profile a group.
// @access private
router.put('/:id', auth, upload.fields([
    { name: 'avatar', maxCount: 1 }, { name: 'wallpaper', maxCount: 1 }
]), [
    body('name', 'Name is required.').not().isEmpty(),
    body('info', 'Info is required.').not().isEmpty(),
    param('id', 'Group id is required').not().isEmpty()
], async (req, res) => {
    try {

        // Validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        const id = req.params.id;
        const { name, info, isPublic } = req.body;

        const group = await Group.findByIdAndUpdate(id, {
            name,
            info,
            isPublic
        }, { new: true });

        if (req.files && req.files.avatar) {
            const file = req.files.avatar[0];

            // Create a storage ref
            const storageRef = storage.ref(`/groups/${group.id}/avatar/${file.originalname}`);

            // Upload Image
            await storageRef.put(file.buffer);

            group.avatar = await storageRef.getDownloadURL();

            await group.save();
        }

        // Check image is uploaded
        if (req.files && req.files.wallpaper) {
            const file = req.files.wallpaper[0];

            const storageRef = storage.ref(`/groups/${group.id}/wallpaper/${file.originalname}`);

            //Upload image
            await storageRef.put(file.buffer);

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

// @route PUT /api/groups/:id/join
// @desc join a group.
// @access private
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
            registerNotification(req.user, updatedGroup, 'GROUP');
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
// @access private
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
            unregisterNotification(req.user, updatedGroup, 'GROUP');
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
// @access private
router.put('/:id/avatar', [auth, upload.single('avatar')
], async (req, res) => {
    try {

        const id = req.params.id;
        // Check id is not empty
        if (!id) {
            return res.status(400).send('Group id is empty.');
        }

        const group = await Group.findById(id);

        if (group.owner && group.owner !== req.user.id) {
            return res.status(400).send('User not ,,,')
        }

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
router.put('/:id/wallpaper', [auth, upload.single('wallpaper')
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
// @access private
router.delete('/:id', auth, async (req, res) => {
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

// @route PUT /api/groups/:id/invite
// @desc invate friends into a group.
// @access private
router.put('/:id/invite', auth, async (req, res) => {
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

        const users = req.body.users;

        if (users && users.length <= 0) {
            return res.status(400).send('Least one user to invite group.');
        }

        // Make sure user has joined post yet.

        // Convert array to string has _id
        const usersId = users.map(user => user._id.toString());

        const isJoinedGroup = group.members.map(member => member.user.toString())
            .some((userId) => usersId.includes(userId));

        if (isJoinedGroup) {
            return res.status(400).json({ msg: 'Group is joined already.' });
        }

        users.forEach(user => {
            group.members.push({ user: user._id });
            group.lengthOfMembers += 1;
        });

        const [updatedGroup] = await Promise.all([group.populate('members.user', 'avatar').execPopulate(), group.save()])

        if (updatedGroup) {
            registerNotifications(req.user, updatedGroup, 'GROUP');
        }

        res.json(updatedGroup.members.reverse().slice(0, users.length));
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

module.exports = router;