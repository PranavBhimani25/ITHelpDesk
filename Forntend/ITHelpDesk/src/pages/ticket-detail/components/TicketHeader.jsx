import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { useRole } from '../../../components/ui/RoleBasedNav';

const TicketHeader = ({ ticket, onStatusUpdate, onPriorityUpdate, onAssignmentUpdate }) => {
  const { userRole, hasPermission } = useRole();
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const agentOptions = [
    { value: 'unassigned', label: 'Unassigned' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'jane-smith', label: 'Jane Smith' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'open': 'bg-blue-100 text-blue-800 border-blue-200',
      'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'resolved': 'bg-green-100 text-green-800 border-green-200',
      'closed': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors?.[status] || colors?.open;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'bg-gray-100 text-gray-800 border-gray-200',
      'medium': 'bg-blue-100 text-blue-800 border-blue-200',
      'high': 'bg-orange-100 text-orange-800 border-orange-200',
      'critical': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors?.[priority] || colors?.medium;
  };

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await onStatusUpdate(newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePriorityChange = async (newPriority) => {
    setIsUpdating(true);
    try {
      await onPriorityUpdate(newPriority);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAssignmentChange = async (newAssignee) => {
    setIsUpdating(true);
    try {
      await onAssignmentUpdate(newAssignee);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Ticket" size={24} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">#{ticket?.id}</h1>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket?.status)}`}>
            {ticket?.status?.charAt(0)?.toUpperCase() + ticket?.status?.slice(1)?.replace('-', ' ')}
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(ticket?.priority)}`}>
            {ticket?.priority?.charAt(0)?.toUpperCase() + ticket?.priority?.slice(1)}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {hasPermission('update-tickets') && (
            <>
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                iconPosition="left"
                disabled={isUpdating}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Share"
                iconPosition="left"
              >
                Share
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            iconName="Printer"
            iconPosition="left"
          >
            Print
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Created</label>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{ticket?.createdAt}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{ticket?.updatedAt}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Reporter</label>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={12} color="white" />
            </div>
            <span className="text-sm text-foreground">{ticket?.reporter}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Category</label>
          <div className="flex items-center space-x-2">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{ticket?.category}</span>
          </div>
        </div>
      </div>
      {hasPermission('update-tickets') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <Select
            label="Status"
            options={statusOptions}
            value={ticket?.status}
            onChange={handleStatusChange}
            disabled={isUpdating}
          />

          <Select
            label="Priority"
            options={priorityOptions}
            value={ticket?.priority}
            onChange={handlePriorityChange}
            disabled={isUpdating}
          />

          <Select
            label="Assigned Agent"
            options={agentOptions}
            value={ticket?.assignedTo || 'unassigned'}
            onChange={handleAssignmentChange}
            disabled={isUpdating}
          />
        </div>
      )}
    </div>
  );
};

export default TicketHeader;