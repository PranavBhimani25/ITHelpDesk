import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ 
  selectedCount, 
  onBulkAction, 
  onClearSelection,
  totalUsers 
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'activate', label: 'Activate Users' },
    { value: 'deactivate', label: 'Deactivate Users' },
    { value: 'suspend', label: 'Suspend Users' },
    { value: 'change-role-agent', label: 'Change Role to Agent' },
    { value: 'change-role-user', label: 'Change Role to End User' },
    { value: 'reset-password', label: 'Reset Passwords' },
    { value: 'export', label: 'Export Selected' },
    { value: 'delete', label: 'Delete Users' }
  ];

  const handleApplyAction = async () => {
    if (!selectedAction) return;

    setIsLoading(true);
    try {
      await onBulkAction(selectedAction);
      setSelectedAction('');
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'activate':
        return 'UserCheck';
      case 'deactivate': case'suspend':
        return 'UserX';
      case 'change-role-agent': case'change-role-user':
        return 'UserCog';
      case 'reset-password':
        return 'Key';
      case 'export':
        return 'Download';
      case 'delete':
        return 'Trash2';
      default:
        return 'Settings';
    }
  };

  const getActionVariant = (action) => {
    if (action === 'delete') return 'destructive';
    if (action === 'suspend') return 'warning';
    return 'default';
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-moderate mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} />
            <span className="font-medium">
              {selectedCount} of {totalUsers} users selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            Clear Selection
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-64">
            <Select
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Select action..."
              className="bg-primary-foreground text-foreground"
            />
          </div>
          
          <Button
            onClick={handleApplyAction}
            disabled={!selectedAction || isLoading}
            loading={isLoading}
            variant={getActionVariant(selectedAction)}
            iconName={selectedAction ? getActionIcon(selectedAction) : 'Play'}
            iconPosition="left"
            className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
          >
            Apply
          </Button>
        </div>
      </div>

      {selectedAction === 'delete' && (
        <div className="mt-3 p-3 bg-error/20 border border-error/30 rounded-md">
          <div className="flex items-center space-x-2 text-error-foreground">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">
              Warning: This action cannot be undone. Selected users will be permanently deleted.
            </span>
          </div>
        </div>
      )}

      {(selectedAction === 'suspend' || selectedAction === 'deactivate') && (
        <div className="mt-3 p-3 bg-warning/20 border border-warning/30 rounded-md">
          <div className="flex items-center space-x-2 text-warning-foreground">
            <Icon name="Info" size={16} />
            <span className="text-sm">
              {selectedAction === 'suspend' ?'Suspended users will lose access to the system immediately.' :'Deactivated users will lose access but can be reactivated later.'
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionsBar;