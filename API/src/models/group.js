const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const groupSchema = new Schema({
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
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
    isPublic: {
        type: Boolean,
        default: true
    },
    status: {
        type: Number,
        enums: [
            0,  // deleted
            1,  // active
            2   // looked
        ],
        default: 1
    },
    members: [{
        user: {
            type: ObjectId,
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
}, {
    timestamps: true
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;