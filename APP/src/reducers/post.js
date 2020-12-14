import {
    ADD_POST, GET_POSTS, GET_POST, REMOVE_POST,
    CLEAR_POST, POST_ERROR, GET_MORE_POSTS,
    ADD_COMMENT, REMOVE_COMMENT, UPDATE_LIKES,
    UPDATE_LIKES_COMMENT, ADD_REPLY_COMMENT, REMOVE_REPLY_COMMENT,
    UPDATE_LIKES_REPLY, GET_MORE_COMMENTS, GET_MORE_REPLIES,
    GET_LENGTH_POSTS, EDIT_POST
} from '../actions/types';

const initialState = {
    posts: [],
    count: 0,
    post: null,
    loading: true,
    isInPosts: true,
    errors: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_POST:
            return {
                ...state,
                loading: false,
                posts: [payload, ...state.posts]
            };
        case GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: payload,
                isInPosts: true
            };
        case GET_LENGTH_POSTS:
            return {
                ...state,
                count: payload
            };
        case GET_MORE_POSTS:
            return {
                ...state,
                loading: false,
                posts: [...state.posts, ...payload]
            };
        case GET_MORE_COMMENTS:
            return {
                ...state,
                loading: false,
                post: {
                    ...state.post,
                    comments: [...state.post.comments, ...payload]
                }
            };
        case GET_MORE_REPLIES:
            return {
                ...state,
                loading: false,
                post: {
                    ...state.post,
                    comments: state.post.comments.map(comment => {
                        if (comment._id === action.commentId) {
                            return {
                                ...comment,
                                replies: [...comment.replies, ...payload]
                            };
                        }
                        return comment;
                    })
                }
            };
        case GET_POST:
            return {
                ...state,
                loading: false,
                post: payload,
                isInPosts: false
            };
        case CLEAR_POST:
        case REMOVE_POST:
            return {
                ...state,
                loading: true,
                post: null
            };
        case UPDATE_LIKES:
            return state.isInPosts ? {
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
            } : {
                    ...state,
                    loading: false,
                    post: {
                        ...state.post,
                        likes: payload
                    }
                };
        case UPDATE_LIKES_COMMENT:
            return {
                ...state,
                loading: false,
                post: {
                    ...state.post,
                    comments: state.post.comments.map(comment => {
                        if (comment._id === action.commentId) {
                            return {
                                ...comment,
                                likes: payload
                            };
                        }
                        return comment;
                    })
                }
            };
        case ADD_REPLY_COMMENT:
            return {
                ...state,
                loading: false,
                post: {
                    ...state.post,
                    comments: state.post.comments.map(comment => {
                        if (comment._id === action.commentId) {
                            return {
                                ...comment,
                                replies: [payload, ...comment.replies],
                                lengthOfReplies: comment.lengthOfReplies + 1
                            };
                        }
                        return comment;
                    })
                }
            };
        case REMOVE_REPLY_COMMENT:
            return {
                ...state,
                loading: false,
                post: {
                    ...state.post,
                    comments: state.post.comments.map(comment => {
                        if (comment._id === action.commentId) {
                            return {
                                ...comment,
                                replies: comment.replies.filter(reply => reply._id !== payload),
                                lengthOfReplies: comment.lengthOfReplies - 1
                            };
                        }
                        return comment;
                    })
                }
            };
        case UPDATE_LIKES_REPLY:
            return {
                ...state,
                loading: false,
                post: {
                    ...state.post,
                    comments: state.post.comments.map(comment => {
                        if (comment._id === action.commentId) {
                            return {
                                ...comment,
                                replies: comment.replies.map(reply => {
                                    if (reply._id === action.replyId)
                                        return {
                                            ...reply,
                                            likes: payload
                                        };
                                    return reply;
                                })
                            };
                        }
                        return comment;
                    })
                }
            };
        case ADD_COMMENT:
            return {
                ...state,
                loading: false,
                post: {
                    ...state.post,
                    comments: [payload, ...state.post.comments],
                    lengthOfComments: state.post.lengthOfComments + 1
                }
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                loading: false,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload),
                    lengthOfComments: state.post.lengthOfComments - 1
                }
            };
        case EDIT_POST:
            return state.isInPosts ? {
                ...state,
                loading: false,
                posts: state.posts.map(post => {
                    if (post._id === payload._id) {
                        return post;
                    }
                })           
            } : {
                ...state,
                loading: false,
                post: payload
            }
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