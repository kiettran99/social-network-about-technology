const Friend = require('../models/friend');
const User = require('../models/user');

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

module.exports = { getAll, getUserFriends, getRequestFriends, getUsersList };