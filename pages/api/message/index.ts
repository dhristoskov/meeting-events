import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import isLength from 'validator/lib/isLength';
// import bcrypt from 'bcrypt';

import connectDB from 'middleware/mongoose';
import UserInterface from 'interfaces/user';
import MessageInterface from 'interfaces/message';
import Message from 'models/message';
import User from 'models/user';

interface StoredTokenData {
    userId: string;
};

const sendNewEmail = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'POST') {
        
        if (!('authorization' in req.headers)) {
            return res.status(401).send('No authorization token');
        }

        const { toPerson, title, content } = req.body;

        if (!isLength(title, { min: 3 })) {
            return res.status(422).send('Title must be at least 3 characters');
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

        let recipient: UserInterface | null = null;
        try{
            recipient = await User.findOne({ username: toPerson });
        }catch(err){
            res.status(500).send({ msg: 'Server Error, could not find the recipient' });
        }
    
        if(!recipient){
            return res.status(403).json({ msg: 'Could not find recipient'});
        }
    
        try{
            const message: MessageInterface = new Message({
                toPerson: recipient,
                sender: user,
                senderUsername: user.username,
                title,
                content
            });

            const session = await mongoose.startSession();
            session.startTransaction();
            await message.save({session: session});
            recipient.messages.push(message);
            await recipient.save({session: session});
            user.messages.push(message);
            await user.save({session: session});
            await session.commitTransaction();
            res.status(200).json({msg: 'Email sent'});
        }catch(err){ 
            res.status(500).send({ msg: 'Server Error, could not send the e-mail' });
        }
    }
};

export default connectDB(sendNewEmail);
