import React, { useEffect } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import CreatePost from '../post/CreatePost';
import Stories from './Stories';
import Events from './Events';
import UpcomingBirthday from './UpcomingBirthday';
import SuggestedPages from './SuggestedPages';
import Process from '../layout/Process';
import PostsPage from '../post/PostsPage';

import { loadUser } from '../../actions/auth';
import setAuthToken from '../../utils/setAuthToken';

const Home = ({ location, loadUser }) => {

  useEffect(() => {
    const query = queryString.parse(location.search);

    if (query.token) {
      setAuthToken(localStorage.token);
      loadUser();
    }
  }, []);

  return (
    <div id="content-page" className="content-page" >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 row m-0 p-0">
            <div className="col-sm-12">
              <CreatePost />
            </div>
            <PostsPage />
          </div>
          <div className="col-lg-4">
            <Stories />
            <Events />
            <UpcomingBirthday />
            <SuggestedPages />
          </div>
          <div className="col-sm-12 text-center">
            <Process />
          </div>
        </div>
      </div>
    </div >
  );
};

export default connect(null, { loadUser })(Home);