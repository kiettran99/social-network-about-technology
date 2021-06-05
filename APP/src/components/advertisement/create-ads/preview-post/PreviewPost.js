import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import sample from './sample';
import dayjs from '../../../../utils/relativeDate';

const BubbleEditor = lazy(() => import('../../../post/editor/BubbleEditor'));
const DisplayPrivacy = lazy(() => import('../../../post/toolbar/DisplayPrivacy'));
const AttachPost = lazy(() => import('../../../post/AttachPost'));
const CommentsBar = lazy(() => import('../../../post/user-post-sub/CommentsBar'));

const PreviewPost = (props) => {

    //  Get properties from props
    const { post, handleClick, isDisplayTime = false } = props;

    // Get User in redux store
    const user = useSelector((state) => {
        return state.auth.user
    });

    const handleClickHeadlineInfo = (e) => {
        if (handleClick) {
            handleClick(e);
        }
    };

    const renderUserOrPost = (post) => {
        if (post && post.user) {
            return (
                <div className="d-flex flex-wrap">
                    <div className="media-support-user-img mr-3">
                        <img className="avatar-60 rounded-circle" src={post.avatar} alt="" />
                    </div>
                    <div className="media-support-info mt-2">
                        <h5 className="mb-0 d-inline-block"><Link to={`/profile/${post.user}`}>{post.name}&nbsp;</Link></h5>
                        <div className="mb-0">
                            {isDisplayTime ? <span className="text-primary">{dayjs(post.createdAt).fromNow()}</span> :
                                <span className="text-muted">Sponsored</span>}
                            <span> · </span>
                            <DisplayPrivacy privacy={post ? post.privacy : sample.privacy} />
                        </div>
                    </div>
                    <div className="iq-card-post-toolbar">
                        <div className="dropdown">
                            <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                <i className="ri-more-fill" />
                            </span>
                            <div className="dropdown-menu m-0 p-0">
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="d-flex flex-wrap">
                <div className="media-support-user-img mr-3">
                    <img className="avatar-60 rounded-circle" src={user && user.avatar} alt="" />
                </div>
                <div className="media-support-info mt-2">
                    {user && <h5 className="mb-0 d-inline-block"><Link to={`/profile/${user._id}`}>{user.fullname}&nbsp;</Link></h5>}
                    <div className="mb-0">
                        {isDisplayTime ? <span className="text-primary">{dayjs(post.createdAt).fromNow()}</span> :
                            <span className="text-muted">Sponsored</span>}
                        <span> · </span>
                        <DisplayPrivacy privacy={post ? post.privacy : sample.privacy} />
                    </div>
                </div>
                <div className="iq-card-post-toolbar">
                    <div className="dropdown">
                        <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                            <i className="ri-more-fill" />
                        </span>
                        <div className="dropdown-menu m-0 p-0">
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
            <div className="iq-card-body">
                <div className="user-post-data"
                    onClick={handleClickHeadlineInfo}>
                    {renderUserOrPost(post)}
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className="mt-3"
                        onClick={handleClickHeadlineInfo}>
                        <BubbleEditor readOnly={true} text={post ? post.text : sample.text} />
                    </div>
                    <div className="user-post">
                        <AttachPost imageUrls={post ? post.imageUrls : sample.imageUrls} />
                    </div>
                    <div className="comment-area mt-3">
                        {post ? (
                            <CommentsBar postId={post._id} likes={post.likes}
                                lengthOfComments={post.lengthOfComments}
                                share={post.share} isMobileScreen={true} />
                        ) : (
                            <CommentsBar postId={sample._id} likes={sample.likes}
                                lengthOfComments={sample.lengthOfComments}
                                share={sample.share} isMobileScreen={true} />
                        )}
                        <hr />
                    </div>
                </Suspense>
            </div>
        </div >
    );
};

export default PreviewPost;