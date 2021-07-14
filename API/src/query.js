const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0-44xwj.mongodb.net/social-network?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const User = require('./models/user');
const Profile = require('./models/profile');

const createProfile = async () => {
    try {

        const user = await User.findById('5f829c086c8dd7204c31b556');

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

createProfile()