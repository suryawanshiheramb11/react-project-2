import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ 
        flex: 1, 
        padding: '30px 40px',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <Outlet />
      </div>
    </div>
  );
};
