import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  phone?: string;
  profileImage?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('thrift-earth-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in localStorage users
    const users = JSON.parse(localStorage.getItem('thrift-earth-users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser && existingUser.password === password) {
      const userToStore = { ...existingUser };
      delete userToStore.password;
      setUser(userToStore);
      localStorage.setItem('thrift-earth-user', JSON.stringify(userToStore));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (email: string, password: string, username: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('thrift-earth-users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      setIsLoading(false);
      return false; // User already exists
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      username,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem('thrift-earth-users', JSON.stringify(users));
    
    const userToStore = { ...newUser };
    delete userToStore.password;
    setUser(userToStore);
    localStorage.setItem('thrift-earth-user', JSON.stringify(userToStore));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('thrift-earth-user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('thrift-earth-user', JSON.stringify(updatedUser));
    
    // Update in users array too
    const users = JSON.parse(localStorage.getItem('thrift-earth-users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('thrift-earth-users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      updateProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};