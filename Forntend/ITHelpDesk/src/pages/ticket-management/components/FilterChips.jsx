import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ filters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];

    if (filters?.search) {
      chips?.push({
        key: 'search',
        label: `Search: "${filters?.search}"`,
        value: filters?.search
      });
    }

    if (filters?.status) {
      chips?.push({
        key: 'status',
        label: `Status: ${filters?.status?.charAt(0)?.toUpperCase() + filters?.status?.slice(1)}`,
        value: filters?.status
      });
    }

    if (filters?.priority) {
      chips?.push({
        key: 'priority',
        label: `Priority: ${filters?.priority?.charAt(0)?.toUpperCase() + filters?.priority?.slice(1)}`,
        value: filters?.priority
      });
    }

    if (filters?.category) {
      chips?.push({
        key: 'category',
        label: `Category: ${filters?.category?.charAt(0)?.toUpperCase() + filters?.category?.slice(1)}`,
        value: filters?.category
      });
    }

    if (filters?.assignedAgent) {
      const agentLabel = filters?.assignedAgent === 'unassigned' ? 'Unassigned' : filters?.assignedAgent?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ');
      chips?.push({
        key: 'assignedAgent',
        label: `Agent: ${agentLabel}`,
        value: filters?.assignedAgent
      });
    }

    if (filters?.slaStatus) {
      const slaLabel = filters?.slaStatus?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ');
      chips?.push({
        key: 'slaStatus',
        label: `SLA: ${slaLabel}`,
        value: filters?.slaStatus
      });
    }

    if (filters?.dateRange && (filters?.dateRange?.start || filters?.dateRange?.end)) {
      const { start, end } = filters?.dateRange;
      let dateLabel = 'Date: ';
      if (start && end) {
        dateLabel += `${start} to ${end}`;
      } else if (start) {
        dateLabel += `From ${start}`;
      } else if (end) {
        dateLabel += `Until ${end}`;
      }
      chips?.push({
        key: 'dateRange',
        label: dateLabel,
        value: filters?.dateRange
      });
    }

    return chips;
  };

  const chips = getFilterChips();

  if (chips?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {chips?.map((chip) => (
        <div
          key={chip?.key}
          className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
        >
          <span>{chip?.label}</span>
          <button
            onClick={() => onRemoveFilter(chip?.key)}
            className="ml-1 p-0.5 hover:bg-primary/20 rounded-full transition-smooth"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
      ))}
      {chips?.length > 1 && (
        <button
          onClick={onClearAll}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-smooth"
        >
          <Icon name="RotateCcw" size={12} />
          <span>Clear all</span>
        </button>
      )}
    </div>
  );
};

export default FilterChips;