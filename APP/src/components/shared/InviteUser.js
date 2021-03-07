import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { searchUser } from '../groups/services/groupServices';

const InviteUser = ({ closeModal, configs: { action, title, type, tags } = {} }) => {

    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [message, setMessage] = useState(null);
    const [isWaiting, setWating] = useState(false);

    const searchRef = useRef();

    const group = useSelector(state => state.group.group);

    useEffect(() => {
        if (tags && tags.length > 0) {
            setSelectedUsers(tags);
        }
        searchUser().then(data => {
            switch (type) {
                case 'GROUP':
                    setUsers(data.map(datum => ({
                        ...datum,
                        isJoinedGroup: !!group?.members.find(member => member._id === datum._id)
                    })));
                default:
                    setUsers(data);
            }
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        searchUser(searchRef.current?.value).then(data => setUsers(data));
    };

    const onHandleAddUser = (user) => {
        const isAdded = selectedUsers.find(selectedUser => selectedUser._id == user._id);

        if (!isAdded) {
            setSelectedUsers(state => [...state, user]);
        }
    };

    const addInviteUser = () => {
        action(selectedUsers, setMessage, setWating);
    };

    const onHandleRemoveUser = (selectedUser) => {
        setSelectedUsers(state => state.filter(user => user._id !== selectedUser._id));
    };

    return (
        <div className="modal-dialog modal-lg m-0" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                    <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill m-0" /></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-12">
                                    <ul className="list-inline p-0 m-0">
                                        <li className="mb-3 pb-3 border-bottom">
                                            <div className="iq-search-bar members-search p-0">
                                                <form onSubmit={onSubmit} className="searchbox w-auto">
                                                    <input type="text" className="text search-input bg-grey" placeholder="Type here to search..."
                                                        ref={searchRef} />
                                                    <a className="search-link" type="submit"><i className="ri-search-line" /></a>
                                                </form>
                                            </div>
                                        </li>
                                        {users.length > 0 && users.map(user => (
                                            <li key={user._id} className="mb-3 d-flex justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-img img-fluid avatar-40 rounded-circle bg-grey text-center mr-3"><img src={user.avatar} alt="#" className="rounded-circle avatar-40" /></div>
                                                    <h6 className="mb-0">{user.fullname}</h6>
                                                </div>
                                                <button type="button" className="btn btn-primary"
                                                    onClick={() => onHandleAddUser(user)}>
                                                    <i className="ri-add-line m-0" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="p-1">
                                <p className="mb-2">You selected {selectedUsers.length} users.</p>
                                <ul className="list-inline p-0 m-0">
                                    {selectedUsers.length > 0 && selectedUsers.map(selectedUser => (
                                        <li key={selectedUser._id} className="mb-3 d-flex justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="user-img img-fluid avatar-40 rounded-circle bg-grey text-center mr-3"><img src={selectedUser.avatar} alt="#" className="rounded-circle avatar-40" /></div>
                                                <h6 className="mb-0">{selectedUser.fullname}</h6>
                                            </div>
                                            <button type="button" className="btn"
                                                onClick={() => onHandleRemoveUser(selectedUser)}>
                                                <i className="ri-close-line m-0" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    {message && (
                        <div className="form-group">
                            <span className="text-primary">{message}</span>
                        </div>
                    )}
                    {isWaiting ? (
                        <button type="button" className="btn btn-primary mr-2" disabled={true}>
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                             Loading...
                        </button>
                    ) : (
                        <button type="button" className="btn btn-primary"
                            onClick={() => addInviteUser()}>Save changes</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InviteUser;