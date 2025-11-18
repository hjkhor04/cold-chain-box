'use client';

import { useState } from 'react';
import { Modal } from './Modal';

interface ShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const availableBoxes = [
  { id: 'RBM-001', status: 'Available' },
  { id: 'RBM-002', status: 'Available' },
  { id: 'RBM-003', status: 'Available' },
  { id: 'RBM-004', status: 'Available' },
  { id: 'RBM-005', status: 'Available' },
];

export default function ShipmentModal({ isOpen, onClose }: ShipmentModalProps) {
  const [selectedBox, setSelectedBox] = useState('');
  const [tempRange, setTempRange] = useState<'2-8' | 'below-0'>('2-8');
  const [formData, setFormData] = useState({
    destination: '',
    receiverName: '',
    picName: '',
    company: '',
    email: '',
    phone: '',
    items: '',
    remarks: ''
  });

  const humidityRange = tempRange === '2-8' ? '40-60% RH' : '10-30% RH';

  const handleConfirm = () => {
    alert('Shipment arranged successfully! The cold box will be prepared for shipping.');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Arrange New Shipment" maxWidth="2xl">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Box *</label>
          <select 
            value={selectedBox}
            onChange={(e) => setSelectedBox(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Choose a cold box...</option>
            {availableBoxes.map((box) => (
              <option key={box.id} value={box.id}>
                {box.id} - {box.status}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Range</label>
            <select 
              value={tempRange}
              onChange={(e) => setTempRange(e.target.value as '2-8' | 'below-0')}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="2-8">2–8 °C</option>
              <option value="below-0">≤0 °C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Humidity Range (Auto-filled)</label>
            <input 
              type="text" 
              value={humidityRange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" 
              readOnly 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
          <input 
            type="text" 
            placeholder="Enter destination address"
            value={formData.destination}
            onChange={(e) => setFormData({...formData, destination: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Receiver Name *</label>
            <input 
              type="text" 
              placeholder="Dr. John Smith"
              value={formData.receiverName}
              onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PIC Name *</label>
            <input 
              type="text" 
              placeholder="Person In Charge"
              value={formData.picName}
              onChange={(e) => setFormData({...formData, picName: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
          <input 
            type="text" 
            placeholder="Hospital/Clinic Name"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              placeholder="doctor@hospital.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input 
              type="tel" 
              placeholder="+60-3-1234-5678"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Items Inside Box *</label>
          <textarea 
            rows={2} 
            placeholder="e.g., Insulin Pens (50 units), COVID-19 Vaccines (100 doses)"
            value={formData.items}
            onChange={(e) => setFormData({...formData, items: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
          <textarea 
            rows={2} 
            placeholder="Special handling instructions..."
            value={formData.remarks}
            onChange={(e) => setFormData({...formData, remarks: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <div className="flex space-x-4">
          <button 
            type="button" 
            onClick={handleConfirm}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm Shipment
          </button>
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
