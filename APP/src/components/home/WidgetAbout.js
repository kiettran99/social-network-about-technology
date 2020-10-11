import React from 'react';

const WidgetAbout = () => {
    return (
        <div className="widget widget-about">
            <img src="images/wd-logo.png" alt="" />
            <h3>Track Time on Workwise</h3>
            <span>Pay only for the Hours worked</span>
            <div className="sign_link">
                <h3><a href="sign-in.html" >Sign up</a></h3>
                <a href="index.html#" >Learn More</a>
            </div>
        </div>
    );
};

export default WidgetAbout;