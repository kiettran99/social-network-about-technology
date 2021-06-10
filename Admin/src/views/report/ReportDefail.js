import React, { useEffect, useState } from 'react';

import moment from 'moment';
import ReactQuill from 'react-quill';

import { blockPost, getPost, getUser, lockAcc, unblockPost, unlockAcc } from '../../services/report';

const ReportDetail = ({ closeModal, detail }) => {

    const [target, setTarget] = useState(null);
    const [publisher, setPubliser] = useState(null);
    const [posts, setPosts] = useState(0);

    useEffect(() => {
        if (detail) {
            getPost(detail.target).then((target) => {
                setTarget(target);

                getUser(target.user).then((publisher) => {
                    setPubliser(publisher.user);
                    setPosts(publisher.posts.length);
                })
            }).catch(e => {
                console.log(e);
            });
        }
    }, [detail]);

    const blockUser = async () => {
        try {
            if (publisher && publisher.status === 1) {
                await lockAcc(publisher._id);

                setPubliser(state => ({
                    ...state,
                    status: 2
                }));
            }
            else {
                await unlockAcc(publisher._id);
                setPubliser(state => ({
                    ...state,
                    status: 1
                }));
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleBlockPost = async () => {
        try {
            if (target && target.status === 1) {
                await blockPost(target._id);

                setTarget(state => ({
                    ...state,
                    status: 2
                }));

                setPosts(state => state + 1);
            }
            else {
                await unblockPost(target._id);
                setTarget(state => ({
                    ...state,
                    status: 1
                }));

                setPosts(state => state > 0 ? state - 1 : state);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="modal-dialog modal-lg m-0" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Report</h4>
                    <button onClick={() => closeModal()} type="button" className="btn btn-danger text-white" data-dismiss="modal">X</button>
                </div>
                <div className="modal-body">
                    {target && (
                        <div className="container row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group">
                                            <h4>Requester</h4>
                                            <p>{detail.owner.fullname}</p>
                                        </div>

                                        <div className="form-group">
                                            <h4>Description</h4>
                                            <p>{detail.description}</p>
                                        </div>

                                        <div className="form-group">
                                            <h4>Published By </h4>
                                            <p>{target.name} - {moment(target.createdAt).format('MM-DD-YYYY HH:ss:mm')}</p>
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-6">
                                        <h4>Action</h4>
                                        <div className="form-group">
                                            {publisher && (
                                                <p>{publisher.fullname} has {posts} invvalid posts.</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            {target && target.status === 1 ? (
                                                <button className="btn btn-primary" onClick={handleBlockPost}>Lock Post</button>
                                            ) : (<button className="btn btn-warning" onClick={handleBlockPost}> Unlock Post</button>)}
                                            {publisher && publisher.status === 1 ? (
                                                <button className="btn btn-primary ml-sm-2" onClick={blockUser}>Lock Publisher</button>
                                            ) : <button className="btn btn-warning" onClick={blockUser}>Unlock Publisher</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group">
                                    <h4>Post</h4>
                                    <ReactQuill
                                        theme='bubble'
                                        value={target.text || ''}
                                        readOnly={true} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportDetail;