import * as mongoose from 'mongoose';

import ReservationInterface from './reservation';

export default interface EventInterface extends mongoose.Document{
    name: string;
    img?: string;
    email?: string;
    urlAddress?: string;
    location: string;
    area: string;
    price: number;
    description: string;
    eventDate: Date;
    reservations: ReservationInterface[];
    created: Date;
}