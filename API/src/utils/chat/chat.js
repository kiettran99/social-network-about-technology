const Chat = require('../../models/chat');
const User = require('../../models/user');
const MessageBox = require('../../models/messagebox');

const ObjectId = require('mongoose').Types.ObjectId;

const LIMIT_MESSAGES = 7;

const getChatList = async (requesterId, limit = LIMIT_MESSAGES) => {
    const chatList = await Chat.aggregate([
        {
            $match: {
                'requester': ObjectId(requesterId),
                'isBlock': false
            }
        },
        {
            $skip: 0
        },
        {
            $limit: limit
        },
        // Get Message Box
        {
            $lookup: {
                from: MessageBox.collection.name,
                localField: 'messageBox',
                foreignField: '_id',
                as: 'messageBox'
            }
        },
        {
            $unwind: '$messageBox'
        },
        // Populate Recipient to get infomation
        {
            $lookup: {
                from: User.collection.name,
                localField: 'recipient',
                foreignField: '_id',
                as: 'recipient'
            }
        },
        {
            $unwind: '$recipient'
        },
        {
            $sort: {
                'messageBox.lastTime': -1
            }
        },
        {
            $project: {
                requester: 1,
                recipient: {
                    _id: 1,
                    fullname: 1,
                    avatar: 1,
                    available: 1
                },
                messageBox: {
                    messages: {
                        "$arrayElemAt": ['$messageBox.messages', 0]
                    },
                    lastTime: 1
                }
            }
        }
    ]);

    return chatList;
}

module.exports = {
    getChatList
};