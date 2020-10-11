import React from 'react';

const PostTopBar = () => {
    return (
        <div className="post-topbar">
            <div className="user-picy">
                <img src="images/resources/user-pic.png" alt="" />
            </div>
            <div className="post-st">
                <ul>
                    <li><a className="post_project" href="index.html#" >Post a
                  Project</a></li>
                    <li><a className="post-jb active" href="index.html#" >Post a Job</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PostTopBar;