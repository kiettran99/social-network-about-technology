const BuildPart = require('../../models/build-part');

const createBuildPart = async (postId, hardware) => {
    try {
        const buildPart = await BuildPart.findOne({ post: postId });

        if (!buildPart) {
            await BuildPart.create({
                ...hardware,
                post: postId
            });
        }
    }
    catch (e) {
        console.log(e);
    }
};

module.exports = createBuildPart;