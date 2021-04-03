import React from 'react';
import { useHistory } from 'react-router-dom';

const Search = ({ users, setSearch }) => {

    const history = useHistory();

    const onHandleClickNextPage = (id) => {
        setSearch('');
        return history.push(`/messages/${id}`);
    };

    return (
        <ul className="iq-chat-ui nav flex-column nav-pills">
            { users.length > 0 && users.map(user => (
                <li key={user._id}
                    onClick={() => onHandleClickNextPage(user._id)}
                    style={{ cursor: 'pointer' }}>
                    <a data-toggle="pill">
                        <div className="d-flex align-items-center">
                            <div className="avatar mr-2">
                                <img src={user.avatar} alt="chatuserimage" className="avatar-50 rounded-circle" />
                                {user.available && <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success" /></span>}
                            </div>
                            <div className="chat-sidebar-name">
                                <h6 className="mb-0">{user.fullname}</h6>
                            </div>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default React.memo(Search);