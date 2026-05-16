import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { User, Shield, Bell, Palette, Globe, Lock, Save, Camera, Check, ShieldAlert, Cpu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export const SettingsPage: React.FC = () => {
    const { user } = useAuth();
    const { updateUserInfo } = useData();
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);
    
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        title: 'Senior Product Designer',
        bio: 'Designing mission-critical systems at TaskFlow.',
        avatar: user?.avatar || ''
    });

    const tabs = [
        { id: 'profile', label: 'User Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'billing', label: 'Billing', icon: Globe },
    ];

    const handleSaveProfile = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            updateUserInfo(user.id, {
                name: profileData.name,
                avatar: profileData.avatar
            });
            toast.success('Profile updated successfully.');
        } catch (error) {
            toast.error('Update failed. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-12 pb-24">
            <header className="relative py-12 px-8 overflow-hidden rounded-[2.5rem] bg-brand-600">
                <div className="absolute inset-0 opacity-10 [background-size:24px_24px] [background-image:radial-gradient(#fff_1px,transparent_1px)]" />
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />
                <div className="relative z-10">
                    <h1 className="font-display text-5xl font-black tracking-tighter text-white uppercase leading-none">Settings <span className="text-brand-200">Panel</span></h1>
                    <p className="mt-4 text-brand-100 font-medium max-w-lg text-lg">Manage your account settings and workspace preferences.</p>
                </div>
                <div className="absolute bottom-6 right-8 flex items-center gap-3">
                   <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/10">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Status: Online</span>
                   </div>
                   <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/10">
                      <Cpu size={14} className="text-brand-300" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">v1.2.4</span>
                   </div>
                </div>
            </header>

            <div className="flex flex-col gap-12 lg:flex-row">
                <aside className="w-full lg:w-72">
                    <nav className="sticky top-28 space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "group relative flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-xs font-black transition-all uppercase tracking-widest",
                                    activeTab === tab.id 
                                        ? "bg-brand-600 text-white shadow-xl shadow-brand-500/20 ring-1 ring-white/10 translate-x-2" 
                                        : "text-slate-500 hover:bg-slate-50 dark:text-text-muted dark:hover:bg-white/5 dark:hover:text-text-primary"
                                )}
                            >
                                <tab.icon size={18} className={cn("transition-transform group-hover:scale-110", activeTab === tab.id ? "text-white" : "text-slate-400 dark:text-text-muted")} />
                                <span>{tab.label}</span>
                                {activeTab === tab.id && (
                                    <motion.div 
                                        layoutId="active-settings-tab"
                                        className="absolute -left-1 top-1/4 bottom-1/4 w-1 rounded-full bg-white opacity-50"
                                    />
                                )}
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className="flex-1 max-w-4xl min-h-[600px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'profile' && (
                        <motion.div
                          key="profile"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                           <section className="space-y-6">
                              <div className="flex items-end justify-between">
                                 <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight dark:text-text-primary">Public Profile</h3>
                                    <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-text-secondary opacity-70 leading-relaxed">This information will be visible to other team members.</p>
                                 </div>
                                 <Button 
                                    onClick={handleSaveProfile} 
                                    isLoading={isSaving}
                                    className="rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-[10px]"
                                 >
                                    <Save size={16} className="mr-2" />
                                    Save Changes
                                 </Button>
                              </div>

                              <Card className="overflow-hidden bg-slate-50/50 dark:bg-dark-card shadow-none border-transparent ring-1 ring-slate-100 dark:ring-white/1 ring-opacity-100 dark:ring-white/10">
                                 <CardContent className="p-10 space-y-10">
                                    <div className="flex items-center gap-10">
                                       <div className="group relative h-32 w-32 shrink-0">
                                          <img 
                                            src={profileData.avatar} 
                                            alt={profileData.name} 
                                            className="h-full w-full rounded-[2rem] object-cover ring-8 ring-white dark:ring-dark-bg transition-transform group-hover:scale-105" 
                                          />
                                          <button className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-xl ring-4 ring-white dark:ring-dark-card transition-all hover:scale-110 active:scale-95">
                                             <Camera size={18} />
                                          </button>
                                       </div>
                                       <div className="space-y-2">
                                          <h4 className="text-xl font-black uppercase tracking-tight dark:text-text-primary">{profileData.name}</h4>
                                          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-lg inline-block dark:text-brand-400">{profileData.title}</p>
                                          <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-2">
                                             <Check size={14} />
                                             Account Status: Active
                                          </div>
                                       </div>
                                    </div>

                                     <div className="grid gap-8 md:grid-cols-2">
                                       <div className="space-y-1.5">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80 ml-1">Full Name</label>
                                          <Input 
                                            value={profileData.name} 
                                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                            className="h-12 rounded-2xl bg-white dark:bg-dark-secondary border-transparent focus:ring-brand-500/10 dark:text-text-primary"
                                          />
                                       </div>
                                       <div className="space-y-1.5">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80 ml-1">Email Address</label>
                                          <Input 
                                            value={profileData.email} 
                                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                            className="h-12 rounded-2xl bg-white dark:bg-dark-secondary border-transparent focus:ring-brand-500/10 dark:text-text-primary"
                                          />
                                       </div>
                                       <div className="space-y-1.5">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80 ml-1">Job Title</label>
                                          <Input 
                                            value={profileData.title} 
                                            onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                                            className="h-12 rounded-2xl bg-white dark:bg-dark-secondary border-transparent focus:ring-brand-500/10 dark:text-text-primary"
                                          />
                                       </div>
                                       <div className="space-y-1.5">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80 ml-1">Security Clearance</label>
                                          <div className="flex items-center h-12 w-full rounded-2xl bg-white/50 dark:bg-dark-bg border-2 border-slate-100 dark:border-white/10 px-4 text-sm font-black uppercase tracking-tight text-brand-600 dark:text-brand-400">
                                             {user?.role} Access Level
                                          </div>
                                       </div>
                                    </div>

                                    <div className="space-y-1.5">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80 ml-1">Bio</label>
                                       <textarea 
                                          value={profileData.bio}
                                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                          className="min-h-[120px] w-full rounded-[1.5rem] border-transparent bg-white dark:bg-dark-secondary p-4 text-sm font-semibold tracking-tight leading-relaxed focus:ring-brand-500/10 transition-all focus:outline-none dark:text-text-primary dark:placeholder:text-text-placeholder"
                                          placeholder="Tell us about yourself..."
                                       />
                                    </div>
                                 </CardContent>
                              </Card>
                           </section>
                        </motion.div>
                    )}

                    {activeTab === 'security' && (
                         <motion.div
                          key="security"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                           <section className="space-y-6">
                              <div className="flex items-end justify-between">
                                 <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight dark:text-text-primary">Security Settings</h3>
                                    <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-text-secondary opacity-70 leading-relaxed">Manage your password and account security.</p>
                                 </div>
                              </div>

                              <Card className="overflow-hidden bg-slate-50/50 dark:bg-dark-card shadow-none border-transparent ring-1 ring-slate-100 dark:ring-white/10 uppercase-text-labels">
                                 <CardContent className="p-10 space-y-8">
                                    <div className="grid gap-8">
                                       <div className="space-y-1.5">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80 ml-1">Current Password</label>
                                          <Input type="password" placeholder="••••••••" className="h-12 rounded-2xl bg-white dark:bg-dark-secondary border-transparent focus:ring-brand-500/10 dark:text-text-primary" />
                                       </div>
                                       <div className="grid gap-8 md:grid-cols-2">
                                          <div className="space-y-1.5">
                                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80 ml-1">New Password</label>
                                             <Input type="password" placeholder="••••••••" className="h-12 rounded-2xl bg-white dark:bg-dark-secondary border-transparent focus:ring-brand-500/10 dark:text-text-primary" />
                                          </div>
                                          <div className="space-y-1.5">
                                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-text-muted opacity-80 ml-1">Confirm New Password</label>
                                             <Input type="password" placeholder="••••••••" className="h-12 rounded-2xl bg-white dark:bg-dark-secondary border-transparent focus:ring-brand-500/10 dark:text-text-primary" />
                                          </div>
                                       </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-6 rounded-3xl border-2 border-brand-500/20 bg-brand-500/5 dark:bg-brand-500/10 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.1)]">
                                       <div className="flex items-center gap-5">
                                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-xl shadow-brand-500/20">
                                             <ShieldAlert size={24} />
                                          </div>
                                          <div>
                                             <p className="text-[11px] font-black uppercase tracking-widest text-brand-600 dark:text-brand-400">Two-Factor Authentication (2FA)</p>
                                             <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-text-secondary opacity-70 tracking-tight leading-relaxed">Add an extra layer of security to your account.</p>
                                          </div>
                                       </div>
                                       <Button variant="outline" className="rounded-2xl h-11 px-6 font-black uppercase tracking-widest text-[9px] border-brand-500/20 text-brand-600 dark:text-brand-400 hover:bg-brand-500 hover:text-white transition-all">Initialize</Button>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                       <Button className="rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-[10px]">Update Password</Button>
                                    </div>
                                 </CardContent>
                              </Card>
                           </section>
                        </motion.div>
                    )}
                  </AnimatePresence>
                </main>
            </div>
        </div>
    );
};
