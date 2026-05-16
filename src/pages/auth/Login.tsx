import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';

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
    await login(data.email);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-slate-50 dark:bg-dark-bg">
      {/* Left side: Branding/Visual */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-600 p-12 lg:flex">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80')] bg-cover opacity-10 mix-blend-overlay" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white">
            <Zap size={32} fill="currentColor" className="animate-float" />
            <span className="font-display text-2xl font-bold tracking-tight">TaskFlow Pro</span>
          </div>
        </div>

        <div className="relative z-10 mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-6xl font-extrabold leading-[1.1] text-white selection:bg-white selection:text-brand-600"
          >
            Empower your team. <br /> <span className="text-brand-300">Scale your vision.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-md text-xl text-brand-100"
          >
            The modern standard for project management. Trusted by over 2,000 high-growth companies.
          </motion.p>
        </div>

        <div className="relative z-10">
          <div className="glass flex items-center gap-4 rounded-3xl border-white/10 p-5 text-white shadow-2xl">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 overflow-hidden rounded-full border-2 border-brand-600 ring-2 ring-white/10 transition-transform hover:scale-110">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <p className="text-sm font-semibold">Join 500k+ builders</p>
              <p className="text-xs text-brand-200">Collaborating in real-time</p>
            </div>
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
          <div className="mb-10 text-center lg:text-left">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-xl shadow-brand-500/20 lg:hidden">
              <Zap size={24} fill="currentColor" />
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white">Welcome back</h2>
            <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
              Sign in to sync with your workspace
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <Input
                label="Email Address"
                placeholder="alex@example.com"
                error={errors.email?.message}
                {...register('email')}
                className="h-12"
              />
              
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register('password')}
                  className="h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-10 text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="group flex cursor-pointer items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600 transition-all focus:ring-brand-500 focus:ring-offset-0 dark:border-white/10 dark:bg-white/5" />
                Remember me
              </label>
              <a href="#" className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-500">
                Forgot password?
              </a>
            </div>

            <Button type="submit" size="lg" className="group w-full" isLoading={isLoading}>
              Sign In
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </form>

          <footer className="mt-10 border-t border-slate-100 pt-8 text-center dark:border-white/5">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <a href="/signup" className="font-bold text-brand-600 transition-colors hover:text-brand-500">
                Create account
              </a>
            </p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};
