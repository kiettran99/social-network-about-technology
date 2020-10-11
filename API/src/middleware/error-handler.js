const eventHandler = (error, req, res, next) => {
    if (typeof (error) === 'string') {
        //custom application error
        return res.status(400).json({ message: error });
    }
    
    return res.status(500).json({ message: error.message });
};

module.exports = eventHandler;