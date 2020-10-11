const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authByRole = (roles = []) => {

    //@roles can be a single string 'user', 'admin' or array roles ['user', 'admin']
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return async (req, res, next) => {
        const header = req.header('Authorization');
    
        if (!header) {
            return res.status(401).json({ message: 'No Token, authorization denied!'});
        }

        const token = header.replace('BEARER ', '');
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        try {
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    
            if (!user) {
                throw new Error();
            }

            if (roles.length && !roles.includes(user.role)) {
                throw new Error();
            }   
    
            req.user = user;
            next();
        }
        catch (e) {
            console.log(e);
            res.status(401).json({ message: 'Unauthorized'});
        }
    }
}

module.exports = authByRole;