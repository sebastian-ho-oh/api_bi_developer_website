import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    pageId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Page', pageSchema); 