import { NextApiRequest, NextApiResponse } from 'next';
import isLength from 'validator/lib/isLength';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import connectDB from '../../../middleware/mongoose';
import RestaurantInterface from "interfaces/restaurant";
import Restaurant from "models/restaurant";
import UserInterface from 'interfaces/user';
import User from 'models/user';
import ReviewInterface from 'interfaces/review';
import Review from 'models/review';

interface StoredTokenData {
    userId: string;
};

const requestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
    case 'POST':
        await addNewReview(req, res);
        break;
    default:
        res.status(405).send(`Method ${req.method} not allowed`);
        break;
    }
  };

export default connectDB(requestHandler);


const addNewReview = async (req: NextApiRequest, res: NextApiResponse) => {

    if (!('authorization' in req.headers)) {
        return res.status(401).send('No authorization token');
    }

    const { stars, context, restaurantId } = req.body;

    if (!isLength(context, { min: 20 })) {
         return res.status(422).send('Review must be at least 20 characters long');
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
    try{
        restaurant = await Restaurant.findOne({_id: restaurantId }).exec();
    }catch(err){
        res.status(500).send({msg: 'Can not find that restaurant'});
    }
    if(!restaurant){
        return res.status(403).json({ msg: 'Restaurant not found' });
    }

    if(!user.reservations.includes(restaurant._id)){
        return res.status(422).json({ msg: 'Do not have right to make review' })
    }

    try {
        const review: ReviewInterface = new Review ({
            stars,
            context,
            username: user.username,
            user
        });

        const session = await mongoose.startSession();
        session.startTransaction();
        await review.save({session: session});
        restaurant.reviews.push(review);
        await restaurant.save({session: session});
        await session.commitTransaction();
        res.status(201).json({ review });
    }catch(err) {
        res.status(500).send({msg: 'Creating a new review failed, please try again'});
    };
};
