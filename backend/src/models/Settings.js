import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: true
    },
    siteDescription: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    socialLinks: {
        linkedin: String,
        twitter: String,
        github: String
    },
    analyticsId: String,
    security: {
        twoFactorEnabled: {
            type: Boolean,
            default: false
        },
        sessionTimeout: {
            type: Number,
            default: 30
        },
        allowedIPs: [String]
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Settings', settingsSchema); 