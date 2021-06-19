import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { getUser, lockAcc, unlockAcc } from '../../../services/report';

const ReactCarousel = React.lazy(() => import('./carousel/ReactCarousel'));

const ReportUser = ({ closeModal, detail }) => {

    const [target, setTarget] = useState(null);
    const [posts, setPosts] = useState(0);

    useEffect(() => {
        if (detail) {
            getUser(detail.target).then((data) => {
                setTarget(data.user);
                setPosts(data.posts.length);
            }).catch(e => {
                console.log(e);
            });
        }
    }, [detail]);

    const blockUser = async () => {
        try {
            if (target && target.status === 1) {
                await lockAcc(target._id);

                setTarget(state => ({
                    ...state,
                    status: 2
                }));
            }
            else {
                await unlockAcc(target._id);
                setTarget(state => ({
                    ...state,
                    status: 1
                }));
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
                                            <h4>Object</h4>
                                            <p>{target.fullname} - {dayjs(target.createdAt).format('MM-DD-YYYY HH:ss:mm')}</p>
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-6">
                                        <h4>Action</h4>
                                        <div className="form-group">
                                            {target && (
                                                <p>{target.fullname} has {posts} invvalid posts.</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            {target && target.status === 1 ? (
                                                <button className="btn btn-primary ml-sm-2" onClick={blockUser}>Lock User</button>
                                            ) : <button className="btn btn-warning" onClick={blockUser}>Unlock User</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <h4>Attach Report</h4>
                                <React.Suspense fallback={<div>Loading ...</div>}>
                                    <ReactCarousel images={detail.images} />
                                </React.Suspense>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportUser;