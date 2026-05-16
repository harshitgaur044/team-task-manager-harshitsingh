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
import { cn } from '../../lib/utils';
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
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-white dark:bg-dark-bg font-sans">
      {/* Left side: Branding/Visual */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-600 p-16 lg:flex">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl opacity-50" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80')] bg-cover opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 opacity-[0.03] [background-size:24px_24px] [background-image:radial-gradient(#fff_1px,transparent_1px)]" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white">
            <Zap size={32} fill="currentColor" />
            <span className="text-2xl font-black tracking-tight uppercase">TaskFlow</span>
          </div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-black leading-tight text-white uppercase tracking-tighter">
              Manage projects <br /> <span className="text-brand-300">without limits.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg text-brand-100 font-medium leading-relaxed opacity-90">
              Transform your team's productivity with a tool designed specifically for high-performance builders.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-20">
           <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 overflow-hidden rounded-full border-2 border-brand-600 bg-zinc-800 shadow-lg">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                </div>
              ))}
              <div className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-brand-600 bg-brand-500 text-white text-[10px] font-black shadow-lg">
                +2k
              </div>
           </div>
           <div className="flex items-center gap-2 text-brand-200">
              <ShieldCheck size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest\">Secure Workspace Engine</span>
           </div>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2 dark:bg-dark-bg">
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-white/[0.02] lg:hidden"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-sm"
        >
          <div className="mb-10 text-center lg:text-left">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-2xl lg:hidden">
              <Zap size={20} fill="currentColor" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-text-primary uppercase tracking-tighter">Welcome Back</h2>
            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-text-secondary opacity-70">
              Sign in to manage your workspace and team.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  {...register('email')}
                  className={cn(
                    "h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg",
                    errors.email && "ring-red-500/20 border-red-500"
                  )}
                />
                {errors.email && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.email.message}</p>}
              </div>
              
              <div className="relative space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className={cn(
                      "h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg",
                      errors.password && "ring-red-500/20 border-red-500"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 dark:text-text-muted dark:hover:text-text-primary"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.password.message}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="group flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-slate-900 dark:text-text-secondary dark:hover:text-text-primary">
                <input type="checkbox" className="h-4 w-4 rounded-lg border-slate-200 text-brand-600 focus:ring-brand-500 dark:border-white/10 dark:bg-dark-secondary" />
                Remember me
              </label>
              <a href="#" className="text-xs font-black uppercase tracking-widest text-brand-600 transition-all hover:text-brand-500 dark:text-brand-400">
                Forgot password?
              </a>
            </div>

            <Button type="submit" size="lg" className="group w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-brand-500/20 bg-brand-600 hover:bg-brand-500 dark:bg-brand-600 dark:hover:bg-brand-500 border-none" isLoading={isLoading}>
              Sign In
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </form>

          <footer className="mt-10 border-t border-slate-100 pt-8 text-center dark:border-white/5">
            <p className="text-sm font-medium text-slate-500 dark:text-text-secondary">
              Don't have an account?{' '}
              <Link to="/signup" className="font-black text-brand-600 transition-colors hover:text-brand-500 dark:text-brand-400 uppercase tracking-tighter ml-1">
                Create Account
              </Link>
            </p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};
