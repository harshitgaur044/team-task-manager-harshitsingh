import React from 'react';
import { Search, Bell, Moon, Sun, User as UserIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { mockNotifications } from '../../data/mockData';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-slate-50/80 px-10 border-b border-transparent backdrop-blur-md dark:bg-dark-bg/80 dark:border-white/5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-xs font-bold shadow-sm ring-1 ring-slate-200 dark:bg-white/5 dark:text-white dark:ring-white/10">
          <span className="text-slate-400 dark:text-slate-500">Workspace</span>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-900 dark:text-white">Product Design</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="group relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors group-focus-within:text-brand-500">
            <Search className="text-slate-400" size={16} />
          </div>
          <input
            type="text"
            placeholder="Search everything..."
            className="h-10 w-64 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white lg:w-80"
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <kbd className="hidden rounded-lg bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-white/10 dark:text-slate-400 lg:block">⌘K</kbd>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />

        <button
          onClick={toggleTheme}
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10 dark:hover:bg-white/10"
        >
          {theme === 'light' ? (
            <Moon size={18} className="transition-transform group-active:rotate-12" />
          ) : (
            <Sun size={18} className="transition-transform group-active:scale-110" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10 dark:hover:bg-white/10"
          >
            <Bell size={18} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-black text-white shadow-lg shadow-brand-500/40">
              {mockNotifications.filter(n => !n.read).length}
            </span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-96 origin-top-right overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] focus:outline-none dark:border-white/5 dark:bg-zinc-900 dark:shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-50 p-6 dark:border-white/5">
                  <h3 className="text-sm font-black tracking-tight dark:text-white uppercase">Notifications</h3>
                  <button className="text-[10px] font-bold text-brand-600 hover:text-brand-500 dark:text-brand-400 uppercase tracking-widest leading-none">Mark all as read</button>
                </div>
                <div className="max-h-[400px] overflow-y-auto p-2">
                  {mockNotifications.map(n => (
                    <button key={n.id} className="flex w-full items-start gap-4 rounded-2xl p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
                      <div className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                      <div>
                        <p className="text-sm font-bold tracking-tight dark:text-white">{n.title}</p>
                        <p className="mt-1 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">{n.message}</p>
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">{n.time}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-50 p-4 dark:border-white/5">
                  <button className="w-full rounded-xl py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-brand-600 p-0.5 shadow-lg shadow-brand-500/20 active:scale-95 transition-transform cursor-pointer">
          <img 
            src={`https://i.pravatar.cc/150?u=${user?.id || 'admin'}`} 
            alt="User" 
            className="h-full w-full rounded-[0.5rem] object-cover" 
          />
        </div>
      </div>
    </header>
  );
};
