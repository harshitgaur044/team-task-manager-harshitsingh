import React from 'react';
import { 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ArrowUpRight,
  Zap,
  Calendar,
  Layers
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { cn } from '../../lib/utils';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { projects, tasks, users, activities } = useData();
  const navigate = useNavigate();

  const activeTasksCount = tasks.filter(t => t.status !== 'Completed').length;
  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'High' && t.status !== 'Completed');
  const completionRate = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-400/10', trend: 'Active workspace', progress: 100 },
    { label: 'Pending Tasks', value: activeTasksCount, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10', trend: `${highPriorityTasks.length} high priority`, progress: 65 },
    { label: 'Completed', value: completedTasksCount, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', trend: `${completionRate}% rate`, progress: completionRate },
    { label: 'Team Members', value: users.length, icon: Users, color: 'text-brand-400', bg: 'bg-brand-400/10', trend: 'Collaborating', progress: 100 },
  ];

  const chartData = [
    { name: 'Mon', tasks: 12 },
    { name: 'Tue', tasks: 19 },
    { name: 'Wed', tasks: 15 },
    { name: 'Thu', tasks: 22 },
    { name: 'Fri', tasks: 25 },
    { name: 'Sat', tasks: 10 },
    { name: 'Sun', tasks: 8 },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-brand-600 p-8 text-white lg:p-12 shadow-2xl shadow-brand-500/20"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-400/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Zap size={14} className="text-brand-300" fill="currentColor" />
              <span>Workspace Sync Active</span>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight lg:text-6xl">
              Hello, {user?.name.split(' ')[0]}!
            </h1>
            <p className="max-w-md text-lg text-brand-100/90 leading-relaxed font-medium">
              You have <span className="text-white font-black underline decoration-brand-300 underline-offset-4">{highPriorityTasks.length} high priority</span> tasks pending. Your completion rate is trending at <span className="font-black text-white">{completionRate}%</span>.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                onClick={() => navigate('/tasks')}
                variant="secondary" 
                className="bg-white text-brand-600 hover:bg-brand-50 hover:text-brand-700 font-black px-8 h-12 rounded-xl shadow-xl shadow-black/10 border-none transition-all active:scale-95"
              >
                Go to Tasks
              </Button>
              <Button 
                onClick={() => navigate('/analytics')}
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 hover:text-white font-black px-8 h-12 rounded-xl transition-all active:scale-95"
              >
                Analyze Progress
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 lg:flex lg:items-center lg:gap-6">
            <div className="glass group rounded-3xl border-white/10 bg-white/10 p-6 text-center backdrop-blur-md transition-all hover:bg-white/20 min-w-[140px]">
              <p className="text-4xl font-black">{projects.length}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-brand-200">Active Missions</p>
            </div>
            <div className="glass group rounded-3xl border-white/10 bg-white/10 p-6 text-center backdrop-blur-md transition-all hover:bg-white/20 min-w-[140px]">
              <p className="text-4xl font-black">{activeTasksCount}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-brand-200">Pending Actions</p>
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
            <Card className="group h-full !pb-0 ring-1 ring-slate-200 dark:ring-white/5 transition-all hover:shadow-xl hover:shadow-brand-500/5 dark:bg-dark-card dark:bg-gradient-to-br dark:from-dark-card dark:to-dark-bg border-none">
              <CardContent className="flex flex-col gap-4 p-7">
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-[1.25rem] ${stat.bg} ${stat.color} transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-sm border border-white/5`}>
                    <stat.icon size={22} />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted">
                    <TrendingUp size={12} className="text-emerald-500" />
                    <span>{stat.trend}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80">{stat.label}</p>
                  <p className="mt-1 text-3xl font-black tracking-tight text-slate-900 dark:text-text-primary">{stat.value}</p>
                </div>
              </CardContent>
              <div className="h-1.5 w-full bg-slate-50 dark:bg-white/5 border-t dark:border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className={cn("h-full shadow-[0_0_8px_rgba(0,0,0,0.1)]", stat.color.replace('text-', 'bg-'))}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 !p-0 dark:bg-dark-card border-none ring-1 ring-slate-200 dark:ring-white/5">
          <CardHeader className="flex flex-row items-center justify-between border-none p-8 pb-0">
            <div>
              <h3 className="text-2xl font-black tracking-tight dark:text-text-primary">Team Productivity</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-text-secondary opacity-70 font-display">Workspace output across all focus areas</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-24 items-center justify-center rounded-xl bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:bg-dark-elevated dark:text-text-primary ring-1 ring-slate-200 dark:ring-white/10">
                Last 7 Days
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[380px] p-8 pt-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.8)',
                    backgroundColor: '#1e293b',
                    padding: '16px'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 900 }}
                  labelStyle={{ fontSize: '13px', fontWeight: 900, color: '#8b5cf6', marginBottom: '4px', textTransform: 'uppercase' }}
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

        <Card className="flex flex-col !p-0 dark:bg-dark-card border-none ring-1 ring-slate-200 dark:ring-white/5">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black tracking-tight dark:text-text-primary">Critical Deadlines</h3>
              <Calendar size={20} className="text-brand-400" />
            </div>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-text-muted opacity-70">Immediate action required</p>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 overflow-y-auto px-8 pb-8 custom-scrollbar">
            {highPriorityTasks.length > 0 ? (
                highPriorityTasks.slice(0, 5).map((task) => (
                <motion.div 
                    whileHover={{ x: 5 }}
                    key={task.id} 
                    className="group relative flex items-center gap-4 rounded-[1.5rem] bg-slate-50 p-4 transition-all hover:bg-white hover:shadow-xl hover:shadow-brand-500/10 ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/5 dark:hover:bg-white/10 dark:ring-white/10"
                >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                    <Clock size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{task.title}</p>
                    <p className="mt-0.5 text-[10px] font-black uppercase text-slate-400 tracking-wider font-mono">{task.deadline}</p>
                    </div>
                    <ArrowUpRight size={18} className="shrink-0 text-slate-300 transition-colors group-hover:text-brand-500" />
                </motion.div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-50">
                    <CheckCircle2 size={48} className="text-emerald-500 mb-4" />
                    <p className="text-sm font-bold">All clear!</p>
                    <p className="text-xs">No high priority tasks pending.</p>
                </div>
            )}
          </CardContent>
          <div className="border-t border-slate-50 p-6 dark:border-white/5">
            <Button 
                onClick={() => navigate('/calendar')}
                variant="secondary" 
                className="w-full font-black uppercase tracking-widest text-[10px] text-slate-600 dark:text-slate-300 h-12 rounded-xl"
            >
                View Master Schedule
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
         <Card className="!p-8 dark:bg-dark-card border-none ring-1 ring-slate-200 dark:ring-white/5">
            <CardHeader className="flex flex-row items-center justify-between border-none p-0 mb-8">
              <div>
                <h3 className="text-2xl font-black tracking-tight dark:text-text-primary uppercase tracking-tighter">Active Missions</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-text-muted">Live project velocity</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 border dark:border-brand-500/20 shadow-lg shadow-brand-500/10">
                <Layers size={20} />
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-8">
                  {projects.filter(p => p.status === 'active').slice(0, 3).map(project => (
                    <div key={project.id} className="space-y-4">
                       <div className="flex justify-between items-end">
                          <div>
                            <span className="block text-base font-black dark:text-white leading-tight uppercase tracking-tight">{project.name}</span>
                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{project.team} Division</span>
                          </div>
                          <span className="text-xs font-black text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-2.5 py-1.5 rounded-xl ring-1 ring-brand-500/20">
                            {project.progress}%
                          </span>
                       </div>
                       <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5 p-1 ring-1 ring-slate-200 dark:ring-white/10">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-brand-500 to-purple-600 shadow-lg"
                          />
                       </div>
                    </div>
                  ))}
                </div>
            </CardContent>
         </Card>

         <Card className="!p-8 relative overflow-hidden group dark:bg-dark-card border-none ring-1 ring-slate-200 dark:ring-white/5">
            <CardHeader className="border-none p-0 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-text-primary uppercase tracking-tighter">Recent Activity</h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-text-secondary opacity-70">Pulse of the workspace</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-8 relative">
                   <div className="absolute left-6 top-2 bottom-8 w-0.5 bg-slate-100 dark:bg-white/5" />
                   {activities.length > 0 ? (
                       activities.slice(0, 4).map((item) => (
                        <div key={item.id} className="relative flex gap-6 group/item">
                           <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-slate-50 shadow-md transition-transform group-hover/item:scale-110 dark:border-zinc-900 dark:bg-zinc-800">
                             <img src={item.userAvatar} alt={item.userName} className="rounded-xl h-full w-full object-cover" />
                           </div>
                           <div className="flex-1 border-b border-slate-50 pb-4 last:border-none dark:border-white/5">
                              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                                <span className="font-black text-slate-950 dark:text-white">{item.userName}</span> {item.action} 
                                <span className="mx-1.5 inline-block h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                                <span className="font-black text-brand-600 dark:text-brand-400 uppercase tracking-tight">{item.target}</span>
                              </p>
                              <p className="mt-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                           </div>
                        </div>
                      ))
                   ) : (
                       <div className="text-center py-10 opacity-50">
                           <p className="text-sm font-bold">No activity yet.</p>
                       </div>
                   )}
                </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
};
