'use client';

import { Package, Eye, Plus } from 'lucide-react';

interface ShipmentsPanelProps {
  onShowDetails: (boxId: string, type: string) => void;
  onOpenShipmentModal: () => void;
}

export default function ShipmentsPanel({ onShowDetails, onOpenShipmentModal }: ShipmentsPanelProps) {
  return (
    <div className="panel shipments-theme relative">
      <div className="panel-header rounded-t-lg p-6 mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Package className="w-6 h-6 mr-3" />
          Shipment Management
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipping */}
        <div className="bg-white rounded-lg shadow-lg panel-accent">
          <div className="p-4 border-b bg-blue-50">
            <h3 className="text-lg font-semibold text-blue-800">Shipping (3)</h3>
            <p className="text-sm text-blue-600 mt-1">
              Cold boxes currently in transit - unavailable for new shipments.
            </p>
          </div>
          <div className="p-4 space-y-3">
            {['RBM-001', 'RBM-002', 'RBM-005'].map((id, idx) => (
              <div key={id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-800">{id}</p>
                    <p className="text-sm text-gray-600">
                      {idx === 0 ? 'Insulin Pens (50 units)' : idx === 1 ? 'COVID-19 Vaccines' : 'Blood Samples'}
                    </p>
                  </div>
                  {idx > 0 && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      {idx === 1 ? '1' : '3'} alert{idx === 2 ? 's' : ''}
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => onShowDetails(id, 'shipment')}
                  className="btn-primary px-3 py-1 text-sm rounded hover:bg-blue-700 flex items-center"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Returning */}
        <div className="bg-white rounded-lg shadow-lg panel-accent">
          <div className="p-4 border-b bg-blue-50">
            <h3 className="text-lg font-semibold text-blue-800">Returning (1)</h3>
            <p className="text-sm text-blue-600 mt-1">
              Cold boxes returning to Kuala Lumpur HQ - available soon for reuse.
            </p>
          </div>
          <div className="p-4 space-y-3">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-800">RBM-003</p>
                  <p className="text-sm text-gray-600">Empty (Completed delivery)</p>
                </div>
              </div>
              <button 
                onClick={() => onShowDetails('RBM-003', 'returning')}
                className="btn-primary px-3 py-1 text-sm rounded hover:bg-blue-700 flex items-center"
              >
                <Eye className="w-3 h-3 mr-1" />
                View
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Add Shipment Button */}
      <button
        onClick={onOpenShipmentModal}
        className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center space-x-2 z-50"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">New Shipment</span>
      </button>
    </div>
  );
}
