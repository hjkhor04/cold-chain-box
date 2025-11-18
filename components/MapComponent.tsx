'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const hqIcon = createCustomIcon('#fbbf24');
const activeIcon = createCustomIcon('#10b981');
const alertIcon = createCustomIcon('#ef4444');
const returningIcon = createCustomIcon('#3b82f6');

interface LocationMarker {
  id: string;
  position: [number, number];
  name: string;
  type: 'hq' | 'active' | 'alert' | 'returning';
  description?: string;
}

interface MapComponentProps {
  onMarkerClick: (boxId: string, location: string) => void;
}

const locations: LocationMarker[] = [
  {
    id: 'HQ',
    position: [3.139, 101.687],
    name: 'Kuala Lumpur HQ',
    type: 'hq',
    description: 'ReBox Med Headquarters'
  },
  {
    id: 'RBM-001',
    position: [1.352, 103.820],
    name: 'Singapore',
    type: 'active',
    description: 'Insulin Pens (50 units)'
  },
  {
    id: 'RBM-002',
    position: [13.756, 100.502],
    name: 'Bangkok',
    type: 'alert',
    description: 'COVID-19 Vaccines - High Humidity Alert'
  },
  {
    id: 'RBM-003',
    position: [-6.208, 106.846],
    name: 'Jakarta',
    type: 'returning',
    description: 'Empty - Returning to HQ'
  },
  {
    id: 'RBM-005',
    position: [14.599, 120.984],
    name: 'Manila',
    type: 'alert',
    description: 'Blood Samples - Temperature Alert'
  }
];

function MapLegend() {
  const map = useMap();
  
  useEffect(() => {
    const legend = new L.Control({ position: 'bottomleft' });
    
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.backgroundColor = 'white';
      div.style.padding = '12px';
      div.style.borderRadius = '8px';
      div.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
      div.style.fontSize = '12px';
      
      div.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 12px; height: 12px; background-color: #fbbf24; border: 2px solid white; border-radius: 50%; margin-right: 8px;"></div>
          <span style="font-weight: 600;">HQ</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 12px; height: 12px; background-color: #10b981; border: 2px solid white; border-radius: 50%; margin-right: 8px;"></div>
          <span>Active</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 12px; height: 12px; background-color: #ef4444; border: 2px solid white; border-radius: 50%; margin-right: 8px;"></div>
          <span>Alert</span>
        </div>
        <div style="display: flex; align-items: center;">
          <div style="width: 12px; height: 12px; background-color: #3b82f6; border: 2px solid white; border-radius: 50%; margin-right: 8px;"></div>
          <span>Returning</span>
        </div>
      `;
      
      return div;
    };
    
    legend.addTo(map);
    
    return () => {
      legend.remove();
    };
  }, [map]);
  
  return null;
}

export default function MapComponent({ onMarkerClick }: MapComponentProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'hq': return hqIcon;
      case 'active': return activeIcon;
      case 'alert': return alertIcon;
      case 'returning': return returningIcon;
      default: return activeIcon;
    }
  };

  return (
    <MapContainer
      center={[5.0, 110.0]}
      zoom={5}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem', zIndex: 1 }}
      scrollWheelZoom={true}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={location.position}
          icon={getIcon(location.type)}
          eventHandlers={{
            click: () => onMarkerClick(location.id, location.name),
          }}
        >
          <Popup>
            <div style={{ padding: '4px' }}>
              <strong>{location.id}</strong>
              <br />
              {location.name}
              {location.description && (
                <>
                  <br />
                  <span style={{ fontSize: '11px', color: '#666' }}>
                    {location.description}
                  </span>
                </>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      
      <MapLegend />
    </MapContainer>
  );
}
