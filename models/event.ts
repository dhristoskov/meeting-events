import * as mongoose from 'mongoose';

import EventInterface from 'interfaces/event';

const eventSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 2,
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
    eventDate: {
        type: Date,
        require: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

let Event = mongoose.models.Restaurant || mongoose.model<EventInterface>('Event', eventSchema);
export default Event;