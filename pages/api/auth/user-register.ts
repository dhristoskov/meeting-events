import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import connectDB from '../../../middleware/mongoose';
import User from '../../../models/user';
import { UserInterface } from 'interfaces/user';

const registrationHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {

    const { username, password } = req.body

    let user: UserInterface | null = null;

    try {
        user = await User.findOne({ username });
    }catch(err){
        res.status(500).send({ msg: 'Server Error' })
    }

    if(user){
        return res.status(422).send({ msg: 'User already exists, please login instead.' })
    }

    let hashedPassword: string;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }catch(err){
        res.status(500).send({ msg: 'Server Error' });
    }

    try{
        user = new User({
          username,
          password: hashedPassword
        });

        await user.save();
    }catch(err){
        res.status(500).send({ msg: 'Server Error' });
    }

    let token: string;
    try{
        token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' });
    }catch(err){
        res.status(500).send({ msg: 'Server Error' });
    };

    res.json({userId: user.id, username: user.username, token: token});
  }
};

export default connectDB(registrationHandler);