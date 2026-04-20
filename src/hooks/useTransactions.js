import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { isWithinInterval, startOfMonth, endOfMonth, parseISO } from 'date-fns';

export const useTransactions = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useTransactions must be used within a FinanceProvider');
  }

  const { transactions, addTransaction, updateTransaction, deleteTransaction } = context;

  const getFilteredTransactions = ({ query = '', category = 'All', type = 'All', dateRange = 'All' }) => {
    return transactions.filter(t => {
      const matchQuery = t.title.toLowerCase().includes(query.toLowerCase()) || 
                         (t.notes && t.notes.toLowerCase().includes(query.toLowerCase()));
      const matchCategory = category === 'All' || t.category === category;
      const matchType = type === 'All' || t.type === type;
      
      let matchDate = true;
      if (dateRange === 'This Month') {
        const now = new Date();
        const start = startOfMonth(now);
        const end = endOfMonth(now);
        matchDate = isWithinInterval(parseISO(t.date), { start, end });
      }

      return matchQuery && matchCategory && matchType && matchDate;
    });
  };

  const getSummary = () => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    const balance = income - expense;

    const categoryTotals = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    let topCategory = 'None';
    let maxSpent = 0;
    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > maxSpent) {
        maxSpent = amt;
        topCategory = cat;
      }
    }

    return { income, expense, balance, topCategory };
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getFilteredTransactions,
    getSummary,
  };
};
