import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { hidePost } from '../../../actions/post';

const HidePost = ({ postId, hidePost, post: { isInPosts } }) => {

    const history = useHistory();

    const handleHidePost = () => {
        hidePost(postId);

        if (!isInPosts) {
            history.push('/');
        }
    };

    return (
        <a className="dropdown-item p-3" onClick={handleHidePost}>
            <div className="d-flex align-items-top">
                <div className="icon font-size-20"><i className="ri-close-circle-line" /></div>
                <div className="data ml-2">
                    <h6>Hide Post</h6>
                    <p className="mb-0">See fewer posts like this.</p>
                </div>
            </div>
        </a>
    );
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { hidePost })(HidePost);