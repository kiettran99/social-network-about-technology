import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { useLocation } from 'react-router';

import { searchUsers, resetSearch, searchPosts } from '../../actions/search';

import SearchPosts from './search-posts/SearchPosts';
import SearchUsers from './search-users/SearchUsers';

const Search = ({ search: { users, posts, search, loading }, searchUsers, resetSearch, searchPosts }) => {

    // History
    const location = useLocation();

    // Call Services
    useEffect(() => {

        const query = queryString.parse(location.search);
        
        if (query.tag) {
            const hashtag = '#' + query.tag;

            searchUsers(hashtag, hashtag);
            searchPosts(hashtag);

        }
        else {
            if (search === '') {
                searchUsers('');
                searchPosts('');
            }
        }

    }, []);

    // Auto Sroll on Top, when component did mount
    useEffect(() => {
        window.scrollTo(0, 0);

        return () => {
            resetSearch();
        };
    }, []);

    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <SearchUsers users={users} search={search} />
                <SearchPosts posts={posts} search={search} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    search: state.search
});

export default connect(mapStateToProps, {
    searchUsers, resetSearch,
    searchPosts
})(Search);