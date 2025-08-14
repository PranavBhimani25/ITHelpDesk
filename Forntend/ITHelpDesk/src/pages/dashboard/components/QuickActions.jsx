import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = ({ userRole }) => {
  const getQuickActions = () => {
    const baseActions = [
      {
        label: 'Create Ticket',
        path: '/create-ticket',
        icon: 'Plus',
        variant: 'default',
        description: 'Report a new issue or request'
      },
      {
        label: 'My Tickets',
        path: '/ticket-management',
        icon: 'Ticket',
        variant: 'outline',
        description: 'View and manage your tickets'
      }
    ];

    if (userRole === 'agent') {
      return [
        ...baseActions,
        {
          label: 'Assign Tickets',
          path: '/ticket-management?filter=unassigned',
          icon: 'UserCheck',
          variant: 'outline',
          description: 'Assign unassigned tickets'
        },
        {
          label: 'Bulk Operations',
          path: '/ticket-management?view=bulk',
          icon: 'Package',
          variant: 'outline',
          description: 'Perform bulk ticket operations'
        }
      ];
    }

    if (userRole === 'admin') {
      return [
        ...baseActions,
        {
          label: 'User Management',
          path: '/user-management',
          icon: 'Users',
          variant: 'outline',
          description: 'Manage users and roles'
        },
        {
          label: 'System Reports',
          path: '/reports',
          icon: 'BarChart3',
          variant: 'outline',
          description: 'View system analytics'
        },
        {
          label: 'Settings',
          path: '/settings',
          icon: 'Settings',
          variant: 'outline',
          description: 'Configure system settings'
        }
      ];
    }

    return baseActions;
  };

  const quickActions = getQuickActions();

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Frequently used actions for your role
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {quickActions?.map((action, index) => (
            <Link
              key={index}
              to={action?.path}
              className="group block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-smooth"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Button
                    variant={action?.variant}
                    size="sm"
                    iconName={action?.icon}
                    className="pointer-events-none"
                  >
                    {action?.label}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 group-hover:text-foreground transition-smooth">
                {action?.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;