'use client';

import { X, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export function Modal({ isOpen, onClose, title, children, maxWidth = '4xl' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className={`bg-white rounded-lg max-w-${maxWidth} w-full max-h-[90vh] overflow-y-auto relative`} style={{ zIndex: 10000 }}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export function SuccessPopup({ isOpen, onClose, message = 'Saved Successfully!' }: SuccessPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-lg max-w-md w-full success-popup relative" style={{ zIndex: 10000 }}>
        <div className="p-6 text-center">
          <div className="mb-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{message}</h3>
          <p className="text-gray-600 mb-6">Your settings have been updated and applied to the system.</p>
          <button 
            onClick={onClose}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
