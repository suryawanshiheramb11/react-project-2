import React from 'react';
import { FiSearch } from 'react-icons/fi';

export const SearchBar = ({ onSearchChange }) => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <FiSearch 
        style={{ 
          position: 'absolute', 
          left: '14px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: 'var(--text-secondary)' 
        }} 
      />
      <input 
        type="text" 
        className="form-control" 
        placeholder="Search transactions..." 
        style={{ paddingLeft: '40px' }}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
