import React, { useState } from 'react';
import DialogBox from '../../shared/DialogBox';
import Core from './core/Core';

const CreateGroup = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return (
        <>
            <div className="row">
                <div className="col-8">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="iq-card-title">Groups</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <ul className="list-inline p-0 m-0">
                                <li className="mb-3 pb-3 border-bottom">
                                    <div className="iq-search-bar members-search p-0">
                                        <form action="group-detail.html#" className="searchbox w-auto">
                                            <input type="text" className="text search-input bg-grey" placeholder="Type here to search..." />
                                            <a className="search-link" href="group-detail.html#"><i className="ri-search-line" /></a>
                                        </form>
                                    </div>
                                </li>
                                <li className="mb-3 d-flex align-items-center">
                                    <div className="avatar-40 rounded-circle bg-grey text-center mr-3"><i className="ri-bank-card-line font-size-20" /></div>
                                    <h6 className="mb-0">Your Feed</h6>
                                </li>
                                <li className="mb-3 d-flex align-items-center">
                                    <div className="avatar-40 rounded-circle bg-grey text-center mr-3"><i className="ri-compass-3-line font-size-20" /></div>
                                    <h6 className="mb-0">Discover</h6>
                                </li>
                                <li>
                                    <button className="btn btn-primary d-block w-100"
                                        onClick={() => openModal()}>
                                        <i className="ri-add-line pr-2" />Create New Group
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="iq-card-title">Privacy</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <ul className="list-inline p-0 m-0">
                                <li className="mb-3">
                                    <p className="mb-0">Introduction</p>
                                </li>
                                <li className="mb-3">
                                    <h6><i className="ri-lock-fill pr-2" />Public</h6>
                                    <p className="mb-0 pl-4">Everyone can join and share in group.</p>
                                </li>
                                <li className="mb-3">
                                    <h6><i className="ri-eye-fill pr-2" />Private</h6>
                                    <p className="mb-0 pl-4">Only menbers can view and post.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <DialogBox props={{ modalIsOpen, closeModal, openModal }} Component={Core} />
        </>
    );
};

export default CreateGroup;