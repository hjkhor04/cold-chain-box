'use client';

import { FileText, Download, CheckCircle, Clock, Thermometer, AlertTriangle } from 'lucide-react';

interface ReportsPanelProps {
  onViewReport: (boxId: string) => void;
  onExportReport: (boxId: string) => void;
  onExportAll: () => void;
}

export default function ReportsPanel({ onViewReport, onExportReport, onExportAll }: ReportsPanelProps) {
  return (
    <div className="panel reports-theme">
      <div className="panel-header rounded-t-lg p-6 mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <FileText className="w-6 h-6 mr-3" />
          Shipment Reports
        </h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg panel-accent p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Analytics Dashboard</h3>
            <p className="text-sm text-gray-600">
              Comprehensive reporting and analytics for shipment history, performance metrics, and compliance data.
            </p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={onExportAll}
              className="btn-primary px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </button>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Completed Shipments</p>
                <p className="text-2xl font-bold text-green-800">127</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm">Average Transit Time</p>
                <p className="text-2xl font-bold text-blue-800">2.3 days</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm">Temperature Compliance</p>
                <p className="text-2xl font-bold text-yellow-800">98.5%</p>
              </div>
              <Thermometer className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm">Total Alerts</p>
                <p className="text-2xl font-bold text-purple-800">8</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Completed Shipments History */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Completed Shipments</h4>
          <div className="space-y-4">
            {[
              { id: 'RBM-010', equipment: 'Insulin Pens (30 units)', dest: 'Penang Hospital', date: '2024-09-20', duration: '2 days', temp: '4.1°C', alerts: 0 },
              { id: 'RBM-011', equipment: 'Flu Vaccines (200 doses)', dest: 'Johor Medical Center', date: '2024-09-18', duration: '1 day', temp: '3.9°C', alerts: 1 }
            ].map((shipment) => (
              <div key={shipment.id} className="bg-white border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{shipment.id}</h3>
                    <p className="text-gray-600">{shipment.equipment}</p>
                    <p className="text-sm text-gray-500">{shipment.dest}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Completed</span>
                    <button 
                      onClick={() => onViewReport(shipment.id)}
                      className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded hover:bg-purple-200"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => onExportReport(shipment.id)}
                      className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded hover:bg-gray-200"
                    >
                      Export
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Completed:</span>
                    <p className="font-medium">{shipment.date}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <p className="font-medium">{shipment.duration}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Avg Temp:</span>
                    <p className="font-medium">{shipment.temp}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Alerts:</span>
                    <p className="font-medium">{shipment.alerts}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
