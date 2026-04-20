import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiList, FiPlusCircle, FiPieChart, FiTarget } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const Sidebar = () => {
  const links = [
    { name: 'Dashboard', icon: <FiHome size={20} />, path: '/' },
    { name: 'Transactions', icon: <FiList size={20} />, path: '/transactions' },
    { name: 'Add Transaction', icon: <FiPlusCircle size={20} />, path: '/transactions/new' },
    { name: 'Budget', icon: <FiTarget size={20} />, path: '/budget' },
    { name: 'Analytics', icon: <FiPieChart size={20} />, path: '/analytics' },
  ];

  return (
    <div className="glass-panel" style={{ 
      width: '250px', 
      height: 'calc(100vh - 40px)', 
      margin: '20px', 
      display: 'flex', 
      flexDirection: 'column',
      padding: '24px 0'
    }}>
      <div style={{ padding: '0 24px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FiPieChart /> FinTrack
        </h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 12px' }}>
        {links.map((link) => (
          <NavLink 
            key={link.path} 
            to={link.path}
            end={link.path === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'white' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--primary)' : 'transparent',
              transition: 'all 0.2s',
              fontWeight: isActive ? '600' : '500',
              textDecoration: 'none'
            })}
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
