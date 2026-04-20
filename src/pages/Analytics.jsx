import React, { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { ExpensePieChart, IncomeExpenseBarChart, TrendLineChart } from '../components/Charts';
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';

export const Analytics = () => {
  const { transactions } = useTransactions();

  const expenseData = useMemo(() => {
    return transactions
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
  }, [transactions]);

  const formatMonthlyData = () => {
    const months = {};
    
    transactions.forEach(t => {
      const monthYear = format(parseISO(t.date), 'MMM yyyy');
      if (!months[monthYear]) {
        months[monthYear] = { name: monthYear, Income: 0, Expense: 0 };
      }
      if (t.type === 'income') months[monthYear].Income += t.amount;
      if (t.type === 'expense') months[monthYear].Expense += t.amount;
    });

    return Object.values(months).sort((a,b) => new Date(a.name) - new Date(b.name)).slice(-6);
  };

  const trendData = useMemo(() => {
    const list = [...transactions].sort((a,b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    return list.map(t => {
      if(t.type === 'income') runningBalance += t.amount;
      else runningBalance -= t.amount;
      return {
        date: format(parseISO(t.date), 'MMM dd'),
        amount: runningBalance
      };
    });
  }, [transactions]);

  const monthlyBarData = useMemo(() => formatMonthlyData(), [transactions]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 style={{ marginBottom: '24px' }}>Financial Analytics</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Income vs Expenses (Last 6 Months)</h3>
          {monthlyBarData.length > 0 ? (
            <IncomeExpenseBarChart data={monthlyBarData} />
          ) : (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>No monthly data available.</p>
          )}
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Expense Distribution</h3>
          {expenseData.length > 0 ? (
            <ExpensePieChart data={expenseData} />
          ) : (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>No expense data available.</p>
          )}
        </div>

        <div className="glass-panel" style={{ padding: '24px', gridColumn: '1 / -1' }}>
          <h3 style={{ marginBottom: '20px' }}>Net Wealth Trend</h3>
          {trendData.length > 0 ? (
            <TrendLineChart data={trendData} />
          ) : (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>No timeline data available.</p>
          )}
        </div>

      </div>
    </motion.div>
  );
};
