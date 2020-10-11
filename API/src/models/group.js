const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    info: {
        type: String
    },
    wallpaper: {
        type: String
    },
    avatar: {
        type: String
    }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;