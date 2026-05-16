import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Target, 
  Users, 
  Activity, 
  BrainCircuit,
  Download,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { useData } from '../../context/DataContext';

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

export const AnalyticsPage: React.FC = () => {
  const { tasks, projects, users } = useData();

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  
  // Fake velocity/cycle time for now but derived from real counts
  const avgVelocity = (completedTasks / 7).toFixed(1);
  const cycleTime = (4.5 - (completedTasks / tasks.length)).toFixed(1);

  const stats = [
    { label: 'Avg. Velocity', value: avgVelocity, trend: '+4%', sub: 'tasks/day', icon: Zap, color: 'text-brand-500', bg: 'bg-brand-500/10' },
    { label: 'Completion Rate', value: `${completionRate}%`, trend: '+2.1%', sub: 'success', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Active Members', value: users.length.toString(), trend: 'Stable', sub: 'capacity', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Cycle Time', value: `${cycleTime}d`, trend: '-12%', sub: 'faster', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  const performanceData = [
    { name: 'Mon', completed: 12, planned: 15 },
    { name: 'Tue', completed: 18, planned: 17 },
    { name: 'Wed', completed: 15, planned: 15 },
    { name: 'Thu', completed: 22, planned: 20 },
    { name: 'Fri', completed: 25, planned: 22 },
    { name: 'Sat', completed: 10, planned: 12 },
    { name: 'Sun', completed: completedTasks % 10, planned: 10 },
  ];

  const categoryDistribution = [
    { name: 'High Priority', value: tasks.filter(t => t.priority === 'High').length },
    { name: 'Medium Priority', value: tasks.filter(t => t.priority === 'Medium').length },
    { name: 'Low Priority', value: tasks.filter(t => t.priority === 'Low').length },
  ];

  const teamPerformance = projects.slice(0, 4).map(p => ({
     name: p.name.split(' ')[0],
     tasks: tasks.filter(t => t.projectId === p.id).length,
     velocity: Math.floor(Math.random() * 20) + 5
  }));

  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight dark:text-white uppercase tracking-tight">Project Analytics</h1>
          <p className="mt-1 text-slate-500 font-medium">Real-time analytical depth across your entire project portfolio.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-white/5 dark:text-white dark:ring-white/10">
               <Calendar size={16} />
               Last 30 Days
            </button>
            <Button className="rounded-2xl font-black uppercase tracking-widest text-[10px] h-11 px-6 shadow-xl shadow-brand-500/10">
               <Download size={16} className="mr-2" />
               Export
            </Button>
        </div>
      </div>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
           <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
             <Card className="!p-7 border-none ring-1 ring-slate-200 transition-all hover:shadow-2xl hover:shadow-brand-500/5 dark:bg-zinc-900 border-none dark:ring-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-5">
                   <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.bg} ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                      <stat.icon size={20} />
                   </div>
                   <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg", stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400')}>
                      {stat.trend}
                   </span>
                </div>
                <div className="flex items-baseline gap-2">
                   <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</h2>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.sub}</span>
                </div>
                <p className="mt-1 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
             </Card>
           </motion.div>
         ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Chart */}
        <Card className="lg:col-span-2 !p-0 overflow-hidden border-none ring-1 ring-slate-100 dark:bg-zinc-900 dark:ring-white/5">
          <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between border-none">
            <div>
              <h3 className="text-2xl font-black tracking-tight dark:text-white">Performance Analytics</h3>
              <p className="text-sm font-medium text-slate-500">Comparing actual completion vs planned estimates</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10">
                <TrendingUp size={22} className="text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="h-[400px] p-8 pt-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226,232,240,0.4)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} />
                <Tooltip 
                   contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
                    backgroundColor: '#0f172a',
                    padding: '16px'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 900 }}
                  labelStyle={{ fontSize: '13px', fontWeight: 900, color: '#8b5cf6', marginBottom: '4px', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="completed" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorPerf)" strokeWidth={4} animationDuration={2000} />
                <Area type="monotone" dataKey="planned" stroke="#cbd5e1" fill="none" strokeDasharray="8 8" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insight Card */}
        <Card className="flex flex-col border-none ring-1 ring-slate-100 bg-gradient-to-br from-brand-600 to-indigo-700 text-white shadow-2xl shadow-brand-500/20 rounded-[2.5rem]">
          <CardHeader className="!p-9">
            <div className="flex items-center gap-3 mb-5">
               <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md ring-1 ring-white/10">
                   <BrainCircuit size={24} className="text-brand-100" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-200">AI Performance Assistant</span>
            </div>
            <h3 className="text-3xl font-black leading-tight tracking-tight uppercase">Performance Insight</h3>
          </CardHeader>
          <CardContent className="flex-1 px-9 pb-9 space-y-7">
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner">
               <p className="text-base font-bold text-white leading-relaxed italic">
                  "Current trends show a <span className="text-brand-300 font-black">{completionRate}%</span> completion efficiency. Data analysis suggests focusing on high-priority tasks to reach your <span className="text-emerald-300 font-black">95%</span> goal."
               </p>
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-brand-200">
                  <span>Confidence Level</span>
                  <span className="text-white">96.4%</span>
               </div>
               <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
                  <motion.div initial={{ width: 0 }} animate={{ width: '96%' }} transition={{ duration: 1.5 }} className="h-full bg-brand-300 rounded-full shadow-[0_0_8px_white]" />
               </div>
            </div>
          </CardContent>
          <div className="p-9 pt-0">
             <Button variant="secondary" className="w-full h-14 rounded-2xl bg-white text-brand-600 hover:bg-brand-50 font-black uppercase tracking-[0.1em] text-xs border-none shadow-xl shadow-black/10 transition-all active:scale-95">
                Optimize Workflow
             </Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
         {/* Allocation Chart */}
         <Card className="!p-9 border-none ring-1 ring-slate-100 dark:bg-zinc-900 border-none dark:ring-white/5 shadow-sm">
            <CardHeader className="p-0 border-none mb-10">
               <h3 className="text-2xl font-black tracking-tight dark:text-white uppercase">Effort Distribution</h3>
               <p className="text-sm font-medium text-slate-500">Resource spread across strategic task priorities</p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col md:flex-row gap-10 items-center">
               <div className="h-[260px] w-full md:w-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={10}
                        dataKey="value"
                        animationDuration={1500}
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                            borderRadius: '16px', 
                            border: 'none', 
                            backgroundColor: '#0f172a', 
                            padding: '12px' 
                        }}
                        itemStyle={{ color: '#fff', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex-1 grid grid-cols-1 gap-4 w-full">
                  {categoryDistribution.map((d, i) => (
                    <div key={d.name} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group hover:bg-white dark:hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-4">
                           <div className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: COLORS[i] }} />
                           <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider font-display">{d.name}</span>
                        </div>
                        <p className="text-xl font-black dark:text-white group-hover:text-brand-500 transition-colors">{d.value}</p>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Task Throughput */}
         <Card className="!p-9 border-none ring-1 ring-slate-100 dark:bg-zinc-900 border-none dark:ring-white/5 shadow-sm">
            <CardHeader className="p-0 border-none mb-10 flex flex-row items-center justify-between">
               <div>
                  <h3 className="text-2xl font-black tracking-tight dark:text-white uppercase">Project Velocity</h3>
                  <p className="text-sm font-medium text-slate-500">Live performance per project</p>
               </div>
               <div className="h-11 w-11 flex items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-500/10">
                    <BarChart3 className="text-brand-600 dark:text-brand-400" size={24} />
               </div>
            </CardHeader>
            <CardContent className="h-[300px] p-0">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamPerformance}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226,232,240,0.4)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} />
                     <Tooltip 
                        cursor={{ fill: 'rgba(139, 92, 246, 0.05)', radius: 12 }}
                        contentStyle={{ 
                            borderRadius: '16px', 
                            border: 'none', 
                            backgroundColor: '#0f172a', 
                            padding: '16px' 
                        }}
                     />
                     <Bar dataKey="tasks" fill="#8b5cf6" radius={[10, 10, 10, 10]} barSize={40} animationDuration={1500} />
                  </BarChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>
      </div>
    </div>
  );
};
