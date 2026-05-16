import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Plus, 
  MoreHorizontal, 
  Calendar as CalendarIcon, 
  Search, 
  Filter,
  Trophy,
  Activity,
  Briefcase
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { NewProjectModal } from '../../components/projects/NewProjectModal';

export const ProjectList: React.FC = () => {
  const { projects, users } = useData();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-10">
      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Page Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight dark:text-white">Workspace Projects</h1>
          <p className="mt-1 text-slate-500 font-medium">Track progress and collaborate on all your team initiatives.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="h-12 rounded-2xl px-8 font-bold shadow-xl shadow-brand-500/20 transition-all active:scale-95"
        >
          <Plus size={20} className="mr-2" />
          Create New Project
        </Button>
      </div>

       {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Active Projects', value: projects.filter(p => p.status === 'active').length, icon: Activity, color: 'text-brand-400', bg: 'bg-brand-400/10' },
           { label: 'Completed', value: projects.filter(p => p.status === 'completed').length, icon: Trophy, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
           { label: 'Team Members', value: users.length, icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-400/10' },
         ].map((stat, i) => (
           <Card key={i} className="!p-6 border-none ring-1 ring-slate-200 dark:ring-white/10 bg-white/50 dark:bg-dark-card/50 backdrop-blur-md shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                 <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color} border dark:border-white/5`}>
                    <stat.icon size={22} />
                 </div>
                 <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-text-primary">{stat.value}</p>
                 </div>
              </div>
           </Card>
         ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-text-muted" />
             <input 
                type="text" 
                placeholder="Find a project..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-2xl border-none bg-white shadow-sm ring-1 ring-slate-200 text-sm font-medium focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-400 dark:bg-dark-secondary dark:text-text-primary dark:ring-white/10 dark:placeholder:text-text-placeholder" 
             />
          </div>
          <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-dark-elevated dark:text-text-primary dark:ring-white/10 border dark:border-white/5">
                 <Filter size={16} />
                 All Teams
              </button>
          </div>
      </div>

      {/* Project Grid */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={project.id}
            >
              <Card className="group relative overflow-hidden h-full flex flex-col border-none ring-1 ring-slate-200 transition-all hover:shadow-2xl hover:shadow-brand-500/10 hover:ring-brand-500/30 dark:bg-dark-card dark:ring-white/10 dark:hover:ring-brand-500/20">
                <div className="absolute -right-4 -top-4 text-slate-50 transition-colors group-hover:text-brand-50/50 dark:text-white/5 dark:group-hover:text-brand-500/10 opacity-30">
                  <Briefcase size={120} strokeWidth={1} />
                </div>

                <CardContent className="relative z-10 p-0 flex flex-col h-full uppercase-text-labels">
                  <div className="p-8 pb-4">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-widest",
                          project.status === 'active' ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400" :
                          project.status === 'completed' ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" :
                          "bg-slate-50 text-slate-600 dark:bg-white/10 dark:text-text-muted"
                        )}>
                          {project.status}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-text-placeholder">
                          {project.team} Team
                        </span>
                      </div>
                      <button className="rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-text-muted dark:hover:bg-white/5 dark:hover:text-text-primary">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                    
                    <h3 className="mb-2 text-2xl font-black tracking-tight text-slate-900 dark:text-text-primary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-all leading-tight uppercase tracking-tighter">
                      {project.name}
                    </h3>
                    <p className="mb-8 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500 dark:text-text-secondary opacity-80">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto p-8 pt-0">
                    <div className="mb-6">
                       <div className="flex justify-between items-end mb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted">Progress</span>
                          <span className="text-sm font-black text-slate-900 dark:text-text-primary">{project.progress}%</span>
                       </div>
                       <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5 p-1 ring-1 ring-slate-200 dark:ring-white/10">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={cn(
                              "h-full rounded-full transition-all shadow-[0_0_10px_rgba(0,0,0,0.1)] shadow-brand-500/20",
                              project.progress === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-brand-600 to-indigo-600"
                            )}
                          />
                       </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-3">
                        {project.members.slice(0, 4).map((memberId) => {
                          const member = users.find(u => u.id === memberId);
                          return (
                            <div key={memberId} className="h-10 w-10 overflow-hidden rounded-2xl border-[3px] border-white ring-1 ring-slate-100 bg-slate-200 dark:border-dark-card dark:ring-white/5">
                              <img src={member?.avatar} alt={member?.name} className="h-full w-full object-cover" />
                            </div>
                          );
                        })}
                        {project.members.length > 4 && (
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border-[3px] border-white bg-slate-100 text-[10px] font-black text-slate-500 ring-1 ring-slate-100 dark:border-dark-card dark:bg-dark-secondary dark:text-text-muted dark:ring-white/5 tracking-tighter shadow-sm border dark:border-white/5">
                            +{project.members.length - 4}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted">
                          <CalendarIcon size={14} className="text-brand-500" />
                          <span>{project.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="group relative flex min-h-[350px] flex-col items-center justify-center rounded-[2rem] border-[3px] border-dashed border-slate-200 p-8 text-slate-400 transition-all hover:border-brand-500 hover:bg-brand-50/50 hover:text-brand-600 dark:border-white/5 dark:hover:bg-brand-500/5 dark:hover:text-brand-400"
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-50 transition-colors group-hover:bg-brand-100 dark:bg-white/5 dark:group-hover:bg-brand-500/10">
            <Plus size={32} />
          </div>
          <p className="text-xl font-black tracking-tight">Initiate Project</p>
          <p className="mt-2 text-center text-sm font-medium text-slate-400 group-hover:text-slate-500 max-w-[180px]">Start a new collaborative workspace for your team.</p>
        </motion.button>
      </div>
    </div>
  );
};
