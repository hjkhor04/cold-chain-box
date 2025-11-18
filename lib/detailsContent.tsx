export const getBoxDetailsContent = (boxId: string) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">Environmental Conditions</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Temperature:</span>
              <span className="font-semibold text-gray-900">4.2°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Humidity:</span>
              <span className="font-semibold text-gray-900">45% RH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Target Range:</span>
              <span className="font-semibold text-gray-900">2-8°C</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">Equipment Information</h3>
          <div className="space-y-2">
            <div>
              <span className="text-gray-700 font-medium">Contents:</span>
              <p className="font-semibold text-gray-900">Insulin Pens (50 units)</p>
            </div>
            <div>
              <span className="text-gray-700 font-medium">Status:</span>
              <p className="font-semibold text-gray-900">Active Shipment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getTrackingContent = (boxId: string) => {
  const events = [
    { status: 'completed', title: 'Shipped from Kuala Lumpur HQ', date: 'Sep 26, 2024 - 08:00', desc: 'Package prepared and dispatched' },
    { status: 'completed', title: 'Arrived at KLIA Cargo Hub', date: 'Sep 26, 2024 - 10:30', desc: 'Cleared customs and ready for air transport' },
    { status: 'completed', title: 'In Transit to Singapore', date: 'Sep 26, 2024 - 14:00', desc: 'Flight MH123 - Estimated 2 hours' },
    { status: 'current', title: 'Arrived at Changi Airport Hub', date: 'Sep 26, 2024 - 16:30', desc: 'Currently processing for local delivery' },
    { status: 'pending', title: 'Out for Delivery', date: 'Expected: Sep 29, 2024 - 14:00', desc: 'Final delivery to Singapore General Hospital' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold text-gray-900 mb-3">Shipment Timeline</h3>
      </div>
      <div className="space-y-4">
        {events.map((event, idx) => (
          <div key={idx} className="flex items-start space-x-4">
            <div className={`flex-shrink-0 w-4 h-4 rounded-full mt-1 ${
              event.status === 'completed' ? 'bg-green-500' :
              event.status === 'current' ? 'bg-blue-500' : 'bg-gray-400'
            }`}></div>
            <div>
              <p className={`font-semibold ${event.status === 'pending' ? 'text-gray-600' : 'text-gray-900'}`}>
                {event.title}
              </p>
              <p className={`text-sm font-medium ${event.status === 'pending' ? 'text-gray-500' : 'text-gray-700'}`}>
                {event.date}
              </p>
              <p className={`text-xs ${event.status === 'pending' ? 'text-gray-500' : 'text-gray-600'}`}>
                {event.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getAlertDetailsContent = (boxId: string, alertType: string) => {
  if (alertType === 'temperature') {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-bold text-red-900 mb-3">Temperature Alert Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Current Temperature:</span>
              <span className="font-bold text-red-700">8.9°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Target Range:</span>
              <span className="font-semibold text-gray-900">2-8°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Alert Triggered:</span>
              <span className="font-semibold text-gray-900">Sep 28, 2024 08:15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Peak Temperature:</span>
              <span className="font-bold text-red-700">9.2°C</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">CRITICAL: Immediate Action Required</h4>
          <ul className="text-red-700 text-sm space-y-1">
            <li>• Temperature breach detected</li>
            <li>• Medical equipment integrity at risk</li>
            <li>• Contact recipient immediately</li>
            <li>• Initiate emergency protocols</li>
            <li>• Document incident for compliance</li>
          </ul>
        </div>
      </div>
    );
  }
  
  return <div>Alert details for {alertType}</div>;
};

export const getMapMarkerDetailsContent = (boxId: string, location: string) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">Location Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Current City:</span>
              <span className="font-semibold text-gray-900">{location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Precise Location:</span>
              <span className="font-semibold text-gray-900">Airport Hub</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Last Update:</span>
              <span className="font-semibold text-gray-900">2 minutes ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">Current Status</h3>
          <div className="space-y-2">
            <div>
              <span className="text-gray-700 font-medium">Temperature:</span>
              <p className="font-semibold text-gray-900">4.2°C</p>
            </div>
            <div>
              <span className="text-gray-700 font-medium">Humidity:</span>
              <p className="font-semibold text-gray-900">45% RH</p>
            </div>
            <div>
              <span className="text-gray-700 font-medium">Signal Strength:</span>
              <p className="font-semibold text-green-700">Strong</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
