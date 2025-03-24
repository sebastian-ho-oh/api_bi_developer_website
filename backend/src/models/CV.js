import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('CV', cvSchema); 