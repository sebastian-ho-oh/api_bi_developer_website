const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

console.log('CV Routes module loaded');
console.log('Current directory:', __dirname);

// GET /api/cv
router.get('/', async (req, res) => {
    console.log('CV route hit');
    try {
        // Get absolute path to cv.json
        const cvPath = path.resolve(__dirname, 'cv.json');
        console.log('Current directory:', __dirname);
        console.log('Attempting to read CV data from:', cvPath);
        
        // Check if file exists
        try {
            await fs.access(cvPath);
            console.log('CV file exists at:', cvPath);
        } catch (error) {
            console.error('CV file not found at:', cvPath);
            console.error('Directory contents:', await fs.readdir(__dirname));
            return res.status(404).json({ 
                error: 'CV data file not found',
                path: cvPath,
                directory: __dirname,
                contents: await fs.readdir(__dirname)
            });
        }

        // Read file content
        const cvData = await fs.readFile(cvPath, 'utf8');
        console.log('Successfully read CV data, length:', cvData.length);
        console.log('First 100 characters:', cvData.substring(0, 100));
        
        if (!cvData || cvData.trim() === '') {
            throw new Error('CV data file is empty');
        }

        // Try to parse JSON
        let parsedData;
        try {
            parsedData = JSON.parse(cvData);
            console.log('Successfully parsed CV data');
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Invalid JSON content:', cvData);
            throw new Error('Invalid JSON format in CV data file');
        }
        
        // Validate data structure
        if (!Array.isArray(parsedData)) {
            throw new Error('CV data must be an array');
        }
        
        // Set CORS headers
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-cache');
        
        // Send the response
        res.send(JSON.stringify(parsedData));
    } catch (error) {
        console.error('Error reading CV data:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ 
            error: 'Failed to load CV data',
            details: error.message,
            stack: error.stack
        });
    }
});

// Log all routes
router.use((req, res, next) => {
    console.log('CV route accessed:', req.method, req.path);
    next();
});

module.exports = router; 