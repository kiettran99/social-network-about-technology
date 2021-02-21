import {
    GET_GROUPS, GET_GROUP, GROUP_ERROR, CLEAR_GROUP,
    GET_MORE_GROUPS, JOIN_GROUP, UNJOIN_GROUP, ADD_GROUP, RESET_GROUP
} from '../actions/types';

const initState = {
    groups: [],
    group: null,
    loading: false,
    errors: {},
    search: ''
};

export default function (state = initState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: payload,
                loading: false,
                search: action.name
            };
        case GET_MORE_GROUPS:
            return {
                ...state,
                groups: [...state.groups, ...payload],
                loading: false
            }
        case CLEAR_GROUP:
            return {
                ...state,
                group: null,
                loading: true
            };
        case GET_GROUP:
            return {
                ...state,
                group: payload,
                loading: false
            };
        case JOIN_GROUP:
            return {
                ...state,
                groups: state.groups.map(group => {
                    if (group._id === action.groupId) {
                        return {
                            ...group,
                            members: payload,
                            lengthOfMembers: group.lengthOfMembers + 1
                        };
                    }

                    return group;
                })
            };
        case UNJOIN_GROUP:
            return {
                ...state,
                groups: state.groups.map(group => {
                    if (group._id === action.groupId) {
                        return {
                            ...group,
                            members: payload,
                            lengthOfMembers: group.lengthOfMembers - 1
                        };
                    }

                    return group;
                })
            };
        case ADD_GROUP:
            return {
                ...state,
                loading: false,
                groups: [payload, ...state.groups]
            }
        case GROUP_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        case RESET_GROUP:
            return initState;
        default:
            return state;
    }
}