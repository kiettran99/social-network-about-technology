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
    buildParts: {
        type: ObjectId,
        ref: 'BuildPart'
    },
    share: {
        postId: {
            type: ObjectId,
            ref: 'Post'
        },
        users: [{
            type: ObjectId,
            ref: 'User'
        }]
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
    likes: [{
        user: {
            type: ObjectId,
            ref: 'User'
        },
        name: {
            type: String
        },
        emoji: {
            type: Number,
            enums: [
                0,  // Like
                1,  // Heart
                2,  // Happy
                3,  // HaHa
                4,  // Thinking
                5,  // Sad
                6,  // Love  
            ],
            default: 0
        }
    }],
    type: {
        group: {
            type: ObjectId,
            ref: 'Group'
        },
        user: {
            type: ObjectId,
            ref: 'User'
        },
        default: {}
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