import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { ErrorBoundary } from '../ErrorBoundary';
import { CommandPalette } from '../common/CommandPalette';

export const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-dark-bg">
      <CommandPalette />
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      
      <main className={`flex-1 transition-all duration-300 min-w-0 ${collapsed ? 'lg:ml-28' : 'lg:ml-80'}`}>
        <div className="sticky top-0 z-30 lg:hidden px-4 h-16 flex items-center bg-white/80 border-b border-slate-200 dark:glass dark:border-white/5 backdrop-blur-md">
            <button 
              onClick={() => setMobileOpen(true)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg dark:text-white/60 dark:hover:bg-white/5"
            >
                <Menu size={24} />
            </button>
            <span className="ml-3 font-display font-bold text-lg dark:text-white tracking-tight">TaskFlow <span className="text-brand-500">Pro</span></span>
        </div>
        
        <Navbar />
        <div className="p-4 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

