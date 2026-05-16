import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, Task, User, Notification, Activity } from '../types';
import { storage } from '../lib/storage';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

interface DataContextType {
  projects: Project[];
  tasks: Task[];
  users: User[];
  notifications: Notification[];
  activities: Activity[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addActivity: (action: string, target: string) => void;
  markNotificationAsRead: (id: string) => void;
  updateUserInfo: (userId: string, data: Partial<User>) => void;
  currentUser: User | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: currentUser } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const refreshData = useCallback(() => {
    setProjects(storage.getProjects());
    setTasks(storage.getTasks());
    setUsers(storage.getUsers());
    setNotifications(storage.getNotifications());
    setActivities(storage.getActivities());
  }, []);

  useEffect(() => {
    storage.init();
    refreshData();
  }, [refreshData, currentUser]); // Refresh when user changes

  const addActivity = useCallback((action: string, target: string) => {
    if (!currentUser) return;
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      action,
      target,
      timestamp: new Date().toISOString(),
    };
    storage.addActivity(newActivity);
    setActivities(prev => [newActivity, ...prev]);
  }, [currentUser]);

  const addProject = useCallback((projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: `p${Math.random().toString(36).substr(2, 9)}`,
    };
    storage.addProject(newProject);
    refreshData();
    addActivity('created project', newProject.name);
    toast.success('Project created successfully');
  }, [addActivity, refreshData]);

  const updateProject = useCallback((project: Project) => {
    storage.updateProject(project);
    refreshData();
    toast.success('Project updated');
  }, [refreshData]);

  const deleteProject = useCallback((id: string) => {
    const project = storage.getProjects().find(p => p.id === id);
    storage.deleteProject(id);
    refreshData();
    if (project) addActivity('deleted project', project.name);
    toast.error('Project deleted');
  }, [addActivity, refreshData]);

  const addTask = useCallback((taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: `t${Math.random().toString(36).substr(2, 9)}`,
    };
    storage.addTask(newTask);
    refreshData();
    addActivity('created task', newTask.title);
    
    // Add notification for assignee
    const assignee = storage.getUsers().find(u => u.id === newTask.assigneeId);
    if (assignee && currentUser && assignee.id !== currentUser.id) {
        const notification: Notification = {
            id: `n${Math.random().toString(36).substr(2, 9)}`,
            title: 'New Task Assigned',
            message: `${currentUser.name} assigned "${newTask.title}" to you.`,
            time: 'Just now',
            timestamp: new Date().toISOString(),
            read: false,
            type: 'info'
        };
        storage.addNotification(notification);
        refreshData();
    }
    
    toast.success('Task created');
  }, [currentUser, addActivity, refreshData]);

  const updateTask = useCallback((task: Task) => {
    const oldTask = storage.getTasks().find(t => t.id === task.id);
    storage.updateTask(task);
    refreshData();
    
    if (oldTask && oldTask.status !== task.status) {
        addActivity(`changed status to ${task.status} for`, task.title);
    }
  }, [addActivity, refreshData]);

  const deleteTask = useCallback((id: string) => {
    storage.deleteTask(id);
    refreshData();
    toast.error('Task deleted');
  }, [refreshData]);

  const updateUserInfo = useCallback((userId: string, data: Partial<User>) => {
    const allUsers = storage.getUsers();
    const updatedUsers = allUsers.map(u => u.id === userId ? { ...u, ...data } : u);
    storage.saveUsers(updatedUsers);
    
    // If updating current user, refresh auth too
    if (currentUser?.id === userId) {
      const updatedUser = { ...currentUser, ...data };
      storage.auth.setCurrentUser(updatedUser);
    }
    
    refreshData();
  }, [currentUser, refreshData]);

  const markNotificationAsRead = useCallback((id: string) => {
    const currentNotifications = storage.getNotifications();
    const updated = currentNotifications.map(n => n.id === id ? { ...n, read: true } : n);
    storage.saveNotifications(updated);
    setNotifications(updated);
  }, []);

  return (
    <DataContext.Provider value={{
      projects,
      tasks,
      users,
      notifications,
      activities,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      deleteTask,
      addActivity,
      markNotificationAsRead,
      updateUserInfo,
      currentUser
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
