import React from 'react';
import PostComment from './user-post-sub/PostComment';
import dayjs from '../../utils/relativeDate';
import CommentsBar from './user-post-sub/CommentsBar';
import PostComments from './user-post-sub/PostComments';

const UserPost = ({ post: { _id, name, text, avatar, imageUrl, likes, group, comments, createdAt } }) => {
    return (
        <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
            <div className="iq-card-body">
                <div className="user-post-data">
                    <div className="d-flex flex-wrap">
                        <div className="media-support-user-img mr-3">
                            <img className="rounded-circle img-fluid" src="images/user/01.jpg" alt="" />
                        </div>
                        <div className="media-support-info mt-2">
                            <h5 className="mb-0 d-inline-block"><a href="index.html#">{name}&nbsp;</a></h5>
                            <p className="mb-0 d-inline-block">Add New Post</p>
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
                                    <a className="dropdown-item p-3" href="index.html#">
                                        <div className="d-flex align-items-top">
                                            <div className="icon font-size-20"><i className="ri-notification-line" /></div>
                                            <div className="data ml-2">
                                                <h6>Notifications</h6>
                                                <p className="mb-0">Turn on notifications for this post</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <p>{text}</p>
                </div>
                <div className="user-post">
                    <div className="d-flex">
                        <div className="col-md-6">
                            <a href=""><img src="images/page-img/p2.jpg" alt="post-image" className="img-fluid rounded w-100" /></a>
                        </div>
                        <div className="col-md-6 row m-0 p-0">
                            <div className="col-sm-12">
                                <a href=""><img src="images/page-img/p1.jpg" alt="post-image" className="img-fluid rounded w-100" /></a>
                            </div>
                            <div className="col-sm-12 mt-3">
                                <a href=""><img src="images/page-img/p3.jpg" alt="post-image" className="img-fluid rounded w-100" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comment-area mt-3">
                    <CommentsBar postId={_id} likes={likes} comments={comments} />
                    <hr />
                    <PostComments postId={_id} comments={comments}/>
                    <form className="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
                        <input type="text" className="form-control rounded" />
                        <div className="comment-attagement d-flex">
                            <a href=""><i className="ri-link mr-3" /></a>
                            <a href=""><i className="ri-user-smile-line mr-3" /></a>
                            <a href=""><i className="ri-camera-line mr-3" /></a>
                            <a href=""><i class="ri-send-plane-fill mr-3 text-primary"></i></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default UserPost;