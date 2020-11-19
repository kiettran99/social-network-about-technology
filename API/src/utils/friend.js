const Friend = require('../models/friend');
const User = require('../models/user');

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

module.exports = { getUserFriends };