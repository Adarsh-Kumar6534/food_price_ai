const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

console.log('Checking Data Availability (Direct Read)...');
try {
    const csvPath = path.join(__dirname, 'resources', 'wfp_dataset.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });

    console.log(`Total rows: ${records.length}`);

    const afghanistan = records.filter(d => d.country === 'Afghanistan');
    console.log(`Rows for Afghanistan: ${afghanistan.length}`);

    const goatMeat = records.filter(d => d.commodity === 'Goat Meat');
    console.log(`Rows for Goat Meat: ${goatMeat.length}`);

    const both = records.filter(d => d.country === 'Afghanistan' && d.commodity === 'Goat Meat');
    console.log(`Rows for Afghanistan + Goat Meat: ${both.length}`);

    if (both.length === 0 && afghanistan.length > 0) {
        const commodities = [...new Set(afghanistan.map(d => d.commodity))];
        console.log('Available commodities in Afghanistan:', commodities);
    }

} catch (error) {
    console.error('Error:', error);
}
