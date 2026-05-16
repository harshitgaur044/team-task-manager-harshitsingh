import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { storage } from '../lib/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  signup: (name: string, email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = storage.auth.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = storage.users.get();
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      storage.auth.setCurrentUser(foundUser);
      setUser(foundUser);
    } else {
      throw new Error('User signal not detected. Please verify credentials.');
    }
    setIsLoading(false);
  };

  const signup = async (name: string, email: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const existingUsers = storage.users.get();
    if (existingUsers.some(u => u.email === email)) {
      throw new Error('Identity already exists in workspace.');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'Member',
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      status: 'online'
    };

    storage.users.add(newUser);
    storage.auth.setCurrentUser(newUser);
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    storage.auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
