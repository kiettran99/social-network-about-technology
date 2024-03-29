import React, { useState, useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import dayjs from '../../../utils/relativeDate';
import { removeReplyComment, likeReplyComment, unlikeReplyComment } from '../../../actions/post';

const BubbleEditor = lazy(() => import('../editor/BubbleEditor'));

const ReplyItem = ({ reply: { _id, name, text, avatar, date, user: userComment, likes }, postId,
    commentId,
    auth: { user, isAuthenticated }, history,
    removeReplyComment, likeReplyComment, unlikeReplyComment,
    onCommentsForm }) => {

    const [isLiked, setIsLiked] = useState(false);

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
        <div className="mb-2">
            <div className="media">
                <div className="user-img">
                    <img src={avatar} alt="userimg" className="avatar-35 rounded-circle img-fluid m-sm-0 m-2" />
                </div>
                <div className="media-body comment-data-block ml-sm-3">
                    <h6 className="mt-1">{name}</h6>
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
                        {/* <a href="">translate</a> */}
                        {user && isAuthenticated && user._id === userComment
                            && <a style={{ cursor: "pointer" }} className="text-danger" onClick={() => onRemoveComment()}>Remove</a>}
                        <span> {dayjs(date).fromNow()} </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { removeReplyComment, likeReplyComment, unlikeReplyComment })(withRouter(ReplyItem));