import * as mongoose from 'mongoose';

import ReservationInterface from './reservation';
import RestaurantInterface from './restaurant';

export default interface UserInterface extends mongoose.Document{
    username: string
    email?: string;
    avatar: string;
    password: string;
    role: string;
    favorites: RestaurantInterface[];
    reservations: ReservationInterface[];
    created: Date;
}