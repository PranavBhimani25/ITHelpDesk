import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ userRole }) => {
  const activities = [
    {
      id: 1,
      type: 'ticket_created',
      message: 'New ticket created: Email server not responding',
      user: 'John Smith',
      timestamp: '2025-08-12T10:30:00',
      ticketId: 'TKT-2024-001'
    },
    {
      id: 2,
      type: 'ticket_assigned',
      message: 'Ticket assigned to Sarah Johnson',
      user: 'System',
      timestamp: '2025-08-12T10:15:00',
      ticketId: 'TKT-2024-001'
    },
    {
      id: 3,
      type: 'ticket_updated',
      message: 'Status changed to In Progress',
      user: 'Mike Chen',
      timestamp: '2025-08-12T09:45:00',
      ticketId: 'TKT-2024-002'
    },
    {
      id: 4,
      type: 'ticket_resolved',
      message: 'Ticket resolved: Software license activation',
      user: 'Lisa Thompson',
      timestamp: '2025-08-12T09:20:00',
      ticketId: 'TKT-2024-004'
    },
    {
      id: 5,
      type: 'comment_added',
      message: 'Comment added to VPN connection timeout',
      user: 'Alex Rodriguez',
      timestamp: '2025-08-12T08:55:00',
      ticketId: 'TKT-2024-003'
    },
    {
      id: 6,
      type: 'user_created',
      message: 'New user account created',
      user: 'Admin',
      timestamp: '2025-08-12T08:30:00',
      ticketId: null
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'ticket_created': return { icon: 'Plus', color: 'text-primary' };
      case 'ticket_assigned': return { icon: 'UserCheck', color: 'text-warning' };
      case 'ticket_updated': return { icon: 'Edit', color: 'text-accent' };
      case 'ticket_resolved': return { icon: 'CheckCircle', color: 'text-success' };
      case 'comment_added': return { icon: 'MessageSquare', color: 'text-secondary' };
      case 'user_created': return { icon: 'UserPlus', color: 'text-primary' };
      default: return { icon: 'Activity', color: 'text-muted-foreground' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredActivities = userRole === 'end-user' 
    ? activities?.filter(activity => activity?.type !== 'user_created')
    : activities;

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <button className="text-sm text-primary hover:underline transition-smooth">
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredActivities?.map((activity) => {
            const { icon, color } = getActivityIcon(activity?.type);
            
            return (
              <div key={activity?.id} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center ${color}`}>
                  <Icon name={icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium">
                    {activity?.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-muted-foreground">
                      by {activity?.user}
                    </p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity?.timestamp)}
                    </p>
                    {activity?.ticketId && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <button className="text-xs text-primary hover:underline">
                          {activity?.ticketId}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredActivities?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;