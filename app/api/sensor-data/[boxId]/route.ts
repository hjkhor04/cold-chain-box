import { NextRequest, NextResponse } from 'next/server';
import { getLatestSensorData } from '@/lib/dynamodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ boxId: string }> }
) {
  try {
    const { boxId } = await params;
    
    if (!boxId) {
      return NextResponse.json(
        { error: 'Box ID is required' },
        { status: 400 }
      );
    }

    const data = await getLatestSensorData(boxId);
    
    if (!data) {
      return NextResponse.json(
        { error: 'No data found for this box' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sensor data' },
      { status: 500 }
    );
  }
}
