import React, { useState, useRef, memo } from 'react';
import { connect } from 'react-redux';

import { addGroup } from '../../../../actions/group';

const Core = ({ closeModal, addGroup }) => {

    const [isPublic, setIsPublic] = useState(true);

    const [isVisible, setIsVisible] = useState(true);

    const [message, setMessage] = useState(null);

    const [isWaiting, setWating] = useState(false);

    const nameRef = useRef();
    const infoRef = useRef();

    const styleButtonPrivacy = (isPublic) => {
        return isPublic ? 'btn-primary' : 'btn-outline-primary';
    }

    const styleButtonVisible = (isVisible) => {
        return isVisible ? 'btn-primary' : 'btn-outline-primary';
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const name = nameRef.current?.value;
        const info = infoRef.current?.value;

        setWating(true);

        addGroup({ name, info }, (message, type) => {
            setMessage(message);
            setWating(false);

            setTimeout(() => {
                if (type) {
                    closeModal();
                    document.getElementById('groupList').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }, 1500);
        });
    }

    return (
        <div className="modal-dialog modal-lg m-0" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Create Group</h4>
                    <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill" /></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="cname">Name Group:</label>
                            <div data-toggle="tooltip" title="Name shouldn't have special character and exceed 255 characters." className="btn btn-link float-right">Tips</div>
                            <input type="text" className="form-control" id="cname" placeholder="Technology Group"
                                ref={nameRef} />
                        </div>
                        <div className="form-group">
                            <div className="d-flex justify-content-start">
                                <div className="mr-2">
                                    <p className="mb-0">Privacy:</p>
                                    <div className="btn-group">
                                        <button type="button" className={`btn ${styleButtonPrivacy(isPublic)}`}
                                            onClick={() => setIsPublic(true)}>
                                            <i className="ri-earth-fill"></i>Public</button>
                                        <button type="button" className={`btn ${styleButtonPrivacy(!isPublic)}`}
                                            onClick={() => setIsPublic(false)}>
                                            <i className="ri-lock-fill"></i>Private</button>
                                    </div>
                                </div>

                                {!isPublic && (
                                    <div className="ml-2">
                                        <p className="mb-0">Can See: </p>
                                        <div className="btn-group">
                                            <button type="button" className={`btn ${styleButtonVisible(isVisible)}`}
                                                onClick={() => setIsVisible(true)}><i className="ri-eye-fill"></i>Visible</button>
                                            <button type="button" className={`btn ${styleButtonVisible(!isVisible)}`}
                                                onClick={() => setIsVisible(false)}><i className="ri-eye-off-fill"></i>Hidden</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="info">Info:</label>
                            <textarea type="text" className="form-control" id="info" placeholder="Reviewing product technology about smartphones and new pcs."
                                ref={infoRef} />
                        </div>
                        {message && (
                            <div className="form-group">
                                <span className="text-success">{message}</span>
                            </div>
                        )}
                        {isWaiting ? (
                            <button type="button" className="btn btn-primary mr-2" disabled={true}>
                                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                 Loading...
                            </button>
                        ) : (
                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                            )}
                        <button type="reset" className="btn iq-bg-danger">Clear</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default connect(null, { addGroup })(memo(Core));