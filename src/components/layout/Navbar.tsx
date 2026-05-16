import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Moon, Sun, X, ArrowRight, Zap, Target, Users as UsersIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { notifications, projects, tasks, users, markNotificationAsRead } = useData();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredResults = searchQuery.length > 1 ? {
    projects: projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3),
    tasks: tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5),
    users: users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3),
  } : null;

  const hasResults = filteredResults && (
    filteredResults.projects.length > 0 || 
    filteredResults.tasks.length > 0 || 
    filteredResults.users.length > 0
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchBox(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = (type: string, id: string) => {
    setSearchQuery('');
    setShowSearchBox(false);
    if (type === 'project') navigate(`/projects/${id}`);
    if (type === 'task') navigate(`/tasks`);
    if (type === 'user') navigate(`/team`);
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-slate-50/80 px-10 border-b border-transparent backdrop-blur-md dark:bg-dark-bg/80 dark:border-dark-border">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-xs font-bold shadow-sm ring-1 ring-slate-200 dark:bg-dark-secondary/50 dark:text-text-primary dark:ring-white/10 border dark:border-white/5">
          <span className="text-slate-400 dark:text-text-muted uppercase tracking-widest text-[9px]">Workspace</span>
          <span className="text-slate-300 dark:text-text-placeholder">/</span>
          <span className="text-slate-900 dark:text-text-primary uppercase tracking-widest text-[9px]">Mission Control</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block" ref={searchRef}>
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 peer-focus:text-brand-500">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search missions, tasks, people..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchBox(true);
              }}
              onFocus={() => setShowSearchBox(true)}
              className="peer h-10 w-64 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:outline-none dark:border-dark-border dark:bg-dark-secondary dark:text-text-primary lg:w-80"
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <kbd className="hidden rounded-lg bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-white/10 dark:text-slate-400 lg:block uppercase">⌘K</kbd>
            </div>
          </div>

          <AnimatePresence>
            {showSearchBox && searchQuery.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute left-0 right-0 mt-3 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl dark:border-dark-border dark:bg-dark-elevated backdrop-blur-3xl"
              >
                {hasResults ? (
                  <div className="p-2 space-y-2">
                    {filteredResults!.projects.length > 0 && (
                      <div>
                        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Projects</div>
                        {filteredResults!.projects.map(p => (
                          <button 
                            key={p.id}
                            onClick={() => handleSearchClick('project', p.id)}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-500 dark:bg-blue-500/10">
                              <Zap size={14} />
                            </div>
                            <span className="text-sm font-bold truncate dark:text-white uppercase tracking-tight">{p.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {filteredResults!.tasks.length > 0 && (
                      <div>
                        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Tasks</div>
                        {filteredResults!.tasks.map(t => (
                          <button 
                            key={t.id}
                            onClick={() => handleSearchClick('task', t.id)}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                              <Target size={14} />
                            </div>
                            <span className="text-sm font-bold truncate dark:text-white uppercase tracking-tight">{t.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {filteredResults!.users.length > 0 && (
                      <div>
                        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Team</div>
                        {filteredResults!.users.map(u => (
                          <button 
                            key={u.id}
                            onClick={() => handleSearchClick('user', u.id)}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                          >
                            <img src={u.avatar} className="h-8 w-8 rounded-lg object-cover" alt="" />
                            <span className="text-sm font-bold truncate dark:text-white uppercase tracking-tight">{u.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No signals found for "{searchQuery}"</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />

        <button
          onClick={toggleTheme}
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10 dark:hover:bg-white/10"
        >
          {theme === 'light' ? (
            <Moon size={18} />
          ) : (
            <Sun size={18} />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10 dark:hover:bg-white/10"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-black text-white shadow-lg shadow-brand-500/40">
                {unreadCount}
              </span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-96 origin-top-right overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-dark-border dark:bg-dark-elevated backdrop-blur-3xl"
              >
                <div className="flex items-center justify-between border-b border-slate-50 p-6 dark:border-dark-border">
                  <h3 className="text-[11px] font-black tracking-widest dark:text-text-primary uppercase">Neural Pulse</h3>
                  <button className="text-[10px] font-black text-brand-600 hover:text-brand-500 dark:text-brand-400 uppercase tracking-widest">Acknowledge All</button>
                </div>
                <div className="max-h-[400px] overflow-y-auto p-3 space-y-1 custom-scrollbar">
                  {notifications.length > 0 ? (
                    notifications.map(n => (
                      <button 
                        key={n.id} 
                        onClick={() => markNotificationAsRead(n.id)}
                        className={cn(
                          "flex w-full items-start gap-4 rounded-2xl p-4 text-left transition-all hover:bg-slate-50 dark:hover:bg-white/5",
                          !n.read && "bg-brand-50/30 dark:bg-brand-500/5 ring-1 ring-brand-500/10"
                        )}
                      >
                        <div className={cn("mt-1 flex h-2 w-2 shrink-0 rounded-full", !n.read ? "bg-brand-500 shadow-[0_0_8px_#8b5cf6]" : "bg-slate-200 dark:bg-slate-700")} />
                        <div>
                          <p className="text-sm font-black tracking-tight dark:text-text-primary uppercase">{n.title}</p>
                          <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500 dark:text-text-secondary tracking-tight">{n.message}</p>
                          <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted font-mono">{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-sm font-bold text-slate-400 dark:text-text-muted uppercase tracking-widest opacity-50">Pulse flat line. No signals.</p>
                    </div>
                  )}
                </div>
                <div className="border-t border-slate-50 p-4 dark:border-dark-border">
                  <button className="w-full rounded-xl py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-text-muted hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Archive Access</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-brand-600 p-0.5 shadow-lg shadow-brand-500/20 active:scale-95 transition-transform cursor-pointer border border-brand-500/10">
          <img 
            src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.id || 'admin'}`} 
            alt="User" 
            className="h-full w-full rounded-[0.5rem] object-cover" 
          />
        </div>
      </div>
    </header>
  );
};
