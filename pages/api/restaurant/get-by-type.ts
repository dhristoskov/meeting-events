import { NextApiRequest, NextApiResponse } from 'next';

import RestaurantInterface from 'interfaces/restaurant';
import Restaurant from 'models/restaurant';

import connectDB from '../../../middleware/mongoose';

const getRestaurantsByType = async (req: NextApiRequest, res: NextApiResponse) => {

    if( req.method === 'GET') {

        const { type } = req.query

        let restaurants: RestaurantInterface[] = [];
        try{
            restaurants = await Restaurant.find( {kitchen_type: { $all: [ type ] }} );
        }catch(err){
            res.status(500).send({msg: 'Fatching city data failed, please try again'});
        }

        if(!restaurants || restaurants.length === 0){
            return res.status(404).json({msg: 'Could not find any restarants data'});
        };

        res.status(201).json({ restaurants });
    }
}

export default connectDB(getRestaurantsByType);