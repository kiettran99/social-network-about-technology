import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import useScreenEnter from '../../hooks/useScreenEnter';
import { getMorePosts } from '../../actions/post';

const Process = ({ post: { posts: { length }, loading }, getMorePosts, userId }) => {

    const ref = useRef(null);
    const skip = 5;

    const [isTrigged, setIsTrigged] = useState(false);
    const [lastLength, setLastLength] = useState(0);

    const setEntered = useScreenEnter(ref, () => {
        setIsTrigged(true);
    });

    useEffect(() => {

        if (length >= skip && lastLength !== length - skip) {
            setLastLength(length - skip);
            setEntered(false);
        }

        if (isTrigged) { 
            getMorePosts(length, skip, null, null, userId);
            setIsTrigged(false);
        }
    }, [isTrigged, length]);

    return !loading && (
        <img ref={ref} src="/images/page-img/page-load-loader.gif" alt="loader" style={{ height: '100px' }} />
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