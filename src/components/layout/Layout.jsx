import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from '../shared/CommandPalette';
import { ToastManager } from '../shared/ToastManager';

export const Layout = () => {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-dark-950 text-white selection:bg-primary-500/30 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Topbar />
        
        {/* Main Scrollable Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
          {/* Subtle Background Glows */}
          <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-primary-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-7xl mx-auto min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <ToastManager />
    </div>
  );
};
