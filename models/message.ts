import * as mongoose from 'mongoose';

import MessageInterface from 'interfaces/message';

const messageSchema = new mongoose.Schema({
    toPerson: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    senderUsername: {
        type: String, 
        required: true,
    },
    title: {
        type: String, 
        required: true,
        minlength: 3
    },
    content: {
        type: String, 
        required: true,
    },
    isOpen: {
        type: Boolean,
        require: true,
        default: false
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

let Message = mongoose.models.Message || mongoose.model<MessageInterface>('Message', messageSchema);
export default Message;