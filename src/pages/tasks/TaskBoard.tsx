import React, { useState } from 'react';
import { mockTasks, mockUsers } from '../../data/mockData';
import { Button } from '../../components/common/Button';
import { 
  Plus, 
  MoreHorizontal, 
  MessageSquare, 
  Paperclip, 
  Search, 
  Filter, 
  LayoutGrid, 
  List,
  CheckCircle2,
  Clock,
  Circle,
  MoreVertical,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, Reorder, AnimatePresence } from 'motion/react';

const columns = [
  { id: 'To Do', label: 'To Do', color: 'bg-slate-500' },
  { id: 'In Progress', label: 'In Progress', color: 'bg-brand-500' },
  { id: 'Review', label: 'Review', color: 'bg-purple-500' },
  { id: 'Completed', label: 'Completed', color: 'bg-emerald-500' },
];

export const TaskBoard: React.FC = () => {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [search, setSearch] = useState('');

  const filteredTasks = mockTasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight dark:text-white">Task Board</h1>
          <p className="mt-1 text-slate-500 font-medium">Manage and organize your team's workflow efficiently.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10">
                <button 
                  onClick={() => setView('kanban')}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-xs font-bold transition-all rounded-xl",
                    view === 'kanban' 
                      ? "bg-slate-900 text-white dark:bg-brand-600 shadow-lg" 
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  )}
                >
                    <LayoutGrid size={14} />
                    <span>Board</span>
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-xs font-bold transition-all rounded-xl",
                    view === 'list' 
                      ? "bg-slate-900 text-white dark:bg-brand-600 shadow-lg" 
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  )}
                >
                    <List size={14} />
                    <span>List</span>
                </button>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1 hidden sm:block" />
            <Button className="rounded-2xl px-6 font-bold shadow-xl shadow-brand-500/20 active:scale-95 transition-transform">
                <Plus size={18} className="mr-2" />
                Create Task
            </Button>
        </div>
      </div>

      {/* Filters & Team Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between bg-white/50 p-4 rounded-3xl border border-slate-100 dark:bg-white/5 dark:border-white/5 backdrop-blur-sm">
          <div className="relative flex-1 max-w-md">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
                type="text" 
                placeholder="Search tasks by name or tag..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-[1.25rem] border-none bg-slate-100/50 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-400 dark:bg-white/5 dark:text-white dark:focus:bg-white/10" 
             />
          </div>
          <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                  {mockUsers.map((u, i) => (
                      <div key={u.id} className="group relative">
                        <div className="h-10 w-10 rounded-2xl border-[3px] border-white overflow-hidden shadow-sm dark:border-zinc-900 transition-transform hover:-translate-y-1 hover:z-10">
                            <img src={u.avatar} alt={u.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {u.name}
                        </div>
                      </div>
                  ))}
                  <button className="flex h-10 w-10 items-center justify-center rounded-2xl border-[3px] border-white bg-slate-100 text-slate-500 hover:bg-slate-200 dark:border-zinc-900 dark:bg-white/5 dark:text-slate-400">
                    <UserPlus size={18} />
                  </button>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
              <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-white/5 dark:text-white dark:ring-white/10">
                 <Filter size={14} />
                 Filters
              </button>
          </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col min-w-[300px]">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("h-2.5 w-2.5 rounded-full ring-4 ring-opacity-20", column.color.replace('bg-', 'ring-'), column.color)} />
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">{column.label}</h3>
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-black dark:bg-white/5 dark:text-white/40">
                  {filteredTasks.filter(t => t.status === column.id).length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                 <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5">
                   <Plus size={18} />
                 </button>
                 <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5">
                   <MoreHorizontal size={18} />
                 </button>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {filteredTasks
                  .filter((task) => task.status === column.id)
                  .map((task, idx) => {
                    const assignee = mockUsers.find(u => u.id === task.assigneeId);
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.05 }}
                        key={task.id}
                        className="group relative flex flex-col rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-xl hover:shadow-brand-500/5 hover:ring-brand-500/30 dark:bg-zinc-900 dark:ring-white/5 dark:hover:ring-brand-500/40"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div className={cn(
                            "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-widest",
                            task.priority === 'High' ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400" :
                            task.priority === 'Medium' ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" :
                            "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          )}>
                             <Circle size={8} fill="currentColor" />
                            {task.priority}
                          </div>
                          <button className="rounded-lg p-1 text-slate-300 opacity-0 transition-opacity hover:bg-slate-50 group-hover:opacity-100 dark:hover:bg-white/5">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                        
                        <h4 className="mb-2 text-base font-bold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors dark:text-white dark:group-hover:text-brand-400">{task.title}</h4>
                        <p className="mb-6 text-sm font-medium leading-relaxed text-slate-500 line-clamp-2 dark:text-slate-400">{task.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 group-hover:scale-110 transition-transform overflow-hidden ring-1 ring-slate-100 dark:ring-white/10">
                               <img src={assignee?.avatar} alt="" className="h-full w-full object-cover" />
                             </div>
                             <div className="hidden sm:block">
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assignee</p>
                               <p className="text-xs font-bold text-slate-900 dark:text-white">{assignee?.name.split(' ')[0]}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-2.5 text-slate-400">
                             <div className="flex items-center gap-1 text-[10px] font-bold">
                               <MessageSquare size={14} className="text-slate-300" />
                               <span>{Math.floor(Math.random() * 5) + 1}</span>
                             </div>
                             <div className="flex items-center gap-1 text-[10px] font-bold">
                               <Paperclip size={14} className="text-slate-300" />
                               <span>{Math.floor(Math.random() * 3)}</span>
                             </div>
                          </div>
                        </div>

                        {/* Progress Bar for Card */}
                        <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-slate-50 dark:bg-white/5">
                           <div className={cn("h-full w-[45%] rounded-full", column.color)} />
                        </div>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
              
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 py-4 text-sm font-bold text-slate-400 transition-all hover:border-brand-500/50 hover:bg-brand-500/5 hover:text-brand-500 dark:border-white/5 dark:hover:border-brand-500/30">
                <Plus size={18} />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
