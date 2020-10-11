import React, { useMemo, useEffect, useState } from 'react';
// import moment from 'moment';
import { connect } from 'react-redux';
import { removeComment, likeComment, unlikeComment, addReplyComment } from '../../../actions/product';
import { withRouter } from 'react-router-dom';
import CommentsForm from '../product-forms/CommentsForm';
import RepliesList from './RepliesList';
import dayjs from '../../../utils/relativeDate';

const CommentItem = ({ comment: { _id, name, text, date, user: userComment, likes, replies },
    auth: { user, isAuthenticated },
    productId, removeComment, history,
    likeComment, unlikeComment, addReplyComment }) => {

    const dateRelative = useMemo(() => (
        < p className="d-inline" > {dayjs(date).fromNow()}</p >
    ), [date]);

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
            removeComment(productId, _id);
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
            unlikeComment(productId, _id);
        }
        else {
            likeComment(productId, _id);
        }
        setIsLiked(!isLiked);
    };

    const actionComment = (formData) => {
        addReplyComment(productId, _id, formData);
    };

    return (
        <div className="container shadow-sm p-2 mt-2 rounded">
            <div className="row">
                <div className="col-md-0 p-md-2 ml-3 mt-2">
                    <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png" className="circle rounded" width="35" />
                </div>

                <div className="col-lg-11 col-md-10 col-sm-10 col-10 p-3 rounded">
                    <div>
                        {likes && likes.length > 0 &&
                            <p className="float-right mt-5 bg-light shadow-sm rounded text-muted">
                                {likes.length}&nbsp;<i className="fas fa-thumbs-up text-primary"></i>
                            </p>
                        }

                        <div className="bg-light p-2">
                            <p className="m-0 ml-3">{name}</p>
                            <p className="text-muted ml-3" style={{ whiteSpace: "pre-wrap" }}>{text}</p>
                        </div>

                        <div className="rounded text-muted mt-1">
                            {dateRelative}
                            <p className={`btn d-inline ml-3 ${isLiked ? 'text-primary' : 'text-muted'}`}
                                onClick={() => onLikeHandler()}>Like</p>
                            <p className="btn d-inline ml-2 text-muted"
                                onClick={() => onCommentsForm()}>
                                Reply</p>
                            {user && isAuthenticated && user._id === userComment
                                && <p className="btn d-inline ml-3 text-danger"
                                    onClick={() => onRemoveComment()}>Remove</p>}
                        </div>
                    </div>
                    <RepliesList productId={productId} commentId={_id} replies={replies} onCommentsForm={onCommentsForm} />
                    {commentForm && <CommentsForm actionComment={actionComment} />}
                </div>
                <div>

                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { removeComment, likeComment, unlikeComment, addReplyComment })(withRouter(CommentItem));