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
    },
    members: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            default: 'member'
        }
    }],
    lengthOfMembers: {
        type: Number,
        default: 0
    }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;