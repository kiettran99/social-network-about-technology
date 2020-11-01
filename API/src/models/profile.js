const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;