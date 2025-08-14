import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ onFilterChange, userRole }) => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignedAgent: '',
    dateRange: '',
    searchTerm: ''
  });

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const agentOptions = [
    { value: '', label: 'All Agents' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'mike-chen', label: 'Mike Chen' },
    { value: 'alex-rodriguez', label: 'Alex Rodriguez' },
    { value: 'lisa-thompson', label: 'Lisa Thompson' },
    { value: 'david-kim', label: 'David Kim' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: '',
      priority: '',
      assignedAgent: '',
      dateRange: '',
      searchTerm: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle mb-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Filter Tickets</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <Input
              type="search"
              placeholder="Search tickets..."
              value={filters?.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Status Filter */}
          <Select
            placeholder="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />

          {/* Priority Filter */}
          <Select
            placeholder="Priority"
            options={priorityOptions}
            value={filters?.priority}
            onChange={(value) => handleFilterChange('priority', value)}
          />

          {/* Agent Filter - Only for admin/agent roles */}
          {userRole !== 'end-user' && (
            <Select
              placeholder="Assigned Agent"
              options={agentOptions}
              value={filters?.assignedAgent}
              onChange={(value) => handleFilterChange('assignedAgent', value)}
            />
          )}

          {/* Date Range Filter */}
          <Select
            placeholder="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filters?.status && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
                  <button
                    onClick={() => handleFilterChange('status', '')}
                    className="ml-1 hover:text-primary/80"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters?.priority && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">
                  Priority: {priorityOptions?.find(opt => opt?.value === filters?.priority)?.label}
                  <button
                    onClick={() => handleFilterChange('priority', '')}
                    className="ml-1 hover:text-warning/80"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters?.assignedAgent && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                  Agent: {agentOptions?.find(opt => opt?.value === filters?.assignedAgent)?.label}
                  <button
                    onClick={() => handleFilterChange('assignedAgent', '')}
                    className="ml-1 hover:text-accent/80"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters?.dateRange && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                  Date: {dateRangeOptions?.find(opt => opt?.value === filters?.dateRange)?.label}
                  <button
                    onClick={() => handleFilterChange('dateRange', '')}
                    className="ml-1 hover:text-success/80"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters?.searchTerm && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                  Search: "{filters?.searchTerm}"
                  <button
                    onClick={() => handleFilterChange('searchTerm', '')}
                    className="ml-1 hover:text-secondary/80"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterControls;