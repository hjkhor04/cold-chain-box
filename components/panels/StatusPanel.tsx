'use client';

import { Activity, AlertTriangle, Truck } from 'lucide-react';
import { useSensorData } from '@/hooks/useSensorData';

interface StatusPanelProps {
  onShowTracking: (boxId: string) => void;
}

export default function StatusPanel({ onShowTracking }: StatusPanelProps) {
  const { data: rbm001Data, loading: rbm001Loading } = useSensorData('RBM-001');
  return (
    <div className="panel status-theme">
      <div className="panel-header rounded-t-lg p-6 mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Activity className="w-6 h-6 mr-3" />
          Shipment Status
        </h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg panel-accent p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Current Shipments</h3>
            <p className="text-sm text-gray-600">
              Detailed status monitoring and tracking for all active shipments.
            </p>
          </div>
          <div className="flex space-x-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Returning</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>All Locations</option>
              <option>Singapore</option>
              <option>Bangkok</option>
              <option>Jakarta</option>
              <option>Manila</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* RBM-001 */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-gray-800">RBM-001</h4>
                <p className="text-sm text-gray-600">Insulin Pens (50 units)</p>
                <span className="px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-50 inline-block mt-1">
                  Shipping
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-500">Temperature:</span>
                <p className="font-medium">
                  {rbm001Loading ? 'Loading...' : rbm001Data ? `${rbm001Data.temperature}°C` : '4.2°C'}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Humidity:</span>
                <p className="font-medium">
                  {rbm001Loading ? 'Loading...' : rbm001Data ? `${rbm001Data.humidity}% RH` : '45% RH'}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Destination:</span>
                <p className="font-medium">Singapore General Hospital</p>
              </div>
              <div>
                <span className="text-gray-500">ETA:</span>
                <p className="font-medium">2024-09-29 14:00</p>
              </div>
            </div>
            <button 
              onClick={() => onShowTracking('RBM-001')}
              className="btn-primary w-full py-2 px-4 rounded-lg hover:bg-amber-600 flex items-center justify-center"
            >
              <Truck className="w-4 h-4 mr-2" />
              Track Shipment
            </button>
          </div>

          {/* RBM-002 */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-gray-800">RBM-002</h4>
                <p className="text-sm text-gray-600">COVID-19 Vaccines</p>
                <span className="px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-50 inline-block mt-1">
                  Shipping
                </span>
              </div>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-500">Temperature:</span>
                <p className="font-medium">-2.1°C</p>
              </div>
              <div>
                <span className="text-gray-500">Humidity:</span>
                <p className="font-medium text-red-600">25% RH</p>
              </div>
              <div>
                <span className="text-gray-500">Destination:</span>
                <p className="font-medium">Bangkok Medical Center</p>
              </div>
              <div>
                <span className="text-gray-500">ETA:</span>
                <p className="font-medium">2024-09-30 09:00</p>
              </div>
            </div>
            <button 
              onClick={() => onShowTracking('RBM-002')}
              className="btn-primary w-full py-2 px-4 rounded-lg hover:bg-amber-600 flex items-center justify-center"
            >
              <Truck className="w-4 h-4 mr-2" />
              Track Shipment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
