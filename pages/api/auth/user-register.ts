import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import connectDB from '../../../middleware/mongoose';
import User from '../../../models/user';
import { UserInterface } from 'interfaces/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {

    const { username, email, password } = req.body

    let user: UserInterface;
    try {
        user = await User.findOne({ email });
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
          email,
          password: hashedPassword,
        });

        await user.save();
        res.status(201).send({ msg: 'User Created!' });
    }catch(err){
        res.status(500).send({ msg: 'Server Error' });
    }
  }
};

export default connectDB(handler);