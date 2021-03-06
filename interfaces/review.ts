import * as mongoose from 'mongoose';

import RestaurantInterface from './restaurant';
import UserInterface from './user';

export default interface ReviewInterface extends mongoose.Document{
    stars: number;
    context: string;
    username: String;
    restaurant: RestaurantInterface
    user: UserInterface;
    created: Date;
}