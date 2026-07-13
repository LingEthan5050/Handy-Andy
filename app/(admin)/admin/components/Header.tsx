import React from 'react';
import { Bell, Menu } from 'lucide-react';
import RefreshButton from './RefreshButton';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="h-16 border-b border-stone-200 bg-white flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-stone-900">Dashboard</h2>
          <p className="hidden sm:block text-xs text-stone-500">Manage customer inquiries and monitor activity.</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <RefreshButton />
        <div className="hidden md:block text-right">
          <p className="text-xs font-medium text-stone-900">{today}</p>
        </div>
        <button className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-50 rounded-full relative transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-stone-200 overflow-hidden">
          <img 
            src="https://ui-avatars.com/api/?name=Admin&background=random" 
            alt="Admin" 
          />
        </div>
      </div>
    </header>
  );
}
