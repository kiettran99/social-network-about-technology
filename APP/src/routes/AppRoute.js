import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from '../components/layout/NavBar';
import Alert from '../components/layout/Alert';

import PrivateRoute from '../components/routing/PrivateRoute';
import Footer from '../components/layout/Footer';
import SideBar from '../components/layout/SideBar';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import NotFoundPage from '../components/not-found-page/NotFoundPage';
import Home from '../components/home/Home'
import Groups from '../components/groups/Groups';
import GroupPage from '../components/groups/GroupPage';
import Profile from '../components/profiles/Profile';
import EditProfile from '../components/profiles/EditProfile';
import PostDetail from '../components/post/PostDetail';
import FriendRequest from '../components/friends/FriendRequest';
import FriendsList from '../components/friends/FriendsList';
import Notification from '../components/notification/Notification';
import ForgotPassword from '../components/auth/ForgotPassword';

const MainComponent = () => {
    return (
        <>
            <SideBar />
            <NavBar />
            <section className=''>
                <Alert />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/posts/:id" component={PostDetail} />
                    <Route exact path="/groups" component={Groups} />
                    <Route exact path="/groups/:id" component={GroupPage} />
                    <Route exact path="/friend-request" component={FriendRequest} />
                    <Route exact path="/friend-list" component={FriendsList} />
                    <Route exact path="/notification" component={Notification} />
                    <PrivateRoute exact path="/profile/edit" component={EditProfile} />
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route component={NotFoundPage} />
                </Switch>
            </section>
            <Footer />
        </>
    )
};

const AppRoute = () => (
    <BrowserRouter>
        <>
            <div id="loading">
                <div id="loading-center">
                </div>
            </div>

            <Alert />

            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route component={MainComponent} />
            </Switch>
        </>
    </BrowserRouter>
);

export default AppRoute;