import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';

import useLocalStorage from '../../../../hooks/useLocalStorage';
import { getPosts } from '../../services/adsServices';

const Posts = ({ closeModal, post, setPost }) => {

    // State
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);

    // Hook reference html element
    const nameRef = useRef();

    const [searchHistory, setSearchHistory] = useLocalStorage('ads-search-history', null);

    // Hook effect
    useEffect(() => {
        setLoading(true);

        // Check if users searched then re-search
        if (searchHistory) {
            nameRef.current.value = searchHistory;

            getAndSetState(searchHistory);
        }
        else {
            getAndSetState();
        }

    }, []);

    // Call Service to get data
    const getAndSetState = (headline) => {

        getPosts(headline).then((data) => {
            setLoading(false);
            setPosts(data);
        }).catch(() => {
            setLoading(false);
        });
    };

    // Event handler with html elements
    const onRowClick = (currentPost) => {
        if (!post) {
            setPost(currentPost);
        }
        else if (post._id !== currentPost._id) {
            setPost(currentPost);
        }
    };

    const styleChooseRow = (currentPost) => {
        if (post && post._id === currentPost._id) {
            return 'bg-primary';
        }

        return '';
    };

    const onSubmit = (e) => {
        e.preventDefault();

        getAndSetState(nameRef.current?.value);

        setSearchHistory(nameRef.current?.value);
    };

    return (
        <div className="modal-lg m-0" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Select Post</h4>
                    <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill" /></button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <div className="iq-search-bar members-search p-0">
                            <form onSubmit={onSubmit} className="searchbox w-auto">
                                <input type="text" className="text search-input bg-grey" placeholder="Type here to search..."
                                    ref={nameRef} />
                                <a className="search-link" type="submit"><i className="ri-search-line" /></a>
                            </form>
                        </div>
                    </div>

                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Headline</th>
                                <th scope="col">Date</th>
                                <th scope="col">Likes</th>
                                <th scope="col">Comments</th>
                                <th scope="col">Shares</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts && posts.length > 0 &&
                                posts.map(post => (
                                    <tr key={post._id}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => onRowClick(post)}
                                        className={styleChooseRow(post)}>
                                        <th scope="row">
                                            <img src={post.imageUrls?.[0]} className="img-fluid rounded-circle mr-3 avatar-40" alt="user" />
                                        </th>
                                        <td>{post.text}</td>
                                        <td>{dayjs(post.createdAt).format('DD/MM/YYYY')}</td>
                                        <td>{post.likes.length}</td>
                                        <td>{post.lengthOfComments}</td>
                                        <td>{post.share.users.length}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                    {isLoading && (
                        <div className="text-center mt-3">
                            <div className="spinner-border text-primary mb-2" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <p>Please wait...</p>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-white mr-2" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary"
                        disabled={!post}
                        onClick={() => closeModal()}>Save changes</button>
                </div>
            </div>
        </div>
    )
};

export default Posts;