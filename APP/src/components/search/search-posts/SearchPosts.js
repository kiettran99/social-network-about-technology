import React from 'react';
import SearchPreviewPost from './preview/SearchPreviewPost';

const SearchPosts = ({ posts, search }) => {
    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Search</h4>
                </div>
            </div>
            <div className="iq-card-body">
                <p className="ml-2">Search Result for: "{search}"</p>
                <div className="row">
                    {posts && posts.length > 0 && posts.map(post => (
                        <div key={post._id} className="col-6">
                            <SearchPreviewPost post={post} />
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default SearchPosts;