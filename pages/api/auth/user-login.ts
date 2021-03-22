import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import connectDB from 'middleware/mongoose';
import { UserInterface } from 'interfaces/user';
import User from 'models/user';

const loginHandler = async  (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'POST') {
        
        const { username, password } = req.body;

        let user: UserInterface | null = null;
        try {
            user = await User.findOne({ username }).exec();
        }catch(err){
            res.status(500).send({ msg: 'Server Error' });
        }
    
        if(!user){
            return res.status(403).json({ msg: 'Invalid credentials.'});
        }
    
        let isPasswordMatch = false;
        try{
            isPasswordMatch = await bcrypt.compare(password, user.password);
        }catch(err){
            res.status(500).send({ msg: 'Server Error' });
        }
    
        if(!isPasswordMatch){
            return res.status(403).json({ msg: 'Invalid credentials.'});
        }
    
        let token: string;
        try{
            token = jwt.sign(
                {userId: user.id, username: user.username},
                process.env.JWT_SECRET, 
                {expiresIn: '1h'});
        }catch(err){
            res.status(500).send({ msg: 'Server Error' });
        };
    
        res.json({userId: user.id, username: user.username, token: token});
    }
};

export default connectDB(loginHandler);