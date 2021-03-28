import * as mongoose from 'mongoose';

export default interface UserInterface extends mongoose.Document{
    username: string
    email?: string;
    avatar: string;
    password: string;
    role: string;
    created: Date;
}