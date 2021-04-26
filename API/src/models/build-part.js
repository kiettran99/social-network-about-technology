const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const buildPartSchema = new Schema({
    post: {
        type: ObjectId,
        ref: 'Post'
    },
    hardwares: [{
        hardware: {
            type: ObjectId,
            ref: 'Hardware'
        },
        quanity: {
            type: Number,
            default: 1
        }
    }],
    ratings: [{
        user: {
            type: ObjectId,
            ref: 'User'
        },
        overall: {
            type: Number,
            default: 0
        }
    }],
    score: {
        rating: {
            type: Number
        },
        count: {
            type: Number
        }
    }
});

const BuildPart = mongoose.model('BuildPart', buildPartSchema);

module.exports = BuildPart;

