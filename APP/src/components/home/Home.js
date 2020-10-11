import React from 'react';
import UserData from './UserData';
import Tags from './Tags';
import PostTopBar from './PostTopBar';
import PostSection from './PostSection';
import WidgetAbout from './WidgetAbout';
import WidgetSuggestions from './WidgetSuggestions';

const Home = () => {
  return (
    <div className="wrapper">
      <main>
        <div className="main-section">
          <div className="container">
            <div className="main-section-data">
              <div className="row">
                <div className="col-lg-3 col-md-4 pd-left-none no-pd">
                  <div className="main-left-sidebar no-margin">
                    <UserData />
                    <Tags />
                  </div>
                </div>
                <div className="col-lg-6 col-md-8 no-pd">
                  <div className="main-ws-sec">
                    <PostTopBar />
                    <PostSection />
                  </div>
                </div>
                <div className="col-lg-3 pd-right-none no-pd">
                  <div className="right-sidebar">
                    <WidgetAbout />
                    <WidgetSuggestions />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  ß  </div>
  );
}

export default Home;