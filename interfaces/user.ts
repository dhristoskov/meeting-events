import * as mongoose from 'mongoose';

import RestaurantInterface from './restaurant';

export default interface UserInterface extends mongoose.Document{
    username: string
    email?: string;
    avatar: string;
    password: string;
    role: string;
    favorites: RestaurantInterface[]
    created: Date;
}