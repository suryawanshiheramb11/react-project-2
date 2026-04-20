import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTransactions } from '../hooks/useTransactions';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  amount: yup.number().positive('Amount must be positive').required('Amount is required').typeError('Amount must be a number'),
  category: yup.string().required('Category is required'),
  type: yup.string().oneOf(['income', 'expense']).required('Type is required'),
  date: yup.date().required('Date is required').typeError('Valid date is required'),
  notes: yup.string(),
  recurring: yup.boolean()
});

export const AddTransaction = () => {
  const { addTransaction, updateTransaction } = useTransactions();
  const navigate = useNavigate();
  const location = useLocation();
  const editTransaction = location.state?.transaction;

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      recurring: false,
      category: 'Food'
    }
  });

  useEffect(() => {
    if (editTransaction) {
      Object.keys(editTransaction).forEach(key => {
        if (key === 'date') {
          setValue(key, new Date(editTransaction[key]).toISOString().split('T')[0]);
        } else {
          setValue(key, editTransaction[key]);
        }
      });
    }
  }, [editTransaction, setValue]);

  const onSubmit = (data) => {
    if (editTransaction) {
      updateTransaction(editTransaction.id, data);
    } else {
      addTransaction(data);
    }
    navigate('/transactions');
  };

  const categories = ['Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Subscriptions'];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px' }}>{editTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Title</label>
            <input type="text" className="form-control" {...register('title')} placeholder="E.g. Netflix Subscription" />
            {errors.title && <span className="error-text">{errors.title.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input type="number" step="0.01" className="form-control" {...register('amount')} placeholder="0.00" />
            {errors.amount && <span className="error-text">{errors.amount.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" {...register('date')} />
            {errors.date && <span className="error-text">{errors.date.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Transaction Type</label>
            <select className="form-control" {...register('type')}>
              <option value="expense" style={{ color: 'black' }}>Expense</option>
              <option value="income" style={{ color: 'black' }}>Income</option>
            </select>
            {errors.type && <span className="error-text">{errors.type.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-control" {...register('category')}>
              {categories.map(c => <option key={c} value={c} style={{ color: 'black' }}>{c}</option>)}
            </select>
            {errors.category && <span className="error-text">{errors.category.message}</span>}
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Notes (Optional)</label>
            <textarea className="form-control" {...register('notes')} rows="3" placeholder="Additional details..." />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" id="recurring" {...register('recurring')} style={{ width: '18px', height: '18px' }} />
            <label htmlFor="recurring" style={{ color: 'var(--text-primary)', cursor: 'pointer' }}>Mark as recurring expense</label>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '30px' }}>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/transactions')}>Cancel</button>
          <button type="submit" className="btn btn-primary">{editTransaction ? 'Save Changes' : 'Add Transaction'}</button>
        </div>
      </form>
    </motion.div>
  );
};
