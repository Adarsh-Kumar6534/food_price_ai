import { NextResponse } from 'next/server';
import { getUniqueValues, getCommoditiesForCountry } from '@/lib/csvParser';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country');

        const countries = getUniqueValues('country');
        let commodities: string[] = [];

        if (country) {
            commodities = getCommoditiesForCountry(country);
        } else {
            commodities = getUniqueValues('commodity');
        }

        return NextResponse.json({
            countries,
            commodities
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch options' }, { status: 500 });
    }
}
