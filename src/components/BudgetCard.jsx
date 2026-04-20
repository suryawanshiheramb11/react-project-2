import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/currencyFormatter';

export const BudgetCard = ({ budget, currentMonthExpenses, remainingBudget, percentageUsed }) => {
  
  const isWarning = percentageUsed >= 80;
  const isDanger = percentageUsed >= 100;
  
  let progressColor = 'var(--success)';
  if (isDanger) progressColor = 'var(--danger)';
  else if (isWarning) progressColor = 'var(--warning)';

  return (
    <motion.div 
      className="glass-panel" 
      style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <h3 style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <span>Monthly Budget</span>
        <span style={{ fontSize: '0.9rem', fontWeight: "normal", color: 'var(--text-secondary)' }}>
          {percentageUsed}% Used
        </span>
      </h3>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Total Budget</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatCurrency(budget)}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Remaining</p>
          <p style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: isDanger ? 'var(--danger)' : 'var(--text-primary)'
          }}>
            {formatCurrency(remainingBudget)}
          </p>
        </div>
      </div>

      <div style={{ 
        height: '8px', 
        width: '100%', 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentageUsed, 100)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ 
            height: '100%', 
            backgroundColor: progressColor,
            borderRadius: '4px'
          }}
        />
      </div>
      
      {isDanger && (
        <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '12px', textAlign: 'center' }}>
          You have exceeded your monthly budget!
        </p>
      )}
    </motion.div>
  );
};
