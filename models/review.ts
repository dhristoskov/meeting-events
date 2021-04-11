import * as mongoose from 'mongoose';

import ReviewInterface from 'interfaces/review';

const reviewSchema = new mongoose.Schema({
    stars: { 
        type: Number, 
        required: true,
        min: 1,
        max: 10
    },
    context: {
        type: String,
        require: true,
        minLength: 20
    },
    username: {
        type: String,
        require: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Restaurant'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

let Review = mongoose.models.Review || mongoose.model<ReviewInterface>('Review', reviewSchema);
export default Review;