import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import dayjs from '../../../utils/relativeDate';
import { removeComment, likeComment, unlikeComment, addReplyComment } from '../../../actions/post';
import CommentForm from './CommentForm';
import ReplyList from './ReplyList';

const PostComment = ({ comment: { _id, name, text, avatar, date, likes, user: userComment, replies, lengthOfReplies }, postId,
    auth: { user, isAuthenticated }, history,
    removeComment, likeComment, unlikeComment, addReplyComment }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [commentForm, setCommentForm] = useState(false);

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
            removeComment(postId, _id);
        }
    }

    const onCommentsForm = () => {
        if (!commentForm) {
            setCommentForm(true);
        }
    }

    const onLikeHandler = () => {
        if (!isAuthenticated) {
            history.push('/login');
        } else if (isLiked) {
            unlikeComment(postId, _id);
        }
        else {
            likeComment(postId, _id);
        }
        setIsLiked(!isLiked);
    };

    const actionComment = (formData) => {
        addReplyComment(postId, _id, formData);
    };

    return (
        <li className="mb-2">
            <div className="d-flex flex-wrap mb-2">
                <div className="user-img">
                    <img src={avatar} alt="userimg" className="avatar-35 rounded-circle img-fluid m-sm-0 m-2" />
                </div>
                <div className="comment-data-block ml-3">
                    <h6><Link to={`/profile/${userComment}`}>{name}</Link></h6>
                    <p className="mb-0">{text}</p>
                    <div className="d-flex flex-wrap align-items-center comment-activity">
                        <a className={`${isLiked ? 'text-primary' : 'text-muted'}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => onLikeHandler()}>like</a>
                        <a style={{ cursor: "pointer" }}
                            onClick={() => onCommentsForm()}>reply</a>
                        <a href="">translate</a>
                        {user && isAuthenticated && user._id === userComment
                            && <a style={{ cursor: "pointer" }} className="text-danger" onClick={() => onRemoveComment()}>Remove</a>}
                        <span> {dayjs(date).fromNow()} </span>
                    </div>
                </div>
            </div>
            <ReplyList postId={postId} commentId={_id} replies={replies} onCommentsForm={onCommentsForm} lengthOfReplies={lengthOfReplies} />
            {commentForm &&
                <div className="d-flex flex-wrap row">
                    <div className="offset-1 col-11">
                        <CommentForm actionComment={actionComment} />
                    </div>
                </div>}
        </li>
    );
};


const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { removeComment, likeComment, unlikeComment, addReplyComment })(withRouter(PostComment));