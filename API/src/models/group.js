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
            ref: 'user'
        },
        status: {
            type: String,
            default: 'pending'
        }
    }]
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;