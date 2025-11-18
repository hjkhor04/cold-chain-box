'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, Package } from 'lucide-react';

interface ShipmentFlow {
  boxId: string;
  status: string;
  origin: string;
  destination: string;
  sender: string;
  receiver: string;
  items: string;
  departureDate: string;
  arrivalDate: string;
  currentLocation: string;
}

const shipmentFlows: ShipmentFlow[] = [
  {
    boxId: 'RBM-001',
    status: 'In Transit',
    origin: 'Kuala Lumpur HQ',
    destination: 'Singapore General Hospital',
    sender: 'ReBox Med Logistics',
    receiver: 'Dr. Sarah Chen',
    items: 'Insulin Pens (50 units)',
    departureDate: '2024-09-27',
    arrivalDate: '2024-09-29',
    currentLocation: 'Singapore Customs'
  },
  {
    boxId: 'RBM-002',
    status: 'In Transit',
    origin: 'Kuala Lumpur HQ',
    destination: 'Bangkok Medical Center',
    sender: 'ReBox Med Logistics',
    receiver: 'Dr. Somchai Patel',
    items: 'COVID-19 Vaccines (100 doses)',
    departureDate: '2024-09-26',
    arrivalDate: '2024-09-30',
    currentLocation: 'Bangkok Airport'
  },
  {
    boxId: 'RBM-003',
    status: 'Returning',
    origin: 'Jakarta Hospital',
    destination: 'Kuala Lumpur HQ',
    sender: 'Dr. Budi Santoso',
    receiver: 'ReBox Med Logistics',
    items: 'Empty (Completed delivery)',
    departureDate: '2024-09-28',
    arrivalDate: '2024-10-01',
    currentLocation: 'Port Klang'
  },
  {
    boxId: 'RBM-005',
    status: 'In Transit',
    origin: 'Kuala Lumpur HQ',
    destination: 'Manila General Hospital',
    sender: 'ReBox Med Logistics',
    receiver: 'Dr. Maria Santos',
    items: 'Blood Samples (20 vials)',
    departureDate: '2024-09-25',
    arrivalDate: '2024-09-28',
    currentLocation: 'Manila Port'
  }
];

export default function ShipmentFlowDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-2 border-blue-500 transition-transform duration-300 z-40 ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3rem)]'}`}>
      {/* Pullout Handle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-6 flex items-center justify-between bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Package className="w-5 h-5" />
          <span className="font-semibold">Shipment Flow Tracking</span>
          <span className="text-sm bg-blue-500 px-2 py-1 rounded">
            {shipmentFlows.length} Active
          </span>
        </div>
        {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
      </button>

      {/* Drawer Content */}
      <div className="overflow-auto max-h-96 p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="text-left p-3 font-semibold text-gray-700">Box ID</th>
                <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                <th className="text-left p-3 font-semibold text-gray-700">Origin</th>
                <th className="text-left p-3 font-semibold text-gray-700">Destination</th>
                <th className="text-left p-3 font-semibold text-gray-700">Sender</th>
                <th className="text-left p-3 font-semibold text-gray-700">Receiver</th>
                <th className="text-left p-3 font-semibold text-gray-700">Items</th>
                <th className="text-left p-3 font-semibold text-gray-700">Departure</th>
                <th className="text-left p-3 font-semibold text-gray-700">Arrival</th>
                <th className="text-left p-3 font-semibold text-gray-700">Current Location</th>
              </tr>
            </thead>
            <tbody>
              {shipmentFlows.map((flow, index) => (
                <tr key={flow.boxId} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="p-3 font-medium text-blue-600">{flow.boxId}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      flow.status === 'In Transit' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {flow.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-700">{flow.origin}</td>
                  <td className="p-3 text-gray-700">{flow.destination}</td>
                  <td className="p-3 text-gray-700">{flow.sender}</td>
                  <td className="p-3 text-gray-700">{flow.receiver}</td>
                  <td className="p-3 text-gray-700 text-sm">{flow.items}</td>
                  <td className="p-3 text-gray-600 text-sm">{flow.departureDate}</td>
                  <td className="p-3 text-gray-600 text-sm">{flow.arrivalDate}</td>
                  <td className="p-3 text-gray-700">{flow.currentLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
