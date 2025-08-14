import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { useRole } from '../../components/ui/RoleBasedNav';
import { useNotifications } from '../../components/ui/NotificationBadge';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import PriorityTicketQueue from './components/PriorityTicketQueue';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';

const Dashboard = () => {
  const { userRole } = useRole();
  const { badges } = useNotifications();
  const [filters, setFilters] = useState({});
  const [isRealTimeConnected, setIsRealTimeConnected] = useState(false);

  // Simulate WebSocket connection for real-time updates
  useEffect(() => {
    const connectWebSocket = () => {
      setIsRealTimeConnected(true);
      
      // Simulate real-time ticket updates
      const interval = setInterval(() => {
        // This would normally update ticket data from WebSocket
        console.log('Real-time update received');
      }, 30000);

      return () => {
        clearInterval(interval);
        setIsRealTimeConnected(false);
      };
    };

    const cleanup = connectWebSocket();
    return cleanup;
  }, []);

  const getMetricsData = () => {
    const baseMetrics = [
      {
        title: 'Open Tickets',
        value: '24',
        icon: 'Ticket',
        trend: 'up',
        trendValue: '+12%',
        color: 'error'
      },
      {
        title: 'In Progress',
        value: '18',
        icon: 'Clock',
        trend: 'down',
        trendValue: '-5%',
        color: 'warning'
      },
      {
        title: 'Resolved Today',
        value: '32',
        icon: 'CheckCircle',
        trend: 'up',
        trendValue: '+18%',
        color: 'success'
      }
    ];

    if (userRole === 'end-user') {
      return [
        {
          title: 'My Open Tickets',
          value: '3',
          icon: 'Ticket',
          trend: null,
          trendValue: null,
          color: 'primary'
        },
        {
          title: 'Pending Response',
          value: '1',
          icon: 'MessageSquare',
          trend: null,
          trendValue: null,
          color: 'warning'
        },
        {
          title: 'Resolved This Month',
          value: '8',
          icon: 'CheckCircle',
          trend: 'up',
          trendValue: '+2',
          color: 'success'
        }
      ];
    }

    if (userRole === 'agent') {
      return [
        ...baseMetrics,
        {
          title: 'Assigned to Me',
          value: '12',
          icon: 'UserCheck',
          trend: 'up',
          trendValue: '+3',
          color: 'primary'
        }
      ];
    }

    if (userRole === 'admin') {
      return [
        ...baseMetrics,
        {
          title: 'SLA Compliance',
          value: '94%',
          icon: 'Target',
          trend: 'up',
          trendValue: '+2%',
          color: 'success'
        },
        {
          title: 'Active Users',
          value: '156',
          icon: 'Users',
          trend: 'up',
          trendValue: '+8',
          color: 'primary'
        }
      ];
    }

    return baseMetrics;
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // This would normally trigger a data refresh with the new filters
    console.log('Filters updated:', newFilters);
  };

  const metricsData = getMetricsData();

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your IT support system.
              </p>
              {isRealTimeConnected && (
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-success">Real-time updates active</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Link to="/create-ticket">
                <Button iconName="Plus" size="lg">
                  Create Ticket
                </Button>
              </Link>
              {userRole !== 'end-user' && (
                <Button variant="outline" iconName="Download">
                  Export Data
                </Button>
              )}
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                icon={metric?.icon}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Filter Controls */}
          <FilterControls 
            onFilterChange={handleFilterChange}
            userRole={userRole}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Priority Ticket Queue - Takes up 3 columns on xl screens */}
            <div className="xl:col-span-3">
              <PriorityTicketQueue userRole={userRole} />
            </div>

            {/* Sidebar - Takes up 1 column on xl screens */}
            <div className="xl:col-span-1 space-y-8">
              {/* Quick Actions */}
              <QuickActions userRole={userRole} />
              
              {/* Activity Feed */}
              <ActivityFeed userRole={userRole} />
            </div>
          </div>

          {/* Additional Admin Sections */}
          {userRole === 'admin' && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg shadow-subtle p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">System Health</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Server Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Database</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                      Healthy
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Email Service</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">
                      Delayed
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg shadow-subtle p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Resolution Time</span>
                    <span className="text-sm font-medium text-foreground">2.4 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                    <span className="text-sm font-medium text-foreground">4.8/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">First Contact Resolution</span>
                    <span className="text-sm font-medium text-foreground">78%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;