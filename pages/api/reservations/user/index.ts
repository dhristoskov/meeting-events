import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import isLength from 'validator/lib/isLength';
import isEmail from 'validator/lib/isEmail';
import mongoose from 'mongoose';

import connectDB from '../../../../middleware/mongoose';
import RestaurantInterface from "interfaces/restaurant";
import Restaurant from "models/restaurant";
import ReservationInterface from 'interfaces/reservation';
import Reservation from 'models/reservation';
import UserInterface from 'interfaces/user';
import User from 'models/user';

interface StoredTokenData {
    userId: string;
};

const requestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
    case 'GET':
        await getAllReservations(req, res);
        break;
    case 'POST':
        await addNewReservation(req, res);
        break;
    default:
        res.status(405).send(`Method ${req.method} not allowed`);
        break;
    }
};

export default connectDB(requestHandler);

const getAllReservations= async (req: NextApiRequest, res: NextApiResponse) => {

    if (!('authorization' in req.headers)) {
        return res.status(401).send('No authorization token');
    }

    let user: UserInterface | null = null;
    try {
        const { userId } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        ) as StoredTokenData;
        user = await User.findById(userId).populate('reservations');
    }catch(err){
        res.status(500).send({ msg: 'Server Error' })
    }

    if(!user){
        return res.status(422).json({ msg: 'User not found' })
    }

    res.status(201).json({ reservations: user.reservations });
};

const addNewReservation = async (req: NextApiRequest, res: NextApiResponse) => {

    if (!('authorization' in req.headers)) {
        return res.status(401).send('No authorization token');
    }

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

    let user: UserInterface | null = null;
    try {
        const { userId } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        ) as StoredTokenData;
        user = await User.findOne({ _id: userId });
    }catch(err){
        res.status(500).send({ msg: 'Server Error' })
    }
        
    if(!user){
        return res.status(422).json({ msg: 'User not found' })
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
            userId: user._id,
            first_name, 
            last_name, 
            email, 
            guests, 
            restaurantId: restaurant._id,
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
        user.reservations.push(rsrv);
        await user.save({session: session});
        await session.commitTransaction();
        res.status(201).json({ msg: 'Reservation is successfully added' });
    }catch(err) {
        res.status(500).send({msg: 'Creating a new reservation failed, please try again'});
    };
}
