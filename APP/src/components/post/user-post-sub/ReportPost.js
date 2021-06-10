import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Report from './report/Report';
import DialogBox from '../../shared/DialogBox';

const RepostPost = ({ postId, userId }) => {

    const [isCanReport, setCanReport] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    const auth = useSelector(state => state.auth);

    const { user, isAuthenticated } = auth;

    useEffect(() => {
        if (user && isAuthenticated) {
            setCanReport(userId !== user._id);
        }
    }, [user, isAuthenticated]);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return isCanReport && (
        <>
            <a className="dropdown-item p-3" onClick={() => openModal()}>
                <div className="d-flex align-items-top">
                    <div className="icon font-size-20"><i className="ri-feedback-line" /></div>
                    <div className="data ml-2">
                        <h6>Report Post</h6>
                        <p className="mb-0">Let us know if it doesn't being.</p>
                    </div>
                </div>
            </a>
            <DialogBox props={{ modalIsOpen, closeModal, openModal, postId }} Component={Report} />
        </>
    );
};

export default RepostPost;