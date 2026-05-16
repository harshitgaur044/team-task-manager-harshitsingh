import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { storage } from '../lib/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  signup: (name: string, email: string, password?: string) => Promise<void>;
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

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = storage.users.get();
    const foundUser = users.find(u => u.email === email);
    
    // In a real production app, passwords would be hashed and checked server-side.
    // For this local storage simulation, we'll check the password if provided.
    if (foundUser) {
      if (password && foundUser.password && foundUser.password !== password) {
        throw new Error('Invalid email or password.');
      }
      storage.auth.setCurrentUser(foundUser);
      setUser(foundUser);
    } else {
      throw new Error('User account not found.');
    }
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password?: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const existingUsers = storage.users.get();
    if (existingUsers.some(u => u.email === email)) {
      throw new Error('Account with this email already exists.');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      role: 'Member',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
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
