import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { User, Shield, Bell, Palette, Globe, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export const SettingsPage: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = React.useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'billing', label: 'Billing', icon: Globe },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-slate-500">Manage your account and platform preferences.</p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
                <aside className="w-full lg:w-64">
                    <nav className="space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    activeTab === tab.id 
                                        ? "bg-white text-brand-600 shadow-sm dark:bg-slate-900 dark:text-brand-400" 
                                        : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
                                )}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                <div className="flex-1 max-w-4xl">
                    {activeTab === 'profile' && (
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl font-bold">Public Profile</h3>
                                <p className="text-sm text-slate-500">This information will be displayed to other team members.</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                                    <div className="h-24 w-24 overflow-hidden rounded-2xl bg-brand-100 dark:bg-slate-800">
                                        <img src={user?.avatar} alt={user?.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="space-y-2">
                                        <Button size="sm">Change Photo</Button>
                                        <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <Input label="Full Name" defaultValue={user?.name} />
                                    <Input label="Email Address" defaultValue={user?.email} />
                                    <Input label="Job Title" placeholder="e.g. Senior Developer" />
                                    <Input label="Role" defaultValue={user?.role} disabled />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Bio</label>
                                    <textarea 
                                        className="min-h-[100px] w-full rounded-lg border border-slate-200 bg-white p-3 text-sm focus:ring-2 focus:ring-brand-500 dark:border-slate-800 dark:bg-slate-950"
                                        placeholder="Tell us a bit about yourself..."
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button>Save Changes</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'security' && (
                        <Card>
                           <CardHeader>
                                <h3 className="text-xl font-bold">Security Settings</h3>
                                <p className="text-sm text-slate-500">Ensure your account is protected with strong credentials.</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <Input label="Current Password" type="password" />
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Input label="New Password" type="password" />
                                        <Input label="Confirm New Password" type="password" />
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between p-4 rounded-xl border border-amber-100 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-900/50">
                                   <div className="flex items-center gap-3">
                                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                                          <Lock size={18} className="text-amber-700 dark:text-amber-400" />
                                       </div>
                                       <div>
                                          <p className="text-sm font-bold text-amber-900 dark:text-amber-400">Two-factor Authentication</p>
                                          <p className="text-xs text-amber-700 dark:text-amber-500">Add an extra layer of security to your account.</p>
                                       </div>
                                   </div>
                                   <Button variant="outline" size="sm">Enable</Button>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button>Update Security</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};
