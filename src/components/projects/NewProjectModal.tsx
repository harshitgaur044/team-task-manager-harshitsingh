import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Calendar as CalendarIcon, Users, Tag, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../common/Button';
import { useData } from '../../context/DataContext';
import { cn } from '../../lib/utils';

const projectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  team: z.string().min(1, 'Team is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  status: z.enum(['active', 'completed', 'on-hold']),
  priority: z.enum(['Low', 'Medium', 'High']),
  members: z.array(z.string()).min(1, 'At least one member is required'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose }) => {
  const { addProject, users } = useData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: 'active',
      priority: 'Medium',
      members: [],
    }
  });

  const selectedMembers = watch('members');

  const onSubmit = (data: ProjectFormData) => {
    addProject({
      ...data,
      progress: 0,
    });
    reset();
    onClose();
  };

  const toggleMember = (userId: string) => {
    const current = [...selectedMembers];
    const index = current.indexOf(userId);
    if (index > -1) {
      setValue('members', current.filter(id => id !== userId));
    } else {
      setValue('members', [...current, userId]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl dark:bg-dark-elevated border-none ring-1 ring-slate-200 dark:ring-white/10"
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-8 dark:border-dark-border">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-text-primary uppercase tracking-tighter">Create New Project</h2>
                <p className="mt-1 text-sm font-medium text-slate-400 dark:text-text-secondary opacity-70">Launch a new mission for your team.</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-900 dark:text-text-muted dark:hover:bg-white/5 dark:hover:text-text-primary"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                {/* Project Name */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Project Identity</label>
                  <input
                    {...register('name')}
                    placeholder="e.g. Hyperion Dashboard"
                    className="h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg"
                  />
                  {errors.name && <p className="text-[10px] font-bold text-red-500">{errors.name.message}</p>}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Mission Description</label>
                  <textarea
                    {...register('description')}
                    placeholder="Briefly explain the goals and scope..."
                    className="min-h-[100px] w-full rounded-2xl bg-slate-50 p-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg"
                  />
                  {errors.description && <p className="text-[10px] font-bold text-red-500">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Team */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Functional Team</label>
                    <div className="relative">
                      <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        {...register('team')}
                        placeholder="e.g. Product"
                        className="h-12 w-full rounded-2xl bg-slate-50 pl-11 pr-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg"
                      />
                    </div>
                    {errors.team && <p className="text-[10px] font-bold text-red-500">{errors.team.message}</p>}
                  </div>

                  {/* Deadline */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Target Deadline</label>
                    <div className="relative">
                      <CalendarIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="date"
                        {...register('deadline')}
                        className="h-12 w-full rounded-2xl bg-slate-50 pl-11 pr-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg"
                      />
                    </div>
                    {errors.deadline && <p className="text-[10px] font-bold text-red-500">{errors.deadline.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                   {/* Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Initial Status</label>
                    <select
                        {...register('status')}
                        className="h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg"
                    >
                        <option value="active">Active</option>
                        <option value="on-hold">On Hold</option>
                        <option value="completed">Completed</option>
                    </select>
                  </div>

                   {/* Priority */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Strategic Priority</label>
                    <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-1 dark:bg-dark-secondary border dark:border-white/5">
                        {['Low', 'Medium', 'High'].map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setValue('priority', p as any)}
                                className={cn(
                                    "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                                    watch('priority') === p 
                                        ? "bg-white text-brand-600 shadow-sm dark:bg-dark-elevated dark:text-text-primary border dark:border-white/10" 
                                        : "text-slate-400 hover:text-slate-600 dark:text-text-muted"
                                )}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-3 font-display">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Assign Squad Members</label>
                    <span className="text-[10px] font-bold text-brand-500 dark:text-brand-400 uppercase tracking-widest">{selectedMembers.length} Selected</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {users.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => toggleMember(user.id)}
                        className={cn(
                          "group relative flex flex-col items-center gap-2 rounded-2xl p-3 transition-all border",
                          selectedMembers.includes(user.id)
                            ? "bg-brand-50 ring-2 ring-brand-500 dark:bg-brand-500/10 dark:ring-brand-500/50 border-brand-500/20"
                            : "bg-slate-50 hover:bg-slate-100 dark:bg-dark-secondary dark:hover:bg-dark-secondary/80 border-transparent dark:border-white/5"
                        )}
                      >
                        <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full border-2 border-white dark:border-dark-border" />
                        <span className="text-[10px] font-bold text-slate-900 truncate w-full text-center dark:text-text-primary uppercase tracking-tight">{user.name.split(' ')[0]}</span>
                        {selectedMembers.includes(user.id) && (
                          <div className="absolute top-1 right-1 h-3 w-3 rounded-full bg-brand-500 ring-2 ring-white dark:ring-dark-elevated shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.members && <p className="text-[10px] font-bold text-red-500">{errors.members.message}</p>}
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={onClose} 
                    className="flex-1 rounded-2xl font-bold h-14"
                >
                  Cancel
                </Button>
                <Button 
                    type="submit" 
                    className="flex-[2] rounded-2xl font-bold h-14 shadow-xl shadow-brand-500/20 active:scale-[0.98] transition-transform"
                >
                  Create Project
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
