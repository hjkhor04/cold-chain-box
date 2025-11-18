import { NextResponse } from 'next/server';
import { getAllBoxesLatestData } from '@/lib/dynamodb';

export async function GET() {
  try {
    const data = await getAllBoxesLatestData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sensor data' },
      { status: 500 }
    );
  }
}
