import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../middleware/mongoose';
import CityInterface from 'interfaces/city';
import City from 'models/city';

const getRestaurantsCitys = async (req: NextApiRequest, res: NextApiResponse) => {

    if( req.method === 'GET') {
        
        let cities: CityInterface[] = [];
        try{
            cities = await City.find({}, { city: 1, _id: 0 }).exec();
        }catch(err){
            res.status(500).send({msg: 'Fatching city data failed, please try again'});
        }
    
        if(!cities || cities.length === 0){
            return res.status(404).json({msg: 'Could not find any city data'});
        };
    
        res.status(201).json({ cities });
    }
}

export default connectDB(getRestaurantsCitys);