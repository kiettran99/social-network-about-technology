const Profile = require('../models/profile');

const createProfile = async (user) => {
    try {
        const profile = await Profile.findOne({ user: user._id });

        if (!profile) {
            await Profile.create({
                user: user._id
            });
        }
    }
    catch (e) {
        console.log(e);
    }
};

module.exports = createProfile;