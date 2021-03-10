import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Status = ({ type, tags, share }) => {

    const preview = () => {
        if (type) {
            if (type.group) {
                return (
                    <p className="mb-0 d-inline-block">
                        <i className="ri-arrow-right-s-line m-0">&nbsp;</i>
                        <Link className='text-dark' to={`/groups/${type.group._id}`}>
                            &nbsp;{type.group.name}
                        </Link>
                    </p>
                );
            }
            else if (type.review) {
                return (
                    <p className="mb-0 d-inline-block">Create New Review</p>
                );
            }
        }

        if (share && share.postId) {
            return (
                <p className="mb-0 d-inline-block">Share The Post</p>
            );
        }

        if (tags && tags.length > 0) {
            return (
                <>
                    <p className="mb-0 d-inline-block">
                        Add New Post with {tags[0]?.fullname}
                    </p>
                    {tags.length > 1 && (
                        <div className="total-like-block d-inline-block">
                            <div className="dropdown">
                                <span className={`dropdown-toggle`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                    &nbsp;and Others
                               </span>
                                <div className="dropdown-menu">
                                    {tags.slice(1).map((tag, index) => (
                                        <Link to={`/profile/${tag.user}`} key={index} className="dropdown-item" href="index.html#">{tag.fullname}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            );
        };

        return <p className="mb-0 d-inline-block">Add New Post</p>;
    };

    return preview();
};

export default memo(Status);