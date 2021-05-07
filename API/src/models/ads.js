const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const adsSchema = new Schema({
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    },
    post: {
        type: ObjectId,
        ref: 'Post'
    },
    audience: {
        gender: {
            type: String
        },
        age: {
            from: {
                type: Number
            },
            to: {
                type: Number
            }
        }
    },
    status: {
        type: Number,
        enum: [
            0,  // Pause
            1,  // Active
            2   // In-progress
        ],
        default: 2
    },
    activities: [{
        user: {
            type: ObjectId
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const Ads = mongoose.model('Ads', adsSchema);

module.exports = Ads;