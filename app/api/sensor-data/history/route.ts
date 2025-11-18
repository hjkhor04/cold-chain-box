import { NextRequest, NextResponse } from 'next/server';
import { getSensorDataHistory } from '@/lib/dynamodb';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const boxId = searchParams.get('boxId');
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');

    if (!boxId || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'boxId, startTime, and endTime are required' },
        { status: 400 }
      );
    }

    const data = await getSensorDataHistory(boxId, startTime, endTime);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sensor data history' },
      { status: 500 }
    );
  }
}
