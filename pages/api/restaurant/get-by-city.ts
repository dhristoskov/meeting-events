import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../middleware/mongoose';
import CityInterface from 'interfaces/city';
import City from 'models/city';
import RestaurantInterface from 'interfaces/restaurant';

const getRestaurantsCitys = async (req: NextApiRequest, res: NextApiResponse) => {

    if( req.method === 'GET') {

        const { name } = req.query

        let city: CityInterface | null = null;
        try{
            city = await City.findOne({ city: name.toString() });
        }catch(err){
            res.status(500).send({msg: 'Fatching city data failed, please try again'});
        }

        if(!city){
            return res.status(404).json({msg: 'Could not find any city data'});
        };

        let subArray: CityInterface | null = null
        try {
            subArray = await City.findById(city._id).populate('restaurants');
        }catch(err){
            res.status(500).send({msg: 'Fatching restaurants data failed, please try again'});
        }

        if(!subArray.restaurants || subArray.restaurants.length === 0){
            return res.status(404).json({msg: 'Could not find any restarants data'});
        };

        res.status(201).json({restaurants: subArray.restaurants});
    }
}

export default connectDB(getRestaurantsCitys);