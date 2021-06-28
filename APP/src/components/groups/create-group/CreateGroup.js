import React, { useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';

import DialogBox from '../../shared/DialogBox';
import Core from './core/Core';
import { getGroupsByTab } from '../../../actions/group';

const CreateGroup = ({ getGroupsByTab }) => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const auth = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated
    }));

    const group = useSelector((state) => ({
        name: state.group.name,
        length: state.groups?.length || 5
    }));

    const nameRef = useRef();

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const getCurrentTab = () => {
        const $tabOne = document.getElementById('group-tab-one');
        const $tabTwo = document.getElementById('group-tab-two');
        const $tabThree = document.getElementById('group-tab-three');

        if ($tabOne && $tabOne.className.includes('active')) {
            return 0;
        }

        if ($tabTwo && $tabTwo.className.includes('active')) {
            return 1;
        }

        if ($tabThree && $tabThree.className.includes('active')) {
            return 2;
        }

        // Default
        return 0;
    }

    // Handle submit form to search group
    const onSubmit = (e) => {
        e.preventDefault();

        getGroupsByTab(0, group.length, nameRef.current.value, getCurrentTab(), () => {

        });
    };

    return (
        <>
            <div className="row">
                <div className="col-lg-8 col-12">
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
                                        <form onSubmit={onSubmit} className="searchbox w-auto">
                                            <input type="text" className="text search-input bg-grey" placeholder="Type here to search..."
                                                ref={nameRef} value={group.name} />
                                            <a className="search-link" type="submit"><i className="ri-search-line" /></a>
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
                                {auth.isAuthenticated && (
                                    <li>
                                        <button className="btn btn-primary d-block w-100"
                                            onClick={() => openModal()}>
                                            <i className="ri-add-line pr-2" />Create New Group
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12">
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
                                    <h6><i className="ri-earth-fill pr-2" />Public</h6>
                                    <p className="mb-0 pl-4">Everyone can join and share in group.</p>
                                </li>
                                <li className="mb-3">
                                    <h6><i className="ri-lock-fill pr-2" />Private</h6>
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

export default connect(null, { getGroupsByTab })(CreateGroup);