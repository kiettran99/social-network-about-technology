const router = require('express').Router();
const Friend = require('../../models/friend');
const User = require('../../models/user');
const auth = require('../../middleware/auth');
const { getUserFriends, getRequestFriends, getUsersList, getAll, followingFriends
} = require('../../utils/friend');

// @route get /api/friends
// @desc test api
// @access private
router.get('/', async (req, res) => {
    try {
        const friends = await Friend.find({});

        res.json(friends);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route get /api/friends
// @desc test api
// @access private
router.get('/getall', auth, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const users = await getAll(req.user._id, limit, skip);

        res.json(users);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route get /api/friends/get-friends
// @desc Get current User's Friends list
// @access private
router.get('/get-friends', auth, async (req, res) => {
    try {

        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const users = await getUserFriends(req.user._id, limit, skip);

        res.json(users);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route get /api/friends/get-friends
// @desc Get User's Friends list by userId
// @access public
router.get('/get-friends/:userId', async (req, res) => {
    try {

        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).send('User is not exists.');
        }

        const user = await User.findById(userId).select('_id');

        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const users = await getUserFriends(user._id, limit, skip);

        res.json(users);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route get /api/friends/get-request
// @desc Get current User's Friends request
// @access private
router.get('/get-request', auth, async (req, res) => {
    try {

        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const users = await getRequestFriends(req.user._id, limit, skip);

        res.json(users);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route get /api/friends/get-user
// @desc Get current not User's Friends request
// @access private
router.get('/get-user', auth, async (req, res) => {
    try {

        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;

        const users = await getUsersList(req.user._id, limit, skip);

        res.json(users);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route put /api/friends/request/:user_id
// @desc Request to Add friend.
// @access private
router.put('/request/:user_id', auth, async (req, res) => {
    try {

        // Validation
        const recipientId = req.params.user_id;
        const requesterId = req.user.id;

        if (!recipientId) {
            return res.status(400).send('User Id not found !');
        }

        const friendReqeuster = Friend.findOneAndUpdate({
            requester: requesterId,
            recipient: recipientId
        }, { $set: { status: 1 } }, {
            upsert: true,
            new: true
        });

        const friendRecipient = Friend.findOneAndUpdate({
            recipient: requesterId,
            requester: recipientId,
        }, { $set: { status: 2 } }, {
            upsert: true,
            new: true
        });

        const [requester, recipient] = await Promise.all([friendReqeuster, friendRecipient]);

        const userRequester = User.findByIdAndUpdate(requesterId, {
            $push: { friends: requester._id }
        });

        const userRecipient = User.findByIdAndUpdate(recipientId, {
            $push: { friends: recipient._id }
        });

        await Promise.all([userRequester, userRecipient]);

        res.json({ userId: recipientId, status: 1 });
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route put /api/friends//accept/:user_id
// @desc Accept to Add friend.
// @access private
router.put('/accept/:user_id', auth, async (req, res) => {
    try {

        // Validation
        const requesterId = req.params.user_id;
        const recipientId = req.user.id;

        if (!recipientId) {
            return res.status(400).send('User Id not found !');
        }

        const friendReqeuster = Friend.findOneAndUpdate({
            requester: requesterId,
            recipient: recipientId
        }, { $set: { status: 3 } });

        const friendRecipient = Friend.findOneAndUpdate({
            recipient: requesterId,
            requester: recipientId,
        }, { $set: { status: 3 } });

        await Promise.all([friendReqeuster, friendRecipient]);

        followingFriends(req.user, recipientId);

        res.json({ userId: requesterId, status: 3 });
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

// @route put /api/friends/unaccept/:user_id
// @desc Reject to Add friend.
// @access private
router.put('/unaccept/:user_id', auth, async (req, res) => {
    try {

        // Validation
        const requesterId = req.params.user_id;
        const recipientId = req.user.id;

        if (!recipientId) {
            return res.status(400).send('User Id not found !');
        }

        const friendReqeuster = Friend.findOneAndRemove({
            requester: requesterId,
            recipient: recipientId
        });

        const friendRecipient = Friend.findOneAndRemove({
            recipient: requesterId,
            requester: recipientId,
        });

        const [requester, recipient] = await Promise.all([friendReqeuster, friendRecipient]);

        const userRequester = User.findByIdAndUpdate(requesterId, {
            $pull: { friends: requester._id }
        });

        const userRecipient = User.findByIdAndUpdate(recipientId, {
            $pull: { friends: recipient._id }
        });

        await Promise.all([userRequester, userRecipient]);

        res.json({ userId: requesterId, status: 0 });
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is errors.');
    }
});

module.exports = router;