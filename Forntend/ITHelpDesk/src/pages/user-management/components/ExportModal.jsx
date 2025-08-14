import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ExportModal = ({ isOpen, onClose, onExport, selectedUsers, totalUsers }) => {
  const [exportType, setExportType] = useState('selected');
  const [format, setFormat] = useState('csv');
  const [selectedFields, setSelectedFields] = useState([
    'name', 'email', 'role', 'department', 'status', 'lastLogin'
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const exportTypeOptions = [
    { value: 'selected', label: `Selected Users (${selectedUsers?.length})` },
    { value: 'all', label: `All Users (${totalUsers})` },
    { value: 'filtered', label: 'Current Filtered Results' }
  ];

  const formatOptions = [
    { value: 'csv', label: 'CSV (.csv)' },
    { value: 'excel', label: 'Excel (.xlsx)' },
    { value: 'json', label: 'JSON (.json)' },
    { value: 'pdf', label: 'PDF (.pdf)' }
  ];

  const availableFields = [
    { id: 'name', label: 'Full Name', description: 'User\'s full name' },
    { id: 'email', label: 'Email Address', description: 'User\'s email address' },
    { id: 'role', label: 'Role', description: 'User\'s system role' },
    { id: 'department', label: 'Department', description: 'User\'s department' },
    { id: 'status', label: 'Status', description: 'Account status' },
    { id: 'phone', label: 'Phone Number', description: 'Contact phone number' },
    { id: 'jobTitle', label: 'Job Title', description: 'User\'s job title' },
    { id: 'lastLogin', label: 'Last Login', description: 'Last login timestamp' },
    { id: 'createdAt', label: 'Created Date', description: 'Account creation date' },
    { id: 'permissions', label: 'Permissions', description: 'User permissions list' }
  ];

  const handleFieldToggle = (fieldId, checked) => {
    setSelectedFields(prev => 
      checked 
        ? [...prev, fieldId]
        : prev?.filter(f => f !== fieldId)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedFields(checked ? availableFields?.map(f => f?.id) : []);
  };

  const handleExport = async () => {
    setIsLoading(true);
    try {
      await onExport({
        type: exportType,
        format,
        fields: selectedFields
      });
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Export Users</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Export Type</label>
            <Select
              options={exportTypeOptions}
              value={exportType}
              onChange={setExportType}
            />
          </div>

          {/* Format */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">File Format</label>
            <Select
              options={formatOptions}
              value={format}
              onChange={setFormat}
            />
          </div>

          {/* Fields Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Fields to Export</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSelectAll(selectedFields?.length !== availableFields?.length)}
              >
                {selectedFields?.length === availableFields?.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            
            <div className="max-h-64 overflow-y-auto border border-border rounded-md p-3 space-y-2">
              {availableFields?.map((field) => (
                <Checkbox
                  key={field?.id}
                  label={field?.label}
                  description={field?.description}
                  checked={selectedFields?.includes(field?.id)}
                  onChange={(e) => handleFieldToggle(field?.id, e?.target?.checked)}
                />
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground">
              {selectedFields?.length} of {availableFields?.length} fields selected
            </p>
          </div>

          {/* Export Info */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm">
                <p className="text-foreground font-medium mb-1">Export Summary</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• {exportType === 'selected' ? selectedUsers?.length : totalUsers} users will be exported</li>
                  <li>• {selectedFields?.length} fields will be included</li>
                  <li>• File will be downloaded as {format?.toUpperCase()}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/50">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            loading={isLoading}
            disabled={selectedFields?.length === 0}
            iconName="Download"
            iconPosition="left"
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;