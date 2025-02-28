
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface QRScannerProps {
  onScan: (tableId: string) => void;
  onClose: () => void;
}

const QRScanner = ({ onScan, onClose }: QRScannerProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleScan = (data: { text: string } | null) => {
    if (data && data.text) {
      // Assuming QR codes contain a format like "table:123"
      const tableId = data.text.startsWith('table:') ? data.text.substring(6) : data.text;
      onScan(tableId);
    }
  };

  const handleError = (err: Error) => {
    console.error("QR Scanner Error:", err);
    setError("Failed to access camera. Please check your permissions.");
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl overflow-hidden max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 bg-black/20 rounded-full z-10"
          aria-label="Close QR scanner"
        >
          <X size={20} className="text-white" />
        </button>
        
        <div className="p-6 text-center border-b border-neutral-200">
          <h3 className="text-xl font-semibold">Scan QR Code</h3>
          <p className="text-neutral-600 text-sm mt-1">
            Scan a table's QR code to join
          </p>
        </div>
        
        <div className="relative">
          {error ? (
            <div className="p-8 bg-neutral-100 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          ) : (
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              constraints={{ facingMode: 'environment' }}
              className="w-full h-72"
              style={{ width: '100%', height: '100%' }}
            />
          )}
          <div className="absolute inset-0 border-4 border-white/50 rounded-lg pointer-events-none"></div>
        </div>
        
        <div className="p-4 text-center">
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
