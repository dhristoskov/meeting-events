import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import connectDB from 'middleware/mongoose';
import { UserInterface } from 'interfaces/user';
import User from 'models/user';

const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'PUT') {
        
        const { password2, password, id } = req.body;

        let user: UserInterface | null = null;
        try{
            user = await User.findOne({ _id: id });
        }catch(err){
            res.status(500).send({ msg: 'Server Error, could not find the user' });
        }
    
        if(!user){
            return res.status(403).json({ msg: 'Could not find user'});
        }

        let isPasswordMatch = false;
        try{
            isPasswordMatch = await bcrypt.compare(password2, user.password);
        }catch(err){
            res.status(500).send({ msg: 'Server Error' });
        }

        if(!isPasswordMatch){
            return res.status(422).json({ msg: 'Invalid credentials, old password is not equal to current password.'});
        }


        let hashedPassword: string;
        try {
            hashedPassword = await bcrypt.hash(password, 12);
        }catch(err){
            res.status(500).send({ msg: 'Server Error' });
        }
    
        try{
            user.password = hashedPassword;
            await user.save();
            res.status(200).json({msg: 'Password updated'});
        }catch(err){ 
            res.status(500).send({ msg: 'Server Error, could not save the new passowrd' });
        }
    }
};

export default connectDB(changePassword);
