const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const notificationSchema = Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    followingPosts: [{
        type: ObjectId,
        ref: 'Post'
    }],
    messages: [{
        user: {
            type: ObjectId,
            ref: 'User'
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        text: {
            type: String
        },
        topic: {
            type: String
        },
        topicId: {
            type: String
        },
        status: {
            type: Boolean,
            default: false
        }
    }]
});

const Notifications = mongoose.model('Notification', notificationSchema);

module.exports = Notifications;