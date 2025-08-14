import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStats = ({ users }) => {
  const stats = {
    total: users?.length,
    active: users?.filter(u => u?.status === 'active')?.length,
    inactive: users?.filter(u => u?.status === 'inactive')?.length,
    suspended: users?.filter(u => u?.status === 'suspended')?.length,
    admins: users?.filter(u => u?.role === 'admin')?.length,
    agents: users?.filter(u => u?.role === 'agent')?.length,
    endUsers: users?.filter(u => u?.role === 'end-user')?.length
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.total,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Active Users',
      value: stats?.active,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Administrators',
      value: stats?.admins,
      icon: 'Shield',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Agents',
      value: stats?.agents,
      icon: 'Headphones',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'End Users',
      value: stats?.endUsers,
      icon: 'User',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Inactive',
      value: stats?.inactive + stats?.suspended,
      icon: 'UserX',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-subtle">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;