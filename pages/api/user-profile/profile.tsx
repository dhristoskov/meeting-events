import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import connectDB from '../../../middleware/mongoose';
import User from '../../../models/user';
import { UserInterface } from 'interfaces/user';

interface StoredTokenData {
    userId: string;
}

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'GET'){

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
    }
}

export default connectDB(userByIdHandler);