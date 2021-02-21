import React from 'react';
import { Link } from 'react-router-dom';

const Photo = ({ photo: { _id, imageUrl, type = 'posts' } }) => {
    return (
        <li className="col-md-4 col-6 pl-2 pr-0 pb-3">
            <Link to={`/${type}/${_id}`}>
                <img src={imageUrl} alt="gallary-image" className="img-fluid" />
            </Link>
        </li>
    )
};

export default Photo;
