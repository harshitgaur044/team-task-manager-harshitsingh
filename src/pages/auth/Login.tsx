import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Zap, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'alex@example.com', password: 'password123' }
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email);
      toast.success('Connection established. Welcome to the workspace.');
      navigate('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* Left side: Branding/Visual */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-600 p-16 lg:flex">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80')] bg-cover opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 opacity-10 [background-size:24px_24px] [background-image:radial-gradient(#fff_1px,transparent_1px)]" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white">
            <Zap size={40} fill="currentColor" />
            <span className="font-display text-3xl font-black tracking-tight uppercase">TaskFlow</span>
          </div>
        </div>

        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-7xl font-black leading-[0.9] text-white selection:bg-white selection:text-brand-600 uppercase tracking-tighter"
          >
            Mission-critical <br /> <span className="text-brand-300">workspaces.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-md text-xl text-brand-100 font-medium leading-relaxed"
          >
            Sync your team with the precision of a high-performance engine. Designed for modern builders.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center justify-between">
           <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 w-12 overflow-hidden rounded-2xl border-4 border-brand-600 bg-zinc-800 shadow-xl transition-transform hover:-translate-y-2 hover:z-20">
                  <img src={`https://i.pravatar.cc/150?u=${i + 15}`} alt="User" />
                </div>
              ))}
              <div className="h-12 w-12 flex items-center justify-center rounded-2xl border-4 border-brand-600 bg-brand-500 text-white text-xs font-black shadow-xl">
                +12k
              </div>
           </div>
           <div className="flex items-center gap-2 text-brand-200">
              <ShieldCheck size={20} />
              <span className="text-xs font-black uppercase tracking-widest leading-none">Military-grade Security</span>
           </div>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-white/[0.02] lg:hidden"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-sm"
        >
          <div className="mb-12 text-center lg:text-left">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-brand-600 text-white shadow-2xl shadow-brand-500/20 lg:hidden">
              <Zap size={24} fill="currentColor" />
            </div>
            <h2 className="font-display text-4xl font-black tracking-tight text-slate-950 dark:text-white uppercase tracking-tight">Signal In</h2>
            <p className="mt-2 text-base font-medium text-slate-500 dark:text-slate-400">
              Access your distributed workspace terminal.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Terminal ID (Email)</label>
                <Input
                  placeholder="alex@example.com"
                  error={errors.email?.message}
                  {...register('email')}
                  className="h-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 dark:bg-zinc-900 dark:border-zinc-800"
                />
              </div>
              
              <div className="relative space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Key (Password)</label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register('password')}
                  className="h-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 dark:bg-zinc-900 dark:border-zinc-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-10 text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="group flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white">
                <input type="checkbox" className="h-4 w-4 rounded-lg border-slate-200 text-brand-600 transition-all focus:ring-brand-500 focus:ring-offset-0 dark:border-zinc-800 dark:bg-zinc-900" />
                Durable Session
              </label>
              <a href="#" className="text-xs font-black uppercase tracking-widest text-brand-600 transition-all hover:text-brand-500 hover:tracking-[0.15em]">
                Reset Key?
              </a>
            </div>

            <Button type="submit" size="lg" className="group w-full h-14 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-500/20" isLoading={isLoading}>
              Initialize Session
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </form>

          <footer className="mt-12 border-t border-slate-100 pt-10 text-center dark:border-zinc-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              New operative?{' '}
              <Link to="/signup" className="font-black text-brand-600 transition-colors hover:text-brand-500 uppercase tracking-tighter ml-1">
                Establish Identity
              </Link>
            </p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};
