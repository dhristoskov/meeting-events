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
    reservationDate: {
        type: Date,
        require: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

let Reservation = mongoose.models.Reservation || mongoose.model<ReservationInterface>('Reservation', reservationSchema);
export default Reservation;