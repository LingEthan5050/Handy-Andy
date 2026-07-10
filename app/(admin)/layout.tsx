'use client'

import React, { useState } from 'react';
import Sidebar from './admin/components/Sidebar';
import Header from './admin/components/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-stone-50">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
