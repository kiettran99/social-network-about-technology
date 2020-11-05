import {
    ADD_POST, GET_POSTS, GET_POST, REMOVE_POST,
    CLEAR_POST, POST_ERROR, GET_MORE_POSTS,
    ADD_COMMENT, REMOVE_COMMENT, UPDATE_LIKES,
    UPDATE_LIKES_COMMENT, ADD_REPLY_COMMENT, REMOVE_REPLY_COMMENT,
    UPDATE_LIKES_REPLY, GET_MORE_COMMENTS
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    errors: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_POST:
            return {
                ...state,
                loading: false,
                posts: [...state.posts, payload]
            };
        case GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: payload
            };
        case GET_MORE_POSTS:
            return {
                ...state,
                loading: false,
                posts: [...state.posts, ...payload]
            };
        case GET_POST:
            return {
                ...state,
                loading: false,
                post: payload
            };
        case CLEAR_POST:
            return {
                ...state,
                loading: true,
                post: null
            };
        case UPDATE_LIKES:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post => {
                    if (post._id === action.id) {
                        return {
                            ...post,
                            likes: payload
                        }
                    }
                    return post;
                })
            };
        case UPDATE_LIKES_COMMENT:
        case ADD_REPLY_COMMENT:
        case REMOVE_REPLY_COMMENT:
        case UPDATE_LIKES_REPLY:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post => {
                    if (post._id === action.id) {
                        return {
                            ...post,
                            comments: post.comments.map(comment => {
                                if (comment._id === payload._id) {
                                    return payload;
                                }
                                return comment;
                            })
                        }
                    }
                    return post;
                })
            };
        case REMOVE_POST:
            const { posts: { _id } } = payload;
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(post => post._id !== _id)
            };
        case ADD_COMMENT:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post => {
                    if (post._id === action.id) {
                        return {
                            ...post,
                            comments: payload
                        }
                    }
                    return post;
                })
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post => {
                    if (post._id === action.id) {
                        console.log(payload);
                        return {
                            ...post,
                            comments: post.comments.filter(comment => comment._id !== payload)
                        }
                    }
                    return post;
                })
            };
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        default:
            return state;
    }
};