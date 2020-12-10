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

/**
 * @desc Calculate to Rating.
 * @example Example: [{ user: 'u1', rating: 5}] ->  {"5": 1} -> { rating: 5, count: 1}
 * @param ratings array
 */
const calulateRating = (ratings) => {
    const input = countRatingByGroup(ratings);

    let total = 0;
    let totalOfRatings = 0;

    for (const [key, value] of Object.entries(input)) {
        total += parseInt(key) * value;
        totalOfRatings += value;
    }

    if (totalOfRatings === 0) {
        return 0;
    }

    return {
        rating: (total / totalOfRatings).toFixed(1),
        count: totalOfRatings
    };
}

/**
 * @desc Mapping array to count by group.
 * @example Example: [{ user: 'u1', rating: 5}] ->  {"5": 1}
 * @param ratings array
 */
const countRatingByGroup = (ratings) => {
    const result = ratings.reduce((obj, value) => {
        obj[value.overall] = (obj[value.overall] || 0) + 1;
        return obj;
    }, {});

    return result;
}

module.exports = { createBuildPart, calulateRating };