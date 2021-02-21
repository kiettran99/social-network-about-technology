import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white iq-footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item"><a href="privacy-policy.html">Privacy Policy</a></li>
                  <li className="list-inline-item"><a href="terms-of-service.html">Terms of Use</a></li>
                </ul>
              </div>
              <div className="col-lg-6 text-right">
                Copyright 2021 <a href="index.html#">SocialV</a> All Rights Reserved.
              </div>
            </div>
          </div>
        </footer>
      );
};

export default Footer;