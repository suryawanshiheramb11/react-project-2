import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency } from '../utils/currencyFormatter';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';
import { ExpensePieChart } from '../components/Charts';

export const Dashboard = () => {
  const { transactions, getSummary } = useTransactions();
  const summary = getSummary();
  
  const recentTransactions = transactions.slice(0, 5);

  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 style={{ marginBottom: '24px' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--text-secondary)' }}>
            <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', color: 'var(--primary)' }}><FiDollarSign size={20} /></div>
            <h3>Net Balance</h3>
          </div>
          <h2 style={{ fontSize: '2rem' }}>{formatCurrency(summary.balance)}</h2>
        </div>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--text-secondary)' }}>
            <div style={{ padding: '8px', background: 'var(--success-bg)', borderRadius: '8px', color: 'var(--success)' }}><FiTrendingUp size={20} /></div>
            <h3>Total Income</h3>
          </div>
          <h2 style={{ fontSize: '2rem', color: 'var(--success)' }}>{formatCurrency(summary.income)}</h2>
        </div>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--text-secondary)' }}>
            <div style={{ padding: '8px', background: 'var(--danger-bg)', borderRadius: '8px', color: 'var(--danger)' }}><FiTrendingDown size={20} /></div>
            <h3>Total Expenses</h3>
          </div>
          <h2 style={{ fontSize: '2rem', color: 'var(--danger)' }}>{formatCurrency(summary.expense)}</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'revert', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Expenses by Category</h3>
          {expenseData.length > 0 ? (
            <ExpensePieChart data={expenseData} />
          ) : (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>No expense data available.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
