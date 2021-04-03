const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const chatSchema = new Schema({
    requester: {
        type: ObjectId,
        ref: 'User'
    },
    recipient: {
        type: ObjectId,
        ref: 'User'
    },
    messageBox: {
        type: ObjectId,
        ref: 'MessageBox'
    }
}, {
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;