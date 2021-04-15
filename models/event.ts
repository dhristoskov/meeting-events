import * as mongoose from 'mongoose';

import EventInterface from 'interfaces/event';

const eventSchema = new mongoose.Schema({
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
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        required: true,
        default: 'no-data',
        minlength: 10
    },
    eventDate: {
        type: Date,
        require: true
    },
    reservations: [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Reservation'
    }],
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

let Event = mongoose.models.Restaurant || mongoose.model<EventInterface>('Event', eventSchema);
export default Event;