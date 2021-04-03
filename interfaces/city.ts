import * as mongoose from 'mongoose';

import RestaurantInterface from './restaurant';

export default interface CityInterface extends mongoose.Document{
    city: string;
    restaurants: RestaurantInterface[];
    created: Date;
}