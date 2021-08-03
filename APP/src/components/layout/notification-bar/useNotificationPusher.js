import { useEffect } from 'react';
import pusher from '../../../utils/pusher/pusher';

const useNotificationPusher = (isAuthenticated, notification, loadNotification) => {
    useEffect(() => {
        if (isAuthenticated && notification) {

            const updateEvents = (data) => {
                const { user, topicId } = data;

                const { followingPosts, user: userId } = notification;

                if (user && topicId && user !== userId && followingPosts.includes(topicId)) {
                    //console.log('loading notification ...');
                    loadNotification();
                }
            };

            const mentionsEvent = (data) => {
                const { user, topicId, recipients } = data;

                const { user: userId } = notification;

                if (user && topicId && recipients.includes(userId)) {
                    //console.log('loading notification ...');
                    loadNotification();
                }
            }

            const subscribeGroupEvent = (data) => {
                const { user, topicId } = data;

                const { notificationGroups, user: userId } = notification;

                if (user && topicId && user !== userId && notificationGroups.includes(topicId)) {
                    //console.log('loading notification ...');
                    loadNotification();
                }
            }

            const channel = pusher.subscribe('app_notifications');

            channel.bind('notification', updateEvents);
            channel.bind('mentions', mentionsEvent);
            channel.bind('notification-group', subscribeGroupEvent);

            channel.bind('notification-system', (data) => {
                const { user, topicId } = data;

                const { user: userId } = notification;

                if (user && topicId && user === userId) {
                    loadNotification();
                }
            });

            return () => {
                channel.unbind();
                pusher.unsubscribe(channel);
            };
        }
    }, [isAuthenticated, notification]);
};

export default useNotificationPusher;