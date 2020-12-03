const jwt = require('jsonwebtoken');

const generateToken = (id, email) => {
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    return token;
};

const validateToken = (token) => {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
};

module.exports = { generateToken, validateToken };