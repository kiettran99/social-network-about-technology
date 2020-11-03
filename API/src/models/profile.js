const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    city: {
        type: String
    },
    age: {
        type: String
    },
    maritalStatus: {
        type: String
    },
    address: {
        type: String
    },
    job: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    url: {
        type: String
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;