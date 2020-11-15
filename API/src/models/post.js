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
    imageUrls: [{
        type: String
    }],
    likes: [{
        user: {
            type: ObjectId,
            ref: 'User'
        },
        name: {
            type: String
        },
        emoji: {
            type: Number
        }
    }],
    group: {
        type: ObjectId,
        ref: 'Group'
    },
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
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        lengthOfReplies: {
            type: Number,
            default: 0
        },
        likes: [{
            user: {
                type: ObjectId,
                ref: 'User'
            },
            name: {
                type: String
            },
            emoji: {
                type: Number
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
            avatar: {
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
                },
                name: {
                    type: String
                },
                emoji: {
                    type: Number
                }
            }]
        }]
    }],
    lengthOfComments: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;