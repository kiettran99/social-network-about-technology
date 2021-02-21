import React from 'react';
import PersonalProfile from './PersonalProfile';
import CreatePost from '../post/CreatePost';
import PostsPage from '../post/PostsPage';
import AboutProfile from './about/AboutProfile';
import FriendProfile from './friends/FriendProfile';
import Process from './Process';
import Photos from './photos/Photos';

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
                            <Photos match={match} />
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