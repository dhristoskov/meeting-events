import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import connectDB from '../../../middleware/mongoose';
import User from '../../../models/user';
import UserInterface from 'interfaces/user';
import RestaurantInterface from 'interfaces/restaurant';
import Restaurant from 'models/restaurant';

interface StoredTokenData {
    userId: string;
};

const requestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
    case 'GET':
        await userByIdHandler(req, res);
        break;
    case 'PUT':
        await updateFavorites(req, res);
        break;
    default:
        res.status(405).send(`Method ${req.method} not allowed`);
        break;
    }
  };

export default connectDB(requestHandler);

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (!('authorization' in req.headers)) {
        return res.status(401).send('No authorization token');
    }

    let user: UserInterface | null = null;
    try {
        const { userId } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        ) as StoredTokenData;
        user = await User.findOne( { _id: userId }, { password: 0} );
    }catch(err){
        res.status(500).send({ msg: 'Server Error' })
    }
    
    if(!user){
        return res.status(422).json({ msg: 'User not found' })
    }
    
    res.status(201).json({ user });
};

const updateFavorites = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.body;

    if (!('authorization' in req.headers)) {
        return res.status(401).send('No authorization token');
    }

    let user: UserInterface | null = null;
    try {
        const { userId } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        ) as StoredTokenData;
        user = await User.findOne( { _id: userId } );
    }catch(err){
        res.status(500).send({ msg: 'Server Error' })
    }
    
    if(!user){
        return res.status(422).json({ msg: 'User not found' })
    }

    let restaurant: RestaurantInterface | null = null;
    try {
        restaurant = await Restaurant.findOne({ _id: id });
    }catch(err){
        res.status(500).send({ msg: 'Server Error' })
    }

    if(!restaurant){
        return res.status(422).json({ msg: 'Restaurant not found' })
    }

    try {
        if(user.favorites.includes(restaurant._id)){
            const index = user.favorites.indexOf(restaurant._id);
            user.favorites.splice(index, 1);
        }else {
            user.favorites.push(restaurant);
        }
        await user.save();
        res.status(200).json({ msg: 'Restaurant added to favorites' });
    }catch(err){
        res.status(500).send({msg: 'Can not add to favorites'});
    }
}
