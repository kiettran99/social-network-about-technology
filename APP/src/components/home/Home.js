import React from 'react';
import CreatePost from '../post/CreatePost';
import UserPost from '../post/UserPost';
import Stories from './Stories';
import Events from './Events';
import UpcomingBirthday from './UpcomingBirthday';
import SuggestedPages from './SuggestedPages';

const Home = () => {
  return (
    <div id="content-page" className="content-page" >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 row m-0 p-0">
            <div className="col-sm-12">
              <CreatePost />
            </div>
            <div className="col-sm-12">
              <UserPost />
            </div>
            <div className="col-sm-12">
              <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                  <div className="user-post-data">
                    <div className="d-flex flex-wrap">
                      <div className="media-support-user-img mr-3">
                        <img className="rounded-circle img-fluid" src="images/user/03.jpg" alt="" />
                      </div>
                      <div className="media-support-info mt-2">
                        <h5 className="mb-0 d-inline-block"><a href="index.html#" className>Barb Ackue</a></h5>
                        <p className="mb-0 d-inline-block">Added New Image in a Post</p>
                        <p className="mb-0 text-primary">1 hour ago</p>
                      </div>
                      <div className="iq-card-post-toolbar">
                        <div className="dropdown">
                          <span className="dropdown-toggle" id="postdata-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                            <i className="ri-more-fill" />
                          </span>
                          <div className="dropdown-menu m-0 p-0" aria-labelledby="postdata-5">
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                  </div>
                  <div className="user-post">
                    <a href="javascript:void();"><img src="images/page-img/p4.jpg" alt="post-image" className="img-fluid rounded w-100" /></a>
                  </div>
                  <div className="comment-area mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="like-block position-relative d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="like-data">
                            <div className="dropdown">
                              <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                <img src="images/icon/01.png" className="img-fluid" alt="" />
                              </span>
                              <div className="dropdown-menu">
                                <a className="ml-2 mr-2" href="index.html#" data-toggle="tooltip" data-placement="top" title data-original-title="Like"><img src="images/icon/01.png" className="img-fluid" alt="" /></a>
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
                              <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                140 Likes
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
                              20 Comment
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
                        <a href="javascript:void();"><i className="ri-share-line" />
                          <span className="ml-1">99 Share</span></a>
                      </div>
                    </div>
                    <hr />
                    <ul className="post-comments p-0 m-0">
                      <li className="mb-2">
                        <div className="d-flex flex-wrap">
                          <div className="user-img">
                            <img src="images/user/02.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                          </div>
                          <div className="comment-data-block ml-3">
                            <h6>Monty Carlo</h6>
                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                            <div className="d-flex flex-wrap align-items-center comment-activity">
                              <a href="javascript:void();">like</a>
                              <a href="javascript:void();">reply</a>
                              <a href="javascript:void();">translate</a>
                              <span> 5 min </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex flex-wrap">
                          <div className="user-img">
                            <img src="images/user/03.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                          </div>
                          <div className="comment-data-block ml-3">
                            <h6>Paul Molive</h6>
                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                            <div className="d-flex flex-wrap align-items-center comment-activity">
                              <a href="javascript:void();">like</a>
                              <a href="javascript:void();">reply</a>
                              <a href="javascript:void();">translate</a>
                              <span> 5 min </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <form className="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
                      <input type="text" className="form-control rounded" />
                      <div className="comment-attagement d-flex">
                        <a href="javascript:void();"><i className="ri-link mr-3" /></a>
                        <a href="javascript:void();"><i className="ri-user-smile-line mr-3" /></a>
                        <a href="javascript:void();"><i className="ri-camera-line mr-3" /></a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                  <div className="user-post-data">
                    <div className="d-flex flex-wrap">
                      <div className="media-support-user-img mr-3">
                        <img className="rounded-circle img-fluid" src="images/user/04.jpg" alt="" />
                      </div>
                      <div className="media-support-info mt-2">
                        <h5 className="mb-0 d-inline-block"><a href="index.html#" className>Ira Membrit</a></h5>
                        <p className="mb-0 d-inline-block">Update her Status</p>
                        <p className="mb-0 text-primary">6 hour ago</p>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                  </div>
                  <div className="comment-area mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="like-block position-relative d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="like-data">
                            <div className="dropdown">
                              <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                <img src="images/icon/01.png" className="img-fluid" alt="" />
                              </span>
                              <div className="dropdown-menu">
                                <a className="ml-2 mr-2" href="index.html#" data-toggle="tooltip" data-placement="top" title data-original-title="Like"><img src="images/icon/01.png" className="img-fluid" alt="" /></a>
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
                              <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                140 Likes
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
                              20 Comment
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
                        <a href="javascript:void();"><i className="ri-share-line" />
                          <span className="ml-1">99 Share</span></a>
                      </div>
                    </div>
                    <hr />
                    <ul className="post-comments p-0 m-0">
                      <li className="mb-2">
                        <div className="d-flex flex-wrap">
                          <div className="user-img">
                            <img src="images/user/02.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                          </div>
                          <div className="comment-data-block ml-3">
                            <h6>Monty Carlo</h6>
                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                            <div className="d-flex flex-wrap align-items-center comment-activity">
                              <a href="javascript:void();">like</a>
                              <a href="javascript:void();">reply</a>
                              <a href="javascript:void();">translate</a>
                              <span> 5 min </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex flex-wrap">
                          <div className="user-img">
                            <img src="images/user/03.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                          </div>
                          <div className="comment-data-block ml-3">
                            <h6>Paul Molive</h6>
                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                            <div className="d-flex flex-wrap align-items-center comment-activity">
                              <a href="javascript:void();">like</a>
                              <a href="javascript:void();">reply</a>
                              <a href="javascript:void();">translate</a>
                              <span> 5 min </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <form className="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
                      <input type="text" className="form-control rounded" />
                      <div className="comment-attagement d-flex">
                        <a href="javascript:void();"><i className="ri-link mr-3" /></a>
                        <a href="javascript:void();"><i className="ri-user-smile-line mr-3" /></a>
                        <a href="javascript:void();"><i className="ri-camera-line mr-3" /></a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                  <div className="post-item">
                    <div className="d-flex flex-wrap">
                      <div className="media-support-user-img mr-3">
                        <img className="rounded-circle img-fluid" src="images/user/1.jpg" alt="" />
                      </div>
                      <div className="media-support-info mt-2">
                        <h5 className="mb-0 d-inline-block"><a href="index.html#" className>Bni Cyst</a></h5>
                        <p className="ml-1 mb-0 d-inline-block">Changed Profile Picture</p>
                        <p className="mb-0">3 day ago</p>
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
                  <div className="user-post text-center">
                    <a href="javascript:void();"><img src="images/page-img/p5.jpg" alt="post-image" className="img-fluid rounded w-100 mt-3" /></a>
                  </div>
                  <div className="comment-area mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="like-block position-relative d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="like-data">
                            <div className="dropdown">
                              <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                <img src="images/icon/01.png" className="img-fluid" alt="" />
                              </span>
                              <div className="dropdown-menu">
                                <a className="ml-2 mr-2" href="index.html#" data-toggle="tooltip" data-placement="top" title data-original-title="Like"><img src="images/icon/01.png" className="img-fluid" alt="" /></a>
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
                              <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                140 Likes
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
                              20 Comment
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
                        <a href="javascript:void();"><i className="ri-share-line" />
                          <span className="ml-1">99 Share</span></a>
                      </div>
                    </div>
                    <hr />
                    <ul className="post-comments p-0 m-0">
                      <li className="mb-2">
                        <div className="d-flex flex-wrap">
                          <div className="user-img">
                            <img src="images/user/02.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                          </div>
                          <div className="comment-data-block ml-3">
                            <h6>Monty Carlo</h6>
                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                            <div className="d-flex flex-wrap align-items-center comment-activity">
                              <a href="javascript:void();">like</a>
                              <a href="javascript:void();">reply</a>
                              <a href="javascript:void();">translate</a>
                              <span> 5 min </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex flex-wrap">
                          <div className="user-img">
                            <img src="images/user/03.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                          </div>
                          <div className="comment-data-block ml-3">
                            <h6>Paul Molive</h6>
                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                            <div className="d-flex flex-wrap align-items-center comment-activity">
                              <a href="javascript:void();">like</a>
                              <a href="javascript:void();">reply</a>
                              <a href="javascript:void();">translate</a>
                              <span> 5 min </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <form className="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
                      <input type="text" className="form-control rounded" />
                      <div className="comment-attagement d-flex">
                        <a href="javascript:void();"><i className="ri-link mr-3" /></a>
                        <a href="javascript:void();"><i className="ri-user-smile-line mr-3" /></a>
                        <a href="javascript:void();"><i className="ri-camera-line mr-3" /></a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                  <div className="user-post-data">
                    <div className="d-flex flex-wrap">
                      <div className="media-support-user-img mr-3">
                        <img className="rounded-circle img-fluid" src="images/user/02.jpg" alt="" />
                      </div>
                      <div className="media-support-info mt-2">
                        <h5 className="mb-0 d-inline-block"><a href="index.html#" className>Paige Turner</a></h5>
                        <p className="mb-0 d-inline-block">Added New Video in his Timeline</p>
                        <p className="mb-0 text-primary">1 day ago</p>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                  </div>
                  <div className="user-post">
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/j_GsIanLxZk?rel=0" allowFullScreen />
                    </div>
                  </div>
                  <div className="comment-area mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="like-block position-relative d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="like-data">
                            <div className="dropdown">
                              <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                <img src="images/icon/01.png" className="img-fluid" alt="" />
                              </span>
                              <div className="dropdown-menu">
                                <a className="ml-2 mr-2" href="index.html#" data-toggle="tooltip" data-placement="top" title data-original-title="Like"><img src="images/icon/01.png" className="img-fluid" alt="" /></a>
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
                              <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                140 Likes
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
                              20 Comment
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
                        <a href="javascript:void();"><i className="ri-share-line" />
                          <span className="ml-1">99 Share</span></a>
                      </div>
                    </div>
                    <hr />
                    <ul className="post-comments p-0 m-0">
                      <li className="mb-2">
                        <div className="d-flex flex-wrap">
                          <div className="user-img">
                            <img src="images/user/02.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                          </div>
                          <div className="comment-data-block ml-3">
                            <h6>Monty Carlo</h6>
                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                            <div className="d-flex flex-wrap align-items-center comment-activity">
                              <a href="javascript:void();">like</a>
                              <a href="javascript:void();">reply</a>
                              <a href="javascript:void();">translate</a>
                              <span> 5 min </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex flex-wrap">
                          <div className="user-img">
                            <img src="images/user/03.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                          </div>
                          <div className="comment-data-block ml-3">
                            <h6>Paul Molive</h6>
                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                            <div className="d-flex flex-wrap align-items-center comment-activity">
                              <a href="javascript:void();">like</a>
                              <a href="javascript:void();">reply</a>
                              <a href="javascript:void();">translate</a>
                              <span> 5 min </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <form className="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
                      <input type="text" className="form-control rounded" />
                      <div className="comment-attagement d-flex">
                        <a href="javascript:void();"><i className="ri-link mr-3" /></a>
                        <a href="javascript:void();"><i className="ri-user-smile-line mr-3" /></a>
                        <a href="javascript:void();"><i className="ri-camera-line mr-3" /></a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Stories />
            <Events />
            <UpcomingBirthday />
            <SuggestedPages />
          </div>
          <div className="col-sm-12 text-center">
            <img src="images/page-img/page-load-loader.gif" alt="loader" style={{ height: '100px' }} />
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;