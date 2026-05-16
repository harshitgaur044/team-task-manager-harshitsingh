import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  UserCircle, 
  Calendar as CalendarIcon,
  Search,
  Filter,
  MoreVertical,
  Clock,
  MapPin,
  Users,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

export const CalendarPage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const mockEvents = [
        { title: 'Project Kickoff', time: '10:00 AM', color: 'bg-brand-500', members: 4 },
        { title: 'Design Review', time: '02:00 PM', color: 'bg-purple-500', members: 2 },
        { title: 'Sprint Planning', time: '09:00 AM', color: 'bg-emerald-500', members: 8 },
        { title: 'API Sync', time: '11:30 AM', color: 'bg-blue-500', members: 3 },
    ];

    return (
        <div className="space-y-10 pb-10">
            {/* Header Section */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="font-display text-4xl font-bold tracking-tight dark:text-white">Workspace Schedule</h1>
                    <p className="mt-1 text-slate-500 font-medium">Coordinate deadlines and team availability across time.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10">
                        <button 
                          onClick={previousMonth} 
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/10"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <div className="px-4 text-center min-w-[160px]">
                            <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
                                {format(currentDate, 'MMMM yyyy')}
                            </span>
                        </div>
                        <button 
                          onClick={nextMonth} 
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/10"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                    <Button className="h-12 rounded-2xl px-6 font-bold shadow-xl shadow-brand-500/20 active:scale-95 transition-transform">
                        <Plus size={20} className="mr-2" />
                        Add Event
                    </Button>
                </div>
            </div>

            {/* Calendar Grid */}
            <Card className="overflow-hidden border-none shadow-2xl shadow-brand-500/5 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="grid grid-cols-7 bg-slate-50/50 border-b border-slate-100 dark:bg-white/5 dark:border-white/5">
                    {weekDays.map(day => (
                        <div key={day} className="py-5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 dark:divide-white/5 border-slate-100 dark:border-white/5">
                    {days.map((day, idx) => {
                        const isToday = isSameDay(day, new Date());
                        const isCurrentMonth = isSameMonth(day, monthStart);
                        const hasEvent = isToday || idx === 12 || idx === 18 || idx === 25;

                        return (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: idx * 0.005 }}
                                key={idx}
                                className={cn(
                                    "relative h-44 border-b border-r border-slate-100 p-2 transition-all group dark:border-white/5",
                                    !isCurrentMonth ? "bg-slate-50/30 dark:bg-white/[0.02]" : "bg-white dark:bg-transparent",
                                    isToday ? "ring-2 ring-inset ring-brand-500/50 z-10" : ""
                                )}
                            >
                                <div className="flex justify-between items-start mb-2 px-1">
                                    <span className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black transition-colors",
                                        isToday 
                                          ? "bg-brand-600 text-white shadow-lg shadow-brand-500/40" 
                                          : isCurrentMonth 
                                            ? "text-slate-900 group-hover:bg-slate-50 dark:text-white dark:group-hover:bg-white/5" 
                                            : "text-slate-300 dark:text-slate-700"
                                    )}>
                                        {format(day, 'd')}
                                    </span>
                                    {hasEvent && isCurrentMonth && (
                                        <div className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
                                    )}
                                </div>
                                
                                <div className="space-y-1.5 overflow-hidden">
                                    {hasEvent && isCurrentMonth && (
                                        <AnimatePresence>
                                            {mockEvents.slice(0, isToday ? 2 : 1).map((event, eIdx) => (
                                                <motion.div 
                                                    key={eIdx}
                                                    initial={{ x: -10, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    whileHover={{ x: 4 }}
                                                    className={cn(
                                                        "group/event relative cursor-pointer px-3 py-2 rounded-[0.75rem] transition-all",
                                                        "border-l-[3px] border-l-current shadow-sm",
                                                        event.color.replace('bg-', 'text-'),
                                                        "bg-white ring-1 ring-slate-100 hover:shadow-md dark:bg-white/5 dark:ring-white/10"
                                                    )}
                                                >
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="truncate text-[10px] font-black leading-tight text-slate-900 dark:text-white italic">{event.title}</span>
                                                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                                                          <Clock size={8} />
                                                          <span>{event.time}</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                            {isToday && (
                                              <button className="flex w-full items-center justify-center py-2 rounded-xl border border-dashed border-slate-200 text-[9px] font-black text-slate-400 hover:bg-slate-50 transition-colors uppercase dark:border-white/10 dark:hover:bg-white/5">
                                                + 2 More
                                              </button>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>

                                {/* Hover Button */}
                                <button className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 text-white opacity-0 scale-90 transition-all group-hover:opacity-100 group-hover:scale-100 hover:bg-brand-600 shadow-lg shadow-brand-500/30">
                                  <Plus size={14} strokeWidth={3} />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </Card>

            {/* Event Preview Cards */}
            <div className="grid gap-8 lg:grid-cols-2">
                <Card className="!p-8">
                    <CardHeader className="p-0 border-none mb-8 flex flex-row items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold dark:text-white">Upcoming Events</h3>
                            <p className="text-sm font-medium text-slate-500">Scheduled for the next 48 hours</p>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                            <Clock size={20} />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                        {[1, 2].map((i) => (
                             <div key={i} className="group relative flex gap-6 items-center p-5 rounded-3xl bg-slate-50/50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-brand-500/5 dark:bg-white/2 dark:border-white/5 dark:hover:bg-white/5">
                                <div className="flex flex-col items-center justify-center h-16 w-16 min-w-[64px] rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 dark:bg-zinc-800 dark:ring-white/10">
                                   <span className="text-[10px] font-black uppercase text-brand-500 leading-none">May</span>
                                   <span className="text-2xl font-black text-slate-900 dark:text-white mt-1">16</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white truncate">Global Team Synchronization</h4>
                                    <div className="flex items-center gap-4 mt-1.5">
                                       <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                          <Clock size={14} className="text-brand-500" />
                                          <span>10:30 AM - 12:00 PM</span>
                                       </div>
                                       <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                          <Users size={14} className="text-brand-500" />
                                          <span>12 Atticndees</span>
                                       </div>
                                    </div>
                                </div>
                                <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm transition-all hover:text-brand-600 dark:bg-zinc-800 dark:hover:text-white">
                                   <ChevronRight size={20} />
                                </button>
                             </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden group">
                  <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-brand-500/10 blur-3xl" />
                   <CardHeader className="!p-8 border-none">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold dark:text-white">Quick Tasks</h3>
                            <CalendarIcon size={24} className="text-slate-300" />
                        </div>
                        <p className="mt-1 text-sm font-medium text-slate-400">Immediate action items for today</p>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-4">
                        {[
                           { task: 'Prepare slide deck for client', time: 'Before 5 PM', priority: 'High' },
                           { task: 'Review new developer PRs', time: 'Flexible', priority: 'Medium' },
                        ].map((item, idx) => (
                           <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white/50 dark:bg-white/5 dark:border-white/5">
                              <div className="flex items-start gap-4">
                                <div className={cn("mt-1.5 h-2 w-2 rounded-full", item.priority === 'High' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]')} />
                                <div>
                                   <p className="text-sm font-bold dark:text-white">{item.task}</p>
                                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{item.time}</p>
                                </div>
                              </div>
                              <CheckCircle2 size={18} className="text-slate-100 hover:text-brand-500 cursor-pointer transition-colors" />
                           </div>
                        ))}
                        <button className="w-full py-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-brand-600 transition-colors">
                           <Plus size={16} />
                           <span>Add to Agenda</span>
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
