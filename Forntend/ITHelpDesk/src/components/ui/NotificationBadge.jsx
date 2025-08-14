import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [badges, setBadges] = useState({
    tickets: 3,
    notifications: 1,
    messages: 0
  });

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate WebSocket connection for real-time updates
    const connectWebSocket = () => {
      setIsConnected(true);
      
      // Simulate periodic badge updates
      const interval = setInterval(() => {
        setBadges(prev => ({
          ...prev,
          tickets: Math.max(0, prev?.tickets + Math.floor(Math.random() * 3) - 1),
          notifications: Math.max(0, prev?.notifications + Math.floor(Math.random() * 2) - 1)
        }));
      }, 30000); // Update every 30 seconds

      return () => {
        clearInterval(interval);
        setIsConnected(false);
      };
    };

    const cleanup = connectWebSocket();
    return cleanup;
  }, []);

  const updateBadge = (key, value) => {
    setBadges(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const incrementBadge = (key) => {
    setBadges(prev => ({
      ...prev,
      [key]: prev?.[key] + 1
    }));
  };

  const decrementBadge = (key) => {
    setBadges(prev => ({
      ...prev,
      [key]: Math.max(0, prev?.[key] - 1)
    }));
  };

  const clearBadge = (key) => {
    setBadges(prev => ({
      ...prev,
      [key]: 0
    }));
  };

  const value = {
    badges,
    isConnected,
    updateBadge,
    incrementBadge,
    decrementBadge,
    clearBadge
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const NotificationBadge = ({ 
  badgeKey, 
  children, 
  className = "",
  showZero = false,
  maxCount = 99 
}) => {
  const { badges } = useNotifications();
  const count = badges?.[badgeKey] || 0;

  if (!showZero && count === 0) {
    return children;
  }

  const displayCount = count > maxCount ? `${maxCount}+` : count;

  return (
    <div className="relative inline-block">
      {children}
      {(showZero || count > 0) && (
        <span className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-medium text-white bg-error rounded-full ${className}`}>
          {displayCount}
        </span>
      )}
    </div>
  );
};