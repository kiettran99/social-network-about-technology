import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from '../../utils/relativeDate';

const Review = ({ review: { _id, wallpaper, post, createdAt, descriptions } }) => {
    return (
        <div className="col-lg-12">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height blog-list">
                <div className="iq-card-body">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="image-block">
                                <img src={wallpaper} className="img-fluid rounded w-100" alt="blog-img" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="blog-description p-2">
                                <div className="blog-meta d-flex align-items-center justify-content-between mb-2">
                                    <div className="date"><a href="blog-list.html#" tabIndex={-1}>{dayjs(createdAt).fromNow()}</a>
                                    </div>
                                </div>
                                <h5 className="mb-2">{post.text}</h5>
                                <p>{descriptions.general}</p> <Link to={`/reviews/${_id}`} tabIndex={-1}>Read More <i className="ri-arrow-right-s-line" /></Link>
                                <div className="group-smile mt-4 d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="iq-media-group">
                                        <a href="blog-list.html#" className="iq-media">
                                            <img className="img-fluid rounded-circle" src="images/icon/01.png" alt="" />
                                        </a>
                                        <a href="blog-list.html#" className="iq-media">
                                            <img className="img-fluid rounded-circle" src="images/icon/02.png" alt="" />
                                        </a>
                                        <a href="blog-list.html#" className="iq-media">
                                            <img className="img-fluid rounded-circle" src="images/icon/03.png" alt="" />
                                        </a>
                                        <a href="blog-list.html#" className="iq-media">
                                            <img className="img-fluid rounded-circle" src="images/icon/07.png" alt="" />
                                        </a>
                                    </div>
                                    <div className="comment"><i className="ri-chat-3-line mr-2" />{post && post.lengthOfComments} comments</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;