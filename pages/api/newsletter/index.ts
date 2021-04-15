import { NextApiRequest, NextApiResponse } from 'next';
import isEmail from 'validator/lib/isEmail';

import RestaurantInterface from 'interfaces/restaurant';
import Restaurant from 'models/restaurant';
import connectDB from '../../../middleware/mongoose';

const addToNewsletter = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'PUT') {

        const { id, email } = req.body;

        if (!isEmail(email)) {
            return res.status(422).send('Email must be valid address');
        }
    
        let restaurant: RestaurantInterface | null = null;
        try{
            restaurant = await Restaurant.findById(id).exec();
        }catch(err){
            res.status(500).send({msg: 'Can not find that restaurant'});
        }
        if(!restaurant){
            return res.status(403).json({ msg: 'Restaurant not found' });
        }
    
        try {
            restaurant.newsletter.push(email);
    
            await restaurant.save();
            res.status(201).json({msg: 'Subscribed successfully'});
        }catch(err) {
            res.status(500).send({msg: 'Subscribe to newsletter failed, please try again'});
        };
    }
};

export default connectDB(addToNewsletter);