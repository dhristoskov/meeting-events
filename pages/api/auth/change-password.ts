import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import isLength from 'validator/lib/isLength';
import bcrypt from 'bcrypt';

import connectDB from 'middleware/mongoose';
import UserInterface from 'interfaces/user';
import User from 'models/user';

interface StoredTokenData {
    userId: string;
};

const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'PUT') {
        
        if (!('authorization' in req.headers)) {
            return res.status(401).send('No authorization token');
        }

        const { password2, password } = req.body;

        if (!isLength(password, { min: 7 })) {
            return res.status(422).send('Password must be at least 7 characters');
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
