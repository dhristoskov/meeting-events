import * as mongoose from 'mongoose';

export default interface ReservationInterface extends mongoose.Document{
    userId?: string;
    first_name: string;
    last_name: string;
    email: string;
    guests: number;
    restaurantId: string;
    restaurantName: string;
    restaurantAddress: string;
    restaurantCity: string;
    reservationDate: Date;
    confirmed: boolean;
    created: Date;
}