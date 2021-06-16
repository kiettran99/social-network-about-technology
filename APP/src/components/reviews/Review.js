import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import dayjs from '../../utils/relativeDate';

const ParseHtml = lazy(() => import('../shared/ParseHtml'));
const LazyLoadingImage = lazy(() => import('../post/lazy-loading-image/LazyLoadingImage'));

const Review = ({ review: { _id, wallpaper, post, createdAt, descriptions } }) => {
    return (
        <div className="col-lg-12">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height blog-list">
                <div className="iq-card-body">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="image-block">
                                <LazyLoadingImage src={wallpaper} className="img-fluid rounded w-100" alt="blog-img" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="blog-description p-2">

                                <div className="blog-meta d-flex align-items-center justify-content-between mb-2">
                                    <div className="date">
                                        <span className="text-primary" tabIndex={-1}>{dayjs(createdAt).fromNow()}</span>
                                    </div>
                                </div>
                                <h5 className="mb-2">{post.text}</h5>
                                <div className="form-group">
                                    <Suspense fallback={<div></div>}>
                                        <ParseHtml text={descriptions.general} shouldTruncate={true} />
                                    </Suspense>
                                </div>
                                <Link to={`/reviews/${_id}`} tabIndex={-1}>Read More <i className="ri-arrow-right-s-line" /></Link>
                                <div className="group-smile mt-4 d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-wrap mb-2 float-right">
                                        <div className="mr-2">
                                            <img className="avatar-30 rounded-circle" src={post.avatar} alt="" />
                                        </div>
                                        <div className="mt-1">
                                            <h6 className="mb-0 d-inline-block"><Link to={`/profile/${post.user}`}>{post.name}&nbsp;</Link></h6>
                                        </div>
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