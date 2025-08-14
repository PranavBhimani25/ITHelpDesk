import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TicketTable = ({ 
  tickets, 
  selectedTickets, 
  onSelectTicket, 
  onSelectAll, 
  onSort, 
  sortConfig,
  onTicketClick,
  onQuickStatusUpdate,
  onQuickAssign
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const priorityColors = {
    low: 'text-blue-600 bg-blue-50 border-blue-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    high: 'text-orange-600 bg-orange-50 border-orange-200',
    critical: 'text-red-600 bg-red-50 border-red-200'
  };

  const statusColors = {
    open: 'text-blue-600 bg-blue-50 border-blue-200',
    'in-progress': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    resolved: 'text-green-600 bg-green-50 border-green-200',
    closed: 'text-gray-600 bg-gray-50 border-gray-200'
  };

  const slaColors = {
    'within-sla': 'text-green-600',
    'approaching-breach': 'text-yellow-600',
    'breached': 'text-red-600'
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' ? 
      <Icon name="ArrowUp" size={14} className="text-primary" /> : 
      <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const toggleRowExpansion = (ticketId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(ticketId)) {
      newExpanded?.delete(ticketId);
    } else {
      newExpanded?.add(ticketId);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedTickets?.length === tickets?.length && tickets?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('id')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Ticket ID</span>
                  {getSortIcon('id')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('subject')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Subject</span>
                  {getSortIcon('subject')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('requester')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Requester</span>
                  {getSortIcon('requester')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('priority')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Priority</span>
                  {getSortIcon('priority')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Status</span>
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('assignedAgent')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Assigned Agent</span>
                  {getSortIcon('assignedAgent')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('lastUpdated')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Last Updated</span>
                  {getSortIcon('lastUpdated')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tickets?.map((ticket) => (
              <React.Fragment key={ticket?.id}>
                <tr className="hover:bg-muted/30 transition-smooth">
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedTickets?.includes(ticket?.id)}
                      onChange={(e) => onSelectTicket(ticket?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onTicketClick(ticket?.id)}
                      className="text-primary hover:text-primary/80 font-medium transition-smooth"
                    >
                      #{ticket?.id}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground truncate max-w-xs">
                        {ticket?.subject}
                      </span>
                      <button
                        onClick={() => toggleRowExpansion(ticket?.id)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        <Icon 
                          name={expandedRows?.has(ticket?.id) ? "ChevronUp" : "ChevronDown"} 
                          size={14} 
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <Icon name="User" size={14} className="text-muted-foreground" />
                      </div>
                      <span className="text-foreground">{ticket?.requester}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${priorityColors?.[ticket?.priority]}`}>
                      {ticket?.priority?.charAt(0)?.toUpperCase() + ticket?.priority?.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      options={statusOptions}
                      value={ticket?.status}
                      onChange={(value) => onQuickStatusUpdate(ticket?.id, value)}
                      className="w-32"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      options={agentOptions}
                      value={ticket?.assignedAgent || 'unassigned'}
                      onChange={(value) => onQuickAssign(ticket?.id, value)}
                      className="w-36"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground">
                        {formatDate(ticket?.lastUpdated)}
                      </span>
                      <span className={`text-xs ${slaColors?.[ticket?.slaStatus]}`}>
                        {ticket?.slaStatus === 'within-sla' && 'Within SLA'}
                        {ticket?.slaStatus === 'approaching-breach' && 'Approaching Breach'}
                        {ticket?.slaStatus === 'breached' && 'SLA Breached'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTicketClick(ticket?.id)}
                        iconName="Eye"
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
                {expandedRows?.has(ticket?.id) && (
                  <tr>
                    <td colSpan="9" className="px-4 py-3 bg-muted/20">
                      <div className="text-sm text-muted-foreground">
                        <p><strong>Category:</strong> {ticket?.category}</p>
                        <p><strong>Description:</strong> {ticket?.description}</p>
                        {ticket?.tags && (
                          <div className="flex items-center space-x-2 mt-2">
                            <strong>Tags:</strong>
                            {ticket?.tags?.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-muted text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="lg:hidden divide-y divide-border">
        {tickets?.map((ticket) => (
          <div key={ticket?.id} className="p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={selectedTickets?.includes(ticket?.id)}
                onChange={(e) => onSelectTicket(ticket?.id, e?.target?.checked)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => onTicketClick(ticket?.id)}
                    className="text-primary hover:text-primary/80 font-medium transition-smooth"
                  >
                    #{ticket?.id}
                  </button>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${priorityColors?.[ticket?.priority]}`}>
                    {ticket?.priority?.charAt(0)?.toUpperCase() + ticket?.priority?.slice(1)}
                  </span>
                </div>
                
                <h3 className="font-medium text-foreground mb-2 truncate">
                  {ticket?.subject}
                </h3>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <span>{ticket?.requester}</span>
                  <span>{formatDate(ticket?.lastUpdated)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${statusColors?.[ticket?.status]}`}>
                    {ticket?.status?.charAt(0)?.toUpperCase() + ticket?.status?.slice(1)?.replace('-', ' ')}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTicketClick(ticket?.id)}
                    iconName="Eye"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketTable;