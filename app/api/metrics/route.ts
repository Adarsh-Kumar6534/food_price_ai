import { NextResponse } from 'next/server';
import { registry } from '@/lib/metrics';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const metrics = await registry.metrics();
    return new NextResponse(metrics, {
      headers: {
        'Content-Type': registry.contentType,
      },
    });
  } catch (error) {
    return new NextResponse('Error generating metrics', { status: 500 });
  }
}
