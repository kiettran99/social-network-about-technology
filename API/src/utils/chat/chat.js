const Chat = require('../../models/chat');
const User = require('../../models/user');
const MessageBox = require('../../models/messagebox');

const ObjectId = require('mongoose').Types.ObjectId;

const getChatList = async (requesterId) => {
    const chatList = await Chat.aggregate([
        {
            $match: {
                'requester': ObjectId(requesterId)
            }
        },
        {
            $skip: 0
        },
        {
            $limit: 5
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
                'messageBox.updatedAt': -1
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
                    }
                }
            }
        }
    ]);

    return chatList;
}

module.exports = {
    getChatList
};