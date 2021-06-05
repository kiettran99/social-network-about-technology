import editor from '../../components/post/user-post-sub/editor/editor';

export const createQueryName = (name) => {
    // 0. Extract hashtags from name
    const hashtags = editor.convertHashTagToArray(name);

    // 1. Create a object to post body request
    if (hashtags && hashtags.length > 0) {
        return {
            hashtags
        };
    }

    return {
        headline: name
    };
};