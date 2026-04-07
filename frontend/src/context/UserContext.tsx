import React, { createContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Para MVP, usando um usuário mock. Em produção, integrar com autenticação
  const [user] = useState<User>({
    id: import.meta.env.VITE_USER_ID || 'demo-user-123',
    name: 'Demo User',
    email: 'demo@featurebridge.ai',
  });

  return (
    <UserContext.Provider value={{ user, setUser: () => {}, isLoggedIn: !!user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
