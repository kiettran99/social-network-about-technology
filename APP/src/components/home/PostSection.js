import React from 'react';

const PostSection = () => {
    return (
        <div className="posts-section">
            <div className="post-bar">
                <div className="post_topbar">
                    <div className="usy-dt">
                        <img src="images/resources/us-pic.png" alt="" />
                        <div className="usy-name">
                            <h3>John Doe</h3>
                            <span><img src="images/clock.png" alt="" />3 min ago</span>
                        </div>
                    </div>
                    <div className="ed-opts">
                        <a href="index.html#" className="ed-opts-open"><i className="la la-ellipsis-v" /></a>
                        <ul className="ed-options">
                            <li><a href="index.html#" >Edit Post</a></li>
                            <li><a href="index.html#" >Unsaved</a></li>
                            <li><a href="index.html#" >Unbid</a></li>
                            <li><a href="index.html#" >Close</a></li>
                            <li><a href="index.html#" >Hide</a></li>
                        </ul>
                    </div>
                </div>
                <div className="epi-sec">
                    <ul className="descp">
                        <li><img src="images/icon8.png" alt="" /><span>Epic Coder</span></li>
                        <li><img src="images/icon9.png" alt="" /><span>India</span></li>
                    </ul>
                    <ul className="bk-links">
                        <li><a href="index.html#" ><i className="la la-bookmark" /></a></li>
                        <li><a href="index.html#" ><i className="la la-envelope" /></a></li>
                    </ul>
                </div>
                <div className="job_descp">
                    <h3>Senior Wordpress Developer</h3>
                    <ul className="job-dt">
                        <li><a href="index.html#" >Full Time</a></li>
                        <li><span>$30 / hr</span></li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                    luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id
                magna sit amet... <a href="index.html#" >view more</a></p>
                    <ul className="skill-tags">
                        <li><a href="index.html#" >HTML</a></li>
                        <li><a href="index.html#" >PHP</a></li>
                        <li><a href="index.html#" >CSS</a></li>
                        <li><a href="index.html#" >Javascript</a></li>
                        <li><a href="index.html#" >Wordpress</a></li>
                    </ul>
                </div>
                <div className="job-status-bar">
                    <ul className="like-com">
                        <li>
                            <a href="index.html#"><i className="fas fa-heart" /> Like</a>
                            <img src="images/liked-img.png" alt="" />
                            <span>25</span>
                        </li>
                        <li><a href="index.html#" className="com"><i className="fas fa-comment-alt" /> Comment 15</a></li>
                    </ul>
                    <a href="index.html#"><i className="fas fa-eye" />Views 50</a>
                </div>
            </div>
            {/* <div className="process-comm">
                <div className="spinner">
                    <div className="bounce1" />
                    <div className="bounce2" />
                    <div className="bounce3" />
                </div>
            </div> */}
        </div>
    );
};

export default PostSection;