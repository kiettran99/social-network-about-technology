import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../../actions/post';
import { withRouter } from 'react-router-dom';

const CommentsBar = ({ likePost, unlikePost,
    auth: { user, isAuthenticated },
    history,
    likes, comments,
    postId
}) => {

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            setIsLiked(likes.filter(like => like.user === user._id).length > 0);
        }
        else {
            setIsLiked(false);
        }
    }, [isAuthenticated, likes]);

    const onLikeHandler = () => {
        if (!isAuthenticated) {
            history.push('/login');
        } else if (isLiked) {
            unlikePost(postId);
        }
        else {
            likePost(postId);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="like-block position-relative d-flex align-items-center">
                <div className="d-flex align-items-center">
                    <div className="like-data">
                        <div className="dropdown">
                            <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                <img src="images/icon/01.png" className="img-fluid" alt=""
                                    onClick={() => onLikeHandler()} />
                            </span>
                            <div className="dropdown-menu">
                                <a className="ml-2 mr-2" data-toggle="tooltip" data-placement="top" title data-original-title="Like"
                                    onClick={() => onLikeHandler()} > <img src="images/icon/01.png" className="img-fluid" alt="" /></a>
                                <a className="mr-2" href="index.html#" data-toggle="tooltip" data-placement="top" title data-original-title="Love"><img src="images/icon/02.png" className="img-fluid" alt="" /></a>
                                <a className="mr-2" href="index.html#" data-toggle="tooltip" data-placement="top" title data-original-title="Happy"><img src="images/icon/03.png" className="img-fluid" alt="" /></a>
                                <a className="mr-2" href="index.html#" data-toggle="tooltip" data-placement="top" title data-original-title="HaHa"><img src="images/icon/04.png" className="img-fluid" alt="" /></a>
                                <a className="mr-2" href="index.html#" data-toggle="tooltip" data-placement="top" title data-original-title="Think"><img src="images/icon/05.png" className="img-fluid" alt="" /></a>
                                <a className="mr-2" href="index.html#" data-toggle="tooltip" data-placement="top" title data-original-title="Sade"><img src="images/icon/06.png" className="img-fluid" alt="" /></a>
                                <a className="mr-2" href="index.html#" data-toggle="tooltip" data-placement="top" title data-original-title="Lovely"><img src="images/icon/07.png" className="img-fluid" alt="" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="total-like-block ml-2 mr-3">
                        <div className="dropdown">
                            <span className={`dropdown-toggle ${isLiked && "text-primary"}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                {likes && likes.length || 0}
                            </span>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="index.html#">Max Emum</a>
                                <a className="dropdown-item" href="index.html#">Bill Yerds</a>
                                <a className="dropdown-item" href="index.html#">Hap E. Birthday</a>
                                <a className="dropdown-item" href="index.html#">Tara Misu</a>
                                <a className="dropdown-item" href="index.html#">Midge Itz</a>
                                <a className="dropdown-item" href="index.html#">Sal Vidge</a>
                                <a className="dropdown-item" href="index.html#">Other</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="total-comment-block">
                    <div className="dropdown">
                        <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                            {comments && comments.length || 0} Comment
                    </span>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="index.html#">Max Emum</a>
                            <a className="dropdown-item" href="index.html#">Bill Yerds</a>
                            <a className="dropdown-item" href="index.html#">Hap E. Birthday</a>
                            <a className="dropdown-item" href="index.html#">Tara Misu</a>
                            <a className="dropdown-item" href="index.html#">Midge Itz</a>
                            <a className="dropdown-item" href="index.html#">Sal Vidge</a>
                            <a className="dropdown-item" href="index.html#">Other</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="share-block d-flex align-items-center feather-icon mr-3">
                <a href=""><i className="ri-share-line" />
                    <span className="ml-1">99 Share</span></a>
            </div>
        </div>
    );
};

CommentsBar.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { likePost, unlikePost })(withRouter(CommentsBar));