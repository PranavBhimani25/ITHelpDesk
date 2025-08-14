import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { RoleProvider } from '../../components/ui/RoleBasedNav';
import { NotificationProvider } from '../../components/ui/NotificationBadge';
import TicketHeader from './components/TicketHeader';
import TicketContent from './components/TicketContent';
import TicketSidebar from './components/TicketSidebar';
import CommentThread from './components/CommentThread';

const TicketDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('agent');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock ticket data
  const mockTicket = {
    id: 'TKT-2024-002',
    title: 'Email attachment size limit error in Outlook',
    description: `I'm experiencing an issue with sending email attachments through Microsoft Outlook. When I try to attach files larger than 5MB, I receive an error message stating "The attachment size exceeds the maximum limit allowed by the server."\n\nThis is preventing me from sending important project files to clients and is significantly impacting my productivity. The issue started occurring yesterday after the latest system update.\n\nSteps I've already tried:\n1. Restarted Outlook application\n2. Restarted my computer\n3. Tried sending smaller files (which work fine)\n4. Checked my internet connection\n\nThe error occurs consistently with any file over 5MB, regardless of file type. I need to send a 15MB presentation file to a client today, so this is quite urgent.`,
    status: 'in-progress',
    priority: 'high',
    category: 'Email & Communication',
    reporter: 'Sarah Johnson',
    assignedTo: 'john-doe',
    createdAt: '2024-08-12 09:30 AM',
    updatedAt: '2024-08-12 11:00 AM',
    department: 'Marketing',
    location: 'Building A, Floor 2',
    assetTag: 'MKT-2024-015',
    attachments: [
      {
        name: 'error-screenshot.png',
        size: 245760,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        uploadedAt: '2024-08-12 09:32 AM'
      },
      {
        name: 'system-info.txt',
        size: 2048,
        type: 'document',
        url: '#',
        uploadedAt: '2024-08-12 09:33 AM'
      }
    ],
    systemInfo: {
      os: 'Windows 11 Pro',
      browser: 'Chrome 120.0.6099.129',
      ip: '192.168.1.145'
    }
  };

  useEffect(() => {
    // Simulate loading ticket data
    const loadTicket = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch from API using ticket ID from URL params
        const ticketId = searchParams?.get('id') || 'TKT-2024-002';
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setTicket(mockTicket);
      } catch (error) {
        console.error('Error loading ticket:', error);
        navigate('/ticket-management');
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [searchParams, navigate]);

  const handleStatusUpdate = async (newStatus) => {
    console.log('Updating status to:', newStatus);
    setTicket(prev => ({ ...prev, status: newStatus }));
    // In a real app, this would make an API call
  };

  const handlePriorityUpdate = async (newPriority) => {
    console.log('Updating priority to:', newPriority);
    setTicket(prev => ({ ...prev, priority: newPriority }));
    // In a real app, this would make an API call
  };

  const handleAssignmentUpdate = async (newAssignee) => {
    console.log('Updating assignment to:', newAssignee);
    setTicket(prev => ({ ...prev, assignedTo: newAssignee === 'unassigned' ? null : newAssignee }));
    // In a real app, this would make an API call
  };

  const handleAddComment = async (commentData) => {
    console.log('Adding comment:', commentData);
    // In a real app, this would make an API call to add the comment
    // and then refresh the comments thread
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', isHome: true },
    { label: 'Tickets', path: '/ticket-management' },
    { label: `#${ticket?.id || 'Loading...'}`, path: '/ticket-detail', isLast: true }
  ];

  if (loading) {
    return (
      <NotificationProvider>
        <RoleProvider initialRole={userRole}>
          <div className="min-h-screen bg-background">
            <Header userRole={userRole} />
            <main className="pt-16">
              <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading ticket details...</p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </RoleProvider>
      </NotificationProvider>
    );
  }

  if (!ticket) {
    return (
      <NotificationProvider>
        <RoleProvider initialRole={userRole}>
          <div className="min-h-screen bg-background">
            <Header userRole={userRole} />
            <main className="pt-16">
              <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-foreground mb-4">Ticket Not Found</h1>
                  <p className="text-muted-foreground mb-6">The requested ticket could not be found.</p>
                  <button
                    onClick={() => navigate('/ticket-management')}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth"
                  >
                    Back to Tickets
                  </button>
                </div>
              </div>
            </main>
          </div>
        </RoleProvider>
      </NotificationProvider>
    );
  }

  return (
    <NotificationProvider>
      <RoleProvider initialRole={userRole}>
        <div className="min-h-screen bg-background">
          <Header userRole={userRole} />
          
          <main className="pt-16">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <Breadcrumb customItems={breadcrumbItems} />
              
              <div className="space-y-6">
                {/* Ticket Header */}
                <TicketHeader
                  ticket={ticket}
                  onStatusUpdate={handleStatusUpdate}
                  onPriorityUpdate={handlePriorityUpdate}
                  onAssignmentUpdate={handleAssignmentUpdate}
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Left Column - Ticket Content and Comments */}
                  <div className="xl:col-span-2 space-y-6">
                    <TicketContent ticket={ticket} />
                    <CommentThread ticket={ticket} onAddComment={handleAddComment} />
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className="xl:col-span-1">
                    <TicketSidebar ticket={ticket} />
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Role Switcher for Demo */}
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
              <label className="block text-xs font-medium text-muted-foreground mb-2">
                Demo Role:
              </label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e?.target?.value)}
                className="text-xs border border-border rounded px-2 py-1 bg-background"
              >
                <option value="end-user">End User</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </RoleProvider>
    </NotificationProvider>
  );
};

export default TicketDetail;