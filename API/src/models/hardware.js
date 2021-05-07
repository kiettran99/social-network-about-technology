const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hardwareSchema = new Schema({
    category: {
        type: String
    },
    value: {
        type: Number
    },
    brand: {
        type: String
    },
    part: {
        type: String
    },
    type: {
        type: String
    },
    description: {
        type: String
    },
    link: {
        type: String
    },
    benchmark: {
        type: Number
    },
    hardwareValue: {
        type: Number
    }
}, {
    timestamps: true
});

const Hardware = mongoose.model('Hardware', hardwareSchema);

module.exports = Hardware;