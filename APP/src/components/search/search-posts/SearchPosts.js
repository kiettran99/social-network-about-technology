import React from 'react';
import { connect } from 'react-redux';

import LoadMore from '../../shared/LoadMore';
import SearchPreviewPost from './preview/SearchPreviewPost';
import { getMorePosts } from '../../../actions/search';

const SearchPosts = ({ posts, search, getMorePosts }) => {

    const getMore = (callback) => {
        getMorePosts(search, 4, posts.length, callback);
    }

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
                    {posts && posts.length > 0 && (
                        <div className="col-sm-12 text-center">
                            <LoadMore action={getMore} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default connect(null, { getMorePosts })(React.memo(SearchPosts));