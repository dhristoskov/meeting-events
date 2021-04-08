import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import connectDB from 'middleware/mongoose';
import UserInterface from 'interfaces/user';
import User from 'models/user';

interface StoredTokenData {
    userId: string;
};

const DeletePassword = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'DELETE') {
        
        if (!('authorization' in req.headers)) {
            return res.status(401).send('No authorization token');
        }

        const { password } = req.body;

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
            isPasswordMatch = await bcrypt.compare(password, user.password);
        }catch(err){
            res.status(500).send({ msg: 'Server Error' });
        }

        if(!isPasswordMatch){
            return res.status(422).json({ msg: 'Invalid credentials, password is not correct.'});
        }
    
        try{
            await User.findByIdAndRemove(user._id);
            res.status(200).json({msg: 'User deleted'});
        }catch(err){ 
            res.status(500).send({ msg: 'Server Error, could not delete the user' });
        }
    }
};

export default connectDB(DeletePassword);
