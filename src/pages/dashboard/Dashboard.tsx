import React from 'react';
import { 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ArrowUpRight,
  Zap,
  TrendingDown,
  Calendar
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { cn } from '../../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { mockProjects, mockTasks, mockUsers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';

const stats = [
  { label: 'Total Projects', value: mockProjects.length, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '+2 this week' },
  { label: 'Active Tasks', value: mockTasks.filter(t => t.status !== 'Completed').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', trend: '4 due soon' },
  { label: 'Completed', value: mockTasks.filter(t => t.status === 'Completed').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', trend: '86% rate' },
  { label: 'Team Members', value: mockUsers.length, icon: Users, color: 'text-brand-500', bg: 'bg-brand-500/10', trend: 'Active now' },
];

const chartData = [
  { name: 'Mon', tasks: 12 },
  { name: 'Tue', tasks: 19 },
  { name: 'Wed', tasks: 15 },
  { name: 'Thu', tasks: 22 },
  { name: 'Fri', tasks: 30 },
  { name: 'Sat', tasks: 10 },
  { name: 'Sun', tasks: 8 },
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const completedRate = Math.round((mockTasks.filter(t => t.status === 'Completed').length / mockTasks.length) * 100);

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] bg-brand-600 p-8 text-white lg:p-12 shadow-2xl shadow-brand-500/20"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-400/30 blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Zap size={14} className="text-brand-300" fill="currentColor" />
              <span>Workspace Activity</span>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight lg:text-6xl">
              Hello, {user?.name.split(' ')[0]}!
            </h1>
            <p className="max-w-md text-lg text-brand-100/90 leading-relaxed">
              Workspace productivity is up <span className="font-bold text-white uppercase">12%</span> today. There are <span className="text-white font-bold underline decoration-brand-300 underline-offset-4">4 high priority</span> tasks pending your review.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="secondary" className="bg-white text-brand-600 hover:bg-brand-50 hover:text-brand-700 font-bold px-8 h-12 rounded-xl shadow-xl shadow-black/10 border-none transition-all active:scale-95">
                Go to Tasks
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white font-bold px-8 h-12 rounded-xl transition-all active:scale-95">
                Analyze Projects
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 lg:flex lg:items-center lg:gap-6">
            <div className="glass group rounded-3xl border-white/10 bg-white/10 p-6 text-center backdrop-blur-md transition-all hover:bg-white/20">
              <p className="text-4xl font-black">{mockProjects.length}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-brand-200">Active projects</p>
            </div>
            <div className="glass group rounded-3xl border-white/10 bg-white/10 p-6 text-center backdrop-blur-md transition-all hover:bg-white/20">
              <p className="text-4xl font-black">{mockTasks.filter(t => t.status !== 'Completed').length}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-brand-200">Pending tasks</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <Card className="group h-full !pb-0 ring-1 ring-slate-200 dark:ring-white/5 transition-all hover:shadow-xl hover:shadow-brand-500/5">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-[1.25rem] ${stat.bg} ${stat.color} transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                    <stat.icon size={22} />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <TrendingUp size={12} className="text-emerald-500" />
                    <span>{stat.trend}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-3xl font-black tracking-tight text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              </CardContent>
              <div className="h-1.5 w-full bg-slate-50 dark:bg-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className={cn("h-full", stat.color.replace('text-', 'bg-'))}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 !p-0">
          <CardHeader className="flex flex-row items-center justify-between border-none p-8 pb-0">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Team Productivity</h3>
              <p className="text-sm font-medium text-slate-500">Workspace output across all active projects</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-24 items-center justify-center rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/5 dark:text-slate-300">
                Last 7 Days
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[380px] p-8 pt-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226,232,240,0.4)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} 
                />
                <Tooltip 
                  cursor={{ stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '5 5' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
                    backgroundColor: '#0f172a',
                    padding: '12px 16px'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}
                  labelStyle={{ fontSize: '14px', fontWeight: 800, color: '#8b5cf6', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="tasks" 
                  stroke="#8b5cf6" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorTasks)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col !p-0">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Upcoming</h3>
              <Calendar size={20} className="text-brand-500" />
            </div>
            <p className="mt-1 text-sm font-medium text-slate-500">Critical deadlines coming up</p>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 overflow-y-auto px-8 pb-8">
            {mockTasks.filter(t => t.priority === 'High').slice(0, 5).map((task) => (
              <motion.div 
                whileHover={{ x: 5 }}
                key={task.id} 
                className="group relative flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition-all hover:border-brand-200 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-brand-500/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                  <Clock size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{task.title}</p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-400">{task.deadline}</p>
                </div>
                <ArrowUpRight size={18} className="shrink-0 text-slate-300 transition-colors group-hover:text-brand-500" />
              </motion.div>
            ))}
          </CardContent>
          <div className="border-t border-slate-50 p-6 dark:border-white/5">
            <Button variant="secondary" className="w-full font-bold text-slate-600 dark:text-slate-300">View All Schedule</Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
         <Card className="!p-8">
            <CardHeader className="flex flex-row items-center justify-between border-none p-0 mb-8">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Milestones</h3>
                <p className="text-sm font-medium text-slate-500">Project completion highlights</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                <TrendingUp size={20} />
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-8">
                  {mockProjects.filter(p => p.status === 'active').slice(0, 3).map(project => (
                    <div key={project.id} className="space-y-4">
                       <div className="flex justify-between items-end">
                          <div>
                            <span className="block text-base font-bold dark:text-white">{project.name}</span>
                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{project.team} Division</span>
                          </div>
                          <span className="text-sm font-black text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-2 py-1 rounded-lg">
                            {project.progress}%
                          </span>
                       </div>
                       <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-brand-500 to-purple-600 shadow-[0_4px_12px_rgba(139,92,246,0.25)]"
                          />
                       </div>
                    </div>
                  ))}
                </div>
            </CardContent>
         </Card>

         <Card className="!p-8 relative overflow-hidden group">
            <CardHeader className="border-none p-0 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Activity</h3>
                  <p className="text-sm font-medium text-slate-500">What's happening in the workspace</p>
                </div>
                <Users size={24} className="text-slate-300 group-hover:text-brand-500 transition-colors" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-8 relative">
                   <div className="absolute left-6 top-2 bottom-8 w-0.5 bg-slate-100 dark:bg-white/5" />
                   {[
                     { user: 'Sarah Chen', action: 'merged', target: 'Auth Flow', time: 'Just now', color: 'bg-indigo-500', avatar: 'https://i.pravatar.cc/150?u=1' },
                     { user: 'Mike Ross', action: 'reviewed', target: 'Sprint #12', time: '12m ago', color: 'bg-emerald-500', avatar: 'https://i.pravatar.cc/150?u=2' },
                     { user: 'Emily Zhao', action: 'assigned', target: 'UI Kit', time: '1h ago', color: 'bg-brand-500', avatar: 'https://i.pravatar.cc/150?u=3' },
                   ].map((item, idx) => (
                     <div key={idx} className="relative flex gap-6 group/item">
                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-slate-50 shadow-sm transition-transform group-hover/item:scale-110 dark:border-dark-card dark:bg-zinc-800">
                          <img src={item.avatar} alt={item.user} className="rounded-xl h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 border-b border-slate-50 pb-4 last:border-none dark:border-white/5">
                           <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                             <span className="font-extrabold text-slate-950 dark:text-white">{item.user}</span> {item.action} 
                             <span className="mx-1.5 inline-block h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                             <span className="font-bold text-brand-600 dark:text-brand-400">{item.target}</span>
                           </p>
                           <p className="mt-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">{item.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
};
