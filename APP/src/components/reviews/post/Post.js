import React, { useState, lazy, Suspense } from 'react';
import dayjs from '../../../utils/relativeDate';
import Bar from './bar/Bar';

const AttachPost = lazy(() => import('../../post/AttachPost'));
const ParseHtml = lazy(() => import('../../shared/ParseHtml'));

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
                        <h4 className="mb-3 pb-3 border-bottom">{review.post.text}</h4>
                        <Bar createdAt={dayjs(review.createdAt).fromNow()} postId={review.post._id} />

                        <h5 className="font-italic pb-3">General description</h5>
                        <div className="form-group review-detail-general">
                            <Suspense fallback={<div></div>}>
                                <ParseHtml text={review.descriptions.general} />
                            </Suspense>
                        </div>
                        {isShowMore ? (
                            <>
                                <div className="my-4">
                                    <Suspense fallback={<div></div>}>
                                        <AttachPost imageUrls={review.post.imageUrls} />
                                    </Suspense>
                                </div>

                                {review?.isReview && (
                                    <div>
                                        <h5 className="font-italic pb-3">Things I like</h5>
                                        <p style={{ whiteSpace: 'pre-wrap' }}>{review.descriptions.favorite}</p>

                                        <h5 className="font-italic pb-3">Things I don't like</h5>
                                        <p style={{ whiteSpace: 'pre-wrap' }}>{review.descriptions.restrict}</p>

                                        <h5 className="font-italic pb-3">Link</h5>
                                        <p><a href={review.link} target="_blank">{review.link}</a></p>
                                    </div>
                                )}


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