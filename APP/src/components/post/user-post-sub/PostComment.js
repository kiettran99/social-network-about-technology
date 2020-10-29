import React from 'react';
import dayjs from '../../../utils/relativeDate';

const PostComment = ({ comment: { name, text, date, likes, replies }, postId }) => {
    return (
        <li className="mb-2">
            <div className="d-flex flex-wrap">
                <div className="user-img">
                    <img src="images/user/02.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                </div>
                <div className="comment-data-block ml-3">
                    <h6>{name}</h6>
                    <p className="mb-0">{text}</p>
                    <div className="d-flex flex-wrap align-items-center comment-activity">
                        <a href="">like</a>
                        <a href="">reply</a>
                        <a href="">translate</a>
                        <span> {dayjs(date).fromNow()} </span>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default PostComment;