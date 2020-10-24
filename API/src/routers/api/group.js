const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const upload = require('../../utils/upload');
const storage = require('../../firebase/firebase');
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
            const storageRef = storage.ref(`/groups/${group.id}/${req.file.originalname}`);

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

// @route PUT /api/groups/:id/name
// @desc update profile a group.
// @access private Admin
router.put('/:id', authByRole('admin'), async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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

// @route PUT /api/groups/:id/avatar
// @desc upload avatar
// @access private Admin
router.put('/:id/avatar', authByRole('admin'), async (req, res) => {
    try {
        const id = req.params.id;

        // Check id is not empty
        if (!id) {
            return res.status(400).send('Group id is empty.');
        }

        const group = await Group.findById(id);

        // Check image is uploaded
        if (req.file) {
            const prevStorageRef = storage.ref(`/groups/${group.id}`);

            // Remove image just uploaded before
            prevStorageRef.listAll().then((res) => {

            });
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