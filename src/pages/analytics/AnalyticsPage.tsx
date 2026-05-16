import React from 'react';
import { 
  LineChart, 
  Line, 
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
  TrendingDown, 
  Zap, 
  Target, 
  Users, 
  Activity, 
  BrainCircuit,
  ArrowUpRight,
  Download,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const performanceData = [
  { name: 'Mon', completed: 42, planned: 45, efficiency: 94 },
  { name: 'Tue', completed: 38, planned: 35, efficiency: 108 },
  { name: 'Wed', completed: 55, planned: 50, efficiency: 110 },
  { name: 'Thu', completed: 48, planned: 55, efficiency: 87 },
  { name: 'Fri', completed: 70, planned: 65, efficiency: 107 },
  { name: 'Sat', completed: 30, planned: 25, efficiency: 120 },
  { name: 'Sun', completed: 25, planned: 20, efficiency: 125 },
];

const teamData = [
  { name: 'Frontend', tasks: 48, velocity: 12 },
  { name: 'Backend', tasks: 32, velocity: 15 },
  { name: 'Design', tasks: 24, velocity: 8 },
  { name: 'QA', tasks: 18, velocity: 22 },
];

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
const categoryData = [
  { name: 'Feature Requests', value: 45 },
  { name: 'Technical Debt', value: 20 },
  { name: 'Bug Fixes', value: 25 },
  { name: 'Maintenance', value: 10 },
];

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight dark:text-white">Workspace Analytics</h1>
          <p className="mt-1 text-slate-500 font-medium">Data-driven insights to optimize your team's velocity and output.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-white/5 dark:text-white dark:ring-white/10">
               <Calendar size={16} />
               Last 30 Days
            </button>
            <Button className="rounded-xl font-bold">
               <Download size={18} className="mr-2" />
               Export Report
            </Button>
        </div>
      </div>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Avg. Velocity', value: '8.4', trend: '+12%', sub: 'pts/day', icon: Zap, color: 'text-brand-500', bg: 'bg-brand-500/10' },
           { label: 'Completion Rate', value: '92%', trend: '+5.2%', sub: 'success', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
           { label: 'Active Members', value: '18', trend: 'Stable', sub: 'capacity', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
           { label: 'Cycle Time', value: '3.2d', trend: '-18%', sub: 'faster', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
         ].map((stat, i) => (
           <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
             <Card className="!p-6 border-none ring-1 ring-slate-200 transition-all hover:shadow-xl hover:shadow-brand-500/5 dark:bg-zinc-900/50 dark:ring-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                      <stat.icon size={20} />
                   </div>
                   <span className={cn("text-[10px] font-black uppercase tracking-widest", stat.trend.startsWith('+') ? 'text-emerald-500' : stat.trend.startsWith('-') ? 'text-brand-500' : 'text-slate-400')}>
                      {stat.trend}
                   </span>
                </div>
                <div className="flex items-baseline gap-2">
                   <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h2>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.sub}</span>
                </div>
                <p className="mt-1 text-xs font-bold text-slate-400 dark:text-slate-500">{stat.label}</p>
             </Card>
           </motion.div>
         ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Chart */}
        <Card className="lg:col-span-2 !p-0 overflow-hidden border-none ring-1 ring-slate-100 dark:bg-zinc-900/50 dark:ring-white/5">
          <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between border-none">
            <div>
              <h3 className="text-2xl font-bold tracking-tight dark:text-white">Delivery Performance</h3>
              <p className="text-sm font-medium text-slate-500">Comparing actual output vs planned capacity</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-white/5">
                <TrendingUp size={20} className="text-emerald-500" />
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
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 700 }} />
                <Tooltip 
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
                <Area type="monotone" dataKey="completed" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorPerf)" strokeWidth={4} animationDuration={2000} />
                <Area type="monotone" dataKey="planned" stroke="#cbd5e1" fill="none" strokeDasharray="8 8" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insight Card */}
        <Card className="flex flex-col border-none ring-1 ring-slate-100 bg-gradient-to-br from-brand-600 to-indigo-700 text-white shadow-2xl shadow-brand-500/20">
          <CardHeader className="!p-8">
            <div className="flex items-center gap-3 mb-4">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                   <BrainCircuit size={22} className="text-white" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-100">AI Analysis Engine</span>
            </div>
            <h3 className="text-2xl font-black leading-tight">Optimization Potential Identified</h3>
          </CardHeader>
          <CardContent className="flex-1 px-8 pb-8 space-y-6">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
               <p className="text-sm font-bold text-white leading-relaxed">
                  "Your team's velocity on Backend tasks is <span className="text-brand-300">14% higher</span> than average this sprint. Consider reallocating resources to Frontend bug fixes."
               </p>
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-brand-200">Confidence Score</span>
                  <span>98.6%</span>
               </div>
               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1.5 }} className="h-full bg-brand-300 rounded-full" />
               </div>
            </div>
          </CardContent>
          <div className="p-8 pt-0">
             <Button variant="secondary" className="w-full h-12 rounded-xl bg-white text-brand-600 hover:bg-brand-50 font-bold border-none transition-all active:scale-95">
                Apply Recommendations
             </Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
         {/* Team Velocity Chart */}
         <Card className="!p-8 border-none ring-1 ring-slate-100 dark:bg-zinc-900/50 dark:ring-white/5 shadow-sm">
            <CardHeader className="p-0 border-none mb-8">
               <h3 className="text-2xl font-bold tracking-tight dark:text-white">Resource Allocation</h3>
               <p className="text-sm font-medium text-slate-500">Distribution of efforts across departments</p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col md:flex-row gap-8 items-center">
               <div className="h-[250px] w-full md:w-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={8}
                        dataKey="value"
                        animationDuration={1500}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: fontWeights.bold }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                  {categoryData.map((d, i) => (
                    <div key={d.name} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                           <span className="text-[10px] font-black uppercase text-slate-400 truncate">{d.name}</span>
                        </div>
                        <p className="text-lg font-black dark:text-white">{d.value}%</p>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Task Throughput */}
         <Card className="!p-8 border-none ring-1 ring-slate-100 dark:bg-zinc-900/50 dark:ring-white/5 shadow-sm">
            <CardHeader className="p-0 border-none mb-8 flex flex-row items-center justify-between">
               <div>
                  <h3 className="text-2xl font-bold tracking-tight dark:text-white">Task Velocity</h3>
                  <p className="text-sm font-medium text-slate-500">Daily throughput by functional team</p>
               </div>
               <BarChart3 className="text-brand-500" size={24} />
            </CardHeader>
            <CardContent className="h-[300px] p-0">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226,232,240,0.4)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 800 }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 800 }} />
                     <Tooltip 
                        cursor={{ fill: 'rgba(139, 92, 246, 0.05)', radius: 12 }}
                        contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#0f172a', padding: '12px' }}
                     />
                     <Bar dataKey="tasks" fill="#8b5cf6" radius={[8, 8, 0, 0]} barSize={45} />
                  </BarChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>
      </div>
    </div>
  );
};

const fontWeights = {
  bold: 700,
};
