import { User, Project, Task, Notification } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alex Rivera', email: 'alex@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', role: 'Admin', status: 'online' },
  { id: 'u2', name: 'Sarah Chen', email: 'sarah@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', role: 'Member', status: 'online' },
  { id: 'u3', name: 'Jordan Smyth', email: 'jordan@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', role: 'Member', status: 'offline' },
  { id: 'u4', name: 'Emma Wilson', email: 'emma@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', role: 'Admin', status: 'online' },
];

export const mockProjects: Project[] = [
  { id: 'p1', name: 'SaaS Dashboard Redesign', description: 'Modernizing the core product interface with better accessibility and performance.', team: 'Product', progress: 65, members: ['u1', 'u2', 'u4'], status: 'active', deadline: '2026-06-15' },
  { id: 'p2', name: 'Mobile App Launch', description: 'Coordinating the cross-platform release for iOS and Android.', team: 'Marketing', progress: 30, members: ['u1', 'u3'], status: 'active', deadline: '2026-07-01' },
  { id: 'p3', name: 'Data Pipeline Optimization', description: 'Improving backend processing speed for ingestion services.', team: 'Engineering', progress: 100, members: ['u2', 'u4'], status: 'completed', deadline: '2026-05-10' },
];

export const mockTasks: Task[] = [
  { id: 't1', projectId: 'p1', title: 'Design System Documentation', description: 'Create comprehensive guide for components.', status: 'Review', priority: 'High', assigneeId: 'u1', deadline: '2026-05-20' },
  { id: 't2', projectId: 'p1', title: 'Auth Service Integration', description: 'Connect frontend to the new OAuth endpoint.', status: 'In Progress', priority: 'Medium', assigneeId: 'u2', deadline: '2026-05-22' },
  { id: 't3', projectId: 'p2', title: 'App Store Marketing Assets', description: 'Generate screenshots and promotional videos.', status: 'To Do', priority: 'Low', assigneeId: 'u3', deadline: '2026-05-25' },
  { id: 't4', projectId: 'p1', title: 'Accessibility Audit', description: 'Ensure WCAG 2.1 compliance across all screens.', status: 'To Do', priority: 'High', assigneeId: 'u4', deadline: '2026-05-30' },
  { id: 't5', projectId: 'p3', title: 'Optimize SQL Queries', description: 'Refactor complex joins in reporting service.', status: 'Completed', priority: 'Medium', assigneeId: 'u2', deadline: '2026-05-05' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'Task Assigned', message: 'Emma assigned "Accessibility Audit" to you.', time: '10m ago', timestamp: new Date(Date.now() - 10 * 60000).toISOString(), read: false, type: 'info' },
  { id: 'n2', title: 'Project Deadline', message: 'SaaS Dashboard Redesign is due in 4 weeks.', time: '2h ago', timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(), read: false, type: 'warning' },
  { id: 'n3', title: 'Deployment Success', message: 'Data Pipeline v2.4 successfully deployed.', time: '5h ago', timestamp: new Date(Date.now() - 5 * 60 * 60000).toISOString(), read: true, type: 'success' },
];
