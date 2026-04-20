import React from 'react';

export const Filters = ({ filters, onFilterChange }) => {
  const categories = ['All', 'Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Subscriptions'];
  const types = ['All', 'income', 'expense'];
  const dates = ['All', 'This Month'];

  return (
    <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1', minWidth: '150px' }}>
        <label className="form-label">Type</label>
        <select 
          className="form-control"
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
        >
          {types.map(t => (
            <option key={t} value={t} style={{ color: 'black' }}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>

      <div style={{ flex: '1', minWidth: '150px' }}>
        <label className="form-label">Category</label>
        <select 
          className="form-control"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          {categories.map(c => (
            <option key={c} value={c} style={{ color: 'black' }}>{c}</option>
          ))}
        </select>
      </div>

      <div style={{ flex: '1', minWidth: '150px' }}>
        <label className="form-label">Date Range</label>
        <select 
          className="form-control"
          value={filters.dateRange}
          onChange={(e) => onFilterChange('dateRange', e.target.value)}
        >
          {dates.map(d => (
            <option key={d} value={d} style={{ color: 'black' }}>{d}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
