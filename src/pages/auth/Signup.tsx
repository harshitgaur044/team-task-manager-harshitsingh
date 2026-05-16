import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Zap, Shield, User, Smartphone, Globe, Cloud } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name is too short'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['Admin', 'Member']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export const Signup: React.FC = () => {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = React.useState<'Admin' | 'Member'>('Member');
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'Member' }
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup(data.fullName, data.email);
      toast.success('Identity established. Welcome to the workspace.');
      navigate('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Establishment failed');
    }
  };

  const handleRoleSelect = (selectedRole: 'Admin' | 'Member') => {
    setRole(selectedRole);
    setValue('role', selectedRole);
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* Left sidebar: Branding/Motivation */}
      <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-brand-600 p-16 lg:flex">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 opacity-10 [background-size:24px_24px] [background-image:radial-gradient(#fff_1px,transparent_1px)]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white">
            <Zap size={40} fill="currentColor" />
            <span className="font-display text-3xl font-black tracking-tight uppercase">TaskFlow</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-7xl font-black leading-[0.9] text-white mb-10 uppercase tracking-tighter"
          >
            Deploy <br /> <span className="text-brand-300">your elite</span> <br /> team.
          </motion.h1>
          <div className="space-y-8">
            {[
              { icon: Globe, title: 'Global Sync', text: 'Real-time state distribution across all nodes.' },
              { icon: Shield, title: 'Hardened Access', text: 'Advanced identity protocols for mission integrity.' },
              { icon: Cloud, title: 'Seamless Scale', text: 'Automated workflow orchestration for growing teams.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + (idx * 0.1) }}
                className="flex items-start gap-4 text-brand-100"
              >
                <div className="flex mt-1 h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white shadow-xl backdrop-blur-md border border-white/10">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-black text-white uppercase tracking-widest text-[11px]">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-200 leading-relaxed max-w-xs">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-10">
          <p className="text-[10px] font-bold text-brand-200 uppercase tracking-widest opacity-60">© 2026 Operative Interface. All rights reserved.</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex w-full flex-col overflow-y-auto bg-white p-8 dark:bg-zinc-950 lg:w-[55%] lg:p-24 custom-scrollbar">
        <div className="mx-auto w-full max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-14 lg:text-left text-center">
              <h2 className="font-display text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">Establish Identity</h2>
              <p className="mt-4 text-base font-medium text-slate-500 dark:text-slate-400">Initialize your operative profile within the workspace terminal.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Alias (Full Name)</label>
                  <Input
                    placeholder="John Doe"
                    error={errors.fullName?.message}
                    {...register('fullName')}
                    className="h-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 dark:bg-zinc-900 dark:border-zinc-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Frequency (Email)</label>
                  <Input
                    placeholder="john@company.com"
                    error={errors.email?.message}
                    {...register('email')}
                    className="h-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 dark:bg-zinc-900 dark:border-zinc-800"
                  />
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                   <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Key</label>
                   <Input
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register('password')}
                    className="h-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 dark:bg-zinc-900 dark:border-zinc-800"
                  />
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Verify Key</label>
                   <Input
                    type="password"
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                    className="h-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 dark:bg-zinc-900 dark:border-zinc-800"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Operative Classification</label>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { id: 'Member', icon: User, desc: 'Standard operative for task execution and collaboration.' },
                    { id: 'Admin', icon: Shield, desc: 'Command authority for workspace orchestration and policy.' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleRoleSelect(item.id as any)}
                      className={cn(
                        "group relative flex flex-col items-start gap-3 rounded-[2rem] border-2 p-6 text-left transition-all duration-300",
                        role === item.id 
                          ? "border-brand-500 bg-brand-50/30 dark:bg-brand-500/5 dark:border-brand-500/50" 
                          : "border-slate-50 hover:border-slate-100 dark:border-white/5 dark:bg-white/5"
                      )}
                    >
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl transition-all shadow-xl",
                        role === item.id ? "bg-brand-600 text-white shadow-brand-500/30" : "bg-white text-slate-500 dark:bg-zinc-800 dark:text-slate-400"
                      )}>
                        <item.icon size={22} />
                      </div>
                      <div>
                        <p className={cn("font-black uppercase tracking-widest text-xs", role === item.id ? "text-brand-700 dark:text-brand-300" : "text-slate-900 dark:text-white")}>{item.id}</p>
                        <p className="mt-2 text-[11px] font-semibold leading-relaxed text-slate-500 dark:text-slate-400 tracking-tight">{item.desc}</p>
                      </div>
                      {role === item.id && (
                        <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Button type="submit" size="lg" className="group w-full h-16 rounded-[1.5rem] font-black uppercase tracking-[0.15em] text-sm shadow-2xl shadow-brand-500/20" isLoading={isLoading}>
                  Deploy Operative
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                  By deploying, you acknowledge the <a href="#" className="text-brand-600 hover:text-brand-500">Service Protocols</a> and <a href="#" className="text-brand-600 hover:text-brand-500">Privacy Encryption</a> standards.
                </p>
              </div>
            </form>

            <footer className="mt-16 border-t border-slate-50 pt-10 text-center dark:border-zinc-900">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Already established?{' '}
                <Link to="/login" className="font-black text-brand-600 transition-colors hover:text-brand-500 uppercase tracking-tighter ml-1">
                  Signal In
                </Link>
              </p>
            </footer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
