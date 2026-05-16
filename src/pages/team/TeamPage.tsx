import React, { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Search, 
  Mail, 
  Phone, 
  MoreVertical, 
  Shield, 
  UserPlus, 
  CheckCircle2, 
  Clock, 
  X, 
  ExternalLink,
  MessageCircle,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const TeamPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight dark:text-white">People</h1>
          <p className="mt-1 text-slate-500 font-medium">Coordinate and manage your high-performance team.</p>
        </div>
        <Button className="h-12 rounded-2xl px-8 font-bold shadow-xl shadow-brand-500/20 active:scale-95 transition-transform">
          <UserPlus size={18} className="mr-2" />
          Add Member
        </Button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between bg-white/50 p-4 rounded-3xl border border-slate-100 dark:bg-white/5 dark:border-white/5 backdrop-blur-sm">
          <div className="relative flex-1 max-w-md">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
                type="text" 
                placeholder="Search by name, role, or email..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-2xl border-none bg-slate-100/50 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-400 dark:bg-white/5 dark:text-white dark:focus:bg-white/10" 
             />
          </div>
          <div className="flex items-center gap-2">
             <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-white/5">
                <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white shadow-sm dark:bg-white/10 dark:text-white">All Members</button>
                <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-900 transition-colors">Permissions</button>
             </div>
          </div>
      </div>

      {/* Team Grid */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {filteredUsers.map((user, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={user.id}
            >
              <Card className="group relative overflow-hidden h-full border-none ring-1 ring-slate-200 transition-all hover:shadow-2xl hover:shadow-brand-500/10 hover:ring-brand-500/30 dark:bg-zinc-900 dark:ring-white/5 dark:hover:ring-brand-500/20">
                <CardContent className="p-8">
                  <div className="absolute right-6 top-6">
                      <button className="rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white">
                        <MoreHorizontal size={20} />
                      </button>
                  </div>

                  <div className="flex items-center gap-5 mb-8">
                    <div className="relative">
                      <div className="h-20 w-20 overflow-hidden rounded-[1.75rem] bg-brand-50 shadow-inner group-hover:scale-105 transition-transform duration-500 dark:bg-brand-900/10">
                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                      </div>
                      <div className={cn(
                        "absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-[3px] border-white shadow-sm dark:border-zinc-900",
                        user.status === 'online' ? "bg-emerald-500" : "bg-slate-300"
                      )} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{user.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className={cn(
                          "flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-widest",
                          user.role === 'Admin' 
                            ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400" 
                            : "bg-slate-50 text-slate-600 dark:bg-white/5 dark:text-slate-400"
                        )}>
                          {user.role === 'Admin' && <Shield size={10} />}
                          {user.role}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{user.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 dark:bg-white/5">
                            <Mail size={14} className="text-slate-400" />
                          </div>
                          <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 dark:bg-white/5">
                            <Activity size={14} className="text-slate-400" />
                          </div>
                          <span>{Math.floor(Math.random() * 50) + 10} Tasks Assigned</span>
                      </div>
                  </div>

                  <div className="flex gap-3">
                      <Button variant="secondary" className="flex-1 rounded-xl text-xs font-bold h-10 border-none bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10">
                        Profile
                      </Button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400">
                        <MessageCircle size={18} />
                      </button>
                  </div>
                </CardContent>
                
                {/* Hover line effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          className="group relative flex min-h-[300px] flex-col items-center justify-center rounded-[2rem] border-[3px] border-dashed border-slate-200 p-8 text-slate-400 transition-all hover:border-brand-500 hover:bg-brand-50/50 hover:text-brand-600 dark:border-white/5 dark:hover:bg-brand-500/5 dark:hover:text-brand-400"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-slate-50 transition-colors group-hover:bg-brand-100 dark:bg-white/5 dark:group-hover:bg-brand-500/10">
            <Plus size={28} />
          </div>
          <p className="text-lg font-black tracking-tight">Onboard Member</p>
          <p className="mt-1 text-center text-xs font-bold uppercase tracking-wider text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Send Invitation</p>
        </motion.button>
      </div>
    </div>
  );
};

import { Activity } from 'lucide-react';
