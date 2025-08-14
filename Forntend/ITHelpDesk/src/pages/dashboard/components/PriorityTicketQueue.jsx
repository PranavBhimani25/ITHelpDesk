import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriorityTicketQueue = ({ userRole }) => {
  const [sortField, setSortField] = useState('priority');
  const [sortDirection, setSortDirection] = useState('desc');

  const tickets = [
    {
      id: 'TKT-2024-001',
      subject: 'Email server not responding',
      priority: 'High',
      status: 'Open',
      assignedAgent: 'Sarah Johnson',
      createdAt: '2025-08-12T09:30:00',
      requester: 'John Smith'
    },
    {
      id: 'TKT-2024-002',
      subject: 'Printer driver installation issue',
      priority: 'Medium',
      status: 'In Progress',
      assignedAgent: 'Mike Chen',
      createdAt: '2025-08-12T08:15:00',
      requester: 'Emily Davis'
    },
    {
      id: 'TKT-2024-003',
      subject: 'VPN connection timeout',
      priority: 'High',
      status: 'Open',
      assignedAgent: 'Alex Rodriguez',
      createdAt: '2025-08-12T07:45:00',
      requester: 'Robert Wilson'
    },
    {
      id: 'TKT-2024-004',
      subject: 'Software license activation',
      priority: 'Low',
      status: 'Resolved',
      assignedAgent: 'Lisa Thompson',
      createdAt: '2025-08-11T16:20:00',
      requester: 'Maria Garcia'
    },
    {
      id: 'TKT-2024-005',
      subject: 'Network drive access denied',
      priority: 'Medium',
      status: 'In Progress',
      assignedAgent: 'David Kim',
      createdAt: '2025-08-11T14:10:00',
      requester: 'James Brown'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-error bg-error/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-error bg-error/10';
      case 'In Progress': return 'text-warning bg-warning/10';
      case 'Resolved': return 'text-success bg-success/10';
      case 'Closed': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTickets = [...tickets]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'priority') {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      aValue = priorityOrder?.[aValue];
      bValue = priorityOrder?.[bValue];
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Priority Ticket Queue</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Ticket ID</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('subject')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Subject</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('priority')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Priority</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              {userRole !== 'end-user' && (
                <th className="text-left p-4 font-medium text-muted-foreground">Assigned Agent</th>
              )}
              <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTickets?.map((ticket) => (
              <tr key={ticket?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <Link 
                    to={`/ticket-detail?id=${ticket?.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {ticket?.id}
                  </Link>
                </td>
                <td className="p-4">
                  <div className="max-w-xs">
                    <p className="font-medium text-foreground truncate">{ticket?.subject}</p>
                    {userRole !== 'end-user' && (
                      <p className="text-sm text-muted-foreground">by {ticket?.requester}</p>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket?.priority)}`}>
                    {ticket?.priority}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket?.status)}`}>
                    {ticket?.status}
                  </span>
                </td>
                {userRole !== 'end-user' && (
                  <td className="p-4">
                    <p className="text-sm text-foreground">{ticket?.assignedAgent}</p>
                  </td>
                )}
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    {userRole !== 'end-user' && (
                      <Button variant="ghost" size="sm" iconName="Edit">
                        Edit
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden p-4 space-y-4">
        {sortedTickets?.map((ticket) => (
          <div key={ticket?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between mb-3">
              <Link 
                to={`/ticket-detail?id=${ticket?.id}`}
                className="font-medium text-primary hover:underline"
              >
                {ticket?.id}
              </Link>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket?.priority)}`}>
                  {ticket?.priority}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket?.status)}`}>
                  {ticket?.status}
                </span>
              </div>
            </div>
            <p className="font-medium text-foreground mb-2">{ticket?.subject}</p>
            {userRole !== 'end-user' && (
              <div className="text-sm text-muted-foreground mb-3">
                <p>Requester: {ticket?.requester}</p>
                <p>Assigned: {ticket?.assignedAgent}</p>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Eye" fullWidth>
                View Details
              </Button>
              {userRole !== 'end-user' && (
                <Button variant="outline" size="sm" iconName="Edit" fullWidth>
                  Edit
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityTicketQueue;