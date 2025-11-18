import { useState, useEffect } from 'react';
import { SensorData } from '@/lib/dynamodb';

/**
 * Hook to fetch and auto-refresh sensor data for a specific box
 */
export function useSensorData(boxId: string, refreshInterval: number = 30000) {
  const [data, setData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!boxId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/sensor-data/${boxId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch sensor data');
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching sensor data:', err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up auto-refresh
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [boxId, refreshInterval]);

  return { data, loading, error };
}

/**
 * Hook to fetch all boxes sensor data
 */
export function useAllSensorData(refreshInterval: number = 30000) {
  const [data, setData] = useState<Record<string, SensorData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/sensor-data/all');
        
        if (!response.ok) {
          throw new Error('Failed to fetch sensor data');
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching all sensor data:', err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up auto-refresh
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { data, loading, error };
}

/**
 * Hook to fetch sensor data history
 */
export function useSensorDataHistory(
  boxId: string,
  startTime: string,
  endTime: string
) {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!boxId || !startTime || !endTime) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          boxId,
          startTime,
          endTime,
        });
        
        const response = await fetch(`/api/sensor-data/history?${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch sensor data history');
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching sensor data history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [boxId, startTime, endTime]);

  return { data, loading, error };
}
