const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const Faq = mongoose.model('Faq', faqSchema);

module.exports = Faq;