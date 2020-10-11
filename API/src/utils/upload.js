const multer = require('multer');

const upload = multer({
    limits: {
        fieldSize: 1000000
    },
    fileFilter(req, file, cb) {
        // Check type file allow jpg, jpeg, png
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload a image.'));
        }

        // Confirm file
        cb(undefined, true);
    }
});

module.exports = upload;