const { nudityModeration } = require('./imageModeration');
const { Document } = require('mongoose');

/**
 * @desc Post moderates filter images to safe images
 * @param {Document} post 
 */
const postModeration = async (post) => {

    try {
        const images = post?.imageUrls;

        // If images has one change into array.
        if (typeof images !== 'object') {
            images = [images];
        }

        const moderations = [];

        // Safe Images from post
        const safeImages = [];

        for (const image of images) {
            const result = await nudityModeration(image);

            // Return result
            const moderation = nudityDetect(result);

            moderations.push(moderation);

            if (!moderation) {
                safeImages.push(image);
            }

        }

        // Check true if array of boolean all true.
        const checker = hasTrueInArray(moderations);

        // if true pass, fasle looked this post.
        if (checker) {
            post.imageUrls = safeImages;
            await post.save();
        }

        return checker;
    }
    catch (e) {
        console.log(e);
    }
};

const hasTrueInArray = (arr) => {
    for (const element of arr) {
        if (element) return true;
    }
    return false;
}

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