import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../middleware/mongoose';
import RestaurantInterface from "interfaces/restaurant";
import Restaurant from "models/restaurant";

const getRestaurantById = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method = 'GET'){

        const { id } = req.query;

        let restaurant: RestaurantInterface | null = null;
        try{
            restaurant = await Restaurant.findOne({_id: id }).exec();
        }catch(err){
            res.status(500).send({msg: 'Can not find that restaurant'});
        }
        if(!restaurant){
            return res.status(404).json({ msg: 'Restaurant not found' });
        }

        res.status(201).json({ restaurant });
    }
}


export default connectDB(getRestaurantById);