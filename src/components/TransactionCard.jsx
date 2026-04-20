import React from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiEdit, FiRepeat } from 'react-icons/fi';
import { formatCurrency } from '../utils/currencyFormatter';
import { format, parseISO } from 'date-fns';

export const TransactionCard = ({ transaction, onDelete, onEdit }) => {
  const isIncome = transaction.type === 'income';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className="glass-panel"
      style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
        borderLeft: `4px solid var(--${isIncome ? 'success' : 'danger'})`
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          background: `var(--${isIncome ? 'success-bg' : 'danger-bg'})`,
          padding: '12px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          color: `var(--${isIncome ? 'success' : 'danger'})`
        }}>
          {transaction.category.charAt(0)}
        </div>
        <div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {transaction.title}
            {transaction.recurring && <FiRepeat size={14} color="var(--primary)" title="Recurring" />}
          </h4>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {transaction.category} • {format(parseISO(transaction.date), 'MMM dd, yyyy')}
          </span>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
          fontSize: '1.2rem',
          fontWeight: '600',
          color: `var(--${isIncome ? 'success' : 'danger'})`
        }}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => onEdit(transaction)}
            className="btn-outline" 
            style={{ padding: '8px', borderRadius: '50%' }}
            title="Edit"
          >
            <FiEdit size={16} />
          </button>
          <button 
            onClick={() => onDelete(transaction.id)}
            className="btn-outline" 
            style={{ padding: '8px', borderRadius: '50%', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
            title="Delete"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
