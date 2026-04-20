import React, { useState } from 'react';
import { useBudget } from '../hooks/useBudget';
import { BudgetCard } from '../components/BudgetCard';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency } from '../utils/currencyFormatter';
import { motion } from 'framer-motion';

export const Budget = () => {
  const { budget, updateBudget, currentMonthExpenses, remainingBudget, percentageUsed } = useBudget();
  const { transactions } = useTransactions();
  
  const [newBudget, setNewBudget] = useState(budget);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    updateBudget(Number(newBudget));
    setIsEditing(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 style={{ marginBottom: '24px' }}>Monthly Budget Planning</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', maxWidth: '800px' }}>
        
        <BudgetCard 
          budget={budget}
          currentMonthExpenses={currentMonthExpenses}
          remainingBudget={remainingBudget}
          percentageUsed={percentageUsed}
        />

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Budget Settings</h3>
          
          {!isEditing ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Current Monthly Limit</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatCurrency(budget)}</p>
              </div>
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                Modify Budget
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                <label className="form-label">New Budget Amount</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                />
              </div>
              <button className="btn btn-outline" onClick={() => { setIsEditing(false); setNewBudget(budget); }}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Details
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
