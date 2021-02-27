import React, { useState, useEffect, lazy, Suspense } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import dayjs from '../../../../utils/relativeDate';
import { removeReplyComment, likeReplyComment, unlikeReplyComment } from '../../../../actions/post';

const BubbleEditor = lazy(() => import('../../../post/editor/BubbleEditor'));

const Reply = ({ reply: { _id, name, text, avatar, date, user: userComment, likes }, postId,
    commentId,
    removeReplyComment, likeReplyComment, unlikeReplyComment, onCommentsForm
}) => {
    const [isLiked, setIsLiked] = useState(false);

    const { user, isAuthenticated } = useSelector(state => state.auth);

    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated) {
            setIsLiked(likes.filter(like => like.user === user._id).length > 0);
        }
        else {
            setIsLiked(false);
        }
    }, [isAuthenticated, likes]);

    const onRemoveComment = () => {
        if (window.confirm('Are you sure? This can NOT be undone !')) {
            removeReplyComment(postId, commentId, _id);
        }
    }

    const onLikeHandler = () => {
        if (!isAuthenticated) {
            history.push('/login');
        } else if (isLiked) {
            unlikeReplyComment(postId, commentId, _id);
        }
        else {
            likeReplyComment(postId, commentId, _id);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className="col-lg-12 pl-5">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height blog">
                <div className="iq-card-body">
                    <div className="d-flex align-items-center">
                        <div className="user-image mb-3">
                            <img className="avatar-80 rounded" src={avatar} alt="#" data-original-title title />
                        </div>
                        <div className="ml-3">
                            <h5><Link to={`/profile/${userComment}`}>{name}</Link></h5>
                            <p>{dayjs(date).fromNow()}</p>
                        </div>
                    </div>
                    <div className="blog-description">
                        <Suspense fallback={<div>Loading...</div>}>
                            <div className="editor-text">
                                <BubbleEditor readOnly={true} text={text} />
                            </div>
                        </Suspense>
                        <div className="d-flex flex-wrap align-items-center comment-activity">
                            <a className={`${isLiked ? 'text-primary' : 'text-muted'}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => onLikeHandler()}>like</a>
                            <a style={{ cursor: "pointer" }}
                                onClick={() => onCommentsForm()}>reply</a>
                            {user && isAuthenticated && user._id === userComment
                                && <a style={{ cursor: "pointer" }} className="text-danger" onClick={() => onRemoveComment()}>Remove</a>}
                            <span> {dayjs(date).fromNow()} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { removeReplyComment, likeReplyComment, unlikeReplyComment })(Reply);