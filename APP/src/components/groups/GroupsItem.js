import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { joinGroup, unjoinGroup } from '../../actions/group';
import { connect } from 'react-redux';

const GroupsItem = ({ group: { _id, name, info, wallpaper, avatar, lengthOfMembers, members = [] },
    auth: { user, loading, isAuthenticated }, joinGroup, unjoinGroup, history
}) => {

    const [isJoinedGroup, setIsJoinedGroup] = useState(false);

    useEffect(() => {
        if (user && !loading) {
            const isMembered = members.filter(member => member.user._id === user._id).length > 0;

            setIsJoinedGroup(isMembered);
        }
    }, [user, loading, lengthOfMembers]);

    const onHandlAassociationGroup = () => {
        if (!loading) {
            if (!user || !isAuthenticated) {
                return history.push('/login');
            }

            if (isJoinedGroup) {
                setIsJoinedGroup(false);
                return unjoinGroup(_id);
            }

            joinGroup(_id);

            setIsJoinedGroup(true);
        }
    };

    return (
        <div className="col-md-6 col-lg-4">
            <div className="iq-card">
                <div className="top-bg-image">
                    {wallpaper && <img src={wallpaper} className="img-fluid w-100" alt="group-bg" />}
                </div>
                <div className="iq-card-body text-center">
                    <div className="group-icon">
                        {avatar && <img src={avatar} alt="profile-img" className="rounded-circle img-fluid avatar-120" />}
                    </div>
                    <div className="group-info pt-3 pb-3">
                        <h4 className="text-primary"><Link to={`/groups/${_id}`}>{name}</Link></h4>
                        <p>{info}</p>
                    </div>
                    <div className="group-details d-inline-block pb-3">
                        <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                            {/* <li className="pl-3 pr-3">
                                <p className="mb-0">Post</p>
                                <h6>600</h6>
                            </li> */}
                            <li className="pl-3 pr-3">
                                <p className="mb-0">Member</p>
                                <h6>{members && lengthOfMembers}</h6>
                            </li>
                            {/* <li className="pl-3 pr-3">
                                <p className="mb-0">Visit</p>
                                <h6>1.2k</h6>
                            </li> */}
                        </ul>
                    </div>
                    <div className="group-member mb-3">
                        <div className="iq-media-group">
                            {members && members.map(member => (
                                <Link to={`/profile/${member.user._id}`} className="iq-media" key={member._id}>
                                    <img className="img-fluid avatar-40 rounded-circle" src={member.user.avatar} alt="" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary d-block w-100"
                        onClick={() => onHandlAassociationGroup()}>{isJoinedGroup ? 'UnJoin' : 'Join'}</button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { joinGroup, unjoinGroup })(withRouter(GroupsItem));