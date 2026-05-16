export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  role: 'Admin' | 'Member';
  status: 'online' | 'offline';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  team: string;
  progress: number;
  members: string[]; // User IDs
  status: 'active' | 'completed' | 'on-hold';
  deadline: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  assigneeId: string;
  deadline: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface AppSettings {
  darkMode: boolean;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
}
