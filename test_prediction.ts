const { getPredictionBaseline } = require('./lib/csvParser');

// Mock process.cwd
const path = require('path');
process.cwd = () => __dirname;

console.log('Testing Prediction Baseline...');
try {
    const result = getPredictionBaseline('Yemen', 'Rice');
    console.log('Result:', result);
} catch (error) {
    console.error('Error:', error);
}
