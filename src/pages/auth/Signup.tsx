import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Zap, Shield, User, Smartphone, Globe, Cloud, Eye, EyeOff } from 'lucide-react';
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
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export const Signup: React.FC = () => {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch('password', '');

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup(data.fullName, data.email, data.password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  const passwordRequirements = [
    { label: 'Minimum 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) }
  ];

  return (
    <div className="flex min-h-screen overflow-hidden bg-white dark:bg-dark-bg font-sans">
      {/* Left sidebar: Branding/Motivation */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-600 p-16 lg:flex">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl opacity-50" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 opacity-[0.03] [background-size:24px_24px] [background-image:radial-gradient(#fff_1px,transparent_1px)]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white">
            <Zap size={32} fill="currentColor" />
            <span className="text-2xl font-black tracking-tight uppercase">TaskFlow</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-black leading-tight text-white uppercase tracking-tighter mb-8">
              Join the <br /> <span className="text-brand-300">new standard</span> <br /> of work.
            </h1>
            <div className="space-y-6">
              {[
                { icon: Globe, title: 'Collaborate Anywhere', text: 'Connect with your team in real-time from any device.' },
                { icon: Shield, title: 'Privacy First', text: 'Your data is encrypted and protected by enterprise security.' },
                { icon: Cloud, title: 'Smart Automation', text: 'Automate repetitive tasks and focus on what matters.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/10 transition-transform hover:scale-110">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white uppercase tracking-widest text-[10px]">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-brand-100 opacity-80 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-200 opacity-60">© 2026 TASKFLOW SYSTEMS. ALL RIGHTS RESERVED.</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex w-full flex-col overflow-y-auto bg-white p-8 dark:bg-dark-bg lg:w-1/2 lg:p-16 custom-scrollbar">
        <div className="mx-auto w-full max-w-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10 lg:text-left text-center">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-text-primary uppercase tracking-tighter">Create Account</h2>
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-text-secondary opacity-70">Join TaskFlow and start managing your projects better.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted ml-1">Full Name</label>
                <input
                  placeholder="Enter your full name"
                  {...register('fullName')}
                  className={cn(
                    "h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg",
                    errors.fullName && "ring-red-500/20 border-red-500"
                  )}
                />
                {errors.fullName && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className={cn(
                    "h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg",
                    errors.email && "ring-red-500/20 border-red-500"
                  )}
                />
                {errors.email && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.email.message}</p>}
              </div>

              <div className="grid gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted ml-1">Create Password</label>
                   <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        {...register('password')}
                        className={cn(
                          "h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg",
                          errors.password && "ring-red-500/20 border-red-500"
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted ml-1">Confirm Password</label>
                   <input
                    type="password"
                    placeholder="Confirm password"
                    {...register('confirmPassword')}
                    className={cn(
                      "h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-bold ring-brand-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-dark-secondary dark:text-text-primary dark:border dark:border-white/5 dark:focus:bg-dark-bg",
                      errors.confirmPassword && "ring-red-500/20 border-red-500"
                    )}
                  />
                  {errors.confirmPassword && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              {/* Password Requirements Container */}
              <div className="bg-slate-50 dark:bg-dark-secondary p-5 rounded-2xl space-y-3 shadow-sm border dark:border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted">Password Security</p>
                <div className="space-y-2">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full transition-all",
                        req.met ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-300 dark:bg-white/10"
                      )} />
                      <span className={cn(
                        "text-[11px] font-bold transition-colors",
                        req.met ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-text-muted"
                      )}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Button type="submit" size="lg" className="group w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-brand-500/20 bg-brand-600 hover:bg-brand-500 border-none" isLoading={isLoading}>
                  Create Account
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <p className="text-center text-[10px] font-bold text-slate-400 dark:text-text-muted uppercase tracking-widest leading-relaxed">
                  By signing up, you agree to our <a href="#" className="text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors">Terms of Service</a> and <a href="#" className="text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors">Privacy Policy</a>.
                </p>
              </div>
            </form>

            <footer className="mt-10 border-t border-slate-50 pt-8 text-center dark:border-white/5">
              <p className="text-sm font-medium text-slate-500 dark:text-text-secondary">
                Already have an account?{' '}
                <Link to="/login" className="font-black text-brand-600 transition-colors hover:text-brand-500 dark:text-brand-400 uppercase tracking-tighter ml-1">
                  Sign In
                </Link>
              </p>
            </footer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
