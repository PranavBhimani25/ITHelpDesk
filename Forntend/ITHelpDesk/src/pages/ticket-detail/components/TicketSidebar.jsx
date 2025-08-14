import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useRole } from '../../../components/ui/RoleBasedNav';

const TicketSidebar = ({ ticket }) => {
  const { hasPermission } = useRole();

  const slaData = {
    responseTime: {
      target: '4 hours',
      actual: '2.5 hours',
      status: 'met',
      percentage: 62
    },
    resolutionTime: {
      target: '24 hours',
      actual: '18 hours',
      status: 'pending',
      percentage: 75
    }
  };

  const relatedTickets = [
    {
      id: 'TKT-2024-001',
      title: 'Email server connectivity issues',
      status: 'resolved',
      priority: 'high',
      createdAt: '2024-08-10'
    },
    {
      id: 'TKT-2024-003',
      title: 'VPN connection problems',
      status: 'open',
      priority: 'medium',
      createdAt: '2024-08-11'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'open': 'text-blue-600',
      'in-progress': 'text-yellow-600',
      'resolved': 'text-green-600',
      'closed': 'text-gray-600'
    };
    return colors?.[status] || colors?.open;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'text-gray-600',
      'medium': 'text-blue-600',
      'high': 'text-orange-600',
      'critical': 'text-red-600'
    };
    return colors?.[priority] || colors?.medium;
  };

  return (
    <div className="space-y-6">
      {/* Assignment Section */}
      {hasPermission('assign-tickets') && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="UserCheck" size={20} />
            <span>Assignment</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {ticket?.assignedTo ? 'John Doe' : 'Unassigned'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {ticket?.assignedTo ? 'Senior Support Agent' : 'No agent assigned'}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" fullWidth>
                Reassign
              </Button>
              <Button variant="outline" size="sm" iconName="MessageSquare">
                Contact
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* SLA Tracking */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Clock" size={20} />
          <span>SLA Tracking</span>
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Response Time</span>
              <span className={`text-xs font-medium ${slaData?.responseTime?.status === 'met' ? 'text-green-600' : 'text-orange-600'}`}>
                {slaData?.responseTime?.status === 'met' ? 'Met' : 'Pending'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${slaData?.responseTime?.status === 'met' ? 'bg-green-500' : 'bg-orange-500'}`}
                style={{ width: `${slaData?.responseTime?.percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{slaData?.responseTime?.actual}</span>
              <span>{slaData?.responseTime?.target}</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Resolution Time</span>
              <span className="text-xs font-medium text-orange-600">In Progress</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-orange-500"
                style={{ width: `${slaData?.resolutionTime?.percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{slaData?.resolutionTime?.actual}</span>
              <span>{slaData?.resolutionTime?.target}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Related Tickets */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Link" size={20} />
          <span>Related Tickets</span>
        </h3>
        
        <div className="space-y-3">
          {relatedTickets?.map((relatedTicket) => (
            <div key={relatedTicket?.id} className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-smooth cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-medium text-primary">#{relatedTicket?.id}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium ${getStatusColor(relatedTicket?.status)}`}>
                    {relatedTicket?.status}
                  </span>
                  <span className={`text-xs font-medium ${getPriorityColor(relatedTicket?.priority)}`}>
                    {relatedTicket?.priority}
                  </span>
                </div>
              </div>
              <p className="text-sm text-foreground mb-2 line-clamp-2">
                {relatedTicket?.title}
              </p>
              <p className="text-xs text-muted-foreground">
                Created {relatedTicket?.createdAt}
              </p>
            </div>
          ))}
          
          <Button variant="outline" size="sm" fullWidth iconName="Plus" iconPosition="left">
            Link Ticket
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={20} />
          <span>Quick Actions</span>
        </h3>
        
        <div className="space-y-2">
          <Button variant="outline" size="sm" fullWidth iconName="ArrowUp" iconPosition="left">
            Escalate
          </Button>
          <Button variant="outline" size="sm" fullWidth iconName="Copy" iconPosition="left">
            Duplicate
          </Button>
          <Button variant="outline" size="sm" fullWidth iconName="Archive" iconPosition="left">
            Archive
          </Button>
          {hasPermission('close-tickets') && (
            <Button variant="destructive" size="sm" fullWidth iconName="X" iconPosition="left">
              Close Ticket
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketSidebar;