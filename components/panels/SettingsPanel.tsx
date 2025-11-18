'use client';

import { Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';

interface SettingsPanelProps {
  onSave: () => void;
}

export default function SettingsPanel({ onSave }: SettingsPanelProps) {
  const [settings, setSettings] = useState({
    temp2to8Min: 2,
    temp2to8Max: 8,
    tempBelow0Min: -10,
    tempBelow0Max: 0,
    humidity2to8Min: 40,
    humidity2to8Max: 60,
    humidityBelow0Min: 10,
    humidityBelow0Max: 30,
  });

  const handleSave = () => {
    onSave();
  };

  return (
    <div className="panel settings-theme">
      <div className="panel-header rounded-t-lg p-6 mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <SettingsIcon className="w-6 h-6 mr-3" />
          System Settings
        </h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg panel-accent p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">Alert Thresholds</h3>
          <p className="text-sm text-gray-700 font-medium">
            Configure custom temperature and humidity ranges for automated alert triggers and compliance monitoring.
          </p>
        </div>

        <div className="space-y-8">
          {/* Temperature Settings */}
          <div>
            <h4 className="text-md font-bold text-gray-800 mb-4">Temperature Thresholds</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium text-gray-800 mb-3">2–8°C Range</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">Min Temp (°C)</label>
                    <input 
                      type="number" 
                      value={settings.temp2to8Min}
                      onChange={(e) => setSettings({...settings, temp2to8Min: Number(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">Max Temp (°C)</label>
                    <input 
                      type="number" 
                      value={settings.temp2to8Max}
                      onChange={(e) => setSettings({...settings, temp2to8Max: Number(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded" 
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="font-medium text-gray-800 mb-3">≤0°C Range</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">Min Temp (°C)</label>
                    <input 
                      type="number" 
                      value={settings.tempBelow0Min}
                      onChange={(e) => setSettings({...settings, tempBelow0Min: Number(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">Max Temp (°C)</label>
                    <input 
                      type="number" 
                      value={settings.tempBelow0Max}
                      onChange={(e) => setSettings({...settings, tempBelow0Max: Number(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Humidity Settings */}
          <div>
            <h4 className="text-md font-bold text-gray-800 mb-4">Humidity Thresholds</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium text-gray-800 mb-3">2–8°C Range</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">Min Humidity (%RH)</label>
                    <input 
                      type="number" 
                      value={settings.humidity2to8Min}
                      onChange={(e) => setSettings({...settings, humidity2to8Min: Number(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">Max Humidity (%RH)</label>
                    <input 
                      type="number" 
                      value={settings.humidity2to8Max}
                      onChange={(e) => setSettings({...settings, humidity2to8Max: Number(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded" 
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="font-medium text-gray-800 mb-3">≤0°C Range</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">Min Humidity (%RH)</label>
                    <input 
                      type="number" 
                      value={settings.humidityBelow0Min}
                      onChange={(e) => setSettings({...settings, humidityBelow0Min: Number(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">Max Humidity (%RH)</label>
                    <input 
                      type="number" 
                      value={settings.humidityBelow0Max}
                      onChange={(e) => setSettings({...settings, humidityBelow0Max: Number(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              className="btn-primary px-6 py-2 rounded-lg hover:bg-slate-600"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
