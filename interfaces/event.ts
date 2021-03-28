import * as mongoose from 'mongoose';

export default interface EventInterface extends mongoose.Document{
    name: string;
    email?: string;
    urlAddress?: string;
    location: string
    description: string;
    eventDate: Date;
    created: Date;
}