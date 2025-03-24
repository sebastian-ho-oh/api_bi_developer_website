const express = require('express');
const cors = require('cors');
const path = require('path');
const cvRoutes = require('./cv/cv.routes');

const app = express();
const PORT = process.env.PORT || 8080;

console.log('Starting server...');
console.log('Current directory:', __dirname);

// Middleware
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Set correct MIME types for specific file types
app.use((req, res, next) => {
    const filePath = req.path;
    if (filePath.endsWith('.js')) {
        res.type('application/javascript');
    } else if (filePath.endsWith('.css')) {
        res.type('text/css');
    } else if (filePath.endsWith('.json')) {
        res.type('application/json');
    } else if (filePath.endsWith('.png')) {
        res.type('image/png');
    } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
        res.type('image/jpeg');
    } else if (filePath.endsWith('.svg')) {
        res.type('image/svg+xml');
    } else if (filePath.endsWith('.woff2')) {
        res.type('font/woff2');
    }
    next();
});

// API routes - must come before static file serving
console.log('Registering CV routes...');
app.use('/api/cv', cvRoutes);
console.log('CV routes registered');

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 