import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { searchUsers } from '../../../actions/search';
import { useHistory } from 'react-router-dom';

const Search = ({ searchUsers }) => {

    const searchRef = useRef();
    const history = useHistory();

    const handleSearch = (e) => {
        if (e) {
            e.preventDefault();
        }

        searchUsers(searchRef.current.value);

        history.push('/search');
    };

    return (
        <div className="iq-search-bar">
            <form onSubmit={handleSearch} className="searchbox">
                <input ref={searchRef} type="text" className="text search-input" placeholder="Type here to search..." />
                <a style={{ cursor: 'pointer' }} onClick={() => handleSearch()} className="search-link"><i className="ri-search-line" /></a>
                <button type="submit" className="btn btn-primary btn-link d-none"></button>
            </form>
        </div>
    );
};

export default connect(null, { searchUsers })(Search);