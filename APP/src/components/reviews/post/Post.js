import React, { useState } from 'react';
import dayjs from '../../../utils/relativeDate';

const Post = ({ review }) => {

    const [isShowMore, setShowMore] = useState(false);

    return review && (
        <div className="col-lg-8">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height blog blog-detail">
                <div className="iq-card-body">
                    <div className="image-block">
                        <img src={review.wallpaper} className="img-fluid rounded w-100" alt="blog-img" />
                    </div>
                    <div className="blog-description mt-3">
                        <h5 className="mb-3 pb-3 border-bottom">{review.post.text}</h5>
                        <div className="blog-meta d-flex align-items-center mb-3">
                            <div className="date mr-4"><i className="ri-calendar-2-fill text-primary pr-2" />{dayjs(review.createdAt).fromNow()}</div>
                            <div className="like mr-4"><i className="ri-thumb-up-line text-primary pr-2" />{review.post.likes.length} like</div>
                            <div className="comments mr-4"><i className="ri-chat-3-line text-primary pr-2" />{review.post.comments.length} comments</div>
                            <div className="share mr-4"><i className="ri-share-forward-line text-primary pr-2" />Share</div>
                            <div className="iq-card-post-toolbar">
                                <div className="dropdown">
                                    <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                        <i class="ri-more-fill"></i>
                                    </span>
                                    <div className="dropdown-menu m-0 p-0">
                                        <a className="dropdown-item p-3" href="group-detail.html#">
                                            <div className="d-flex align-items-top">
                                                <div className="icon font-size-20"><i className="ri-edit-line" /></div>
                                                <div className="data ml-2">
                                                    <h6>Edit</h6>
                                                    <p className="mb-0">Edit for this review.</p>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item p-3" href="group-detail.html#">
                                            <div className="d-flex align-items-top">
                                                <div className="icon font-size-20"><i className="ri-save-line" /></div>
                                                <div className="data ml-2">
                                                    <h6>Delete</h6>
                                                    <p className="mb-0">Deleting for this review.</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p>{review.descriptions.general}</p>
                        {isShowMore ? (
                            <>
                                <p>{review.descriptions.favorite}</p>
                                <p>{review.descriptions.restrict}</p>
                                <a className="text-primary button"
                                    onClick={() => setShowMore(false)}
                                    tabIndex={-1}>Hide <i className="ri-arrow-up-s-line" /></a>
                            </>
                        ) : (
                                <a className="text-primary button"
                                    onClick={() => setShowMore(true)}
                                    tabIndex={-1}>Read More <i className="ri-arrow-right-s-line" /></a>
                            )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default React.memo(Post);