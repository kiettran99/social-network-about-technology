import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { getFriendStatus, acceptFriend, requestFriend, unAcceptFriend } from './services';

const DialogBox = React.lazy(() => import('../DialogBox'));
const ReportUser = React.lazy(() => import('../report/ReportUser'));

const FriendStatus = ({ match }) => {

    // State
    const [friend, setFriend] = useState(null);
    const [isActive, setActive] = useState(true);
    const [modalIsOpen, setIsOpen] = useState(false);

    const { isAuthenticated } = useSelector((state) => {
        return state.auth;
    });

    useEffect(() => {
        if (isAuthenticated && isActive && match) {
            getFriendStatus(match.params?.id).then((data) => {
                setFriend(data);
            });
        }
    }, [isAuthenticated]);

    useEffect(() => {
        return () => {
            setActive(false);
        }
    })

    // Function

    const onAddFriend = () => {
        requestFriend(match.params?.id).then(() => {
            setFriend(state => ({
                ...state,
                status: 1
            }));
        });
    };

    const onAcceptFriend = () => {
        acceptFriend(match.params?.id).then(() => {

            setFriend(state => ({
                ...state,
                status: 3
            }))

        });
    };

    const onUnAcceptFriend = () => {
        unAcceptFriend(match.params?.id).then(() => {

            setFriend(state => ({
                ...state,
                status: 0
            }));

        });
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const getStatus = useMemo(() => {
        const friendsStatus = friend?.status;

        switch (friendsStatus) {
            case 1:
                return (
                    <button className="dropdown-item btn text-primary my-2"
                        onClick={onUnAcceptFriend}>
                        <i className="ri-user-unfollow-line icon-18"></i> Delete Request
                    </button>
                );
            case 2:
                return (
                    <>
                        <button className="dropdown-item btn text-primary my-2"
                            onClick={onAcceptFriend}>Confirm</button>
                        <button className="dropdown-item btn text-primary my-2"
                            onClick={onUnAcceptFriend} >Delete Request</button>
                    </>
                );
            case 3:
                return (
                    <button className="dropdown-item btn text-primary my-2"
                        onClick={onUnAcceptFriend}>
                        <i className="ri-user-unfollow-line icon-18"></i> Unfriend
                    </button>
                )
            default:
                return (
                    <button className="dropdown-item btn text-primary my-2"
                        onClick={onAddFriend}>
                        <i className="ri-user-add-line icon-18"></i> Add Friend
                    </button>
                );
        }
    }, [friend]);

    return (
        <a>
            <div className="iq-card-post-toolbar">
                <div className="dropdown">
                    <span className="dropdown-toggle pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                        <i className="ri-user-add-line icon-18 text-muted"></i>
                    </span>
                    <div className="dropdown-menu m-0 p-0 shadow-sm">
                        {isAuthenticated && getStatus}
                        <button className="dropdown-item btn text-danger my-2"
                            onClick={() => openModal()}>
                            <i className="ri-error-warning-line icon-18"></i> Report
                        </button>
                    </div>
                </div>
            </div>
            <React.Suspense fallback={<div></div>}>
                <DialogBox props={{ modalIsOpen, closeModal, openModal, userId: match.params?.id }} Component={ReportUser} />
            </React.Suspense>
        </a>
    );
};

export default React.memo(FriendStatus);