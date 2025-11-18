'use client';

import { AlertTriangle, Thermometer, Droplets, Clock } from 'lucide-react';

interface AlertsPanelProps {
  onShowAlertDetails: (boxId: string, alertType: string) => void;
}

export default function AlertsPanel({ onShowAlertDetails }: AlertsPanelProps) {
  return (
    <div className="panel alerts-theme">
      <div className="panel-header rounded-t-lg p-6 mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <AlertTriangle className="w-6 h-6 mr-3" />
          System Alerts
        </h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg panel-accent p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Critical Notifications</h3>
          <p className="text-sm text-gray-600">
            Comprehensive alert management for temperature violations, humidity issues, and shipment delays.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-red-900">RBM-005</h4>
                <p className="text-red-800 font-semibold mb-2">Temperature exceeding range</p>
                <p className="text-sm text-red-700 font-medium">Equipment: Blood Samples (20 vials)</p>
                <p className="text-xs text-red-600 font-medium mt-1">Alert triggered: Sep 28, 2024 08:15</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onShowAlertDetails('RBM-005', 'temperature')}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  View Details
                </button>
                <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                  Acknowledge
                </button>
              </div>
            </div>
          </div>

          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-red-900">RBM-005</h4>
                <p className="text-red-800 font-semibold mb-2">Shipment &gt;3 days</p>
                <p className="text-sm text-red-700 font-medium">Equipment: Blood Samples (20 vials)</p>
                <p className="text-xs text-red-600 font-medium mt-1">Alert triggered: Sep 28, 2024 00:00</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onShowAlertDetails('RBM-005', 'duration')}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  View Details
                </button>
                <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                  Acknowledge
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <Thermometer className="w-6 h-6 text-red-500 mr-3" />
              <div>
                <p className="font-semibold text-red-800">Temperature Alerts</p>
                <p className="text-red-600">1</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <Droplets className="w-6 h-6 text-blue-500 mr-3" />
              <div>
                <p className="font-semibold text-blue-800">Humidity Alerts</p>
                <p className="text-blue-600">1</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-orange-500 mr-3" />
              <div>
                <p className="font-semibold text-orange-800">Time Alerts</p>
                <p className="text-orange-600">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
