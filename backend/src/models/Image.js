import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['brand', 'projects', 'blog', 'other']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Image', imageSchema); 