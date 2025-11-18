'use client';

import dynamic from 'next/dynamic';
import { Home, Package, AlertTriangle, MapPin } from 'lucide-react';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-96 rounded-lg bg-gray-100 flex items-center justify-center">Loading map...</div>
});

interface HomePanelProps {
  onShowDetails: (boxId: string, type: string) => void;
  onShowMapMarker: (boxId: string, location: string) => void;
}

export default function HomePanel({ onShowDetails, onShowMapMarker }: HomePanelProps) {
  return (
    <div className="panel home-theme">
      <div className="panel-header rounded-t-lg p-6 mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Home className="w-6 h-6 mr-3" />
          Dashboard Overview
        </h2>
        <p className="text-emerald-100 mt-2 text-sm">
          A Foldable, Smart, and Temperature-Controlled Shipping Solution for Medical Devices
        </p>
      </div>
      
      {/* Global Locations Map - Full Width at Top */}
      <div className="bg-white rounded-lg shadow-lg panel-accent mb-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Global Locations
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Real-time tracking of all cold boxes across Southeast Asia with status indicators.
          </p>
          <div className="h-96 rounded-lg relative overflow-hidden border border-gray-200">
            <MapComponent onMarkerClick={onShowMapMarker} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Shipments */}
        <div className="bg-white rounded-lg shadow-lg panel-accent">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Active Shipments (3)
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Real-time monitoring of all cold boxes currently in transit with medical equipment.
            </p>
            <div className="space-y-3">
              <div 
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => onShowDetails('RBM-001', 'box')}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">RBM-001</p>
                    <p className="text-sm text-gray-600">Insulin Pens (50 units)</p>
                  </div>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
              </div>
              
              <div 
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => onShowDetails('RBM-002', 'box')}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">RBM-002</p>
                    <p className="text-sm text-gray-600">COVID-19 Vaccines (100 doses)</p>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
              </div>
              
              <div 
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => onShowDetails('RBM-005', 'box')}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">RBM-005</p>
                    <p className="text-sm text-gray-600">Blood Samples (20 vials)</p>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg shadow-lg panel-accent">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
              Active Alerts (3)
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Critical notifications for temperature, humidity, and shipment duration violations.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium text-red-800">RBM-002</p>
                <p className="text-sm text-red-600">High humidity detected</p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium text-red-800">RBM-005</p>
                <p className="text-sm text-red-600">Temperature exceeding range</p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium text-red-800">RBM-005</p>
                <p className="text-sm text-red-600">Shipment &gt;3 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
