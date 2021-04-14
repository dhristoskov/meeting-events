import { NextApiRequest, NextApiResponse } from 'next';
import isLength from 'validator/lib/isLength';
import jwt from 'jsonwebtoken';

import connectDB from '../../../middleware/mongoose';
import RestaurantInterface from "interfaces/restaurant";
import Restaurant from "models/restaurant";
import UserInterface from 'interfaces/user';
import User from 'models/user';
import ReviewInterface from 'interfaces/review';
import Review from 'models/review';
import ReservationInterface from 'interfaces/reservation';
import Reservation from 'models/reservation';

interface StoredTokenData {
    userId: string;
};

const requestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
    case 'POST':
        await addNewReview(req, res);
        break;
    case 'GET':
        await getReviewByRestaurant(req, res);
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

    const { stars, context, id } = req.body;

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
        restaurant = await Restaurant.findOne({_id: id }).exec();
    }catch(err){
        res.status(500).send({msg: 'Can not find that restaurant'});
    }
    if(!restaurant){
        return res.status(403).json({ msg: 'Restaurant not found' });
    }

    let reservation: ReservationInterface | null = null;
    try{
        reservation = await Reservation.findOne({ userId: user._id, restaurantId: restaurant._id}).exec();
    }catch(err){
        res.status(500).send({msg: 'Can not find that reservation'});
    }

    if(!reservation){
        return res.status(403).json({ msg: 'You dont have right to give a review' });
    }

    const reservationTime = reservation.reservationDate.getTime()
    const isItAllowed = reservationTime >= Date.now()

    if(isItAllowed){
        return res.status(403).json({ msg: 'Your reservation time is in the future' });
    }

    try {
        const review: ReviewInterface = new Review ({
            stars,
            context,
            username: user.username,
            restaurant,
            user
        });

        await review.save();
        res.status(201).json({ review });
    }catch(err) {
        res.status(500).send({msg: 'Creating a new review failed, please try again'});
    };
};


const getReviewByRestaurant = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    let restaurant: RestaurantInterface | null = null;
    try{
        restaurant = await Restaurant.findById(id).exec();
    }catch(err){
        res.status(500).send({msg: 'Can not find that restaurant'});
    }
    if(!restaurant){
        return res.status(403).json({ msg: 'Restaurant not found' });
    }

    let reviews: ReviewInterface[] = [];
    try{
        reviews = await Review.find({ restaurant }, { restaurant: 0, user: 0 }).sort({ created: 1 }).exec();
    }catch(err){
        res.status(500).send({msg: 'Fatching reviews failed, please try again'});
    }

    res.status(201).json({ reviews });
}