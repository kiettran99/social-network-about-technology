import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreatePost from '../post/CreatePost';
import Ads from './ads/Ads';

import Process from '../layout/Process';
import PostsPage from '../post/PostsPage';

import { loadUser } from '../../actions/auth';
import setAuthToken from '../../utils/setAuthToken';

const TourGuide = React.lazy(() => import('../shared/tour/TourGuide'));

const Home = ({ location, loadUser, history }) => {

  const [isTourOpen, setTourOpen] = useState(false);

  const openTour = () => {
    setTourOpen(true);
  };

  const closeTour = () => {
    setTourOpen(false);
  };

  const tourProps = {
    isTourOpen,
    closeTour
  };

  useEffect(() => {
    const query = queryString.parse(location.search);

    if (query.token) {
      // Save user token into Local Storage
      localStorage.setItem('token', query.token);
      setAuthToken(query.token);

      // Update User and clear params url
      loadUser();
      history.push('/');
    }

    // address has query like ?tour=guide
    if (query.tour === 'guide') {
      // Active tour guide
      openTour(true);
    }
  }, []);

  return (
    <div id="content-page" className="content-page" >
      {isTourOpen && <TourGuide {...tourProps} />}
      <div className="container">
        <div className="row">
          <div className="col-lg-8 row m-0 p-0">
            <div className="col-sm-12">
              <CreatePost />
            </div>
            <PostsPage />
          </div>
          <Ads />
          <div className="col-sm-12 text-center">
            <Process />
          </div>
        </div>
      </div>
    </div >
  );
};

export default connect(null, { loadUser })(withRouter(Home));