import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { removePost } from '../../../actions/post';

const DeletePost = ({ postId, userId, auth: { user, isAuthenticated },
    removePost
}) => {
    const [isCanDelete, setCanDelete] = useState(false);

    useEffect(() => {
        if (user && isAuthenticated) {
            setCanDelete(userId === user._id);
        }
    }, [user, isAuthenticated]);

    const history = useHistory();

    const deletePost = () => {
        removePost(postId, history);
    };

    return isCanDelete && (
        <a className="dropdown-item p-3" onClick={() => deletePost()}>
            <div className="d-flex align-items-top text-danger">
                <div className="icon font-size-20"><i className="ri-delete-bin-7-line" /></div>
                <div className="data ml-2">
                    <h6 className="">Delete</h6>
                    <p className="mb-0">Deleting for this post.</p>
                </div>
            </div>
        </a>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { removePost })(DeletePost);