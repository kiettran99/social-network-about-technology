const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const header = req.header('Authorization');

        if (!header) {
            return res.status(401).json({ message: 'No Token, authorization denied!' });
        }

        const token = header.replace('BEARER ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (user.status !== 1) {
            return res.status(401).json({ errors: [{ msg: 'User is unauthorized.' }] });
        }

        req.user = user;
        req.token = token;

        next();
    }
    catch (e) {
        console.log(e);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = auth;