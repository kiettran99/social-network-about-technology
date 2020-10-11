const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const postSchema = Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    avatar: {
        type: String
    },
    imageUrl: {
        type: String
    },
    likes: [{
        user: {
            type: ObjectId,
            ref: 'User'
        }
    }],
    comments: [{
        user: {
            type: ObjectId,
            ref: 'User'
        },
        text: {
            type: String
        },
        name: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        likes: [{
            user: {
                type: ObjectId,
                ref: 'User'
            }
        }],
        replies: [{
            user: {
                type: ObjectId,
                ref: 'User'
            },
            text: {
                type: String
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
            likes: [{
                user: {
                    type: ObjectId,
                    ref: 'User'
                }
            }],

        }]
    }]
}, {
    timeStamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;