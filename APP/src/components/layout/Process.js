import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import useScreenEnter from '../../hooks/useScreenEnter';
import { getMorePosts } from '../../actions/post';

const Process = ({ post: { posts: { length }, loading }, getMorePosts }) => {

    const ref = useRef(null);
    const [isTrigged, setIsTrigged] = useState(false);

    useEffect(() => {
        if (isTrigged) {    
            console.log(length);     
            getMorePosts(length);
            setIsTrigged(false);
        }
    }, [isTrigged, length]);

    useScreenEnter(ref, () => {
        setIsTrigged(true);
    });

    return !loading && (
        <img ref={ref} src="images/page-img/page-load-loader.gif" alt="loader" style={{ height: '100px' }} />
    );
};

Process.propTypes = {
    post: PropTypes.object.isRequired,
    getMorePosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getMorePosts })(Process);