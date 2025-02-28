
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Scan, Plus, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NetworkingTable from '@/components/NetworkingTable';
import ProfileWithCards from '@/components/ProfileWithCards';
import QRScanner from '@/components/QRScanner';
import NotificationCenter, { Notification } from '@/components/NotificationCenter';

const Networking = () => {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [selectedTableForQR, setSelectedTableForQR] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  // Simulate loading initial notifications
  useEffect(() => {
    const initialNotifications: Notification[] = [
      {
        id: '1',
        type: 'reveal_request',
        title: 'New Reveal Request',
        message: 'Sarah Johnson wants to view your AI Project card',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        read: false,
        actionUrl: '#',
        sender: {
          name: 'Sarah Johnson'
        }
      },
      {
        id: '2',
        type: 'match',
        title: 'New Connection Match',
        message: 'You and Michael Chen have 3 common interests',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        read: false,
        actionUrl: '#',
        sender: {
          name: 'Michael Chen'
        }
      },
      {
        id: '3',
        type: 'table_invitation',
        title: 'Table Invitation',
        message: 'You\'ve been invited to join "AI Investors" table',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        read: true,
        actionUrl: '#',
        sender: {
          name: 'David Miller'
        }
      }
    ];
    
    setNotifications(initialNotifications);
  }, []);

  // Mock tables data
  const tables = [
    {
      id: 'table-1',
      name: 'Startup Founders',
      participantCount: 3,
      maxParticipants: 6,
      duration: 45
    },
    {
      id: 'table-2',
      name: 'AI Technology',
      participantCount: 5,
      maxParticipants: 5,
      duration: 60
    },
    {
      id: 'table-3',
      name: 'Angel Investors',
      participantCount: 2,
      maxParticipants: 4,
      duration: 30
    }
  ];

  // Mock profile data
  const profile = {
    userId: 'user-1',
    name: 'Alex Thompson',
    role: 'Tech Lead & AI Researcher',
    skills: [
      {
        id: 'skill-1',
        name: 'Machine Learning',
        level: 'expert' as const,
        isRevealed: true
      },
      {
        id: 'skill-2',
        name: 'Python Development',
        level: 'expert' as const,
        isRevealed: true
      },
      {
        id: 'skill-3',
        name: 'Product Management',
        level: 'intermediate' as const,
        isRevealed: false
      }
    ],
    projects: [
      {
        id: 'project-1',
        name: 'Neural Network Framework',
        description: 'Built a custom neural network framework optimized for edge devices',
        isRevealed: true
      },
      {
        id: 'project-2',
        name: 'AI-Powered Analytics Dashboard',
        description: 'Created a dashboard that uses AI to interpret and visualize complex data sets',
        isRevealed: false
      }
    ]
  };

  const handleShowQR = (tableId: string) => {
    setSelectedTableForQR(tableId);
    toast({
      title: 'QR Code Ready',
      description: 'Share this QR code with others to join this table',
    });
    // In a real app, we would show a QR code for the table
  };

  const handleJoinTable = (tableId: string) => {
    // Would normally navigate to the table or show a join confirmation
    toast({
      title: 'Table Joined',
      description: `You've joined table #${tableId.split('-')[1]}`,
    });
  };

  const handleScanQR = (tableId: string) => {
    setShowQRScanner(false);
    toast({
      title: 'QR Code Scanned',
      description: `You're joining table with ID: ${tableId}`,
    });
    // Would normally join the table or validate the QR code
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const handleClearNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Simulating a new notification after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotification: Notification = {
        id: `notification-${Date.now()}`,
        type: 'reveal_accepted',
        title: 'Card Revealed',
        message: 'Jack Wilson has revealed their "Blockchain Project" card to you',
        timestamp: new Date(),
        read: false,
        actionUrl: '#',
        sender: {
          name: 'Jack Wilson'
        }
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      
      toast({
        title: 'New Notification',
        description: 'Jack Wilson has revealed a card to you',
      });
    }, 10000); // 10 seconds after mounting

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="container px-4 mx-auto pt-24 pb-16 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Networking Tables</h1>
          <div className="flex items-center space-x-2">
            <NotificationCenter 
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onClearNotification={handleClearNotification}
            />
            <Button 
              variant="outline" 
              onClick={() => setShowQRScanner(true)}
              className="border-neutral-300"
            >
              <Scan size={18} className="mr-2" />
              Scan QR
            </Button>
            <Button className="bg-neutral-900 hover:bg-neutral-800">
              <Plus size={18} className="mr-2" />
              Create Table
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users size={20} className="mr-2" />
                Active Tables
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tables.map(table => (
                  <NetworkingTable
                    key={table.id}
                    tableId={table.id}
                    name={table.name}
                    participantCount={table.participantCount}
                    maxParticipants={table.maxParticipants}
                    duration={table.duration}
                    onShowQR={handleShowQR}
                    onJoin={handleJoinTable}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Suggested Matches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-lg font-medium mr-4">
                      JD
                    </div>
                    <div>
                      <h3 className="font-semibold">John Doe</h3>
                      <p className="text-sm text-neutral-600">AI Developer & Entrepreneur</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-1">Matching Skills:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Machine Learning</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Python</span>
                    </div>
                  </div>
                  <Button className="w-full bg-neutral-900 hover:bg-neutral-800">Connect</Button>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-lg font-medium mr-4">
                      EJ
                    </div>
                    <div>
                      <h3 className="font-semibold">Emily Johnson</h3>
                      <p className="text-sm text-neutral-600">Investor & Advisor</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-1">Potential Interest:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">AI Projects</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Tech Startups</span>
                    </div>
                  </div>
                  <Button className="w-full bg-neutral-900 hover:bg-neutral-800">Connect</Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <ProfileWithCards 
              userId={profile.userId}
              name={profile.name}
              role={profile.role}
              skills={profile.skills}
              projects={profile.projects}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* QR Code Scanner */}
      {showQRScanner && (
        <QRScanner
          onScan={handleScanQR}
          onClose={() => setShowQRScanner(false)}
        />
      )}
    </div>
  );
};

export default Networking;
