import * as mongoose from 'mongoose';

import { UserInterface } from 'interfaces/user';

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String, 
        required: false,
        default: 'no-data',
        minlength: 6
    },
    password: { 
        type: String, 
        required: true,
        minlength: 7
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

let User = mongoose.models.User || mongoose.model<UserInterface>('User', userSchema);
export default User;