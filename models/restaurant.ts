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
    description: {
        type: String,
        required: true,
        default: 'no-data',
        minlength: 10
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

let Restaurant = mongoose.models.Restaurant || mongoose.model<RestaurantInterface>('Restaurant', restaurantSchema);
export default Restaurant;