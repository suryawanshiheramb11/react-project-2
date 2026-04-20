import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('finance_budget');
    return saved ? JSON.parse(saved) : { monthlyBudget: 50000 };
  });

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_budget', JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [{ ...transaction, id: uuidv4(), date: new Date(transaction.date).toISOString() }, ...prev]);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updatedTransaction } : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateBudget = (newBudget) => {
    setBudget({ monthlyBudget: newBudget });
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      budget,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      updateBudget,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
