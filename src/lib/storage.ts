import { Project, Task, User, Notification, Activity, AppSettings } from '../types';
import { mockProjects, mockTasks, mockUsers, mockNotifications } from '../data/mockData';

const STORAGE_KEYS = {
  PROJECTS: 'project_manager_projects',
  TASKS: 'project_manager_tasks',
  USERS: 'project_manager_users',
  NOTIFICATIONS: 'project_manager_notifications',
  ACTIVITIES: 'project_manager_activities',
  SETTINGS: 'project_manager_settings',
  AUTH: 'project_manager_auth',
};

export const storage = {
  // Generic getters/setters
  get: <T>(key: string, defaultValue: T): T => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  },
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  // Projects
  getProjects: (): Project[] => storage.get(STORAGE_KEYS.PROJECTS, mockProjects),
  saveProjects: (projects: Project[]) => storage.set(STORAGE_KEYS.PROJECTS, projects),
  addProject: (project: Project) => {
    const projects = storage.getProjects();
    storage.saveProjects([project, ...projects]);
  },
  updateProject: (updatedProject: Project) => {
    const projects = storage.getProjects();
    storage.saveProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  },
  deleteProject: (id: string) => {
    const projects = storage.getProjects();
    storage.saveProjects(projects.filter(p => p.id !== id));
  },

  // Tasks
  getTasks: (): Task[] => storage.get(STORAGE_KEYS.TASKS, mockTasks),
  saveTasks: (tasks: Task[]) => storage.set(STORAGE_KEYS.TASKS, tasks),
  addTask: (task: Task) => {
    const tasks = storage.getTasks();
    storage.saveTasks([task, ...tasks]);
  },
  updateTask: (updatedTask: Task) => {
    const tasks = storage.getTasks();
    storage.saveTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  },
  deleteTask: (id: string) => {
    const tasks = storage.getTasks();
    storage.saveTasks(tasks.filter(t => t.id !== id));
  },

  // Users
  getUsers: (): User[] => storage.get(STORAGE_KEYS.USERS, mockUsers),
  saveUsers: (users: User[]) => storage.set(STORAGE_KEYS.USERS, users),
  addUser: (user: User) => {
    const users = storage.getUsers();
    storage.saveUsers([...users, user]);
  },

  // Notifications
  getNotifications: (): Notification[] => storage.get(STORAGE_KEYS.NOTIFICATIONS, mockNotifications),
  saveNotifications: (notifications: Notification[]) => storage.set(STORAGE_KEYS.NOTIFICATIONS, notifications),
  addNotification: (notification: Notification) => {
    const notifications = storage.getNotifications();
    storage.saveNotifications([notification, ...notifications]);
  },

  // Activities
  getActivities: (): Activity[] => storage.get(STORAGE_KEYS.ACTIVITIES, []),
  saveActivities: (activities: Activity[]) => storage.set(STORAGE_KEYS.ACTIVITIES, activities),
  addActivity: (activity: Activity) => {
    const activities = storage.getActivities();
    storage.saveActivities([activity, ...activities.slice(0, 49)]); // Keep last 50
  },

  // Settings
  getSettings: (): AppSettings => storage.get(STORAGE_KEYS.SETTINGS, {
    darkMode: false,
    notificationsEnabled: true,
    emailNotifications: false,
  }),
  saveSettings: (settings: AppSettings) => storage.set(STORAGE_KEYS.SETTINGS, settings),

  // Auth
  getAuth: () => storage.get<{ user: User | null }>(STORAGE_KEYS.AUTH, { user: null }),
  setAuth: (user: User | null) => storage.set(STORAGE_KEYS.AUTH, { user }),

  auth: {
    getCurrentUser: () => storage.getAuth().user,
    setCurrentUser: (user: User | null) => storage.setAuth(user),
    logout: () => storage.setAuth(null),
  },

  users: {
    get: (): User[] => storage.getUsers(),
    add: (user: User) => storage.addUser(user),
  },

  // Initialize data (for first launch)
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) storage.saveProjects(mockProjects);
    if (!localStorage.getItem(STORAGE_KEYS.TASKS)) storage.saveTasks(mockTasks);
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) storage.saveUsers(mockUsers);
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) storage.saveNotifications(mockNotifications);
  }
};
