import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface WFPDataPoint {
    country: string;
    region: string;
    market: string;
    commodity: string;
    date: string;
    price_usd: number;
    year: number;
    month: number;
    seasonality_index: number;
    market_distance_km: number;
    transport_cost_index: number;
    vulnerability_index: number;
}

function getCSVPath() {
    return path.join(process.cwd(), 'resources', 'wfp_dataset.csv');
}

export function getWFPData(): WFPDataPoint[] {
    try {
        const csvPath = getCSVPath();

        if (!fs.existsSync(csvPath)) {
            console.error('getWFPData: File not found at', csvPath);
            return [];
        }

        const fileContent = fs.readFileSync(csvPath, 'utf-8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            cast: (value, context) => {
                if (['price_usd', 'year', 'month', 'seasonality_index', 'market_distance_km', 'transport_cost_index', 'vulnerability_index'].includes(context.column as string)) {
                    const num = parseFloat(value);
                    return isNaN(num) ? 0 : num;
                }
                return value;
            }
        }) as WFPDataPoint[];

        return records;
    } catch (error) {
        console.error('getWFPData Error:', error);
        return [];
    }
}

// 1. PRICE TRENDS OVER TIME — CLEAN VERSION (Monthly Aggregated)
export function getPriceTrends() {
    try {
        const data = getWFPData();
        if (!data || data.length === 0) return { labels: [], datasets: [] };

        // Group by commodity + month
        const grouped: Record<string, Record<string, { sum: number; count: number }>> = {};
        const allMonths = new Set<string>();

        data.forEach(row => {
            if (!row.commodity || !row.date) return;

            // Convert date to YYYY-MM
            const dateObj = new Date(row.date);
            if (isNaN(dateObj.getTime())) return;
            const monthStr = dateObj.toISOString().slice(0, 7); // YYYY-MM

            if (!grouped[row.commodity]) grouped[row.commodity] = {};
            if (!grouped[row.commodity][monthStr]) grouped[row.commodity][monthStr] = { sum: 0, count: 0 };

            grouped[row.commodity][monthStr].sum += row.price_usd;
            grouped[row.commodity][monthStr].count += 1;
            allMonths.add(monthStr);
        });

        const sortedMonths = Array.from(allMonths).sort();
        // Limit to top commodities to avoid clutter if too many, or just take all if reasonable
        // For this dataset, let's take top 5 most frequent or just first 5 found to keep it clean as requested
        const commodities = Object.keys(grouped).slice(0, 7);

        const datasets = commodities.map((comm, index) => {
            const dataPoints = sortedMonths.map(month => {
                const entry = grouped[comm][month];
                return entry ? entry.sum / entry.count : null;
            });

            return {
                label: comm,
                data: dataPoints,
                borderColor: `hsl(${index * 50}, 70%, 50%)`, // Distinct colors
                backgroundColor: `hsla(${index * 50}, 70%, 50%, 0.1)`,
                tension: 0.4, // Smooth lines
                pointRadius: 0, // No scatter points as requested
                pointHoverRadius: 6,
                fill: false // Clean line chart
            };
        });

        return { labels: sortedMonths, datasets };
    } catch (error) {
        console.error('getPriceTrends Error:', error);
        return { labels: [], datasets: [] };
    }
}

// 2. REGIONAL ANALYSIS — REALISTIC VOLATILITY (std / mean)
export function getRegionalAnalysis() {
    try {
        const data = getWFPData();
        if (!data || data.length === 0) return { labels: [], datasets: [] };

        const regionStats: Record<string, number[]> = {};

        data.forEach(row => {
            if (!row.region) return;
            if (!regionStats[row.region]) regionStats[row.region] = [];
            regionStats[row.region].push(row.price_usd);
        });

        const regions = Object.keys(regionStats);
        const rawVolatilities: number[] = [];

        regions.forEach(region => {
            const prices = regionStats[region];
            if (prices.length < 2) {
                rawVolatilities.push(0);
                return;
            }

            const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
            if (mean === 0) {
                rawVolatilities.push(0);
                return;
            }

            const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
            const stdDev = Math.sqrt(variance);

            // Volatility = std / mean (Coefficient of Variation)
            rawVolatilities.push(stdDev / mean);
        });

        // Normalize 0-1
        const minVol = Math.min(...rawVolatilities);
        const maxVol = Math.max(...rawVolatilities);
        const range = maxVol - minVol;

        const normalizedVolatility = rawVolatilities.map(v => range === 0 ? 0 : (v - minVol) / range);

        // Unique neon colors for each region
        const colors = [
            'rgba(239, 68, 68, 0.8)',   // Red
            'rgba(249, 115, 22, 0.8)',  // Orange
            'rgba(234, 179, 8, 0.8)',   // Yellow
            'rgba(34, 197, 94, 0.8)',   // Green
            'rgba(6, 182, 212, 0.8)',   // Cyan
            'rgba(59, 130, 246, 0.8)',  // Blue
            'rgba(168, 85, 247, 0.8)',  // Purple
            'rgba(236, 72, 153, 0.8)',  // Pink
        ];

        return {
            labels: regions,
            datasets: [{
                label: 'Price Volatility (Normalized)',
                data: normalizedVolatility,
                backgroundColor: regions.map((_, i) => colors[i % colors.length]),
                borderColor: regions.map((_, i) => colors[i % colors.length].replace('0.8', '1')),
                borderWidth: 1,
                borderRadius: 6, // Rounded corners
                barThickness: 40,
            }]
        };
    } catch (error) {
        console.error('getRegionalAnalysis Error:', error);
        return { labels: [], datasets: [] };
    }
}

