import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Zap, Shield, User } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

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
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = React.useState<'Admin' | 'Member'>('Member');
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'Member' }
  });

  const onSubmit = async (data: SignupForm) => {
    await login(data.email);
    navigate('/');
  };

  const handleRoleSelect = (selectedRole: 'Admin' | 'Member') => {
    setRole(selectedRole);
    setValue('role', selectedRole);
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-slate-50 dark:bg-dark-bg">
      {/* Left sidebar: Branding/Motivation */}
      <div className="relative hidden w-2/5 flex-col justify-between overflow-hidden bg-brand-600 p-12 lg:flex">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover opacity-10 mix-blend-overlay" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white">
            <Zap size={32} fill="currentColor" className="animate-float" />
            <span className="font-display text-2xl font-bold tracking-tight">TaskFlow Pro</span>
          </div>
        </div>

        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl font-extrabold leading-tight text-white mb-6"
          >
            Start your project <br /> <span className="text-brand-300">journey today.</span>
          </motion.h1>
          <div className="space-y-6">
            {[
              { icon: Zap, text: 'Lightning fast synchronization' },
              { icon: Shield, text: 'Enterprise-grade security standards' },
              { icon: User, text: 'Built for collaborative excellence' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + (idx * 0.1) }}
                className="flex items-center gap-3 text-brand-100"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
                  <item.icon size={18} />
                </div>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-10">
          <p className="text-sm text-brand-200">© 2026 TaskFlow. All rights reserved.</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex w-full flex-col overflow-y-auto bg-white p-8 dark:bg-dark-bg lg:w-3/5 lg:p-16">
        <div className="mx-auto w-full max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10 lg:text-left text-center">
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Create an account</h2>
              <p className="mt-3 text-lg text-slate-500 dark:text-slate-400 font-medium">Join thousands of teams shipping better, faster.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  error={errors.fullName?.message}
                  {...register('fullName')}
                  className="h-12"
                />
                <Input
                  label="Email Address"
                  placeholder="john@company.com"
                  error={errors.email?.message}
                  {...register('email')}
                  className="h-12"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register('password')}
                  className="h-12"
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                  className="h-12"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select your workspace role</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'Member', icon: User, desc: 'Best for individual contributors and collaborators.' },
                    { id: 'Admin', icon: Shield, desc: 'Best for founders and workspace administrators.' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleRoleSelect(item.id as any)}
                      className={cn(
                        "group relative flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition-all duration-300",
                        role === item.id 
                          ? "border-brand-500 bg-brand-50/50 dark:bg-brand-500/10" 
                          : "border-slate-100 hover:border-slate-200 dark:border-white/5 dark:bg-white/5"
                      )}
                    >
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                        role === item.id ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 dark:bg-white/10 dark:text-slate-400"
                      )}>
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className={cn("font-bold", role === item.id ? "text-brand-700 dark:text-brand-300" : "text-slate-900 dark:text-white")}>{item.id}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </div>
                      {role === item.id && (
                        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-brand-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button type="submit" size="lg" className="group w-full" isLoading={isLoading}>
                  Create Account
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <p className="text-center text-[11px] text-slate-400">
                  By clicking Create Account, you agree to our <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
                </p>
              </div>
            </form>

            <footer className="mt-10 border-t border-slate-100 pt-8 text-center dark:border-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{' '}
                <a href="/login" className="font-bold text-brand-600 transition-colors hover:text-brand-500">
                  Sign in
                </a>
              </p>
            </footer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
