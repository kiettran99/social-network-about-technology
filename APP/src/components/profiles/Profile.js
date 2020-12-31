import React from 'react';
import PersonalProfile from './PersonalProfile';
import CreatePost from '../post/CreatePost';
import PostsPage from '../post/PostsPage';
import AboutProfile from './about/AboutProfile';
import FriendProfile from './friends/FriendProfile';
import Process from './Process';

const Profile = ({ match }) => {
    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <PersonalProfile match={match} />
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <AboutProfile />
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Photos</h4>
                                    </div>
                                    {/* <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <p className="m-0"><a href="">Add Photo </a></p>
                                    </div> */}
                                </div>
                                <div className="iq-card-body">
                                    <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-3"><a href=""><img src="/images/page-img/g1.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-3"><a href=""><img src="/images/page-img/g2.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-3"><a href=""><img src="/images/page-img/g3.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                        <li className="col-md-4 col-6 pl-2 pr-0"><a href=""><img src="/images/page-img/g4.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                        <li className="col-md-4 col-6 pl-2 pr-0"><a href=""><img src="/images/page-img/g5.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                        <li className="col-md-4 col-6 pl-2 pr-0"><a href=""><img src="/images/page-img/g6.jpg" alt="gallary-image" className="img-fluid" /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <FriendProfile match={match} />
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-sm-12">
                                    <CreatePost type={{ userId: match.params.id }} />
                                </div>
                                <PostsPage match={match} />
                                <div className="col-sm-12 text-center">
                                    <Process userId={match.params.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;