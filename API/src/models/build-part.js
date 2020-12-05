const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const buildPartSchema = Schema({
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
    }]
});

const BuildPart = mongoose.model('BuildPart', buildPartSchema);

module.exports = BuildPart;

