const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const messageBoxSchema = new Schema({
    messages: [{
        text: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: ObjectId,
            ref: 'User'
        },
        status: [{
            user: {
                type: ObjectId
            },
            isAsRead: {
                type: Boolean,
                default: false
            }
        }]
    }],
    lastTime: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

messageBoxSchema.methods.updateLastTime = async function () {
    const messageBox = this;

    if (messageBox.messages.length > 0) {
        const [message] = messageBox.messages;

        messageBox.lastTime = message.createdAt;

        await messageBox.save();
    }
};

const MessageBox = mongoose.model('MessageBox', messageBoxSchema);

module.exports = MessageBox;