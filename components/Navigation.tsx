'use client';

import { Home, Package, Activity, AlertTriangle, FileText, Settings } from 'lucide-react';
import { PanelType } from '@/types';

interface NavigationProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  alertCount: number;
}

export default function Navigation({ activePanel, onPanelChange, alertCount }: NavigationProps) {
  const navItems = [
    { id: 'home' as PanelType, label: 'Home', icon: Home, theme: 'home-theme' },
    { id: 'shipments' as PanelType, label: 'Shipments', icon: Package, theme: 'shipments-theme' },
    { id: 'status' as PanelType, label: 'Status', icon: Activity, theme: 'status-theme' },
    { id: 'alerts' as PanelType, label: 'Alerts', icon: AlertTriangle, theme: 'alerts-theme', badge: alertCount },
    { id: 'reports' as PanelType, label: 'Reports', icon: FileText, theme: 'reports-theme' },
    { id: 'settings' as PanelType, label: 'Settings', icon: Settings, theme: 'settings-theme' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700">
        <h1 className="text-2xl font-bold text-white">ReBox-Med™</h1>
        <p className="text-blue-100 text-sm mt-1">Cold Chain Management</p>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPanelChange(item.id)}
              className={`nav-item ${item.theme} w-full flex items-center px-6 py-4 text-left ${
                isActive ? 'active' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="alert-badge ml-auto px-2 py-1 text-xs rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
