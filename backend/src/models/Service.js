import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Service', serviceSchema); 