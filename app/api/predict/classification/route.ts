import { NextResponse } from 'next/server';
import { getPricePercentiles, getPredictionBaseline } from '@/lib/csvParser';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { country, commodity, vulnerabilityIndex, transportCostIndex } = body;

        if (!country || !commodity) {
            return NextResponse.json({
                error: 'Country and Commodity are required for risk classification.'
            }, { status: 400 });
        }

        const percentiles = getPricePercentiles(country, commodity);
        const baseline = getPredictionBaseline(country, commodity);

        if (!percentiles || !baseline) {
            return NextResponse.json({
                error: `No historical data found for ${commodity} in ${country}.`
            }, { status: 404 });
        }

        // Calculate a "Risk Score" based on inputs relative to averages
        // We use the baseline price as a starting point
        let predictedPrice = baseline.basePrice;

        // Adjust for Transport Cost (if provided)
        // Assuming higher transport cost = higher price = higher risk
        if (transportCostIndex) {
            const inputTransport = parseFloat(transportCostIndex);
            const avgTransport = baseline.avgTransport || 1.0; // Default to 1 if missing
            const transportFactor = 1 + ((inputTransport - avgTransport) / avgTransport) * 0.3; // 30% weight
            predictedPrice *= transportFactor;
        }

        // Adjust for Vulnerability (if provided)
        // High vulnerability might imply supply chain issues -> higher price volatility/risk
        let vulnerabilityImpact = 0;
        if (vulnerabilityIndex) {
            const inputVuln = parseFloat(vulnerabilityIndex);
            // Arbitrary: if vuln > 0.5, add risk premium
            if (inputVuln > 0.5) {
                predictedPrice *= (1 + (inputVuln - 0.5) * 0.2); // Up to 10% increase
                vulnerabilityImpact = (inputVuln - 0.5) * 0.2;
            }
        }

        // Determine Risk Level based on Predicted Price vs Historical Percentiles
        let riskLevel = 'Medium';
        let colorCode = 'orange';
        let probability = 0.60;

        if (predictedPrice < percentiles.p33) {
            riskLevel = 'Low';
            colorCode = 'green';
            probability = 0.75; // Confidence in low risk
        } else if (predictedPrice > percentiles.p66) {
            riskLevel = 'High';
            colorCode = 'red';
            probability = 0.85; // High confidence if it's way above
        }

        // Refine probability based on how far it is into the category
        // (Simplified logic)

        return NextResponse.json({
            risk_level: riskLevel,
            color_code: colorCode,
            probability: parseFloat(probability.toFixed(2)),
            model_used: 'Statistical Quantile Classification',
            factors: {
                base_price: parseFloat(baseline.basePrice.toFixed(2)),
                predicted_price: parseFloat(predictedPrice.toFixed(2)),
                p33_threshold: parseFloat(percentiles.p33.toFixed(2)),
                p66_threshold: parseFloat(percentiles.p66.toFixed(2)),
                vulnerability_impact: `${(vulnerabilityImpact * 100).toFixed(1)}%`,
                transport_impact: transportCostIndex ? 'Included' : 'N/A'
            }
        });

    } catch (error) {
        console.error('Classification Error:', error);
        return NextResponse.json(
            { error: 'Failed to process classification request' },
            { status: 500 }
        );
    }
}
