import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import isLength from 'validator/lib/isLength';
import isEmail from 'validator/lib/isEmail';

import connectDB from '../../../middleware/mongoose';
import RestaurantInterface from "interfaces/restaurant";
import Restaurant from "models/restaurant";
import ReservationInterface from 'interfaces/reservation';
import Reservation from 'models/reservation';

const addReservation = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'POST'){

        const {  
            id, 
            first_name, 
            last_name, 
            email, 
            guests, 
            reservationDate, 
            restaurantName,
            restaurantAddress,
            restaurantCity
         } = req.body;

        if (!isLength(first_name, { min: 2 })) {
            return res.status(422).send('First name must be at least 2 characters long');
        }else if(!isLength(last_name, { min: 3 })){
            return res.status(422).send('Last name must be at least 3 characters long');
        }else if(!isEmail(email)){
            return res.status(422).send('The Email address is not correct');
        }
    
        let restaurant: RestaurantInterface | null = null;
        try {
            restaurant = await Restaurant.findOne({_id: id}).exec();
        }catch(err){
            res.status(500).send('Can not find the restaurant')
        }
    
        if(!restaurant){
            return res.status(404).json({ msg: 'Could not find restaurant with that id' });
        }

        try {
            const rsrv: ReservationInterface = new Reservation({
                first_name, 
                last_name, 
                email, 
                guests, 
                reservationDate,
                restaurantName,
                restaurantAddress,
                restaurantCity
            });

            const session = await mongoose.startSession();
            session.startTransaction();
            await rsrv.save({session: session});
            restaurant.reservations.push(rsrv);
            await restaurant.save({session: session});
            await session.commitTransaction();
            res.status(201).json({ msg: 'Reservation is successfully added' });
        }catch(err) {
            res.status(500).send({msg: 'Creating a new reservation failed, please try again'});
        };
    }
};

export default connectDB(addReservation);