import React from 'react';

const About = ({ user }) => {
    return (
        <div className="d-flex align-items-center">
            {user && (
                <>
                    <div className="chat-profile mr-3">
                        <img src={user.avatar} alt="chat-user" className="avatar-60 rounded-circle" />
                    </div>
                    <div className="chat-caption">
                        <h5 className="mb-0">{user.fullname}</h5>
                        <p className="m-0">{user.username}</p>
                    </div>
                </>
            )}
            <button type="submit" className="close-btn-res p-3"><i className="ri-close-fill" /></button>
        </div>
    );
};

export default React.memo(About);