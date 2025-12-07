const { getSummaryStatistics } = require('./lib/csvParser');

// Mock process.cwd since we are running with node directly
const path = require('path');
process.cwd = () => __dirname;

// We need to handle the TS import. Since I can't easily run TS, I'll rely on the fact that I just wrote the file.
// Actually, running TS files directly without compilation is tricky if I don't have ts-node set up.
// I will try to run it with `npx ts-node test_summary.ts`.

console.log('Running test...');
const stats = getSummaryStatistics();
console.log('Stats:', stats);
