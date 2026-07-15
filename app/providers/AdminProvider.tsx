'use client'

import { AuthUser } from "@/types/auth";
import { createContext, ReactNode, useContext } from "react";

interface AdminProviderProps {
  user: AuthUser;
  children: ReactNode;
}

const AdminContext = createContext<AuthUser | null>(null);

export function AdminProvider({ user, children }: AdminProviderProps) {
  return (
    <AdminContext.Provider value={user}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const user = useContext(AdminContext);

  if (!user) {
    throw new Error('useAdmin must be used within an AdminProvider.');
  }

  return user;
}