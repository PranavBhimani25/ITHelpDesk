import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ 
  isOpen, 
  onToggle, 
  filters, 
  onFilterChange, 
  onClearFilters,
  appliedFiltersCount 
}) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'hardware', label: 'Hardware' },
    { value: 'software', label: 'Software' },
    { value: 'network', label: 'Network' },
    { value: 'access', label: 'Access & Security' },
    { value: 'email', label: 'Email & Communication' }
  ];

  const agentOptions = [
    { value: '', label: 'All Agents' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const slaOptions = [
    { value: '', label: 'All SLA Status' },
    { value: 'within-sla', label: 'Within SLA' },
    { value: 'approaching-breach', label: 'Approaching Breach' },
    { value: 'breached', label: 'SLA Breached' }
  ];

  const handleDateRangeChange = (field, value) => {
    const newRange = { ...dateRange, [field]: value };
    setDateRange(newRange);
    onFilterChange('dateRange', newRange);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      {/* Filter Sidebar */}
      <div className={`
        fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out z-50 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Filters</h3>
              {appliedFiltersCount > 0 && (
                <span className="flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-primary rounded-full">
                  {appliedFiltersCount}
                </span>
              )}
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search tickets..."
              value={filters?.search || ''}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              className="mb-4"
            />
          </div>

          {/* Status Filter */}
          <div className="mb-6">
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status || ''}
              onChange={(value) => onFilterChange('status', value)}
              className="mb-4"
            />
          </div>

          {/* Priority Filter */}
          <div className="mb-6">
            <Select
              label="Priority"
              options={priorityOptions}
              value={filters?.priority || ''}
              onChange={(value) => onFilterChange('priority', value)}
              className="mb-4"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <Select
              label="Category"
              options={categoryOptions}
              value={filters?.category || ''}
              onChange={(value) => onFilterChange('category', value)}
              className="mb-4"
            />
          </div>

          {/* Assigned Agent Filter */}
          <div className="mb-6">
            <Select
              label="Assigned Agent"
              options={agentOptions}
              value={filters?.assignedAgent || ''}
              onChange={(value) => onFilterChange('assignedAgent', value)}
              className="mb-4"
            />
          </div>

          {/* SLA Status Filter */}
          <div className="mb-6">
            <Select
              label="SLA Status"
              options={slaOptions}
              value={filters?.slaStatus || ''}
              onChange={(value) => onFilterChange('slaStatus', value)}
              className="mb-4"
            />
          </div>

          {/* Date Range Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Date Range
            </label>
            <div className="space-y-3">
              <Input
                type="date"
                placeholder="Start date"
                value={dateRange?.start}
                onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
              />
              <Input
                type="date"
                placeholder="End date"
                value={dateRange?.end}
                onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
              />
            </div>
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            fullWidth
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
            disabled={appliedFiltersCount === 0}
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;