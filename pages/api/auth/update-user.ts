import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from "middleware/mongoose";
import { UserInterface } from 'interfaces/user';
import User from 'models/user';

const updateUser = async  (req: NextApiRequest, res: NextApiResponse)  => {

    const { email, id } = req.body;

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

export default connectDB(updateUser);