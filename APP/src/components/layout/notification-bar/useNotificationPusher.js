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

            const channel = pusher.subscribe('app_notifications');

            channel.bind('notification', updateEvents);

            return () => {
                channel.unbind();
                pusher.unsubscribe(channel);
            };
        }
    }, [isAuthenticated, notification]);
};

export default useNotificationPusher;