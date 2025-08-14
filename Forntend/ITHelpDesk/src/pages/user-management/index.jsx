import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import BulkActionsBar from './components/BulkActionsBar';
import UserStats from './components/UserStats';
import ExportModal from './components/ExportModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      role: "admin",
      department: "it",
      status: "active",
      phone: "+1 (555) 123-4567",
      jobTitle: "IT Director",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: "2024-01-15T10:30:00Z",
      permissions: ["create_ticket", "view_all_tickets", "update_tickets", "assign_tickets", "close_tickets", "manage_users", "view_reports", "system_settings", "bulk_operations"]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "agent",
      department: "it",
      status: "active",
      phone: "+1 (555) 234-5678",
      jobTitle: "Senior Support Agent",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastLogin: new Date(Date.now() - 30 * 60 * 1000),
      createdAt: "2024-02-20T14:15:00Z",
      permissions: ["create_ticket", "view_all_tickets", "update_tickets", "assign_tickets", "close_tickets", "view_reports"]
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@company.com",
      role: "agent",
      department: "it",
      status: "active",
      phone: "+1 (555) 345-6789",
      jobTitle: "Support Agent",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
      createdAt: "2024-03-10T09:45:00Z",
      permissions: ["create_ticket", "view_all_tickets", "update_tickets", "assign_tickets", "close_tickets", "view_reports"]
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      role: "end-user",
      department: "hr",
      status: "active",
      phone: "+1 (555) 456-7890",
      jobTitle: "HR Manager",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: "2024-04-05T11:20:00Z",
      permissions: ["create_ticket", "view_own_tickets", "update_own_tickets"]
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@company.com",
      role: "end-user",
      department: "finance",
      status: "active",
      phone: "+1 (555) 567-8901",
      jobTitle: "Financial Analyst",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      createdAt: "2024-04-12T16:30:00Z",
      permissions: ["create_ticket", "view_own_tickets", "update_own_tickets"]
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@company.com",
      role: "agent",
      department: "it",
      status: "inactive",
      phone: "+1 (555) 678-9012",
      jobTitle: "Junior Support Agent",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      createdAt: "2024-05-01T08:15:00Z",
      permissions: ["create_ticket", "view_all_tickets", "update_tickets", "assign_tickets", "close_tickets", "view_reports"]
    },
    {
      id: 7,
      name: "Robert Taylor",
      email: "robert.taylor@company.com",
      role: "end-user",
      department: "marketing",
      status: "suspended",
      phone: "+1 (555) 789-0123",
      jobTitle: "Marketing Coordinator",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      lastLogin: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      createdAt: "2024-05-15T13:45:00Z",
      permissions: ["create_ticket", "view_own_tickets", "update_own_tickets"]
    },
    {
      id: 8,
      name: "Jennifer Martinez",
      email: "jennifer.martinez@company.com",
      role: "end-user",
      department: "sales",
      status: "active",
      phone: "+1 (555) 890-1234",
      jobTitle: "Sales Representative",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000),
      createdAt: "2024-06-01T10:00:00Z",
      permissions: ["create_ticket", "view_own_tickets", "update_own_tickets"]
    },
    {
      id: 9,
      name: "Christopher Lee",
      email: "christopher.lee@company.com",
      role: "admin",
      department: "executive",
      status: "active",
      phone: "+1 (555) 901-2345",
      jobTitle: "CTO",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
      createdAt: "2024-01-01T00:00:00Z",
      permissions: ["create_ticket", "view_all_tickets", "update_tickets", "assign_tickets", "close_tickets", "manage_users", "view_reports", "system_settings", "bulk_operations"]
    },
    {
      id: 10,
      name: "Amanda White",
      email: "amanda.white@company.com",
      role: "end-user",
      department: "operations",
      status: "active",
      phone: "+1 (555) 012-3456",
      jobTitle: "Operations Manager",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000),
      createdAt: "2024-06-15T15:30:00Z",
      permissions: ["create_ticket", "view_own_tickets", "update_own_tickets"]
    }
  ];

  useEffect(() => {
    // Simulate loading
    const loadUsers = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      setIsLoading(false);
    };

    loadUsers();
  }, []);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectUser = (userId, checked) => {
    setSelectedUsers(prev => 
      checked 
        ? [...prev, userId]
        : prev?.filter(id => id !== userId)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedUsers(checked ? users?.map(user => user?.id) : []);
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setModalMode('create');
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setModalMode('edit');
    setIsUserModalOpen(true);
  };

  const handleSaveUser = async (userData) => {
    if (modalMode === 'create') {
      const newUser = {
        ...userData,
        id: Math.max(...users?.map(u => u?.id)) + 1,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&sig=${userData?.id}`,
        lastLogin: new Date(),
        createdAt: new Date()?.toISOString()
      };
      setUsers(prev => [...prev, newUser]);
    } else {
      setUsers(prev => prev?.map(user => 
        user?.id === userData?.id ? { ...user, ...userData } : user
      ));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(prev => prev?.filter(user => user?.id !== userId));
      setSelectedUsers(prev => prev?.filter(id => id !== userId));
    }
  };

  const handleToggleStatus = async (userId) => {
    setUsers(prev => prev?.map(user => {
      if (user?.id === userId) {
        const newStatus = user?.status === 'active' ? 'inactive' : 'active';
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const handleResetPassword = async (userId) => {
    const user = users?.find(u => u?.id === userId);
    if (user && window.confirm(`Reset password for ${user?.name}? They will receive an email with reset instructions.`)) {
      // Simulate password reset
      alert(`Password reset email sent to ${user?.email}`);
    }
  };

  const handleBulkAction = async (action) => {
    const selectedUserObjects = users?.filter(user => selectedUsers?.includes(user?.id));
    
    switch (action) {
      case 'activate':
        setUsers(prev => prev?.map(user => 
          selectedUsers?.includes(user?.id) ? { ...user, status: 'active' } : user
        ));
        break;
      case 'deactivate':
        setUsers(prev => prev?.map(user => 
          selectedUsers?.includes(user?.id) ? { ...user, status: 'inactive' } : user
        ));
        break;
      case 'suspend':
        setUsers(prev => prev?.map(user => 
          selectedUsers?.includes(user?.id) ? { ...user, status: 'suspended' } : user
        ));
        break;
      case 'change-role-agent':
        setUsers(prev => prev?.map(user => 
          selectedUsers?.includes(user?.id) ? { ...user, role: 'agent' } : user
        ));
        break;
      case 'change-role-user':
        setUsers(prev => prev?.map(user => 
          selectedUsers?.includes(user?.id) ? { ...user, role: 'end-user' } : user
        ));
        break;
      case 'reset-password':
        if (window.confirm(`Reset passwords for ${selectedUsers?.length} users? They will receive reset emails.`)) {
          alert(`Password reset emails sent to ${selectedUsers?.length} users`);
        }
        break;
      case 'export':
        setIsExportModalOpen(true);
        return;
      case 'delete':
        if (window.confirm(`Delete ${selectedUsers?.length} users? This action cannot be undone.`)) {
          setUsers(prev => prev?.filter(user => !selectedUsers?.includes(user?.id)));
        }
        break;
    }
    
    setSelectedUsers([]);
  };

  const handleExport = async (exportConfig) => {
    // Simulate export
    const filename = `users_export_${new Date()?.toISOString()?.split('T')?.[0]}.${exportConfig?.format}`;
    alert(`Export completed: ${filename}\n\nType: ${exportConfig?.type}\nFormat: ${exportConfig?.format}\nFields: ${exportConfig?.fields?.length}`);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', isHome: true },
    { label: 'Administration', path: '/admin' },
    { label: 'User Management', path: '/user-management', isLast: true }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="admin" />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading users...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
              <p className="text-muted-foreground">
                Manage user accounts, roles, and permissions across your organization
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={() => setIsExportModalOpen(true)}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
              
              <Button
                onClick={handleCreateUser}
                iconName="Plus"
                iconPosition="left"
              >
                Add User
              </Button>
            </div>
          </div>

          {/* User Statistics */}
          <UserStats users={users} />

          {/* Bulk Actions Bar */}
          <BulkActionsBar
            selectedCount={selectedUsers?.length}
            totalUsers={users?.length}
            onBulkAction={handleBulkAction}
            onClearSelection={() => setSelectedUsers([])}
          />

          {/* User Table */}
          <UserTable
            users={users}
            selectedUsers={selectedUsers}
            onSelectUser={handleSelectUser}
            onSelectAll={handleSelectAll}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            onToggleStatus={handleToggleStatus}
            onResetPassword={handleResetPassword}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
      </main>
      {/* User Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={editingUser}
        onSave={handleSaveUser}
        mode={modalMode}
      />
      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        selectedUsers={selectedUsers}
        totalUsers={users?.length}
      />
    </div>
  );
};

export default UserManagement;