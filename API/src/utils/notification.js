const { Document } = require('mongoose');
const Notification = require('../models/notification');
const { channel, pusher } = require('./pusher/pusher');

/**
 * @desc Notifying message to Notification's user is following.
 * @param message Message text alerts on UI.
 * @param options Infomation user interacted collection.
 * @example 
 *    const message = `${req.user.name} have just comment on ${product.name}`;
 *    notify(message, {
 *           user: req.user,
 *           collection: product,
 *           topic: 'products',
 *           following: 'followingPosts',
 *           event: 'notification'
 *       });
 */
const notify = async (message, options = {
    user, collection, topic, following, event: 'notification'
}) => {

    const { user, collection, topic, following, event } = options;

    try {
        await Notification.updateMany({
            [following]: collection.id,
            user: { $nin: user._id }
        }, {
            $push: {
                messages: {
                    $each: [{
                        text: message,
                        user: user.id,
                        name: user.name,
                        topic,
                        topicId: collection.id
                    }],
                    $position: 0
                }
            }
        });

        // Puhser notification to client referesh notifcation.
        pusher.trigger(channel, event, {
            user: user.id,
            topic,
            topicId: collection.id,
            triggeredAt: Date.now()
        });
    }
    catch (e) {
        console.log(e);
    }
};

const createNotification = async (user) => {
    try {
        const notification = await Notification.findOne({ user: user._id });

        if (!notification) {
            await Notification.create({
                user: user._id
            });
        }
    }
    catch (e) {
        console.log(e);
    }
}

/**
 * @desc Register following from model (posts, groups, ...)
 * @param model Document type of model
 * @param type Type of Following ('GROUP', 'FRIEND', 'POST')
 * @example
 * registerNotification(req.user, updatedGroup, 'GROUP');
 */
const registerNotification = async (user, model, type) => {
    const typeModel = typeOfModel(type);

    const notification = await Notification.findOne({
        user: user._id,
        [typeModel]: { $nin: model._id }
    });

    if (notification) {
        notification[typeModel].push(model._id);
        await notification.save();
    }
}

/**
 * @desc Unregister following from model (posts, groups, ...)
 * @param model Document type of model
 * @param type Type of Following ('GROUP', 'FRIEND', 'POST')
 * @example
 * unregisterNotification(req.user, updatedGroup, 'GROUP');
 */
const unregisterNotification = async (user, model, type) => {
    const typeModel = typeOfModel(type);

    const notification = await Notification.findOne({
        user: user._id,
        [typeModel]: model._id
    });

    if (notification) {
        notification[typeModel].pull(model._id);
        await notification.save();
    }
}

const registerNotifications = async (user, models, type) => {
    const modelsId = models.map(model => model._id);
    const typeModel = typeOfModel(type);

    const notification = await Notification.findOne({
        user: user._id,
        [typeModel]: { $nin: modelsId }
    });

    if (notification) {
        notification[typeModel].push(modelsId);
        await notification.save();
    }
}

const typeOfModel = (type) => {
    switch (type) {
        case 'GROUP':
            return 'followingGroups';
        case 'FRIEND':
            return 'followingFriends';
        case 'POST':
        default:
            return 'followingPosts';
    }
}

/**
 * @description Push Notification from user has mentioned yet.
 * @param {Document<any>} user - Current user has mentioned.
 * @param {Document<any>} post - Post user has mentioned.
 * @param {Array} usersFromMention - Array has basic infomation of user.
 * @example
 * const usersFromMention = [{
 *  id: 'mongodb_id',
 *  name: 'document_fullname',
 *  link: 'document_link_client'
 *  avatar: 'document_avatar'
 * }];
 * pushNotificationMentions(usersFromMention);
 */
const pushNotificationMentions = async (user, post, usersFromMention) => {
    try {
        // 0. Check array is not empty
        if (!usersFromMention || usersFromMention.length < 0) return;

        // 1. Async loop array
        const message = `${user.fullname} mentioned you in post.`;
        const mentions = usersFromMention.map(mention => mention.id);

        await notifyToUsers(message, mentions, {
            user,
            collection: post,
            topic: 'posts',
            following: 'followingPosts'
        });

    }
    catch (e) {
        console.log(e);
    }
}

/**
 * @desc (Update from notify) Notifying message to Notification's users is following.
 * @param {String} message Message text alerts on UI.
 * @param {Array<String>} recipients
 * @param {Object} options Infomation user interacted collection.
 * @example 
 *    const message = `${req.user.name} have just comment on ${product.name}`;
 *    notify(message, recipients, {
 *           user: req.user.id,
 *           collection: product,
 *           topic: 'products',
 *          following: 'followingPosts'
 *       });
 */
const notifyToUsers = async (message, recipients, options = {
    user, collection, topic, following
}) => {

    const { user, collection, topic } = options;

    try {
        await Notification.updateMany({
            user: { $in: recipients }
        }, {
            $push: {
                messages: {
                    $each: [{
                        text: message,
                        user: user.id,
                        name: user.name,
                        topic,
                        topicId: collection.id
                    }],
                    $position: 0
                }
            }
        });

        // Puhser notification to client referesh notifcation.
        pusher.trigger(channel, 'mentions', {
            recipients,
            user: user.id,
            topic,
            topicId: collection.id,
            triggeredAt: Date.now()
        });
    }
    catch (e) {
        console.log(e);
    }
};

/**
 * @desc (Update from notify) Notifying message to Notification's user is following.
 * @param message Message text alerts on UI.
 * @param options Infomation user interacted collection.
 * @example 
 *    const message = `${req.user.name} have just comment on ${product.name}`;
 *    notify(message, {
 *           user: req.user.id,
 *           collection: product,
 *           topic: 'products',
 *          following: 'followingPosts'
 *       });
 */
const notifyToUser = async (message, recipient, options = {
    user, collection, topic, following
}) => {

    const { user, collection, topic } = options;

    try {
        await Notification.updateMany({
            user: recipient
        }, {
            $push: {
                messages: {
                    $each: [{
                        text: message,
                        user: user.id,
                        name: user.name,
                        topic,
                        topicId: collection.id
                    }],
                    $position: 0
                }
            }
        });

        // Puhser notification to client referesh notifcation.
        pusher.trigger(channel, 'mention', {
            user: user.id,
            topic,
            topicId: collection.id,
            triggeredAt: Date.now()
        });
    }
    catch (e) {
        console.log(e);
    }
};

module.exports = {
    notify,
    createNotification,
    registerNotification, unregisterNotification,
    registerNotifications,
    pushNotificationMentions
};