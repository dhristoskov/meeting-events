import { NextApiRequest, NextApiResponse } from 'next';
import isLength from 'validator/lib/isLength';
import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';

import connectDB from '../../../middleware/mongoose';
import RestaurantInterface from "interfaces/restaurant";
import Restaurant from "models/restaurant";
import City from 'models/city';
import CityInterface from 'interfaces/city';
// import UserInterface from 'interfaces/user';
// import User from 'models/user';

// interface StoredTokenData {
//     userId: string;
// };

const requestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
    case 'GET':
        await getAllRestaurant(req, res);
        break;
    case 'POST':
        await addNewRestaurant(req, res);
        break;
    case 'DELETE':
        await deleteRestaurant(req, res);
        break;
    default:
        res.status(405).send(`Method ${req.method} not allowed`);
        break;
    }
  };

export default connectDB(requestHandler);

const addNewRestaurant = async (req: NextApiRequest, res: NextApiResponse) => {

    // if (!('authorization' in req.headers)) {
    //     return res.status(401).send('No authorization token');
    // }

    const { 
        name, 
        img, 
        email, 
        urlAddress, 
        location, 
        area, 
        kitchen_type, 
        hasGarten, 
        priceLevel, 
        description 
    } = req.body;

    if (!isLength(name, { min: 2 })) {
         return res.status(422).send('Restaurant name must be at least 2 characters long');
    }

    let city: CityInterface | null = null
    try {
        city = await City.findOne({ city: area }).exec();
    }catch(err){
        res.status(500).send('Server error at city search')
    }

    if(!city){
        city = new City({
            city: area,
            restaurants: []
        })

        await city.save();
    }

    // let user: UserInterface | null = null;
    // try {
    //     const { userId } = jwt.verify(
    //         req.headers.authorization,
    //         process.env.JWT_SECRET
    //     ) as StoredTokenData;
    //     user = await User.findOne({ _id: userId });
    // }catch(err){
    //     res.status(500).send({ msg: 'Server Error' })
    // }
    
    // if(!user){
    //     return res.status(422).json({ msg: 'User not found' })
    // }

    try {
        const restaurant: RestaurantInterface = new Restaurant({
            name, 
            img, 
            email, 
            urlAddress, 
            location,
            area,
            kitchen_type,
            hasGarten, 
            priceLevel,
            description,
            reservations: []
        });

        const session = await mongoose.startSession();
        session.startTransaction();
        await restaurant.save({session: session});
        city.restaurants.push(restaurant);
        await city.save({session: session});
        await session.commitTransaction();
        // await restaurant.save();
        res.status(201).json({ restaurant });
    }catch(err) {
        res.status(500).send({msg: 'Creating a new restaurant failed, please try again'});
    };
};

const deleteRestaurant = async (req: NextApiRequest, res: NextApiResponse) => {

    // if (!('authorization' in req.headers)) {
    //     return res.status(401).send('No authorization token');
    // }

    // let user: UserInterface | null = null;
    // try {
    //     const { userId } = jwt.verify(
    //         req.headers.authorization,
    //         process.env.JWT_SECRET
    //     ) as StoredTokenData;
    //     user = await User.findOne({ _id: userId });
    // }catch(err){
    //     res.status(500).send({ msg: 'Server Error' })
    // }
    
    // if(!user){
    //     return res.status(422).json({ msg: 'User not found' })
    // }

    const { id } = req.body;

    let restaurant: RestaurantInterface | null = null;
    try {
        restaurant = await Restaurant.findById({_id: id}).exec();
    }catch(err){
        res.status(500).send('Can not find the restaurant to delete')
    }

    if(!restaurant){
        return res.status(404).json({ msg: 'Could not find restaurant with that id' });
    }

    try {
        await Restaurant.findByIdAndRemove({_id: id}).exec();
        res.status(200).json({msg: 'Restaurant Deleted.'});
    }catch(err){
        res.status(500).send('Server Error')
    }
}

const getAllRestaurant = async (req: NextApiRequest, res: NextApiResponse) => {

    let restaurants: RestaurantInterface[] = [];
    try{
        restaurants = await Restaurant.find({}).exec();
    }catch(err){
        res.status(500).send({msg: 'Fatching restaurants failed, please try again'});
    }

    if(!restaurants || restaurants.length === 0){
        return res.status(404).json({msg: 'Could not find any restaurants'});
    };

    res.status(201).json({ restaurants });
}