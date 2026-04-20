import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { useTransactions } from './useTransactions';
import { isWithinInterval, startOfMonth, endOfMonth, parseISO } from 'date-fns';

export const useBudget = () => {
  const context = useContext(FinanceContext);
  const { transactions } = useTransactions();
  
  if (!context) {
    throw new Error('useBudget must be used within a FinanceProvider');
  }

  const { budget, updateBudget } = context;

  const currentMonthExpenses = transactions
    .filter(t => t.type === 'expense')
    .filter(t => {
      const now = new Date();
      return isWithinInterval(parseISO(t.date), { start: startOfMonth(now), end: endOfMonth(now) });
    })
    .reduce((acc, curr) => acc + curr.amount, 0);

  const remainingBudget = budget.monthlyBudget - currentMonthExpenses;
  let percentageUsed = 0;
  if(budget.monthlyBudget > 0) {
    percentageUsed = (currentMonthExpenses / budget.monthlyBudget) * 100;
  }

  return {
    budget: budget.monthlyBudget,
    updateBudget,
    currentMonthExpenses,
    remainingBudget,
    percentageUsed: percentageUsed.toFixed(1)
  };
};
