import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserTable = ({ 
  users, 
  onEditUser, 
  onDeleteUser, 
  onToggleStatus, 
  onResetPassword,
  selectedUsers,
  onSelectUser,
  onSelectAll,
  sortConfig,
  onSort
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'end-user', label: 'End User' },
    { value: 'agent', label: 'Agent' },
    { value: 'admin', label: 'Administrator' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const filteredUsers = useMemo(() => {
    return users?.filter(user => {
      const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           user?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesRole = roleFilter === 'all' || user?.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const sortedUsers = useMemo(() => {
    if (!sortConfig?.key) return filteredUsers;

    return [...filteredUsers]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  const handleSort = (key) => {
    onSort(key);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-error text-error-foreground';
      case 'agent':
        return 'bg-warning text-warning-foreground';
      case 'end-user':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'suspended':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatLastLogin = (date) => {
    const now = new Date();
    const loginDate = new Date(date);
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return loginDate?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      {/* Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search users by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-3">
            <Select
              options={roleOptions}
              value={roleFilter}
              onChange={setRoleFilter}
              placeholder="Filter by role"
              className="w-40"
            />
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by status"
              className="w-40"
            />
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedUsers?.length === sortedUsers?.length && sortedUsers?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>User</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('role')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>Role</span>
                  {getSortIcon('role')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>Department</span>
                  {getSortIcon('department')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>Status</span>
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('lastLogin')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>Last Login</span>
                  {getSortIcon('lastLogin')}
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={(e) => onSelectUser(user?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user?.name}</div>
                      <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                    {user?.role === 'end-user' ? 'End User' : user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-foreground">{user?.department}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(user?.status)}`}>
                    {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">{formatLastLogin(user?.lastLogin)}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditUser(user)}
                      iconName="Edit"
                      iconSize={14}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleStatus(user?.id)}
                      iconName={user?.status === 'active' ? 'UserX' : 'UserCheck'}
                      iconSize={14}
                    >
                      {user?.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onResetPassword(user?.id)}
                      iconName="Key"
                      iconSize={14}
                    >
                      Reset
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden">
        {sortedUsers?.map((user) => (
          <div key={user?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedUsers?.includes(user?.id)}
                onChange={(e) => onSelectUser(user?.id, e?.target?.checked)}
                className="mt-1 rounded border-border"
              />
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground truncate">{user?.name}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user?.status)}`}>
                    {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                    {user?.role === 'end-user' ? 'End User' : user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">{user?.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Last login: {formatLastLogin(user?.lastLogin)}
                  </span>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditUser(user)}
                      iconName="Edit"
                      iconSize={14}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleStatus(user?.id)}
                      iconName={user?.status === 'active' ? 'UserX' : 'UserCheck'}
                      iconSize={14}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sortedUsers?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;