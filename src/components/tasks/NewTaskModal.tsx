import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Calendar as CalendarIcon, User, Flag, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../common/Button';
import { useData } from '../../context/DataContext';
import { cn } from '../../lib/utils';
import { Task } from '../../types';

const taskSchema = z.object({
  title: z.string().min(3, 'Title is too short'),
  description: z.string().min(5, 'Description is too short'),
  status: z.enum(['To Do', 'In Progress', 'Review', 'Completed']),
  priority: z.enum(['Low', 'Medium', 'High']),
  projectId: z.string().min(1, 'Project is required'),
  assigneeId: z.string().min(1, 'Assignee is required'),
  deadline: z.string().min(1, 'Deadline is required'),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStatus?: Task['status'];
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose, defaultStatus = 'To Do' }) => {
  const { addTask, users, projects } = useData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: defaultStatus,
      priority: 'Medium',
    }
  });

  const onSubmit = (data: TaskFormData) => {
    addTask(data);
    reset();
    onClose();
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
            className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl dark:bg-dark-elevated border-none ring-1 ring-slate-200 dark:ring-white/10"
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-8 dark:border-dark-border">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-text-primary uppercase tracking-tighter">Create New Task</h2>
                <p className="mt-1 text-sm font-medium text-slate-400 dark:text-text-secondary opacity-70">Define the objective and assign it.</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-900 dark:text-text-muted dark:hover:bg-white/5 dark:hover:text-text-primary"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
              <div className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Task Title</label>
                  <input
                    {...register('title')}
                    placeholder="e.g. Design Login Flow"
                    className="h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg"
                  />
                  {errors.title && <p className="text-[10px] font-bold text-red-500">{errors.title.message}</p>}
                </div>

                {/* Project */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Select Project</label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      {...register('projectId')}
                      className="h-12 w-full rounded-2xl bg-slate-50 pl-11 pr-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg appearance-none"
                    >
                      <option value="">Select a project...</option>
                      {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  {errors.projectId && <p className="text-[10px] font-bold text-red-500">{errors.projectId.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Status</label>
                    <select
                      {...register('status')}
                      className="h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Priority</label>
                    <select
                      {...register('priority')}
                      className="h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Assignee */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Assignee</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        {...register('assigneeId')}
                        className="h-12 w-full rounded-2xl bg-slate-50 pl-11 pr-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg appearance-none"
                      >
                         <option value="">Select member...</option>
                        {users.map(u => (
                          <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Deadline</label>
                    <div className="relative">
                      <CalendarIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="date"
                        {...register('deadline')}
                        className="h-12 w-full rounded-2xl bg-slate-50 pl-11 pr-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">Briefing</label>
                  <textarea
                    {...register('description')}
                    placeholder="Details about the task expectations..."
                    className="min-h-[80px] w-full rounded-2xl bg-slate-50 p-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={onClose} 
                    className="flex-1 rounded-2xl h-14"
                >
                  Cancel
                </Button>
                <Button 
                    type="submit" 
                    className="flex-[2] rounded-2xl h-14 shadow-xl shadow-brand-500/20"
                >
                  Create Task
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
