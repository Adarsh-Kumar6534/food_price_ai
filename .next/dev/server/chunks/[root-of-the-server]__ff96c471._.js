module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/csvParser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCommoditiesForCountry",
    ()=>getCommoditiesForCountry,
    "getCorrelationData",
    ()=>getCorrelationData,
    "getPredictionBaseline",
    ()=>getPredictionBaseline,
    "getPricePercentiles",
    ()=>getPricePercentiles,
    "getPriceTrends",
    ()=>getPriceTrends,
    "getRegionalAnalysis",
    ()=>getRegionalAnalysis,
    "getSummaryStatistics",
    ()=>getSummaryStatistics,
    "getUniqueValues",
    ()=>getUniqueValues,
    "getWFPData",
    ()=>getWFPData
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$csv$2d$parse$2f$lib$2f$sync$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/csv-parse/lib/sync.js [app-route] (ecmascript) <locals>");
;
;
;
function getCSVPath() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'resources', 'wfp_dataset.csv');
}
function getWFPData() {
    try {
        const csvPath = getCSVPath();
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(csvPath)) {
            console.error('getWFPData: File not found at', csvPath);
            return [];
        }
        const fileContent = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(csvPath, 'utf-8');
        const records = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$csv$2d$parse$2f$lib$2f$sync$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parse"])(fileContent, {
            columns: true,
            skip_empty_lines: true,
            cast: (value, context)=>{
                if ([
                    'price_usd',
                    'year',
                    'month',
                    'seasonality_index',
                    'market_distance_km',
                    'transport_cost_index',
                    'vulnerability_index'
                ].includes(context.column)) {
                    const num = parseFloat(value);
                    return isNaN(num) ? 0 : num;
                }
                return value;
            }
        });
        return records;
    } catch (error) {
        console.error('getWFPData Error:', error);
        return [];
    }
}
function getPriceTrends() {
    try {
        const data = getWFPData();
        if (!data || data.length === 0) return {
            labels: [],
            datasets: []
        };
        // Group by commodity + month
        const grouped = {};
        const allMonths = new Set();
        data.forEach((row)=>{
            if (!row.commodity || !row.date) return;
            // Convert date to YYYY-MM
            const dateObj = new Date(row.date);
            if (isNaN(dateObj.getTime())) return;
            const monthStr = dateObj.toISOString().slice(0, 7); // YYYY-MM
            if (!grouped[row.commodity]) grouped[row.commodity] = {};
            if (!grouped[row.commodity][monthStr]) grouped[row.commodity][monthStr] = {
                sum: 0,
                count: 0
            };
            grouped[row.commodity][monthStr].sum += row.price_usd;
            grouped[row.commodity][monthStr].count += 1;
            allMonths.add(monthStr);
        });
        const sortedMonths = Array.from(allMonths).sort();
        // Limit to top commodities to avoid clutter if too many, or just take all if reasonable
        // For this dataset, let's take top 5 most frequent or just first 5 found to keep it clean as requested
        const commodities = Object.keys(grouped).slice(0, 7);
        const datasets = commodities.map((comm, index)=>{
            const dataPoints = sortedMonths.map((month)=>{
                const entry = grouped[comm][month];
                return entry ? entry.sum / entry.count : null;
            });
            return {
                label: comm,
                data: dataPoints,
                borderColor: `hsl(${index * 50}, 70%, 50%)`,
                backgroundColor: `hsla(${index * 50}, 70%, 50%, 0.1)`,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                fill: false // Clean line chart
            };
        });
        return {
            labels: sortedMonths,
            datasets
        };
    } catch (error) {
        console.error('getPriceTrends Error:', error);
        return {
            labels: [],
            datasets: []
        };
    }
}
function getRegionalAnalysis() {
    try {
        const data = getWFPData();
        if (!data || data.length === 0) return {
            labels: [],
            datasets: []
        };
        const regionStats = {};
        data.forEach((row)=>{
            if (!row.region) return;
            if (!regionStats[row.region]) regionStats[row.region] = [];
            regionStats[row.region].push(row.price_usd);
        });
        const regions = Object.keys(regionStats);
        const rawVolatilities = [];
        regions.forEach((region)=>{
            const prices = regionStats[region];
            if (prices.length < 2) {
                rawVolatilities.push(0);
                return;
            }
            const mean = prices.reduce((a, b)=>a + b, 0) / prices.length;
            if (mean === 0) {
                rawVolatilities.push(0);
                return;
            }
            const variance = prices.reduce((a, b)=>a + Math.pow(b - mean, 2), 0) / prices.length;
            const stdDev = Math.sqrt(variance);
            // Volatility = std / mean (Coefficient of Variation)
            rawVolatilities.push(stdDev / mean);
        });
        // Normalize 0-1
        const minVol = Math.min(...rawVolatilities);
        const maxVol = Math.max(...rawVolatilities);
        const range = maxVol - minVol;
        const normalizedVolatility = rawVolatilities.map((v)=>range === 0 ? 0 : (v - minVol) / range);
        // Unique neon colors for each region
        const colors = [
            'rgba(239, 68, 68, 0.8)',
            'rgba(249, 115, 22, 0.8)',
            'rgba(234, 179, 8, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(6, 182, 212, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(236, 72, 153, 0.8)'
        ];
        return {
            labels: regions,
            datasets: [
                {
                    label: 'Price Volatility (Normalized)',
                    data: normalizedVolatility,
                    backgroundColor: regions.map((_, i)=>colors[i % colors.length]),
                    borderColor: regions.map((_, i)=>colors[i % colors.length].replace('0.8', '1')),
                    borderWidth: 1,
                    borderRadius: 6,
                    barThickness: 40
                }
            ]
        };
    } catch (error) {
        console.error('getRegionalAnalysis Error:', error);
        return {
            labels: [],
            datasets: []
        };
    }
}
function getCorrelationData() {
    try {
        const data = getWFPData();
        if (!data || data.length === 0) return [];
        // Group by commodity
        const commodityStats = {};
        data.forEach((row)=>{
            if (!row.commodity) return;
            if (!commodityStats[row.commodity]) commodityStats[row.commodity] = {
                totalCost: 0,
                totalPrice: 0,
                count: 0
            };
            commodityStats[row.commodity].totalCost += row.transport_cost_index;
            commodityStats[row.commodity].totalPrice += row.price_usd;
            commodityStats[row.commodity].count += 1;
        });
        const result = Object.keys(commodityStats).map((comm, index)=>{
            const stats = commodityStats[comm];
            const avgCost = stats.totalCost / stats.count;
            const avgPrice = stats.totalPrice / stats.count;
            return {
                label: comm,
                data: [
                    {
                        x: avgCost,
                        y: avgPrice,
                        r: Math.max(5, avgPrice * 2) // Bubble size proportional to price (scaled for visibility)
                    }
                ],
                backgroundColor: `hsla(${index * 40}, 70%, 60%, 0.7)`,
                borderColor: `hsla(${index * 40}, 70%, 60%, 1)`
            };
        });
        return result;
    } catch (error) {
        console.error('getCorrelationData Error:', error);
        return [];
    }
}
function getSummaryStatistics() {
    try {
        const data = getWFPData();
        if (!data || data.length === 0) {
            return {
                globalAvgPrice: 0,
                mostVolatileCommodity: 'N/A',
                totalDataPoints: 0
            };
        }
        // A. Global Average Price
        const totalSum = data.reduce((sum, row)=>sum + (row.price_usd || 0), 0);
        const globalAvgPrice = totalSum / data.length;
        // B. Most Volatile Commodity (std dev of price)
        const commodityPrices = {};
        data.forEach((row)=>{
            if (!row.commodity) return;
            if (!commodityPrices[row.commodity]) commodityPrices[row.commodity] = [];
            commodityPrices[row.commodity].push(row.price_usd || 0);
        });
        let maxVolatility = -1;
        let mostVolatileCommodity = 'N/A';
        Object.entries(commodityPrices).forEach(([comm, prices])=>{
            if (prices.length < 2) return;
            const mean = prices.reduce((a, b)=>a + b, 0) / prices.length;
            if (mean === 0) return;
            const variance = prices.reduce((a, b)=>a + Math.pow(b - mean, 2), 0) / prices.length;
            const stdDev = Math.sqrt(variance);
            if (stdDev > maxVolatility) {
                maxVolatility = stdDev;
                mostVolatileCommodity = comm;
            }
        });
        // C. Data Points
        const totalDataPoints = data.length;
        return {
            globalAvgPrice,
            mostVolatileCommodity,
            totalDataPoints
        };
    } catch (error) {
        console.error('getSummaryStatistics Error:', error);
        return {
            globalAvgPrice: 0,
            mostVolatileCommodity: 'Error',
            totalDataPoints: 0
        };
    }
}
function getUniqueValues(field) {
    try {
        const data = getWFPData();
        const values = new Set();
        data.forEach((row)=>{
            if (row[field]) {
                values.add(String(row[field]));
            }
        });
        return Array.from(values).sort();
    } catch (error) {
        console.error(`getUniqueValues error for ${field}:`, error);
        return [];
    }
}
function getCommoditiesForCountry(country) {
    try {
        const data = getWFPData();
        const values = new Set();
        data.forEach((row)=>{
            if (row.country === country && row.commodity) {
                values.add(String(row.commodity));
            }
        });
        return Array.from(values).sort();
    } catch (error) {
        console.error(`getCommoditiesForCountry error for ${country}:`, error);
        return [];
    }
}
function getPredictionBaseline(country, commodity) {
    try {
        const data = getWFPData();
        const filtered = data.filter((d)=>d.country === country && d.commodity === commodity && d.price_usd > 0);
        if (filtered.length === 0) return null;
        const prices = filtered.map((d)=>d.price_usd);
        const avgPrice = prices.reduce((a, b)=>a + b, 0) / prices.length;
        // Calculate averages for features to use as baseline
        const avgDistance = filtered.reduce((sum, item)=>sum + (item.market_distance_km || 0), 0) / filtered.length;
        const avgSeasonality = filtered.reduce((sum, item)=>sum + (item.seasonality_index || 0), 0) / filtered.length;
        const avgTransport = filtered.reduce((sum, item)=>sum + (item.transport_cost_index || 0), 0) / filtered.length;
        return {
            basePrice: avgPrice,
            avgDistance,
            avgSeasonality,
            avgTransport,
            sampleSize: filtered.length
        };
    } catch (error) {
        console.error('getPredictionBaseline error:', error);
        return null;
    }
}
function getPricePercentiles(country, commodity) {
    try {
        const data = getWFPData();
        const filtered = data.filter((d)=>d.country === country && d.commodity === commodity && d.price_usd > 0).map((d)=>d.price_usd).sort((a, b)=>a - b);
        if (filtered.length === 0) return null;
        const p33Index = Math.floor(filtered.length * 0.33);
        const p66Index = Math.floor(filtered.length * 0.66);
        return {
            p33: filtered[p33Index],
            p66: filtered[p66Index],
            min: filtered[0],
            max: filtered[filtered.length - 1],
            avg: filtered.reduce((a, b)=>a + b, 0) / filtered.length
        };
    } catch (error) {
        console.error(`getPricePercentiles error for ${country}, ${commodity}:`, error);
        return null;
    }
}
}),
"[project]/app/api/options/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvParser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/csvParser.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country');
        const countries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvParser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUniqueValues"])('country');
        let commodities = [];
        if (country) {
            commodities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvParser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCommoditiesForCountry"])(country);
        } else {
            commodities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvParser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUniqueValues"])('commodity');
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            countries,
            commodities
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch options'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ff96c471._.js.map