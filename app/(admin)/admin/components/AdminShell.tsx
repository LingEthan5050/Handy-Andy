'use client'

import type { Session } from "next-auth";
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { AdminProvider } from "@/app/providers/AdminProvider";
import { AuthUser } from "@/types/auth";

interface AdminShellProps {
  children: React.ReactNode;
  user: AuthUser
}

export default function AdminShell({ children, user }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <AdminProvider user={user}>
      <div className="flex min-h-screen bg-stone-50">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </AdminProvider>
  );
}
