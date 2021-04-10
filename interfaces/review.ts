import * as mongoose from 'mongoose';

import UserInterface from './user';

export default interface ReviewInterface extends mongoose.Document{
    stars: number;
    context: string;
    username: String;
    user: UserInterface;
    created: Date;
}