import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children, initialRole = 'agent' }) => {
  const [userRole, setUserRole] = useState(() => {
    // Initialize from localStorage if available, otherwise use initialRole
    const storedRole = localStorage.getItem('userRole');
    return storedRole || initialRole;
  });
  const [permissions, setPermissions] = useState([]);

  const rolePermissions = {
    'end-user': [
      'view-dashboard',
      'create-ticket',
      'view-own-tickets',
      'update-own-tickets'
    ],
    'agent': [
      'view-dashboard',
      'create-ticket',
      'view-all-tickets',
      'update-tickets',
      'assign-tickets',
      'close-tickets'
    ],
    'admin': [
      'view-dashboard',
      'create-ticket',
      'view-all-tickets',
      'update-tickets',
      'assign-tickets',
      'close-tickets',
      'manage-users',
      'view-reports',
      'system-settings'
    ]
  };

  useEffect(() => {
    setPermissions(rolePermissions?.[userRole] || []);
    
    // Sync role changes with localStorage
    if (userRole && userRole !== 'agent') {
      localStorage.setItem('userRole', userRole);
    }
  }, [userRole]);

  const hasPermission = (permission) => {
    return permissions?.includes(permission);
  };

  const canAccessRoute = (route) => {
    const routePermissions = {
      '/dashboard': ['view-dashboard'],
      '/create-ticket': ['create-ticket'],
      '/ticket-management': ['view-all-tickets', 'view-own-tickets'],
      '/ticket-detail': ['view-all-tickets', 'view-own-tickets'],
      '/user-management': ['manage-users']
    };

    const requiredPermissions = routePermissions?.[route] || [];
    return requiredPermissions?.some(permission => hasPermission(permission));
  };

  const value = {
    userRole,
    setUserRole,
    permissions,
    hasPermission,
    canAccessRoute
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export const RoleBasedComponent = ({ roles, children, fallback = null }) => {
  const { userRole } = useRole();
  
  if (roles?.includes(userRole)) {
    return children;
  }
  
  return fallback;
};

export const PermissionGate = ({ permission, children, fallback = null }) => {
  const { hasPermission } = useRole();
  
  if (hasPermission(permission)) {
    return children;
  }
  
  return fallback;
};