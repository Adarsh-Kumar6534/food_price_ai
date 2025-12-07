import { NextResponse } from 'next/server';
import { getPredictionBaseline } from '@/lib/csvParser';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { country, commodity, marketDistance, seasonalityIndex } = body;

        // 1. Get Real Baseline Data from CSV
        const baseline = getPredictionBaseline(country, commodity);

        if (!baseline) {
            return NextResponse.json({
                error: `No historical data found for ${commodity} in ${country}. Please try another combination.`
            }, { status: 404 });
        }

        // 2. Feature Engineering / Adjustment Logic
        // We start with the historical average price for this specific region & commodity
        let predictedPrice = baseline.basePrice;

        // Factor A: Market Distance Impact
        // Hypothesis: Greater distance = Higher transport costs = Higher Price
        // We compare user input to the historical average distance
        const inputDistance = parseFloat(marketDistance) || baseline.avgDistance;
        const distanceDiff = inputDistance - baseline.avgDistance;
        // Assumption: Every 10km extra adds ~2% to the price (simplified coefficient)
        const distanceFactor = 1 + (distanceDiff / 100) * 0.2;

        // Factor B: Seasonality Impact
        // Hypothesis: Seasonality Index > Average implies scarcity/high demand period
        const inputSeasonality = parseFloat(seasonalityIndex) || baseline.avgSeasonality;
        const seasonalityDiff = inputSeasonality - baseline.avgSeasonality;
        // Assumption: Deviation in seasonality index directly impacts price volatility
        const seasonalityFactor = 1 + (seasonalityDiff * 0.5);

        // Apply Factors
        predictedPrice = predictedPrice * distanceFactor * seasonalityFactor;

        // Ensure price doesn't go negative or unrealistic
        predictedPrice = Math.max(0.1, predictedPrice);

        // 3. Confidence Calculation
        // More data points = Higher confidence
        // Closer inputs to average = Higher confidence
        let confidence = 0.85; // Base confidence
        if (baseline.sampleSize > 100) confidence += 0.05;
        if (baseline.sampleSize > 1000) confidence += 0.05;

        // Penalize for extreme outliers in inputs
        if (Math.abs(distanceDiff) > 50) confidence -= 0.1;

        return NextResponse.json({
            predicted_price: parseFloat(predictedPrice.toFixed(2)),
            currency: 'USD',
            unit: 'kg',
            confidence: parseFloat(Math.min(0.99, confidence).toFixed(2)),
            model_used: `Hybrid Regression (Baseline N=${baseline.sampleSize})`,
            factors: {
                base_price: parseFloat(baseline.basePrice.toFixed(2)),
                avg_distance: parseFloat(baseline.avgDistance.toFixed(1)),
                transport_impact: `${((distanceFactor - 1) * 100).toFixed(1)}%`,
                seasonality_impact: `${((seasonalityFactor - 1) * 100).toFixed(1)}%`
            }
        });

    } catch (error) {
        console.error('Prediction Error:', error);
        return NextResponse.json(
            { error: 'Failed to process prediction request' },
            { status: 500 }
        );
    }
}
