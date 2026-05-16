/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ProjectList } from './pages/projects/ProjectList';
import { TaskBoard } from './pages/tasks/TaskBoard';
import { TeamPage } from './pages/team/TeamPage';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { CalendarPage } from './pages/calendar/CalendarPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

import { DataProvider } from './context/DataContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <Router>
              <Toaster position="top-right" expand={false} richColors />
              <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectList />} />
              <Route path="projects/:id" element={<div>Project Details (Coming Soon)</div>} />
              <Route path="tasks" element={<TaskBoard />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
            </Router>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

