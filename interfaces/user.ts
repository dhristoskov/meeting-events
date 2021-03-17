import * as mongoose from 'mongoose';

export interface UserInterface extends mongoose.Document{
    username: string
    email?: string;
    password: string;
    created: Date;
}