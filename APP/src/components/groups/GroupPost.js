import React from 'react';

const GroupPost = () => {
    return (
        <div className="post-bar">
            <div className="post_topbar">
                <div className="usy-dt">
                    <img src="images/resources/company-pic.png" alt="" />
                    <div className="usy-name">
                        <h3>Facebook Inc.</h3>
                        <span><img src="images/clock.png" alt="" />3 min ago</span>
                    </div>
                </div>
                <div className="ed-opts">
                    <a href="company-profile.html#"  className="ed-opts-open"><i className="la la-ellipsis-v" /></a>
                    <ul className="ed-options">
                        <li><a href="company-profile.html#" >Edit Post</a></li>
                        <li><a href="company-profile.html#" >Unsaved</a></li>
                        <li><a href="company-profile.html#" >Unbid</a></li>
                        <li><a href="company-profile.html#" >Close</a></li>
                        <li><a href="company-profile.html#" >Hide</a></li>
                    </ul>
                </div>
            </div>
            <div className="epi-sec">
                <ul className="descp">
                    <li><img src="images/icon8.png" alt="" /><span>Epic Coder</span></li>
                    <li><img src="images/icon9.png" alt="" /><span>India</span></li>
                </ul>
                <ul className="bk-links">
                    <li><a href="company-profile.html#" ><i className="la la-bookmark" /></a></li>
                    <li><a href="company-profile.html#" ><i className="la la-envelope" /></a></li>
                </ul>
            </div>
            <div className="job_descp">
                <h3>Senior PHP Developer</h3>
                <ul className="job-dt">
                    <li><a href="company-profile.html#" >Full Time</a></li>
                    <li><span>$30 / hr</span></li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="company-profile.html#" >view more</a></p>
                <ul className="skill-tags">
                    <li><a href="company-profile.html#" >HTML</a></li>
                    <li><a href="company-profile.html#" >PHP</a></li>
                    <li><a href="company-profile.html#" >CSS</a></li>
                    <li><a href="company-profile.html#" >Javascript</a></li>
                    <li><a href="company-profile.html#" >Wordpress</a></li>
                </ul>
            </div>
            <div className="job-status-bar">
                <ul className="like-com">
                    <li>
                        <a href="company-profile.html#" className="active"><i className="fas fa-heart" /> Like</a>
                        <img src="images/liked-img.png" alt="" />
                        <span>25</span>
                    </li>
                    <li><a href="company-profile.html#" className="com"><i className="fas fa-comment-alt" /> Comments 15</a></li>
                </ul>
                <a href="company-profile.html#"><i className="fas fa-eye" />Views 50</a>
            </div>
        </div>
    );
};

export default GroupPost;