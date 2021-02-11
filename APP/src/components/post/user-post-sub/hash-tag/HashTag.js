import React from 'react';
import { Link } from 'react-router-dom';

const HashTag = ({ hashtag: { tags } }) => {
    return tags.length > 0 && (
        <div className="my-2">
            <p className="d-inline">Tags: </p>
            {tags.map((tag, index) => (
                <Link key={index} className="badge badge-pill badge-light"
                    to={`/search&tag=${tag}`}>
                    #{tag}
                </Link>
            ))}
        </div>
    );
};

export default HashTag;