import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

import dayjs from '../../utils/relativeDate';
import DisplayPrivacy from './toolbar/DisplayPrivacy';
import Status from './user-post-sub/previews/Status';

const PartsDescription = lazy(() => import('./parts-list/PartsDescription'));
const DeletePost = lazy(() => import('./user-post-sub/DeletePost'));
const EditPost = lazy(() => import('./user-post-sub/EditPost'));
const Following = lazy(() => import('./user-post-sub/Following'));
const HidePost = lazy(() => import('./user-post-sub/HidePost'));
const ReportPost = lazy(() => import('./user-post-sub/ReportPost'));

const CommentsBar = lazy(() => import('./user-post-sub/CommentsBar'));
const PostComments = lazy(() => import('./user-post-sub/PostComments'));
const CommentForm = lazy(() => import('./user-post-sub/CommentForm'));
const AttachPost = lazy(() => import('./AttachPost'));
const BubbleEditor = lazy(() => import('./editor/BubbleEditor'));
const HashTag = lazy(() => import('./user-post-sub/hash-tag/HashTag'));
const Review = lazy(() => import('./user-post-sub/previews/Review'));

const UserPost = ({ post: { _id, name, text, avatar, imageUrls, likes, type, comments, createdAt, lengthOfComments,
    user: userId, buildParts, share, hashtag, tags, privacy },
    handleClick
}) => {

    const sharedPost = (share) => {
        if (share.postId && share.postId.user) {
            return (
                <div className="container border-left border-right">
                    <Suspense fallback={<div>Loading...</div>}>
                        <div className="user-post w-75 m-auto">
                            <AttachPost imageUrls={share.postId.imageUrls} />
                        </div>
                        <hr />
                        <div className="user-post-data container mt-2">
                            <div className="d-flex flex-wrap">
                                <div className="media-support-user-img mr-3">
                                    <img className="avatar-60 rounded-circle" src={share.postId.avatar} alt="" />
                                </div>
                                <div className="media-support-info mt-2">
                                    <h5 className="mb-0 d-inline-block"><Link to={`/profile/${share.postId.user}`}>{share.postId.name}&nbsp;</Link></h5>
                                    <Status type={share.postId.type} tags={share.postId.tags} share={share.postId.share} />
                                    <div className="mb-0">
                                        <span className="text-primary">{dayjs(share.postId.createdAt).fromNow()}</span>
                                        <span> · </span>
                                        <DisplayPrivacy privacy={share.postId.privacy} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="standalone-container">
                            {share.postId.type && share.postId.type.review ?
                                <Review text={share.postId.text} Component={BubbleEditor}
                                    reviewId={share.postId.type.review} /> : (
                                    <div className="">
                                        <BubbleEditor readOnly={true} text={share.postId.text} />
                                    </div>
                                )}
                        </div>
                    </Suspense>
                    <hr />
                </div>
            )
        }
    };

    const handleClickHeadlineInfo = (e) => {
        if (handleClick) {
            handleClick(e, _id);
        }
    };

    return (
        <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
            <div className="iq-card-body">
                <div className="user-post-data"
                    onClick={handleClickHeadlineInfo}>
                    <div className="d-flex flex-wrap">
                        <div className="media-support-user-img mr-3">
                            <img className="avatar-60 rounded-circle" src={avatar} alt="" />
                        </div>
                        <div className="media-support-info mt-2">
                            <h5 className="mb-0 d-inline-block"><Link to={`/profile/${userId}`}>{name}&nbsp;</Link></h5>
                            <Status type={type} tags={tags} share={share} />
                            <div className="mb-0">
                                <span className="text-primary">{dayjs(createdAt).fromNow()}</span>
                                <span> · </span>
                                <DisplayPrivacy privacy={privacy} />
                            </div>
                        </div>
                        <div className="iq-card-post-toolbar">
                            <div className="dropdown">
                                <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                    <i className="ri-more-fill" />
                                </span>
                                <div className="dropdown-menu m-0 p-0">
                                    {/* <a className="dropdown-item p-3" href="index.html#">
                                        <div className="d-flex align-items-top">
                                            <div className="icon font-size-20"><i className="ri-save-line" /></div>
                                            <div className="data ml-2">
                                                <h6>Save Post</h6>
                                                <p className="mb-0">Add this to your saved items</p>
                                            </div>
                                        </div>
                                    </a> */}
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <HidePost postId={_id} />
                                        <EditPost post={{
                                            postId: _id,
                                            text,
                                            userId,
                                            imageUrls,
                                            buildParts,
                                            type,
                                            hashtag,
                                            tags,
                                            privacy
                                        }} />
                                        <Following postId={_id} />
                                        <ReportPost postId={_id} userId={userId} />
                                        <DeletePost postId={_id} userId={userId} />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    {type && type.review ?
                        <Review text={text} Component={BubbleEditor}
                            reviewId={type.review} /> : (
                            <div className="mt-3"
                                onClick={handleClickHeadlineInfo}>
                                <BubbleEditor readOnly={true} text={text} />
                            </div>
                        )}
                    {buildParts && (
                        <div className="mt-3">
                            {/* Component build pc part */}
                            <PartsDescription buildParts={buildParts} />
                        </div>
                    )}
                    {hashtag && <HashTag hashtag={hashtag} />}
                    <div className="user-post">
                        <AttachPost imageUrls={imageUrls} />
                    </div>
                    {sharedPost(share)}
                    <div className="comment-area mt-3">
                        <CommentsBar postId={_id} likes={likes}
                            lengthOfComments={lengthOfComments}
                            share={share} />
                        <hr />
                        <PostComments postId={_id} comments={comments} lengthOfComments={lengthOfComments} />
                        <CommentForm postId={_id} />
                    </div>
                </Suspense>
            </div>
        </div >
    )
};

export default UserPost;