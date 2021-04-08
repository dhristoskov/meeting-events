import * as mongoose from 'mongoose';

import ReservationInterface from 'interfaces/reservation';

const reservationSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: true,
        minlength: 2,
    },
    last_name: { 
        type: String, 
        required: true,
        minlength: 3,
    },
    email: {
        type: String, 
        required: true,
        minlength: 6
    },
    guests: {
        type: Number,
        require: true
    },
    restaurantId: {
        type: String, 
        required: true,
    },
    restaurantName: {
        type: String, 
        required: true,
    },
    restaurantAddress: {
        type: String, 
        required: true,
    },
    restaurantCity: {
        type: String, 
        required: true,
    },
    reservationDate: {
        type: Date,
        require: true
    },
    confirmed: {
        type: Boolean,
        require: true,
        default: false
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

let Reservation = mongoose.models.Reservation || mongoose.model<ReservationInterface>('Reservation', reservationSchema);
export default Reservation;