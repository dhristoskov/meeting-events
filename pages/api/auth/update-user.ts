import { NextApiRequest, NextApiResponse } from 'next';
import isEmail from 'validator/lib/isEmail';

import connectDB from "middleware/mongoose";
import { UserInterface } from 'interfaces/user';
import User from 'models/user';

const updateUser = async  (req: NextApiRequest, res: NextApiResponse)  => {

    if(req.method === 'PUT') {

        const { email, id } = req.body;

        if (!isEmail(email)) {
            return res.status(422).send('Email must be valid address');
        }

        let user: UserInterface | null = null;
        try{
            user = await User.findOne({ _id: id });
        }catch(err){
            res.status(500).send({ msg: 'Server Error, could not find the user' });
        }
    
        if(!user){
            return res.status(403).json({ msg: 'Could not find user'});
        }
    
        try {
            user.email = email || user.email;
            await user.save();
            res.status(200).json(user);
        }catch(err){
            res.status(500).send({msg: 'Can not update that user'});
        }
    }
}

export default connectDB(updateUser);