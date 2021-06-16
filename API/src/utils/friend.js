const Friend = require('../models/friend');
const User = require('../models/user');
const Notification = require('../models/notification');
const { Document } = require('mongoose');
const { registerNotification } = require('./notification');

// Get All User
const getAll = async (userId, limit, skip) => {
    const users = await User.aggregate([
        {
            "$lookup": {
                "from": Friend.collection.name,
                "let": { "friends": "$friends" },
                "pipeline": [
                    {
                        "$match": {
                            "recipient": userId,
                            "$expr": { "$in": ["$_id", "$$friends"] }
                        }
                    },
                    { "$project": { "status": 1 } }
                ],
                "as": "friends"
            }
        },
        {
            "$addFields": {
                "friendsStatus": {
                    "$ifNull": [{ "$min": "$friends.status" }, 0]
                }
            }
        },
        {
            $match: {
                '_id': {
                    $ne: userId
                },
                'role': 'user'
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        },
        {
            $project: {
                fullname: 1,
                email: 1,
                avatar: 1,
                friendsStatus: 1
            }
        }
    ]);

    return users;
};


// Get current User's Friends list
// Status 3 -> friend
const getUserFriends = async (userId, limit, skip) => {
    const users = await User.aggregate([
        {
            "$lookup": {
                "from": Friend.collection.name,
                "let": { "friends": "$friends" },
                "pipeline": [
                    {
                        "$match": {
                            "recipient": userId,
                            "$expr": { "$in": ["$_id", "$$friends"] }
                        }
                    },
                    { "$project": { "status": 1 } }
                ],
                "as": "friends"
            }
        },
        {
            "$addFields": {
                "friendsStatus": {
                    "$ifNull": [{ "$min": "$friends.status" }, 0]
                }
            }
        },
        {
            $match: {
                '_id': {
                    $ne: userId
                },
                'role': 'user',
                friendsStatus: 3
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        },
        {
            $project: {
                fullname: 1,
                email: 1,
                avatar: 1,
                friendsStatus: 1
            }
        }
    ]);

    return users;
};

// Get current User's Friends request
// Status 1 -> confirm
const getRequestFriends = async (userId, limit, skip) => {
    const users = await User.aggregate([
        {
            "$lookup": {
                "from": Friend.collection.name,
                "let": { "friends": "$friends" },
                "pipeline": [
                    {
                        "$match": {
                            "recipient": userId,
                            "$expr": { "$in": ["$_id", "$$friends"] }
                        }
                    },
                    { "$project": { "status": 1 } }
                ],
                "as": "friends"
            }
        },
        {
            "$addFields": {
                "friendsStatus": {
                    "$ifNull": [{ "$min": "$friends.status" }, 0]
                }
            }
        },
        {
            $match: {
                '_id': {
                    $ne: userId
                },
                'role': 'user',
                friendsStatus: 1
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        },
        {
            $project: {
                fullname: 1,
                email: 1,
                avatar: 1,
                friendsStatus: 1
            }
        }
    ]);

    return users;
};

// Get current not User's Friends request
// Status 0, 1 -> confirm
const getUsersList = async (userId, limit, skip) => {
    const users = await User.aggregate([
        {
            "$lookup": {
                "from": Friend.collection.name,
                "let": { "friends": "$friends" },
                "pipeline": [
                    {
                        "$match": {
                            "recipient": userId,
                            "$expr": { "$in": ["$_id", "$$friends"] }
                        }
                    },
                    { "$project": { "status": 1 } }
                ],
                "as": "friends"
            }
        },
        {
            "$addFields": {
                "friendsStatus": {
                    "$ifNull": [{ "$min": "$friends.status" }, 0]
                }
            }
        },
        {
            $match: {
                '_id': {
                    $ne: userId
                },
                'role': 'user',
                $or: [{
                    friendsStatus: 0
                },
                {
                    friendsStatus: 2
                }]
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        },
        {
            $project: {
                fullname: 1,
                email: 1,
                avatar: 1,
                friendsStatus: 1
            }
        }
    ]);

    return users;
};

/**
 * @desc Following both of together when user accept friend.
 * @param {Document} user 
 * @param {String} friendId 
 */
const followingFriends = async (user, friendId) => {
    try {
        // 1. User has found, so countinuely finds friend.
        const friend = await User.findById(friendId);

        if (!friend) {
            console.log('friend is not found !');
            return;
        }

        // 2. Promise all to following together.
        await Promise.all([
            registerNotification(user, friend, 'FRIEND'),
            registerNotification(friend, user, 'FRIEND')
        ]);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    getAll, getUserFriends,
    getRequestFriends, getUsersList,
    followingFriends
};