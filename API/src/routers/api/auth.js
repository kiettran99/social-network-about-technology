const router = require('express').Router();
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const { body, validationResult } = require('express-validator');
const errorHandler = require('../../middleware/error-handler');

// @route Get api/auth
// @desc Test authentication
// @access private
router.get('/', auth, async (req, res) => {
    res.json(req.user);
}, errorHandler);

// @route Post api/auth
// @desc Authenticate user and get token
// @access public
router.post('/', [
    body('username', 'Username is required').not().isEmpty(),
    body('password', 'Password is required').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;

        const user = await User.findByCredentals(username, password);

        //Check User is exsits
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const token = await user.generateAuthToken();

        res.send({ token });
    }
    catch (e) {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        //res.status(500).send('Server is error');
    }
});

// @route Get api/auth/logout
// @desc Logout user and remove current token.
// @access private
router.get('/logout', auth, async (req, res) => {
    try {
        // Remove a current token.
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);

        // Save user
        await req.user.save();

        // Response message remove token
        res.status(200).send('Logout succesfully !');
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is error.');
    }
});

// @route Get api/auth/logoutall
// @desc Logout user and remove all token.
// @access private
router.get('/logoutall', auth, async (req, res) => {
    try {
        // Remove a current token.
        req.user.tokens = [];

        // Save user
        await req.user.save();

        // Response message remove token
        res.status(200).send('Logout succesfully !');
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is error.');
    }
});

module.exports = router;