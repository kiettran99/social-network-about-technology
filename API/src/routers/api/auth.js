const router = require('express').Router();
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const { body, validationResult } = require('express-validator');
const errorHandler = require('../../middleware/error-handler');
const resetToken = require('../../utils/reset-password/token');
const { sendEmail } = require('../../utils/email');

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

        if (user.status !== 1) {
            return res.status(401).json({ errors: [{ msg: 'User is unauthorized.' }] });
        }

        const token = await user.generateAuthToken();

        res.send({ token });
    }
    catch (e) {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        //res.status(500).send('Server is error');
    }
});

// @route Post api/auth/reset-password
// @desc Logout user and remove current token.
// @access public
router.post('/reset-password', [
    body('email', 'Email is required.').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const email = req.body.email;

        // Find user to check exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User is not found .' });
        }

        // Generate token and send email to reset
        user.resetToken = resetToken.generateToken(user.id, email);

        await user.save();

        // Send mail
        await sendEmail(user, {
            type: 'forgot-password',
            data: `${process.env.APP_URL}/reset-password/${user.resetToken}`
        });

        res.json({ msg: 'Reset password successfully !' });
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is error.');
    }
});

// @route Post api/auth/reset-password/:token
// @desc Validation token and allow retore new password
// @access public
router.post('/reset-password/:token', [
    body('password', 'Password is required.').not().isEmpty(),
    body('confirmPassword', 'Confirm password is required.').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Validation token
        const token = req.params.token;
        
        if (!token) {
            return res.status(400).json({ msg: 'Token is required.' });
        }

        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: 'Password is not match.'});
        }

        // Decoded token to get _id and email
        const decoded = resetToken.validateToken(token);

        if (!decoded) {
            return res.status(400).json({ msg: 'Please try forgot password again.'});
        }

        // Find user to check exists
        const user = await User.findOne({
            _id: decoded.id,
            email: decoded.email,
            resetToken: token
        });

        if (!user) {
            return res.status(404).json({ msg: 'User is not found .' });
        }

        // Allow change new password
        user.password = password;

        // Remove key if changed password success.
        user.resetToken = null;

        await user.save();

        res.json({ msg: 'Reset password successfully !' });
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is error.');
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