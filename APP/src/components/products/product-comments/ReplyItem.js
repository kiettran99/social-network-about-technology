import React, { useMemo, useEffect, useState } from 'react';
// import moment from 'moment';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import { removeReplyComment, likeReplyComment, unlikeReplyComment } from '../../../actions/product';
import { withRouter } from 'react-router-dom';

dayjs.extend(relativeTime);

const ReplyItem = ({ reply: { _id, name, text, date, user: userComment, likes },
    auth: { user, isAuthenticated },
    onCommentsForm,
    productId, commentId, removeReplyComment, history,
    likeReplyComment, unlikeReplyComment }) => {

    const dateRelative = useMemo(() => (
        < p className="d-inline" > {dayjs(date).fromNow()}</p >
    ), [date]);

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
            removeReplyComment(productId, commentId, _id);
        }
    }

    const onLikeHandler = () => {
        if (!isAuthenticated) {
            history.push('/login');
        } else if (isLiked) {
            unlikeReplyComment(productId, commentId, _id);
        }
        else {
            likeReplyComment(productId, commentId, _id);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className="container shadow-sm p-2 mt-2 rounded">
            <div className="row">
                <div className="col-md-0 p-2 ml-3 mt-2">
                    <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png" className="circle rounded" width="35" />
                </div>

                <div className="col-lg-11 col-md-10 col-sm-10 col-12 p-3 rounded">
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

export default connect(mapStateToProps, { removeReplyComment, likeReplyComment, unlikeReplyComment })(withRouter(ReplyItem));