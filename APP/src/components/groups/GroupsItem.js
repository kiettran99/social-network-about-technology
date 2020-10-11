import React from 'react';

const GroupsItem = () => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="company_profile_info">
                <div className="company-up-info">
                    <img src="images/resources/cmp-icon1.png" alt="" />
                    <h3>Google Inc.</h3>
                    <h4>Establish Feb, 2004</h4>
                    <ul>
                        <li><a href="companies.html#"  className="follow">Follow</a></li>
                        <li><a href="companies.html#"  className="message-us"><i className="fa fa-envelope" /></a></li>
                    </ul>
                </div>
                <a href="company-profile.html"  className="view-more-pro">View Profile</a>
            </div>{/*company_profile_info end*/}
        </div>
    );
};

export default GroupsItem;