import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  X,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { logout, user } = useAuth();

  const toggle = () => setCollapsed(!collapsed);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-md lg:hidden" 
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed left-4 top-4 z-50 transition-all duration-500 ease-in-out",
        "h-[calc(100vh-32px)] rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-dark-secondary/90 dark:backdrop-blur-2xl dark:ring-white/10 dark:border dark:border-white/5",
        collapsed ? "w-20" : "w-72",
        mobileOpen ? "translate-x-0" : "-translate-x-[110%] lg:translate-x-0"
      )}>
        <div className="flex h-24 flex-col justify-center px-6">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 overflow-hidden"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/30">
                  <Zap size={22} fill="currentColor" />
                </div>
                <span className="font-display text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  TaskFlow <span className="text-brand-500">Pro</span>
                </span>
              </motion.div>
            )}
            {collapsed && (
              <div className="flex w-full justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/30 transition-transform hover:scale-110 active:scale-95">
                  <Zap size={24} fill="currentColor" />
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-3 pb-4">
          {!collapsed && (
             <div className="mb-6 px-3">
               <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98] dark:bg-brand-600 dark:hover:bg-brand-500">
                 <Plus size={18} />
                 New Project
               </button>
             </div>
          )}
          {collapsed && (
            <div className="mb-6 flex justify-center">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform hover:scale-110 dark:bg-brand-600">
                <Plus size={20} />
              </button>
            </div>
          )}

          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => cn(
                  "group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-300",
                  isActive 
                    ? "bg-brand-600 text-white shadow-2xl shadow-brand-500/40 border border-white/10" 
                    : "text-slate-500 hover:bg-slate-50 dark:text-text-muted dark:hover:bg-white/5 dark:hover:text-text-primary"
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} className={cn("shrink-0", !collapsed && "transition-transform group-hover:scale-110")} />
                    {!collapsed && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1"
                      >
                        {item.name}
                      </motion.span>
                    )}
                    {isActive && !collapsed && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute right-3 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-100 p-4 dark:border-white/5">
          <div className="mb-2 space-y-1">
            <NavLink
              to="/settings"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all",
                isActive 
                  ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white" 
                  : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
              )}
            >
              {({ isActive }) => (
                <>
                  <Settings size={20} />
                  {!collapsed && <span>Settings</span>}
                </>
              )}
            </NavLink>
          </div>

          <div className={cn(
            "flex items-center gap-3 rounded-[1.5rem] bg-slate-50 p-2 dark:bg-dark-elevated ring-1 ring-slate-200 dark:ring-white/5",
            collapsed ? "justify-center" : "justify-between"
          )}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-100 p-0.5 dark:bg-brand-900/40 border dark:border-white/10">
                <img 
                  src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.id || 'admin'}`} 
                  alt="Avatar" 
                  className="h-full w-full rounded-[0.5rem] object-cover" 
                />
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-text-primary">{user?.name || 'Alex Chen'}</p>
                  <p className="truncate text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-text-muted opacity-70">{user?.role || 'Product Lead'}</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={logout}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>

        <button 
          onClick={toggle}
          className="absolute -right-3 top-24 hidden lg:flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-xl transition-transform hover:scale-110 active:scale-95 dark:glass dark:text-slate-400"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>
    </>
  );
};

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Projects', icon: Briefcase, path: '/projects' },
  { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
  { name: 'Team', icon: Users, path: '/team' },
  { name: 'Calendar', icon: Calendar, path: '/calendar' },
  { name: 'Analytics', icon: BarChart3, path: '/analytics' },
];
