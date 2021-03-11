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
 *          following: 'followingPosts'
 *       });
 */
const notify = async (message, options = {
    user, collection, topic, following
}) => {

    const { user, collection, topic, following } = options;

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
        pusher.trigger(channel, 'notification', {
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


module.exports = {
    notify,
    createNotification,
    registerNotification, unregisterNotification,
    registerNotifications,
};