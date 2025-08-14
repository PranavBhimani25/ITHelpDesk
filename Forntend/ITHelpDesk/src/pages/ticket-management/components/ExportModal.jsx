import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ExportModal = ({ isOpen, onClose, onExport, totalTickets, filteredTickets }) => {
  const [exportScope, setExportScope] = useState('filtered');
  const [exportFormat, setExportFormat] = useState('csv');
  const [selectedFields, setSelectedFields] = useState([
    'id', 'subject', 'requester', 'priority', 'status', 'assignedAgent', 'lastUpdated'
  ]);

  const availableFields = [
    { id: 'id', label: 'Ticket ID' },
    { id: 'subject', label: 'Subject' },
    { id: 'description', label: 'Description' },
    { id: 'requester', label: 'Requester' },
    { id: 'priority', label: 'Priority' },
    { id: 'status', label: 'Status' },
    { id: 'category', label: 'Category' },
    { id: 'assignedAgent', label: 'Assigned Agent' },
    { id: 'createdAt', label: 'Created Date' },
    { id: 'lastUpdated', label: 'Last Updated' },
    { id: 'slaStatus', label: 'SLA Status' },
    { id: 'tags', label: 'Tags' }
  ];

  const exportScopeOptions = [
    { value: 'filtered', label: `Current filtered results (${filteredTickets} tickets)` },
    { value: 'all', label: `All tickets (${totalTickets} tickets)` }
  ];

  const exportFormatOptions = [
    { value: 'csv', label: 'CSV (.csv)' },
    { value: 'excel', label: 'Excel (.xlsx)' },
    { value: 'pdf', label: 'PDF (.pdf)' }
  ];

  const handleFieldToggle = (fieldId) => {
    setSelectedFields(prev => 
      prev?.includes(fieldId) 
        ? prev?.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleSelectAllFields = (checked) => {
    setSelectedFields(checked ? availableFields?.map(field => field?.id) : []);
  };

  const handleExport = () => {
    onExport({
      scope: exportScope,
      format: exportFormat,
      fields: selectedFields
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Export Tickets</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Scope */}
          <div>
            <Select
              label="Export Scope"
              description="Choose which tickets to export"
              options={exportScopeOptions}
              value={exportScope}
              onChange={setExportScope}
            />
          </div>

          {/* Export Format */}
          <div>
            <Select
              label="Export Format"
              description="Choose the file format"
              options={exportFormatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />
          </div>

          {/* Field Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground">
                Select Fields to Export
              </label>
              <Checkbox
                label="Select All"
                checked={selectedFields?.length === availableFields?.length}
                onChange={(e) => handleSelectAllFields(e?.target?.checked)}
              />
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto border border-border rounded-md p-3">
              {availableFields?.map((field) => (
                <Checkbox
                  key={field?.id}
                  label={field?.label}
                  checked={selectedFields?.includes(field?.id)}
                  onChange={() => handleFieldToggle(field?.id)}
                />
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              {selectedFields?.length} of {availableFields?.length} fields selected
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleExport}
            disabled={selectedFields?.length === 0}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;