// 3. COMMODITY CORRELATION — FIXED VERSION (Avg Cost vs Avg Price)
export function getCorrelationData() {
    try {
        const data = getWFPData();
        if (!data || data.length === 0) return [];

        // Group by commodity
        const commodityStats: Record<string, { totalCost: number; totalPrice: number; count: number }> = {};

        data.forEach(row => {
            if (!row.commodity) return;
            if (!commodityStats[row.commodity]) commodityStats[row.commodity] = { totalCost: 0, totalPrice: 0, count: 0 };

            commodityStats[row.commodity].totalCost += row.transport_cost_index;
            commodityStats[row.commodity].totalPrice += row.price_usd;
            commodityStats[row.commodity].count += 1;
        });

        const result = Object.keys(commodityStats).map((comm, index) => {
            const stats = commodityStats[comm];
            const avgCost = stats.totalCost / stats.count;
            const avgPrice = stats.totalPrice / stats.count;

            return {
                label: comm,
                data: [{
                    x: avgCost,
                    y: avgPrice,
                    r: Math.max(5, avgPrice * 2) // Bubble size proportional to price (scaled for visibility)
                }],
                backgroundColor: `hsla(${index * 40}, 70%, 60%, 0.7)`,
                borderColor: `hsla(${index * 40}, 70%, 60%, 1)`,
            };
        });

        return result;
    } catch (error) {
        console.error('getCorrelationData Error:', error);
        return [];
    }
}

// 4. SUMMARY STATISTICS — REAL VALUES
export function getSummaryStatistics() {
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
        const totalSum = data.reduce((sum, row) => sum + (row.price_usd || 0), 0);
        const globalAvgPrice = totalSum / data.length;

        // B. Most Volatile Commodity (std dev of price)
        const commodityPrices: Record<string, number[]> = {};
        data.forEach(row => {
            if (!row.commodity) return;
            if (!commodityPrices[row.commodity]) commodityPrices[row.commodity] = [];
            commodityPrices[row.commodity].push(row.price_usd || 0);
        });

        let maxVolatility = -1;
        let mostVolatileCommodity = 'N/A';

        Object.entries(commodityPrices).forEach(([comm, prices]) => {
            if (prices.length < 2) return;
            const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
            if (mean === 0) return;
            const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
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
// 5. HELPER: Get Unique Values for Dropdowns
export function getUniqueValues(field: keyof WFPDataPoint): string[] {
    try {
        const data = getWFPData();
        const values = new Set<string>();
        data.forEach(row => {
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

export function getCommoditiesForCountry(country: string): string[] {
    try {
        const data = getWFPData();
        const values = new Set<string>();
        data.forEach(row => {
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

// 6. PREDICTION BASELINE: Get stats for specific country/commodity
export function getPredictionBaseline(country: string, commodity: string) {
    try {
        const data = getWFPData();
        const filtered = data.filter(d =>
            d.country === country &&
            d.commodity === commodity &&
            d.price_usd > 0
        );

        if (filtered.length === 0) return null;

        const prices = filtered.map(d => d.price_usd);
        const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

        // Calculate averages for features to use as baseline
        const avgDistance = filtered.reduce((sum, item) => sum + (item.market_distance_km || 0), 0) / filtered.length;
        const avgSeasonality = filtered.reduce((sum, item) => sum + (item.seasonality_index || 0), 0) / filtered.length;
        const avgTransport = filtered.reduce((sum, item) => sum + (item.transport_cost_index || 0), 0) / filtered.length;

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

// 7. PRICE PERCENTILES: Get p33 and p66 for classification
export function getPricePercentiles(country: string, commodity: string) {
    try {
        const data = getWFPData();
        const filtered = data
            .filter(d => d.country === country && d.commodity === commodity && d.price_usd > 0)
            .map(d => d.price_usd)
            .sort((a, b) => a - b);

        if (filtered.length === 0) return null;

        const p33Index = Math.floor(filtered.length * 0.33);
        const p66Index = Math.floor(filtered.length * 0.66);

        return {
            p33: filtered[p33Index],
            p66: filtered[p66Index],
            min: filtered[0],
            max: filtered[filtered.length - 1],
            avg: filtered.reduce((a, b) => a + b, 0) / filtered.length
        };
    } catch (error) {
        console.error(`getPricePercentiles error for ${country}, ${commodity}:`, error);
        return null;
    }
}
