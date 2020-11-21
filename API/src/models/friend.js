const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const friendSchema = Schema({
    requester: {
        type: ObjectId,
        ref: 'User'
    },
    recipient: {
        type: ObjectId,
        ref: 'User'
    },
    status: {
        type: Number,
        enums: [
            0, // add-friends
            1,  //request
            2,  // pending
            3   // friends
        ]
    }
}, {
    timestamps: true
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;