import React from 'react';

const WidgetSuggestions = () => {
    return (
        <div className="widget suggestions full-width">
            <div className="sd-title">
                <h3>Most Viewed People</h3>
                <i className="la la-ellipsis-v" />
            </div>
            <div className="suggestions-list">
                <div className="suggestion-usd">
                    <img src="images/resources/s1.png" alt="" />
                    <div className="sgt-text">
                        <h4>Jessica William</h4>
                        <span>Graphic Designer</span>
                    </div>
                    <span><i className="la la-plus" /></span>
                </div>
                <div className="suggestion-usd">
                    <img src="images/resources/s2.png" alt="" />
                    <div className="sgt-text">
                        <h4>John Doe</h4>
                        <span>PHP Developer</span>
                    </div>
                    <span><i className="la la-plus" /></span>
                </div>
                <div className="suggestion-usd">
                    <img src="images/resources/s3.png" alt="" />
                    <div className="sgt-text">
                        <h4>Poonam</h4>
                        <span>Wordpress Developer</span>
                    </div>
                    <span><i className="la la-plus" /></span>
                </div>
                <div className="suggestion-usd">
                    <img src="images/resources/s4.png" alt="" />
                    <div className="sgt-text">
                        <h4>Bill Gates</h4>
                        <span>C &amp; C++ Developer</span>
                    </div>
                    <span><i className="la la-plus" /></span>
                </div>
                <div className="suggestion-usd">
                    <img src="images/resources/s5.png" alt="" />
                    <div className="sgt-text">
                        <h4>Jessica William</h4>
                        <span>Graphic Designer</span>
                    </div>
                    <span><i className="la la-plus" /></span>
                </div>
                <div className="suggestion-usd">
                    <img src="images/resources/s6.png" alt="" />
                    <div className="sgt-text">
                        <h4>John Doe</h4>
                        <span>PHP Developer</span>
                    </div>
                    <span><i className="la la-plus" /></span>
                </div>
                <div className="view-more">
                    <a href="index.html#">View More</a>
                </div>
            </div>
        </div>

    );
};

export default WidgetSuggestions;