import * as mongoose from 'mongoose';

import UserInterface  from './user';

export default interface MessageInterface extends mongoose.Document {
    toPerson: UserInterface;
    sender: UserInterface;
    senderUsername: string;
    title: string;
    content: string;
    isOpen: boolean;
    created: Date;
}