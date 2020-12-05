const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hardwareSchema = Schema({
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
    }
});

const Hardware = mongoose.model('Hardware', hardwareSchema);

module.exports = Hardware;