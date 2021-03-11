const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUserByToken = async (req, res, next) => {
    try {
        const header = req.header('Authorization');

        if (!!header === false) {
            return next();
        }

        const token = header.replace('BEARER ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }).select('-password');

        if (user && user.status === 1) {
            req.user = user;
        }

        next();
    }
    catch (e) {
        console.log(e);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = getUserByToken;