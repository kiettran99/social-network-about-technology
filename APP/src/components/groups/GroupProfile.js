import React from 'react';
import { Link } from 'react-router-dom';

const GroupProfile = ({ group: { _id, name, avatar, lengthOfMembers, members = [] } }) => {
    return (

        <div className="col-lg-12">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="group-info d-flex align-items-center">
                    <div className="mr-3">
                        <img className="rounded-circle img-fluid avatar-100" src={avatar} alt="" />
                    </div>
                    <div className="info">
                        <h4>{name}</h4>
                        <p className="mb-0"><i className="las la-users pr-2" />Group . {lengthOfMembers} members</p>
                    </div>
                </div>
                <div className="group-member d-flex align-items-center">
                    <div className="iq-media-group mr-3">
                        {members.length > 0 && members.map(member => (
                            <Link to={`/profile/${member.user._id}`} className="iq-media" key={member._id}>
                                <img className="img-fluid avatar-40 rounded-circle" src={member.user.avatar} alt="" />
                            </Link>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-primary mb-2"><i className="ri-add-line" />Invite</button>
                </div>
            </div>
        </div>
    );
};

export default GroupProfile;