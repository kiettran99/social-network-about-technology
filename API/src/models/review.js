const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const reviewSchema = new Schema({
    post: {
        type: ObjectId,
        ref: 'Post'
    },
    title: {
        type: String
    },
    isReview: {
        type: Boolean,
        default: false
    },
    type: {
        type: String
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    price: {
        type: String,
        default: ''
    },
    wallpaper: {
        type: String
    },
    descriptions: {
        general: {
            type: String
        },
        favorite: {
            type: String,
            default: ''
        },
        restrict: {
            type: String,
            default: ''
        }
    },
    link: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        enums: [
            0,  // deleted
            1,  // active
            2   // looked
        ],
        default: 1
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

