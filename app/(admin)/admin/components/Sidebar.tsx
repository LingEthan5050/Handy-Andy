'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Users, Settings, Hammer, X } from 'lucide-react';
import AdminProfile from './AdminProfile';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { name: 'Admin Users', href: '#', icon: Users, disabled: true },
  { name: 'Settings', href: '#', icon: Settings, disabled: true },
];

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
       <aside className={`
         fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-stone-200 flex flex-col transition-transform duration-300 ease-in-out
         lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
       `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#c65b37] p-1.5 rounded-lg">
              <Hammer className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-stone-900 text-lg tracking-tight">HandyANDY</span>
          </div>
          <button 
            onClick={closeSidebar} 
            className="lg:hidden p-2 text-stone-400 hover:text-stone-600 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.disabled 
                    ? 'text-stone-400 cursor-not-allowed pointer-events-none' 
                    : isActive 
                      ? 'bg-stone-100 text-stone-900' 
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-stone-900' : 'text-stone-400'}`} />
                <span className="flex-1">{item.name}</span>
                {item.disabled && <span className="text-[10px] uppercase opacity-50">Soon</span>}
              </Link>
            );
          })}
        </nav>

        <AdminProfile />
      </aside>
    </>
  );
}
