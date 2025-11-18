'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HomePanel from '@/components/panels/HomePanel';
import ShipmentsPanel from '@/components/panels/ShipmentsPanel';
import StatusPanel from '@/components/panels/StatusPanel';
import AlertsPanel from '@/components/panels/AlertsPanel';
import ReportsPanel from '@/components/panels/ReportsPanel';
import SettingsPanel from '@/components/panels/SettingsPanel';
import ShipmentModal from '@/components/ShipmentModal';
import ShipmentFlowDrawer from '@/components/ShipmentFlowDrawer';
import { Modal, SuccessPopup } from '@/components/Modal';
import { PanelType } from '@/types';
import { 
  getBoxDetailsContent, 
  getTrackingContent, 
  getAlertDetailsContent,
  getMapMarkerDetailsContent 
} from '@/lib/detailsContent';

export default function Home() {
  const [activePanel, setActivePanel] = useState<PanelType>('home');
  const [alertCount] = useState(3);
  
  // Modal states
  const [shipmentModalOpen, setShipmentModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsContent, setDetailsContent] = useState<{ title: string; content: React.ReactNode }>({
    title: '',
    content: null
  });
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);

  const handleOpenShipmentModal = () => {
    setShipmentModalOpen(true);
  };

  const handleShowDetails = (boxId: string, type: string) => {
    let title = '';
    let content: React.ReactNode = null;

    switch (type) {
      case 'box':
        title = `Cold Box Details - ${boxId}`;
        content = getBoxDetailsContent(boxId);
        break;
      case 'shipment':
        title = `Shipment Details - ${boxId}`;
        content = getBoxDetailsContent(boxId); // Reusing for simplicity
        break;
      case 'returning':
        title = `Returning Details - ${boxId}`;
        content = getBoxDetailsContent(boxId);
        break;
      case 'empty':
        title = `Empty Cold Box - ${boxId}`;
        content = getBoxDetailsContent(boxId);
        break;
      default:
        content = <div>Details not available</div>;
    }

    setDetailsContent({ title, content });
    setDetailsModalOpen(true);
  };

  const handleShowTracking = (boxId: string) => {
    setDetailsContent({
      title: `Shipment Tracking - ${boxId}`,
      content: getTrackingContent(boxId)
    });
    setDetailsModalOpen(true);
  };

  const handleShowAlertDetails = (boxId: string, alertType: string) => {
    setDetailsContent({
      title: `Alert Details - ${boxId}`,
      content: getAlertDetailsContent(boxId, alertType)
    });
    setDetailsModalOpen(true);
  };

  const handleShowMapMarker = (boxId: string, location: string) => {
    setDetailsContent({
      title: `Location Details - ${boxId}`,
      content: getMapMarkerDetailsContent(boxId, location)
    });
    setDetailsModalOpen(true);
  };

  const handleViewReport = (boxId: string) => {
    alert(`Viewing report for ${boxId}`);
  };

  const handleExportReport = (boxId: string) => {
    alert(`Exporting report for ${boxId} as PDF... Download will start shortly.`);
  };

  const handleExportAll = () => {
    alert('Exporting all reports as PDF... Download will start shortly.');
  };

  const handleSaveSettings = () => {
    setSuccessPopupOpen(true);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Navigation 
        activePanel={activePanel} 
        onPanelChange={setActivePanel}
        alertCount={alertCount}
      />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {activePanel === 'home' && (
            <HomePanel 
              onShowDetails={handleShowDetails}
              onShowMapMarker={handleShowMapMarker}
            />
          )}
          
          {activePanel === 'shipments' && (
            <ShipmentsPanel 
              onShowDetails={handleShowDetails}
              onOpenShipmentModal={handleOpenShipmentModal}
            />
          )}
          
          {activePanel === 'status' && (
            <StatusPanel onShowTracking={handleShowTracking} />
          )}
          
          {activePanel === 'alerts' && (
            <AlertsPanel onShowAlertDetails={handleShowAlertDetails} />
          )}
          
          {activePanel === 'reports' && (
            <ReportsPanel 
              onViewReport={handleViewReport}
              onExportReport={handleExportReport}
              onExportAll={handleExportAll}
            />
          )}
          
          {activePanel === 'settings' && (
            <SettingsPanel onSave={handleSaveSettings} />
          )}
        </div>
      </div>

      {/* Modals */}
      <ShipmentModal 
        isOpen={shipmentModalOpen}
        onClose={() => setShipmentModalOpen(false)}
      />

      <Modal 
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        title={detailsContent.title}
      >
        {detailsContent.content}
      </Modal>

      <SuccessPopup 
        isOpen={successPopupOpen}
        onClose={() => setSuccessPopupOpen(false)}
      />

      {/* Shipment Flow Drawer - Only show on Home panel */}
      {activePanel === 'home' && <ShipmentFlowDrawer />}
    </div>
  );
}
