const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const reportSchema = new Schema({
    target: {
        type: ObjectId
    },
    type: {
        type: String
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    },
    images: [{
        type: String
    }],
}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;