import React from 'react';
import { Link } from 'react-router-dom';

import dayjs from '../../utils/relativeDate';
import CommentsBar from './user-post-sub/CommentsBar';
import PostComments from './user-post-sub/PostComments';
import CommentForm from './user-post-sub/CommentForm';
import Following from './user-post-sub/Following';
import AttachPost from './AttachPost';

import BubbleEditor from './editor/BubbleEditor';

const UserPost = ({ post: { _id, name, text, avatar, imageUrls, likes, type, comments, createdAt, lengthOfComments, user: userId } }) => {
    return (
        <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
            <div className="iq-card-body">
                <div className="user-post-data">
                    <div className="d-flex flex-wrap">
                        <div className="media-support-user-img mr-3">
                            <img className="avatar-60 rounded-circle" src={avatar} alt="" />
                        </div>
                        <div className="media-support-info mt-2">
                            <h5 className="mb-0 d-inline-block"><Link to={`/profile/${userId}`}>{name}&nbsp;</Link></h5>
                            {type && type.group ? <p className="mb-0 d-inline-block"> <i className="fas fa-caret-right">&nbsp;</i><Link className='text-dark' to={`/groups/${type.group._id}`}>&nbsp;{type.group.name}</Link></p>
                                : <p className="mb-0 d-inline-block">Add New Post</p>}
                            <p className="mb-0 text-primary">{dayjs(createdAt).fromNow()}</p>
                        </div>
                        <div className="iq-card-post-toolbar">
                            <div className="dropdown">
                                <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                    <i className="ri-more-fill" />
                                </span>
                                <div className="dropdown-menu m-0 p-0">
                                    <a className="dropdown-item p-3" href="index.html#">
                                        <div className="d-flex align-items-top">
                                            <div className="icon font-size-20"><i className="ri-save-line" /></div>
                                            <div className="data ml-2">
                                                <h6>Save Post</h6>
                                                <p className="mb-0">Add this to your saved items</p>
                                            </div>
                                        </div>
                                    </a>
                                    <a className="dropdown-item p-3" href="index.html#">
                                        <div className="d-flex align-items-top">
                                            <div className="icon font-size-20"><i className="ri-close-circle-line" /></div>
                                            <div className="data ml-2">
                                                <h6>Hide Post</h6>
                                                <p className="mb-0">See fewer posts like this.</p>
                                            </div>
                                        </div>
                                    </a>
                                    <a className="dropdown-item p-3" href="index.html#">
                                        <div className="d-flex align-items-top">
                                            <div className="icon font-size-20"><i className="ri-user-unfollow-line" /></div>
                                            <div className="data ml-2">
                                                <h6>Unfollow User</h6>
                                                <p className="mb-0">Stop seeing posts but stay friends.</p>
                                            </div>
                                        </div>
                                    </a>
                                    <Following postId={_id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <BubbleEditor readOnly={true} text={text} />
                </div>
                <div className="user-post">
                    <AttachPost imageUrls={imageUrls} />
                </div>
                <div className="comment-area mt-3">
                    <CommentsBar postId={_id} likes={likes} lengthOfComments={lengthOfComments} />
                    <hr />
                    <PostComments postId={_id} comments={comments} lengthOfComments={lengthOfComments} />
                    <CommentForm postId={_id} />
                </div>
            </div>
        </div >
    )
};

export default UserPost;