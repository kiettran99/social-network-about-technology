import React from 'react';
import { Link } from 'react-router-dom';

const Photo = ({ photo: { _id, imageUrl, type = 'posts' } }) => {
    return (
        <div className="col-md-6 col-lg-4 mb-3">
            <div className="user-images position-relative overflow-hidden">
                <Link to={`/${type}/${_id}`}>
                    <img src={imageUrl} className="img-fluid rounded" alt="Responsive image" />
                </Link>
                <div className="image-hover-data">
                    <div className="product-elements-icon">
                        <ul className="d-flex align-items-center m-0 p-0 list-inline">
                            <li><span className="pr-3 text-white">Type: {type}</span></li>
                            {/* <li><a href="profile-images.html#" className="pr-3 text-white"> 30 <i className="ri-chat-3-line" /> </a></li>
                            <li><a href="profile-images.html#" className="pr-3 text-white"> 10 <i className="ri-share-forward-line" /> </a></li> */}
                        </ul>
                    </div>
                </div>
                <a href="profile-images.html#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title data-original-title="Edit or Remove"><i className="ri-edit-2-fill" /></a>
            </div>
        </div>
    );
};

export default Photo;