import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGroup } from '../../actions/group';
import GroupProfile from './GroupProfile';
import CreatePost from '../post/CreatePost';
import PostsPage from '../post/PostsPage';

const GroupPage = ({ match, getGroup, group: { group, loading } }) => {

    useEffect(() => {
        getGroup(match.params.id);
    }, [match.params.id]);

    return !loading && group && (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <GroupProfile group={group} />
                        <div className="iq-card">
                            <div className="iq-card-body p-0">
                                <div className="user-tabing">
                                    <ul className="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                                        <li className="col-sm-3 p-0">
                                            <a className="nav-link active" data-toggle="pill" href="#timeline">Timeline</a>
                                        </li>
                                        <li className="col-sm-3 p-0">
                                            <a className="nav-link" data-toggle="pill" href="#about">About</a>
                                        </li>
                                        <li className="col-sm-3 p-0">
                                            <a className="nav-link" data-toggle="pill" href="#friends">friends</a>
                                        </li>
                                        <li className="col-sm-3 p-0">
                                            <a className="nav-link" data-toggle="pill" href="#photos">Photos</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="timeline" role="tabpanel">
                                <div className="iq-card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="iq-card">
                                                <div className="iq-card-body">
                                                    <a href="profile.html#"><span className="badge badge-pill badge-primary font-weight-normal ml-auto mr-1"><i className="ri-star-line" /></span> 27 Items for yoou</a>
                                                </div>
                                            </div>
                                            <div className="iq-card">
                                                <div className="iq-card-header d-flex justify-content-between">
                                                    <div className="iq-header-title">
                                                        <h4 className="card-title">Life Event</h4>
                                                    </div>
                                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                                        <p className="m-0"><a href="javacsript:void();"> Create </a></p>
                                                    </div>
                                                </div>
                                                <div className="iq-card-body">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="event-post position-relative">
                                                                <a href="javascript:void();"><img src="/images/page-img/07.jpg" alt="gallary-image" className="img-fluid rounded" /></a>
                                                                <div className="job-icon-position">
                                                                    <div className="job-icon bg-primary p-2 d-inline-block rounded-circle"><i className="ri-briefcase-line" /></div>
                                                                </div>
                                                                <div className="iq-card-body text-center p-2">
                                                                    <h5>Started New Job at Apple</h5>
                                                                    <p>January 24, 2019</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="event-post position-relative">
                                                                <a href="javascript:void();"><img src="/images/page-img/06.jpg" alt="gallary-image" className="img-fluid rounded" /></a>
                                                                <div className="job-icon-position">
                                                                    <div className="job-icon bg-primary p-2 d-inline-block rounded-circle"><i className="ri-briefcase-line" /></div>
                                                                </div>
                                                                <div className="iq-card-body text-center p-2">
                                                                    <h5>Freelance Photographer</h5>
                                                                    <p>January 24, 2019</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iq-card">
                                                <div className="iq-card-header d-flex justify-content-between">
                                                    <div className="iq-header-title">
                                                        <h4 className="card-title">Photos</h4>
                                                    </div>
                                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                                        <p className="m-0"><a href="javacsript:void();">Add Photo </a></p>
                                                    </div>
                                                </div>
                                                <div className="iq-card-body">
                                                    <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-3"><a href="javascript:void();"><img src="/images/page-img/g1.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-3"><a href="javascript:void();"><img src="/images/page-img/g2.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-3"><a href="javascript:void();"><img src="/images/page-img/g3.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-3"><a href="javascript:void();"><img src="/images/page-img/g4.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-3"><a href="javascript:void();"><img src="/images/page-img/g5.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-3"><a href="javascript:void();"><img src="/images/page-img/g6.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-0"><a href="javascript:void();"><img src="/images/page-img/g7.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-0"><a href="javascript:void();"><img src="/images/page-img/g8.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-0"><a href="javascript:void();"><img src="/images/page-img/g9.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="iq-card">
                                                <div className="iq-card-header d-flex justify-content-between">
                                                    <div className="iq-header-title">
                                                        <h4 className="card-title">Members</h4>
                                                    </div>
                                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                                        {/* <p className="m-0"><a href="javacsript:void();">Add New </a></p> */}
                                                    </div>
                                                </div>
                                                <div className="iq-card-body">
                                                    <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                                        {group.members && group.members.map(member => (
                                                            <li className="col-md-4 col-6 pl-2 pr-0 pb-3" key={member._id}>
                                                                <Link to={`/profile/${member.user._id}`}>
                                                                    <img src={member.user.avatar} alt="gallary-image" className="img-fluid" /></Link>
                                                                <h6 className="mt-2">{member.user.name}</h6>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <CreatePost groupId={group._id} />
                                                </div>
                                                <PostsPage groupId={group._id} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="about" role="tabpanel">
                                <div className="iq-card">
                                    <div className="iq-card-body">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <ul className="nav nav-pills basic-info-items list-inline d-block p-0 m-0">
                                                    <li>
                                                        <a className="nav-link active" data-toggle="pill" href="profile.html#basicinfo">Contact and Basic Info</a>
                                                    </li>
                                                    <li>
                                                        <a className="nav-link" data-toggle="pill" href="profile.html#family">Family and Relationship</a>
                                                    </li>
                                                    <li>
                                                        <a className="nav-link" data-toggle="pill" href="profile.html#work">Work and Education</a>
                                                    </li>
                                                    <li>
                                                        <a className="nav-link" data-toggle="pill" href="profile.html#lived">Places You've Lived</a>
                                                    </li>
                                                    <li>
                                                        <a className="nav-link" data-toggle="pill" href="profile.html#details">Details About You</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-9 pl-4">
                                                <div className="tab-content">
                                                    <div className="tab-pane fade active show" id="basicinfo" role="tabpanel">
                                                        <h4>Contact Information</h4>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <h6>Email</h6>
                                                            </div>
                                                            <div className="col-9">
                                                                <p className="mb-0"><a href="https://iqonic.design/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="6d2f0304070205032d0a000c0401430e0200">[email&nbsp;protected]</a></p>
                                                            </div>
                                                            <div className="col-3">
                                                                <h6>Mobile</h6>
                                                            </div>
                                                            <div className="col-9">
                                                                <p className="mb-0">(001) 4544 565 456</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <h6>Address</h6>
                                                            </div>
                                                            <div className="col-9">
                                                                <p className="mb-0">United States of America</p>
                                                            </div>
                                                        </div>
                                                        <h4 className="mt-3">Websites and Social Links</h4>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <h6>Website</h6>
                                                            </div>
                                                            <div className="col-9">
                                                                <p className="mb-0">www.bootstrap.com</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <h6>Social Link</h6>
                                                            </div>
                                                            <div className="col-9">
                                                                <p className="mb-0">www.bootstrap.com</p>
                                                            </div>
                                                        </div>
                                                        <h4 className="mt-3">Basic Information</h4>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <h6>Birth Date</h6>
                                                            </div>
                                                            <div className="col-9">
                                                                <p className="mb-0">24 January</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <h6>Birth Year</h6>
                                                            </div>
                                                            <div className="col-9">
                                                                <p className="mb-0">1994</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <h6>Gender</h6>
                                                            </div>
                                                            <div className="col-9">
                                                                <p className="mb-0">Female</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <h6>interested in</h6>
                                                            </div>
                                                            <div className="col-9">
                                                                <p className="mb-0">Designing</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <h6>language</h6>
                                                            </div>
                                                            <div className="col-9">
                                                                <p className="mb-0">English, French</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="family" role="tabpanel">
                                                        <h4 className="mb-3">Relationship</h4>
                                                        <ul className="suggestions-lists m-0 p-0">
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><i className="ri-add-fill" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Add Your Relationship Status</h6>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <h4 className="mt-3 mb-3">Family Members</h4>
                                                        <ul className="suggestions-lists m-0 p-0">
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><i className="ri-add-fill" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Add Family Members</h6>
                                                                </div>
                                                            </li>
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><img src="/images/user/01.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Paul Molive</h6>
                                                                    <p className="mb-0">Brothe</p>
                                                                </div>
                                                                <div className="edit-relation"><a href="javascript:void();"><i className="ri-edit-line mr-2" />Edit</a></div>
                                                            </li>
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><img src="/images/user/02.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Anna Mull</h6>
                                                                    <p className="mb-0">Sister</p>
                                                                </div>
                                                                <div className="edit-relation"><a href="javascript:void();"><i className="ri-edit-line mr-2" />Edit</a></div>
                                                            </li>
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><img src="/images/user/03.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Paige Turner</h6>
                                                                    <p className="mb-0">Cousin</p>
                                                                </div>
                                                                <div className="edit-relation"><a href="javascript:void();"><i className="ri-edit-line mr-2" />Edit</a></div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="tab-pane fade" id="work" role="tabpanel">
                                                        <h4 className="mb-3">Work</h4>
                                                        <ul className="suggestions-lists m-0 p-0">
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><i className="ri-add-fill" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Add Work Place</h6>
                                                                </div>
                                                            </li>
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><img src="/images/user/01.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Themeforest</h6>
                                                                    <p className="mb-0">Web Designer</p>
                                                                </div>
                                                                <div className="edit-relation"><a href="javascript:void();"><i className="ri-edit-line mr-2" />Edit</a></div>
                                                            </li>
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><img src="/images/user/02.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>iqonicdesign</h6>
                                                                    <p className="mb-0">Web Developer</p>
                                                                </div>
                                                                <div className="edit-relation"><a href="javascript:void();"><i className="ri-edit-line mr-2" />Edit</a></div>
                                                            </li>
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><img src="/images/user/03.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>W3school</h6>
                                                                    <p className="mb-0">Designer</p>
                                                                </div>
                                                                <div className="edit-relation"><a href="javascript:void();"><i className="ri-edit-line mr-2" />Edit</a></div>
                                                            </li>
                                                        </ul>
                                                        <h4 className="mb-3">Professional Skills</h4>
                                                        <ul className="suggestions-lists m-0 p-0">
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><i className="ri-add-fill" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Add Professional Skills</h6>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <h4 className="mt-3 mb-3">College</h4>
                                                        <ul className="suggestions-lists m-0 p-0">
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><i className="ri-add-fill" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Add College</h6>
                                                                </div>
                                                            </li>
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><img src="/images/user/01.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Lorem ipsum</h6>
                                                                    <p className="mb-0">USA</p>
                                                                </div>
                                                                <div className="edit-relation"><a href="javascript:void();"><i className="ri-edit-line mr-2" />Edit</a></div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="tab-pane fade" id="lived" role="tabpanel">
                                                        <h4 className="mb-3">Current City and Hometown</h4>
                                                        <ul className="suggestions-lists m-0 p-0">
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><img src="/images/user/01.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Georgia</h6>
                                                                    <p className="mb-0">Georgia State</p>
                                                                </div>
                                                                <div className="edit-relation"><a href="javascript:void();"><i className="ri-edit-line mr-2" />Edit</a></div>
                                                            </li>
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><img src="/images/user/02.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Atlanta</h6>
                                                                    <p className="mb-0">Atlanta City</p>
                                                                </div>
                                                                <div className="edit-relation"><a href="javascript:void();"><i className="ri-edit-line mr-2" />Edit</a></div>
                                                            </li>
                                                        </ul>
                                                        <h4 className="mt-3 mb-3">Other Places Lived</h4>
                                                        <ul className="suggestions-lists m-0 p-0">
                                                            <li className="d-flex mb-4 align-items-center">
                                                                <div className="user-img img-fluid"><i className="ri-add-fill" /></div>
                                                                <div className="media-support-info ml-3">
                                                                    <h6>Add Place</h6>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="tab-pane fade" id="details" role="tabpanel">
                                                        <h4 className="mb-3">About You</h4>
                                                        <p>Hi, I’m Bni, I’m 26 and I work as a Web Designer for the iqonicdesign.</p>
                                                        <h4 className="mt-3 mb-3">Other Name</h4>
                                                        <p>Bini Rock</p>
                                                        <h4 className="mt-3 mb-3">Favorite Quotes</h4>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <img src="/images/page-img/page-load-loader.gif" alt="loader" style={{ height: '100px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

GroupPage.propTypes = {
    group: PropTypes.object.isRequired,
    getGroup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    group: state.group
});

export default connect(mapStateToProps, { getGroup })(GroupPage);