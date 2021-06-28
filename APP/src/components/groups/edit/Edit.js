import React from 'react';
import { connect, useSelector } from 'react-redux';

import Core from '../create-group/core/Core';
import { editGroup } from '../../../actions/group';

const Edit = ({ editGroup, ...rest }) => {

    const group = useSelector((state) => {
        return state.group.group;
    })

    return <Core {...rest}
        edit={true}
        group={group}
        editGroup={editGroup} />
};

export default connect(null, { editGroup })(Edit);