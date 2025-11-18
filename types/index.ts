export type PanelType = 'home' | 'shipments' | 'status' | 'alerts' | 'reports' | 'settings';

export interface ColdBox {
  id: string;
  equipment: string;
  status: 'shipping' | 'returning' | 'empty';
  temperature?: number;
  humidity?: number;
  destination?: string;
  eta?: string;
  alerts?: Alert[];
}

export interface Alert {
  id: string;
  boxId: string;
  type: 'temperature' | 'humidity' | 'duration';
  message: string;
  timestamp: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface MapMarker {
  id: string;
  boxId: string;
  location: string;
  lat: number;
  lng: number;
  status: 'active' | 'alert' | 'returning';
}

export interface ShipmentFormData {
  tempRange: '2-8' | 'below-0';
  humidityRange: string;
  destination: string;
  receiverName: string;
  company: string;
  email: string;
  phone: string;
  remarks: string;
}
