// lib/dynamo.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const ddb = DynamoDBDocumentClient.from(client);

export interface SensorData {
  boxId: string;
  timestamp: string;
  temperature: number;
  humidity: number;
  location?: string;
}

/**
 * Map frontend box IDs to DynamoDB device IDs
 */
function mapBoxIdToDeviceId(boxId: string): string {
  const mapping: Record<string, string> = {
    "RBM-001": "rebox_med_001",
    "RBM-002": "rebox_med_002",
    "RBM-003": "rebox_med_003",
    "RBM-004": "rebox_med_004",
    "RBM-005": "rebox_med_005",
  };
  return mapping[boxId] || boxId;
}

/**
 * Get the latest sensor data for a specific box
 */
export async function getLatestSensorData(boxId: string): Promise<SensorData | null> {
  try {
    const deviceId = mapBoxIdToDeviceId(boxId);
    const command = new QueryCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME || "ReBoxMedSensorData",
      KeyConditionExpression: "device_id = :boxId",
      ExpressionAttributeValues: {
        ":boxId": deviceId,
      },
      ScanIndexForward: false, // Sort descending by timestamp to get latest first
      Limit: 1,
    });

    const response = await ddb.send(command);
    return response.Items?.[0] as SensorData || null;
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    throw error;
  }
}

/**
 * Get latest sensor data for all boxes
 */
export async function getAllBoxesLatestData(): Promise<Record<string, SensorData>> {
  const boxIds = ["RBM-001", "RBM-002", "RBM-003", "RBM-004", "RBM-005"];
  const result: Record<string, SensorData> = {};

  await Promise.all(
    boxIds.map(async (boxId) => {
      const data = await getLatestSensorData(boxId);
      if (data) {
        result[boxId] = data;
      }
    })
  );

  return result;
}

/**
 * Get sensor data history for a time range
 */
export async function getSensorDataHistory(
  boxId: string,
  startTime: string,
  endTime: string
): Promise<SensorData[]> {
  try {
    const deviceId = mapBoxIdToDeviceId(boxId);
    const command = new QueryCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME || "ReBoxMedSensorData",
      KeyConditionExpression: "device_id = :boxId AND #ts BETWEEN :start AND :end",
      ExpressionAttributeNames: {
        "#ts": "timestamp",
      },
      ExpressionAttributeValues: {
        ":boxId": deviceId,
        ":start": startTime,
        ":end": endTime,
      },
      ScanIndexForward: true,
    });

    const response = await ddb.send(command);
    return (response.Items as SensorData[]) || [];
  } catch (error) {
    console.error("Error fetching sensor data history:", error);
    throw error;
  }
}
