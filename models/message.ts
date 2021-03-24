import * as mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    toPerson: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 20
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

let Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
export default Message;