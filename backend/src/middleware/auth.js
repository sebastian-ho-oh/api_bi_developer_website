import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const auth = {
    middleware: (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            
            if (!token) {
                // Allow login mutation without token
                if (req.body.operationName === 'login') {
                    return next();
                }
                throw new Error('No token provided');
            }

            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },

    generateToken: (user) => {
        return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
    }
};

export const authHandler = (context) => {
    const { req } = context;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new Error('Authentication required');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}; 