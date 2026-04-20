import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { AddTransaction } from './pages/AddTransaction';
import { Budget } from './pages/Budget';
import { Analytics } from './pages/Analytics';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/new" element={<AddTransaction />} />
          <Route path="budget" element={<Budget />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </BrowserRouter>
  );
}

export default App;
