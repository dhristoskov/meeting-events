import * as mongoose from 'mongoose';

import RestaurantInterface from 'interfaces/restaurant';

const restaurantSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 2,
    },
    img: {
        type: String,
        require: false
    },
    email: {
        type: String, 
        required: false,
        default: 'no-data',
        minlength: 6
    },
    urlAddress: {
        type: String, 
        required: false,
        default: 'no-data'
    },
    location: { 
        type: String, 
        required: true
    },
    area: {
        type: String, 
        required: true
    },
    //To add more
    kitchen_type: {
        type: [ { type: String, enum: ['vegan', 'fast-food', 'vegetarian', 'bbq', 'fusion'] } ],
        required: true
    },
    hasGarten: {
        type: Boolean,
        require: true
    },
    priceLevel: {
        type: String,
        enum: ['low', 'medium', 'high', 'very high'],
        required: true
    },
    description: {
        type: String,
        required: true,
        default: 'no-data',
        minlength: 10
    },
    reservations: [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Reservation'
    }],
    newsletter: [{
        type: String,
        require: true
    }],
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

let Restaurant = mongoose.models.Restaurant || mongoose.model<RestaurantInterface>('Restaurant', restaurantSchema);
export default Restaurant;