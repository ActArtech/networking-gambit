
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Eye, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Notification {
  id: string;
  type: 'reveal_request' | 'reveal_accepted' | 'table_invitation' | 'match';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  sender?: {
    name: string;
    avatarUrl?: string;
  };
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearNotification: (id: string) => void;
}

const NotificationCenter = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearNotification
}: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    
    // If opening the panel, mark notifications as seen (but not necessarily "read")
    if (!isOpen) {
      // This would typically update a "seen" flag in a real backend
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'reveal_request':
        return <Eye size={18} className="text-blue-500" />;
      case 'reveal_accepted':
        return <Check size={18} className="text-green-500" />;
      case 'table_invitation':
        return <Users size={18} className="text-purple-500" />;
      case 'match':
        return <Users size={18} className="text-amber-500" />;
      default:
        return <Bell size={18} className="text-neutral-500" />;
    }
  };

  return (
    <div className="relative z-10">
      {/* Notification Bell */}
      <button
        onClick={toggleOpen}
        className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors duration-200"
        aria-label={isOpen ? "Close notifications" : "Open notifications"}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden"
          >
            <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onMarkAllAsRead}
                    className="text-xs h-7 px-2"
                  >
                    Mark all as read
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                  className="h-7 w-7 p-0 rounded-full"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-neutral-500">No notifications yet</p>
                </div>
              ) : (
                <div>
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex">
                        <div className="mr-3 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <button 
                              onClick={() => onClearNotification(notification.id)}
                              className="text-neutral-400 hover:text-neutral-600"
                              aria-label="Clear notification"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <p className="text-sm text-neutral-600 mt-1">{notification.message}</p>
                          
                          {notification.sender && (
                            <div className="flex items-center mt-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-2 ${
                                notification.sender.avatarUrl ? '' : 'bg-neutral-200 text-neutral-700'
                              }`}>
                                {notification.sender.avatarUrl ? (
                                  <img 
                                    src={notification.sender.avatarUrl} 
                                    alt={notification.sender.name}
                                    className="w-full h-full rounded-full object-cover" 
                                  />
                                ) : (
                                  notification.sender.name.substring(0, 2).toUpperCase()
                                )}
                              </div>
                              <span className="text-xs text-neutral-500">{notification.sender.name}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-neutral-500">
                              {new Date(notification.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                            
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onMarkAsRead(notification.id)}
                                className="h-6 text-xs"
                              >
                                Mark as read
                              </Button>
                            )}
                            
                            {notification.actionUrl && (
                              <Button
                                size="sm"
                                className="h-6 text-xs bg-neutral-900 hover:bg-neutral-800"
                                onClick={() => {
                                  window.location.href = notification.actionUrl || '#';
                                  onMarkAsRead(notification.id);
                                }}
                              >
                                View
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
