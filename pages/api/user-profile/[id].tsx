import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../middleware/mongoose';
import User from '../../../models/user';
import { UserInterface } from 'interfaces/user';

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'GET'){

        const { id } = req.query;

        let user: UserInterface | null = null;
        try {
            user = await User.findOne( { _id: id }, { password: 0} );
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