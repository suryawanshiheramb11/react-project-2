import React, { useState, useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useDebounce } from '../hooks/useDebounce';
import { TransactionCard } from '../components/TransactionCard';
import { SearchBar } from '../components/SearchBar';
import { Filters } from '../components/Filters';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Transactions = () => {
  const { getFilteredTransactions, deleteTransaction } = useTransactions();
  const navigate = useNavigate();
  
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  const [filters, setFilters] = useState({
    type: 'All',
    category: 'All',
    dateRange: 'All',
    sort: 'Date (Newest)'
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filtered = useMemo(() => {
    let result = getFilteredTransactions({ 
      query: debouncedQuery, 
      category: filters.category, 
      type: filters.type, 
      dateRange: filters.dateRange 
    });

    if (filters.sort === 'Date (Newest)') {
        result.sort((a,b) => new Date(b.date) - new Date(a.date));
    } else if (filters.sort === 'Amount (High to Low)') {
        result.sort((a,b) => b.amount - a.amount);
    } else if (filters.sort === 'Amount (Low to High)') {
        result.sort((a,b) => a.amount - b.amount);
    }
    return result;
  }, [debouncedQuery, filters, getFilteredTransactions]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>Transactions</h1>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <SearchBar onSearchChange={setQuery} />
        
        <select 
          className="form-control" 
          style={{ width: 'auto' }}
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          <option value="Date (Newest)" style={{ color: 'black' }}>Sort: Date (Newest)</option>
          <option value="Amount (High to Low)" style={{ color: 'black' }}>Sort: Amount (High to Low)</option>
          <option value="Amount (Low to High)" style={{ color: 'black' }}>Sort: Amount (Low to High)</option>
        </select>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <Filters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <AnimatePresence>
          {filtered.length > 0 ? (
            filtered.map(t => (
              <TransactionCard 
                key={t.id} 
                transaction={t} 
                onDelete={deleteTransaction}
                onEdit={(tr) => navigate(`/transactions/new`, { state: { transaction: tr } })}
              />
            ))
          ) : (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}
            >
              No transactions match your filters.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
