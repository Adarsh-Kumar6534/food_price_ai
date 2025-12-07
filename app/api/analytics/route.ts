import { NextResponse } from 'next/server';
import { getPriceTrends, getRegionalAnalysis, getCorrelationData, getSummaryStatistics } from '@/lib/csvParser';

export async function GET() {
    try {
        const trends = getPriceTrends();
        const regional = getRegionalAnalysis();
        const correlation = getCorrelationData();
        const summary = getSummaryStatistics();

        return NextResponse.json({
            trends,
            regional,
            correlation,
            summary
        });
    } catch (error) {
        console.error('Analytics API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
    }
}
