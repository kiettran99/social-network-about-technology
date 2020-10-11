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

module.exports = { notify, createNotification };