const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const reviewSchema = new Schema({
    post: {
        type: ObjectId,
        ref: 'Post'
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    price: {
        type: String
    },
    wallpaper: {
        type: String
    },
    descriptions: {
        general: {
            type: String
        },
        favorite: {
            type: String
        },
        restrict: {
            type: String
        }
    },
    link: {
        type: String
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

