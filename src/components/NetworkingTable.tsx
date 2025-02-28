
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { QrCode, Users, Zap, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NetworkingTableProps {
  tableId: string;
  name: string;
  participantCount: number;
  maxParticipants: number;
  duration: number; // in minutes
  onShowQR: (tableId: string) => void;
  onJoin: (tableId: string) => void;
}

const NetworkingTable = ({
  tableId,
  name,
  participantCount,
  maxParticipants,
  duration,
  onShowQR,
  onJoin
}: NetworkingTableProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const availableSpots = maxParticipants - participantCount;
  const isFull = availableSpots <= 0;

  const handleJoin = () => {
    if (isFull) {
      toast({
        title: "Table is full",
        description: "This networking table has reached its maximum capacity.",
        variant: "destructive",
      });
      return;
    }
    
    onJoin(tableId);
    toast({
      title: "Table Joined",
      description: `You've joined "${name}". Get ready to network!`,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md"
    >
      <div className="p-6 border-b border-neutral-100">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{name}</h3>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isFull ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {isFull ? 'Full' : `${availableSpots} spot${availableSpots !== 1 ? 's' : ''} available`}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          <div className="flex items-center text-sm text-neutral-600">
            <Users size={16} className="mr-1" />
            <span>{participantCount}/{maxParticipants} participants</span>
          </div>
          <div className="flex items-center text-sm text-neutral-600">
            <Clock size={16} className="mr-1" />
            <span>{duration} minutes</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2 flex items-center">
            <Zap size={16} className="mr-1" /> Table Focus
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-neutral-100 rounded-full text-xs">Startup Networking</span>
            <span className="px-2 py-1 bg-neutral-100 rounded-full text-xs">Tech Professionals</span>
            <span className="px-2 py-1 bg-neutral-100 rounded-full text-xs">Investors</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-neutral-200"
            onClick={() => onShowQR(tableId)}
          >
            <QrCode size={16} className="mr-2" />
            Show QR
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-neutral-900 hover:bg-neutral-800"
            onClick={handleJoin}
            disabled={isFull}
          >
            Join Table
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NetworkingTable;
