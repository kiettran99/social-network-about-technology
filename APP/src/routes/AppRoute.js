import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from '../components/layout/NavBar';
import Alert from '../components/layout/Alert';

import PrivateRoute from '../components/routing/PrivateRoute';
import Footer from '../components/layout/Footer';
import SideBar from '../components/layout/SideBar';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import Loading from '../components/layout/Loading';

const Home = lazy(() => import('../components/home/Home'));
const PostDetail = lazy(() => import('../components/post/PostDetail'));
const Groups = lazy(() => import('../components/groups/Groups'));
const GroupPage = lazy(() => import('../components/groups/GroupPage'));
const Profile = lazy(() => import('../components/profiles/Profile'));
const EditProfile = lazy(() => import('../components/profiles/EditProfile'));
const FriendRequest = lazy(() => import('../components/friends/FriendRequest'));
const FriendsList = lazy(() => import('../components/friends/FriendsList'));
const Notification = lazy(() => import('../components/notification/Notification'));
const NotFoundPage = lazy(() => import('../components/not-found-page/NotFoundPage'));
const SearchPage = lazy(() => import('../components/search/Search'));
const Photos = lazy(() => import('../components/photos/Photos'));
const Reviews = lazy(() => import('../components/reviews/Reivews'));
const ReviewDetail = lazy(() =>  import('../components/reviews/ReviewDetail'));
const Faq = lazy(() => import('../components/faq/Faq'));
const Chat = lazy(() => import('../components/chat/Chat'));
const AdsRouter = lazy(() => import('../components/advertisement/AdsRouter'));
const CreateAds  = lazy(() => import('../components/advertisement/create-ads/CreateAds'));

const MainComponent = () => {
    return (
        <>
            <SideBar />
            <NavBar />
            <section className=''>
                <Alert />
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/posts/:id" component={PostDetail} />
                        <Route exact path="/groups" component={Groups} />
                        <Route exact path="/groups/:id" component={GroupPage} />
                        <Route exact path="/messages/:id" component={Chat} />
                        <Route exact path="/friend-request" component={FriendRequest} />
                        <Route exact path="/friend-list" component={FriendsList} />
                        <Route exact path="/notification" component={Notification} />
                        <Route exact path="/search" component={SearchPage} />
                        <Route exact path="/photos" component={Photos} />
                        <Route exact path="/reviews" component={Reviews} />
                        <Route exact path="/reviews/:id" component={ReviewDetail} />
                        <Route exact path="/faq" component={Faq} />
                        <Route exact path="/ads" component={AdsRouter} />
                        <Route exact path="/ads/create" component={CreateAds} />
                        <PrivateRoute exact path="/profile/edit" component={EditProfile} />
                        <Route exact path="/profile/:id" component={Profile} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Suspense>
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
                <Route exact path="/reset-password/:token" component={ResetPassword} />
                <Route component={MainComponent} />
            </Switch>
        </>
    </BrowserRouter>
);

export default AppRoute;