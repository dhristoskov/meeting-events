import * as mongoose from 'mongoose';

import CityInterface from 'interfaces/city';

const citySchema = new mongoose.Schema({
    city: { 
        type: String, 
        required: true
    },
    restaurants: [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Restaurant'
    }],
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

let City = mongoose.models.City || mongoose.model<CityInterface>('City', citySchema);
export default City;