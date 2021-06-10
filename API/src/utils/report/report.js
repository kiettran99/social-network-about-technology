const Post = require('../../models/post');
const User = require('../../models/user');
const Group = require('../../models/group');

/**
 * @description Check target id has exists in database.
 * @param {string} target
 * @param {string} type 
 */
const isExistsCollection = async (target, type) => {
    try {
        switch (type) {
            case 'Post':
                const post = await Post.findById(target);
                return !!post;
            case 'User':
                const user = await User.findById(target);
                return !!user;
            case 'Group':
                const group = await Group.findById(target);
                return !!group;
            default:
                return false;
        };
    }
    catch (e) {
        console.log(e);
        return false;
    }
};

module.exports = { isExistsCollection };