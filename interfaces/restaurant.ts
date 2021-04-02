import * as mongoose from 'mongoose';

import ReservationInterface from './reservation';

export default interface RestaurantInterface extends mongoose.Document{
    name: string;
    img?: string;
    email?: string;
    urlAddress?: string;
    location: string;
    area: string;
    kitchen_type: string[];
    hasGarten: boolean;
    priceLevel: string[];
    description: string;
    reservations: ReservationInterface[];
    created: Date;
}