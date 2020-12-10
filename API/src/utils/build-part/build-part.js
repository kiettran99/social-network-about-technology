const BuildPart = require('../../models/build-part');

const createBuildPart = async (post, hardware) => {
    try {
        const buildPart = await BuildPart.findOne({ post: post._id });

        if (!buildPart) {
            // Sort and Mapping
            const buildParts = JSON.parse(hardware).sort((a, b) => {
                if (a.priority < b.priority)
                    return -1;
                else if (a.priority > b.priority)
                    return 1;
                else return 0;
            })
            // .map(buildPart => ({ hardware: buildPart.hardware }));
            // console.log(buildParts);

            const newDocument = await BuildPart.create({
                hardwares: buildParts,
                post: post._id
            });

            post.buildParts = newDocument._id;
            await post.save();
        }
    }
    catch (e) {
        console.log(e);
    }
};

module.exports = createBuildPart;