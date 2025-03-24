import Project from './models/Project.js';
import Service from './models/Service.js';
import Skill from './models/Skill.js';
import Contact from './models/Contact.js';
import CV from './models/CV.js';
import Page from './models/Page.js';
import Image from './models/Image.js';
import Settings from './models/Settings.js';
import { auth } from './middleware/auth.js';

const ADMIN_EMAIL = 'admin@api-bi.dev';
const ADMIN_PASSWORD = 'admin';

export const resolvers = {
    Query: {
        projects: async (_, __, { Project }) => {
            return await Project.find().sort({ createdAt: -1 });
        },
        project: async (_, { id }, { Project }) => {
            return await Project.findById(id);
        },
        services: async (_, __, { Service }) => {
            return await Service.find().sort({ createdAt: -1 });
        },
        service: async (_, { id }, { Service }) => {
            return await Service.findById(id);
        },
        skills: async (_, __, { Skill }) => {
            return await Skill.find().sort({ category: 1, name: 1 });
        },
        skill: async (_, { id }, { Skill }) => {
            return await Skill.findById(id);
        },
        contacts: async (_, __, { Contact }) => {
            return await Contact.find().sort({ createdAt: -1 });
        },
        contact: async (_, { id }, { Contact }) => {
            return await Contact.findById(id);
        },
        currentCV: async () => {
            try {
                const cv = await CV.findOne().sort({ createdAt: -1 });
                if (cv && cv.content) {
                    cv.content = JSON.parse(cv.content);
                }
                return cv;
            } catch (error) {
                console.error('Error fetching current CV:', error);
                throw new Error('Failed to fetch current CV');
            }
        },
        page: async (_, { pageId }) => {
            try {
                const page = await Page.findOne({ pageId });
                return page;
            } catch (error) {
                console.error('Error fetching page:', error);
                throw new Error('Failed to fetch page');
            }
        },
        pages: async () => {
            try {
                const pages = await Page.find();
                return pages;
            } catch (error) {
                console.error('Error fetching pages:', error);
                throw new Error('Failed to fetch pages');
            }
        },
        images: async () => {
            try {
                const images = await Image.find();
                return images;
            } catch (error) {
                console.error('Error fetching images:', error);
                throw new Error('Failed to fetch images');
            }
        },
        settings: async () => {
            try {
                let settings = await Settings.findOne();
                if (!settings) {
                    settings = await Settings.create({
                        siteName: 'API BI Developer',
                        siteDescription: 'Professional API and BI Development Services',
                        contactEmail: 'contact@apibideveloper.com',
                        socialLinks: {
                            linkedin: '',
                            twitter: '',
                            github: ''
                        },
                        analyticsId: '',
                        security: {
                            twoFactorEnabled: false,
                            sessionTimeout: 30,
                            allowedIPs: []
                        }
                    });
                }
                return settings;
            } catch (error) {
                console.error('Error fetching settings:', error);
                throw new Error('Failed to fetch settings');
            }
        },
        isAuthenticated: (_, __, { req }) => {
            return !!req.user;
        }
    },
    Mutation: {
        createProject: async (_, { input }, { Project }) => {
            const project = new Project(input);
            return await project.save();
        },
        updateProject: async (_, { id, input }, { Project }) => {
            return await Project.findByIdAndUpdate(id, input, { new: true });
        },
        deleteProject: async (_, { id }, { Project }) => {
            await Project.findByIdAndDelete(id);
            return true;
        },
        createService: async (_, { input }, { Service }) => {
            const service = new Service(input);
            return await service.save();
        },
        updateService: async (_, { id, input }, { Service }) => {
            return await Service.findByIdAndUpdate(id, input, { new: true });
        },
        deleteService: async (_, { id }, { Service }) => {
            await Service.findByIdAndDelete(id);
            return true;
        },
        createSkill: async (_, { input }, { Skill }) => {
            const skill = new Skill(input);
            return await skill.save();
        },
        updateSkill: async (_, { id, input }, { Skill }) => {
            return await Skill.findByIdAndUpdate(id, input, { new: true });
        },
        deleteSkill: async (_, { id }, { Skill }) => {
            await Skill.findByIdAndDelete(id);
            return true;
        },
        createContact: async (_, { input }, { Contact }) => {
            const contact = new Contact(input);
            return await contact.save();
        },
        updateContact: async (_, { id, input }, { Contact }) => {
            return await Contact.findByIdAndUpdate(id, input, { new: true });
        },
        deleteContact: async (_, { id }, { Contact }) => {
            await Contact.findByIdAndDelete(id);
            return true;
        },
        createCV: async (_, { input }) => {
            const cv = new CV(input);
            return await cv.save();
        },
        updateCV: async (_, { content }, context) => {
            auth(context);
            const currentCV = await CV.findOne().sort({ createdAt: -1 });
            currentCV.content = content;
            return await currentCV.save();
        },
        deleteCV: async (_, { id }) => {
            const result = await CV.findByIdAndDelete(id);
            return result !== null;
        },
        login: async (_, { email, password }) => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                const token = auth.generateToken({ email });
                return {
                    token,
                    success: true
                };
            }
            throw new Error('Invalid credentials');
        },
        logout: async (_, __, { req }) => {
            req.user = null;
            return true;
        },
        uploadCV: async (_, { content, version, description }, { req }) => {
            try {
                // Check authentication
                if (!req.user) {
                    throw new Error('Not authenticated');
                }

                // Create new CV
                const cv = new CV({
                    content: JSON.stringify(content),
                    version,
                    description
                });

                await cv.save();
                cv.content = JSON.parse(cv.content);
                return cv;
            } catch (error) {
                console.error('Error uploading CV:', error);
                throw new Error('Failed to upload CV');
            }
        },
        updatePage: async (_, { pageId, title, content, metaDescription }, context) => {
            try {
                auth(context);
                const page = await Page.findOneAndUpdate(
                    { pageId },
                    { title, content, metaDescription, updatedAt: new Date() },
                    { new: true, upsert: true }
                );
                return page;
            } catch (error) {
                console.error('Error updating page:', error);
                throw new Error('Failed to update page');
            }
        },
        uploadImage: async (_, { name, url, category }, context) => {
            try {
                auth(context);
                const image = await Image.create({
                    name,
                    url,
                    category
                });
                return image;
            } catch (error) {
                console.error('Error uploading image:', error);
                throw new Error('Failed to upload image');
            }
        },
        deleteImage: async (_, { imageId }, context) => {
            try {
                auth(context);
                const result = await Image.findByIdAndDelete(imageId);
                return result;
            } catch (error) {
                console.error('Error deleting image:', error);
                throw new Error('Failed to delete image');
            }
        },
        updateSettings: async (_, { siteName, siteDescription, contactEmail, socialLinks, analyticsId }, context) => {
            try {
                auth(context);
                const settings = await Settings.findOneAndUpdate(
                    {},
                    { siteName, siteDescription, contactEmail, socialLinks, analyticsId, updatedAt: new Date() },
                    { new: true, upsert: true }
                );
                return settings;
            } catch (error) {
                console.error('Error updating settings:', error);
                throw new Error('Failed to update settings');
            }
        },
        updateSecuritySettings: async (_, { twoFactorEnabled, sessionTimeout, allowedIPs }, context) => {
            try {
                auth(context);
                const settings = await Settings.findOneAndUpdate(
                    {},
                    { 
                        'security.twoFactorEnabled': twoFactorEnabled,
                        'security.sessionTimeout': sessionTimeout,
                        'security.allowedIPs': allowedIPs,
                        updatedAt: new Date()
                    },
                    { new: true, upsert: true }
                );
                return settings;
            } catch (error) {
                console.error('Error updating security settings:', error);
                throw new Error('Failed to update security settings');
            }
        },
        logoutAllSessions: async (_, __, context) => {
            try {
                auth(context);
                // Implement session invalidation logic here
                return true;
            } catch (error) {
                console.error('Error logging out all sessions:', error);
                throw new Error('Failed to logout all sessions');
            }
        },
        deleteAccount: async (_, { password }, context) => {
            try {
                auth(context);
                // Implement account deletion logic here
                return true;
            } catch (error) {
                console.error('Error deleting account:', error);
                throw new Error('Failed to delete account');
            }
        }
    }
}; 