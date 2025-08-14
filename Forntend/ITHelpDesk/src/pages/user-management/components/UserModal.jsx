import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserModal = ({ isOpen, onClose, user, onSave, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'end-user',
    department: '',
    status: 'active',
    phone: '',
    jobTitle: '',
    permissions: []
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'end-user', label: 'End User', description: 'Can create and view own tickets' },
    { value: 'agent', label: 'Agent', description: 'Can manage tickets and assist users' },
    { value: 'admin', label: 'Administrator', description: 'Full system access and user management' }
  ];

  const departmentOptions = [
    { value: 'it', label: 'Information Technology' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'operations', label: 'Operations' },
    { value: 'legal', label: 'Legal' },
    { value: 'executive', label: 'Executive' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const permissionsByRole = {
    'end-user': [
      { id: 'create_ticket', label: 'Create Tickets', description: 'Can create new support tickets' },
      { id: 'view_own_tickets', label: 'View Own Tickets', description: 'Can view their own tickets' },
      { id: 'update_own_tickets', label: 'Update Own Tickets', description: 'Can update their own tickets' }
    ],
    'agent': [
      { id: 'create_ticket', label: 'Create Tickets', description: 'Can create new support tickets' },
      { id: 'view_all_tickets', label: 'View All Tickets', description: 'Can view all tickets in the system' },
      { id: 'update_tickets', label: 'Update Tickets', description: 'Can update any ticket' },
      { id: 'assign_tickets', label: 'Assign Tickets', description: 'Can assign tickets to other agents' },
      { id: 'close_tickets', label: 'Close Tickets', description: 'Can close resolved tickets' },
      { id: 'view_reports', label: 'View Reports', description: 'Can access basic reporting features' }
    ],
    'admin': [
      { id: 'create_ticket', label: 'Create Tickets', description: 'Can create new support tickets' },
      { id: 'view_all_tickets', label: 'View All Tickets', description: 'Can view all tickets in the system' },
      { id: 'update_tickets', label: 'Update Tickets', description: 'Can update any ticket' },
      { id: 'assign_tickets', label: 'Assign Tickets', description: 'Can assign tickets to other agents' },
      { id: 'close_tickets', label: 'Close Tickets', description: 'Can close resolved tickets' },
      { id: 'manage_users', label: 'Manage Users', description: 'Can create, edit, and delete users' },
      { id: 'view_reports', label: 'View Reports', description: 'Can access all reporting features' },
      { id: 'system_settings', label: 'System Settings', description: 'Can modify system configuration' },
      { id: 'bulk_operations', label: 'Bulk Operations', description: 'Can perform bulk ticket operations' }
    ]
  };

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'end-user',
        department: user?.department || '',
        status: user?.status || 'active',
        phone: user?.phone || '',
        jobTitle: user?.jobTitle || '',
        permissions: user?.permissions || []
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'end-user',
        department: '',
        status: 'active',
        phone: '',
        jobTitle: '',
        permissions: []
      });
    }
    setErrors({});
  }, [user, mode, isOpen]);

  useEffect(() => {
    // Auto-select default permissions when role changes
    const defaultPermissions = permissionsByRole?.[formData?.role]?.map(p => p?.id) || [];
    setFormData(prev => ({
      ...prev,
      permissions: defaultPermissions
    }));
  }, [formData?.role]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePermissionChange = (permissionId, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev?.permissions, permissionId]
        : prev?.permissions?.filter(p => p !== permissionId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData?.jobTitle?.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await onSave({
        ...formData,
        id: user?.id || Date.now(),
        createdAt: user?.createdAt || new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const availablePermissions = permissionsByRole?.[formData?.role] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {mode === 'create' ? 'Add New User' : 'Edit User'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter full name"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                />
                
                <Input
                  label="Job Title"
                  type="text"
                  placeholder="Enter job title"
                  value={formData?.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e?.target?.value)}
                  error={errors?.jobTitle}
                  required
                />
              </div>
            </div>

            {/* Role & Department */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Role & Department</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Role"
                  options={roleOptions}
                  value={formData?.role}
                  onChange={(value) => handleInputChange('role', value)}
                  required
                />
                
                <Select
                  label="Department"
                  options={departmentOptions}
                  value={formData?.department}
                  onChange={(value) => handleInputChange('department', value)}
                  error={errors?.department}
                  required
                />
                
                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                  required
                />
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Permissions</h3>
              <p className="text-sm text-muted-foreground">
                Permissions are automatically assigned based on the selected role. You can customize them as needed.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availablePermissions?.map((permission) => (
                  <div key={permission?.id} className="p-3 border border-border rounded-md">
                    <Checkbox
                      label={permission?.label}
                      description={permission?.description}
                      checked={formData?.permissions?.includes(permission?.id)}
                      onChange={(e) => handlePermissionChange(permission?.id, e?.target?.checked)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              {mode === 'create' ? 'Create User' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;