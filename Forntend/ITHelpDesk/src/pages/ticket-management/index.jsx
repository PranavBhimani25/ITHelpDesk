import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import TicketTable from './components/TicketTable';
import BulkActions from './components/BulkActions';
import TablePagination from './components/TablePagination';
import ExportModal from './components/ExportModal';

const TicketManagement = () => {
  const navigate = useNavigate();
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'lastUpdated', direction: 'desc' });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
    assignedAgent: '',
    slaStatus: '',
    dateRange: { start: '', end: '' }
  });

  // Mock ticket data
  const mockTickets = [
    {
      id: 'TKT-2024-001',
      subject: 'Unable to access company email on mobile device',
      description: 'User cannot configure Outlook on iPhone. Getting authentication errors when trying to add corporate email account.',
      requester: 'Alice Johnson',
      priority: 'high',
      status: 'open',
      category: 'email',
      assignedAgent: 'john-doe',
      createdAt: '2024-08-10T09:30:00Z',
      lastUpdated: '2024-08-12T10:15:00Z',
      slaStatus: 'approaching-breach',
      tags: ['mobile', 'outlook', 'authentication']
    },
    {
      id: 'TKT-2024-002',
      subject: 'Laptop screen flickering intermittently',
      description: 'Dell Latitude 7420 screen flickers randomly, especially when using external monitor. Issue started after recent Windows update.',
      requester: 'Bob Smith',
      priority: 'medium',
      status: 'in-progress',
      category: 'hardware',
      assignedAgent: 'sarah-wilson',
      createdAt: '2024-08-09T14:20:00Z',
      lastUpdated: '2024-08-12T09:45:00Z',
      slaStatus: 'within-sla',
      tags: ['hardware', 'display', 'windows-update']
    },
    {
      id: 'TKT-2024-003',
      subject: 'VPN connection drops frequently',
      description: 'Cisco AnyConnect VPN disconnects every 10-15 minutes. User works remotely and needs stable connection for video calls.',
      requester: 'Carol Davis',
      priority: 'critical',
      status: 'open',
      category: 'network',
      assignedAgent: null,
      createdAt: '2024-08-12T08:00:00Z',
      lastUpdated: '2024-08-12T11:00:00Z',
      slaStatus: 'breached',
      tags: ['vpn', 'network', 'remote-work']
    },
    {
      id: 'TKT-2024-004',
      subject: 'Software installation request - Adobe Creative Suite',
      description: 'Marketing team member needs Adobe Creative Suite installed on workstation for upcoming campaign projects.',
      requester: 'David Wilson',
      priority: 'low',
      status: 'resolved',
      category: 'software',
      assignedAgent: 'mike-johnson',
      createdAt: '2024-08-08T11:00:00Z',
      lastUpdated: '2024-08-11T16:30:00Z',
      slaStatus: 'within-sla',
      tags: ['software', 'installation', 'adobe']
    },
    {
      id: 'TKT-2024-005',
      subject: 'Password reset for domain account',
      description: 'Employee forgot Active Directory password and cannot access workstation or company resources.',
      requester: 'Emma Brown',
      priority: 'high',
      status: 'closed',
      category: 'access',
      assignedAgent: 'john-doe',
      createdAt: '2024-08-11T13:15:00Z',
      lastUpdated: '2024-08-11T13:45:00Z',
      slaStatus: 'within-sla',
      tags: ['password', 'active-directory', 'access']
    },
    {
      id: 'TKT-2024-006',
      subject: 'Printer not responding to print jobs',
      description: 'HP LaserJet Pro in Marketing department not printing. Jobs queue up but nothing prints. Printer shows online status.',
      requester: 'Frank Miller',
      priority: 'medium',
      status: 'in-progress',
      category: 'hardware',
      assignedAgent: 'sarah-wilson',
      createdAt: '2024-08-10T15:30:00Z',
      lastUpdated: '2024-08-12T08:20:00Z',
      slaStatus: 'within-sla',
      tags: ['printer', 'hardware', 'queue']
    },
    {
      id: 'TKT-2024-007',
      subject: 'Slow internet connection in conference room',
      description: 'WiFi in Conference Room B is extremely slow. Video calls are dropping and file uploads timeout.',
      requester: 'Grace Lee',
      priority: 'high',
      status: 'open',
      category: 'network',
      assignedAgent: 'mike-johnson',
      createdAt: '2024-08-12T07:45:00Z',
      lastUpdated: '2024-08-12T10:30:00Z',
      slaStatus: 'within-sla',
      tags: ['wifi', 'network', 'conference-room']
    },
    {
      id: 'TKT-2024-008',
      subject: 'Microsoft Teams audio issues during meetings',
      description: 'Microphone not working properly in Teams meetings. Other participants cannot hear clearly, audio cuts in and out.',
      requester: 'Henry Garcia',
      priority: 'medium',
      status: 'resolved',
      category: 'software',
      assignedAgent: 'john-doe',
      createdAt: '2024-08-09T10:00:00Z',
      lastUpdated: '2024-08-10T14:20:00Z',
      slaStatus: 'within-sla',
      tags: ['teams', 'audio', 'microphone']
    }
  ];

  // Filter and sort tickets
  const filteredAndSortedTickets = useMemo(() => {
    let filtered = mockTickets?.filter(ticket => {
      const matchesSearch = !filters?.search || 
        ticket?.subject?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        ticket?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        ticket?.requester?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        ticket?.id?.toLowerCase()?.includes(filters?.search?.toLowerCase());

      const matchesStatus = !filters?.status || ticket?.status === filters?.status;
      const matchesPriority = !filters?.priority || ticket?.priority === filters?.priority;
      const matchesCategory = !filters?.category || ticket?.category === filters?.category;
      const matchesAgent = !filters?.assignedAgent || 
        (filters?.assignedAgent === 'unassigned' ? !ticket?.assignedAgent : ticket?.assignedAgent === filters?.assignedAgent);
      const matchesSLA = !filters?.slaStatus || ticket?.slaStatus === filters?.slaStatus;

      let matchesDateRange = true;
      if (filters?.dateRange?.start || filters?.dateRange?.end) {
        const ticketDate = new Date(ticket.lastUpdated);
        if (filters?.dateRange?.start) {
          matchesDateRange = matchesDateRange && ticketDate >= new Date(filters.dateRange.start);
        }
        if (filters?.dateRange?.end) {
          matchesDateRange = matchesDateRange && ticketDate <= new Date(filters.dateRange.end);
        }
      }

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory && 
             matchesAgent && matchesSLA && matchesDateRange;
    });

    // Sort tickets
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'lastUpdated' || sortConfig?.key === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTickets?.length / pageSize);
  const paginatedTickets = filteredAndSortedTickets?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Applied filters count
  const appliedFiltersCount = Object.values(filters)?.filter(value => {
    if (typeof value === 'object' && value !== null) {
      return Object.values(value)?.some(v => v !== '');
    }
    return value !== '';
  })?.length;

  // Event handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleRemoveFilter = (key) => {
    if (key === 'dateRange') {
      setFilters(prev => ({ ...prev, [key]: { start: '', end: '' } }));
    } else {
      setFilters(prev => ({ ...prev, [key]: '' }));
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      priority: '',
      category: '',
      assignedAgent: '',
      slaStatus: '',
      dateRange: { start: '', end: '' }
    });
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectTicket = (ticketId, checked) => {
    setSelectedTickets(prev => 
      checked 
        ? [...prev, ticketId]
        : prev?.filter(id => id !== ticketId)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedTickets(checked ? paginatedTickets?.map(ticket => ticket?.id) : []);
  };

  const handleTicketClick = (ticketId) => {
    navigate(`/ticket-detail?id=${ticketId}`);
  };

  const handleQuickStatusUpdate = (ticketId, status) => {
    console.log(`Updating ticket ${ticketId} status to ${status}`);
    // In a real app, this would make an API call
  };

  const handleQuickAssign = (ticketId, agentId) => {
    console.log(`Assigning ticket ${ticketId} to ${agentId}`);
    // In a real app, this would make an API call
  };

  const handleBulkStatusUpdate = (status) => {
    console.log(`Bulk updating ${selectedTickets?.length} tickets to status: ${status}`);
    setSelectedTickets([]);
  };

  const handleBulkAssign = (agentId) => {
    console.log(`Bulk assigning ${selectedTickets?.length} tickets to agent: ${agentId}`);
    setSelectedTickets([]);
  };

  const handleBulkEscalate = () => {
    console.log(`Bulk escalating ${selectedTickets?.length} tickets`);
    setSelectedTickets([]);
  };

  const handleBulkDelete = () => {
    console.log(`Bulk deleting ${selectedTickets?.length} tickets`);
    setSelectedTickets([]);
  };

  const handleExport = (exportConfig) => {
    console.log('Exporting tickets with config:', exportConfig);
    // In a real app, this would trigger the export process
  };

  // Clear selection when page changes
  useEffect(() => {
    setSelectedTickets([]);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="agent" />
      <div className="flex pt-16">
        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onToggle={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          appliedFiltersCount={appliedFiltersCount}
        />

        <main className={`flex-1 transition-all duration-300 ${isFilterSidebarOpen ? 'lg:ml-80' : 'lg:ml-80'}`}>
          <div className="p-6">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Ticket Management</h1>
                <p className="text-muted-foreground">
                  Manage and track all support tickets across your organization
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                  iconName="Filter"
                  iconPosition="left"
                  className="lg:hidden"
                >
                  Filters
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setIsExportModalOpen(true)}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>
                
                <Button
                  variant="default"
                  onClick={() => navigate('/create-ticket')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  New Ticket
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Ticket" size={20} className="text-blue-600" />
                  <span className="text-sm font-medium text-muted-foreground">Total Tickets</span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">{mockTickets?.length}</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={20} className="text-yellow-600" />
                  <span className="text-sm font-medium text-muted-foreground">Open Tickets</span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {mockTickets?.filter(t => t?.status === 'open')?.length}
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={20} className="text-red-600" />
                  <span className="text-sm font-medium text-muted-foreground">Critical</span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {mockTickets?.filter(t => t?.priority === 'critical')?.length}
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={20} className="text-green-600" />
                  <span className="text-sm font-medium text-muted-foreground">Resolved Today</span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {mockTickets?.filter(t => t?.status === 'resolved')?.length}
                </p>
              </div>
            </div>

            {/* Filter Chips */}
            <FilterChips
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearFilters}
            />

            {/* Bulk Actions */}
            <BulkActions
              selectedCount={selectedTickets?.length}
              onBulkStatusUpdate={handleBulkStatusUpdate}
              onBulkAssign={handleBulkAssign}
              onBulkEscalate={handleBulkEscalate}
              onBulkDelete={handleBulkDelete}
              onClearSelection={() => setSelectedTickets([])}
            />

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {paginatedTickets?.length} of {filteredAndSortedTickets?.length} tickets
                {appliedFiltersCount > 0 && ` (filtered from ${mockTickets?.length} total)`}
              </p>
              
              <div className="flex items-center space-x-2">
                <Icon name="RotateCw" size={16} className="text-muted-foreground animate-spin" />
                <span className="text-xs text-muted-foreground">Auto-refresh enabled</span>
              </div>
            </div>

            {/* Ticket Table */}
            <TicketTable
              tickets={paginatedTickets}
              selectedTickets={selectedTickets}
              onSelectTicket={handleSelectTicket}
              onSelectAll={handleSelectAll}
              onSort={handleSort}
              sortConfig={sortConfig}
              onTicketClick={handleTicketClick}
              onQuickStatusUpdate={handleQuickStatusUpdate}
              onQuickAssign={handleQuickAssign}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={filteredAndSortedTickets?.length}
                onPageChange={setCurrentPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
              />
            )}
          </div>
        </main>
      </div>
      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        totalTickets={mockTickets?.length}
        filteredTickets={filteredAndSortedTickets?.length}
      />
    </div>
  );
};

export default TicketManagement;