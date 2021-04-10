import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';

import connectDB from "middleware/mongoose";
import UserInterface from 'interfaces/user';
import User from 'models/user';

interface StoredTokenData {
    userId: string;
};

const updateUser = async  (req: NextApiRequest, res: NextApiResponse)  => {

    if(req.method === 'PUT') {

        if (!('authorization' in req.headers)) {
            return res.status(401).send('No authorization token');
        }

        const { email, avatar } = req.body;

        if (email && !isEmail(email)) {
            return res.status(422).send('Email must be valid address');
        }

        let user: UserInterface | null = null;
        try{
            const { userId } = jwt.verify(
                req.headers.authorization,
                process.env.JWT_SECRET
            ) as StoredTokenData;

            user = await User.findOne({ _id: userId });
        }catch(err){
            res.status(500).send({ msg: 'Server Error, could not find the user' });
        }
    
        if(!user){
            return res.status(403).json({ msg: 'Could not find user'});
        }
    
        try {
            user.email = email || user.email;
            user.avatar = avatar || user.avatar;
            await user.save();
            res.status(200).json(user);
        }catch(err){
            res.status(500).send({msg: 'Can not update that user'});
        }
    }
}

export default connectDB(updateUser);