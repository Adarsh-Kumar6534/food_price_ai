const { getWFPData } = require('./lib/csvParser');

// Mock process.cwd
const path = require('path');
process.cwd = () => __dirname;

console.log('Checking Data Availability...');
try {
    const data = getWFPData();
    console.log(`Total rows: ${data.length}`);

    const afghanistan = data.filter(d => d.country === 'Afghanistan');
    console.log(`Rows for Afghanistan: ${afghanistan.length}`);

    const goatMeat = data.filter(d => d.commodity === 'Goat Meat');
    console.log(`Rows for Goat Meat: ${goatMeat.length}`);

    const both = data.filter(d => d.country === 'Afghanistan' && d.commodity === 'Goat Meat');
    console.log(`Rows for Afghanistan + Goat Meat: ${both.length}`);

    if (both.length === 0 && afghanistan.length > 0) {
        console.log('Available commodities in Afghanistan:', [...new Set(afghanistan.map(d => d.commodity))]);
    }

} catch (error) {
    console.error('Error:', error);
}
