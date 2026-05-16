import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Briefcase, CheckSquare, Users, X, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockProjects, mockTasks } from '../../data/mockData';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const filteredProjects = mockProjects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredTasks = mockTasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      >
        <div className="flex min-h-screen items-start justify-center pt-[15vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center border-b border-slate-100 p-6 dark:border-white/5">
              <Search className="mr-3 text-slate-400" size={20} />
              <input
                autoFocus
                placeholder="Search projects, tasks, or members..."
                className="w-full bg-transparent text-lg font-medium outline-none dark:text-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-400 dark:bg-white/5">
                <span className="text-xs">ESC</span>
                <span className="text-[10px]">TO CLOSE</span>
              </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-4 custom-scrollbar">
              {query === '' && (
                <div className="mb-4 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Quick Actions
                </div>
              )}

              <div className="space-y-1">
                {filteredProjects.length > 0 && (
                  <>
                    <div className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Projects
                    </div>
                    {filteredProjects.slice(0, 5).map((project) => (
                      <button
                        key={project.id}
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
                        onClick={() => {
                          navigate(`/projects/${project.id}`);
                          setIsOpen(false);
                        }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10">
                          <Briefcase size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold dark:text-white">{project.name}</p>
                          <p className="text-xs font-medium text-slate-500">{project.team} Team</p>
                        </div>
                      </button>
                    ))}
                  </>
                )}

                {filteredTasks.length > 0 && (
                  <>
                    <div className="mt-4 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Tasks
                    </div>
                    {filteredTasks.slice(0, 5).map((task) => (
                      <button
                        key={task.id}
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
                        onClick={() => {
                          navigate(`/tasks/${task.id}`);
                          setIsOpen(false);
                        }}
                      >
                         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10">
                          <CheckSquare size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold dark:text-white">{task.title}</p>
                          <p className="text-xs font-medium text-slate-500">Priority: {task.priority}</p>
                        </div>
                      </button>
                    ))}
                  </>
                )}
                
                {filteredProjects.length === 0 && filteredTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 rounded-full bg-slate-50 p-4 dark:bg-white/5">
                      <Search className="text-slate-300" size={32} />
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">No results found</p>
                    <p className="text-xs font-medium text-slate-500">We couldn't find anything matching "{query}"</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-4 px-6 dark:border-white/5 dark:bg-white/5">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                   <kbd className="rounded bg-white px-1 shadow-sm ring-1 ring-slate-200 dark:bg-white/10 dark:ring-white/10">↑↓</kbd>
                   <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                   <kbd className="rounded bg-white px-1 shadow-sm ring-1 ring-slate-200 dark:bg-white/10 dark:ring-white/10">↵</kbd>
                   <span>Select</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Command size={12} />
                <span>TaskFlow Command Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
