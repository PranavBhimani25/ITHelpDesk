import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ 
  selectedCount, 
  onBulkStatusUpdate, 
  onBulkAssign, 
  onBulkEscalate,
  onBulkDelete,
  onClearSelection 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [bulkValue, setBulkValue] = useState('');

  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const agentOptions = [
    { value: 'john-doe', label: 'John Doe' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const handleBulkAction = () => {
    if (!bulkAction || !bulkValue) return;

    switch (bulkAction) {
      case 'status':
        onBulkStatusUpdate(bulkValue);
        break;
      case 'assign':
        onBulkAssign(bulkValue);
        break;
      case 'escalate':
        onBulkEscalate();
        break;
      case 'delete':
        onBulkDelete();
        break;
      default:
        break;
    }

    setBulkAction('');
    setBulkValue('');
    setIsOpen(false);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg mb-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="CheckSquare" size={20} className="text-primary" />
          <span className="font-medium text-foreground">
            {selectedCount} ticket{selectedCount > 1 ? 's' : ''} selected
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          iconName="X"
          iconPosition="left"
        >
          Clear Selection
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        {!isOpen ? (
          <Button
            variant="default"
            onClick={() => setIsOpen(true)}
            iconName="Settings"
            iconPosition="left"
          >
            Bulk Actions
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Select
              placeholder="Select action..."
              options={[
                { value: 'status', label: 'Update Status' },
                { value: 'assign', label: 'Assign Agent' },
                { value: 'escalate', label: 'Escalate' },
                { value: 'delete', label: 'Delete' }
              ]}
              value={bulkAction}
              onChange={setBulkAction}
              className="w-40"
            />
            
            {bulkAction === 'status' && (
              <Select
                placeholder="Select status..."
                options={statusOptions}
                value={bulkValue}
                onChange={setBulkValue}
                className="w-36"
              />
            )}
            
            {bulkAction === 'assign' && (
              <Select
                placeholder="Select agent..."
                options={agentOptions}
                value={bulkValue}
                onChange={setBulkValue}
                className="w-40"
              />
            )}
            
            {(bulkAction === 'escalate' || bulkAction === 'delete') && (
              <span className="text-sm text-muted-foreground px-3 py-2">
                {bulkAction === 'escalate' ? 'Escalate selected tickets' : 'Delete selected tickets'}
              </span>
            )}
            
            <Button
              variant="default"
              onClick={handleBulkAction}
              disabled={!bulkAction || (bulkAction !== 'escalate' && bulkAction !== 'delete' && !bulkValue)}
              iconName="Check"
            >
              Apply
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => {
                setIsOpen(false);
                setBulkAction('');
                setBulkValue('');
              }}
              iconName="X"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActions;