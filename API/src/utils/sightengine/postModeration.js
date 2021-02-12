const Post = require('../../models/post');
const { nudityModeration } = require('./imageModeration');

const postModeration = async (postId, images) => {

    // If images has one change into array.
    if (typeof images !== 'object') {
        images = [images];
    }

    try {
        const detections = await images.reduce(async (moderation, image) => {

            // Call API to Analysis image.
            const result = await nudityModeration(image);
            moderation.push(nudityDetect(result));

            return moderation;
        }, []);

        // Check true if array of boolean all true.
        const checker = detections.every(Boolean);

        // if true pass, fasle looked this post.
        if (checker) {
            await Post.findByIdAndUpdate(postId, {
                status: 3   // Looked
            });
        }
    }
    catch (e) {
        console.log(e);
    }
};

const nudityDetect = (result) => {
    if (result) {
        const { nudity } = result;

        if (nudity.raw >= Math.max(nudity.partial, nudity.safe)) {
            //  the image contains raw nudity.
            return true;
        }
        else {
            if (nudity.partial >= Math.max(nudity.raw, nudity.safe))
                // the image contains partial nudity. 
                return true;
        }
    }

    return false;
};

module.exports = postModeration;