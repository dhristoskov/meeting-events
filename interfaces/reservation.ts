import * as mongoose from 'mongoose';

export default interface ReservationInterface extends mongoose.Document{
    first_name: string;
    last_name: string;
    email: string;
    guests: number;
    restaurantName: string;
    restaurantAddress: string;
    restaurantCity: string;
    reservationDate: Date;
    confirmed: boolean;
    created: Date;
}