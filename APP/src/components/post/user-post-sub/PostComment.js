import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import dayjs from '../../../utils/relativeDate';
import { removeComment, likeComment, unlikeComment, addReplyComment } from '../../../actions/post';
import CommentForm from './CommentForm';

const PostComment = ({ comment: { _id, name, text, date, likes, user: userComment, replies }, postId,
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
            <div className="d-flex flex-wrap">
                <div className="user-img">
                    <img src="images/user/02.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                </div>
                <div className="comment-data-block ml-3">
                    <h6>{name}</h6>
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
            { commentForm && <CommentForm />}
        </li>
    );
};


const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { removeComment, likeComment, unlikeComment, addReplyComment })(withRouter(PostComment));