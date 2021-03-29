import * as mongoose from 'mongoose';

export default interface RestaurantInterface extends mongoose.Document{
    name: string;
    img?: string;
    email?: string;
    urlAddress?: string;
    location: string
    description: string;
    created: Date;
}