'use client'

import React from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface AdminProfileProps {
  name: string;
  email: string;
}

export default function AdminProfile({ name, email }: AdminProfileProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="mt-auto p-4 border-t border-stone-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-9 w-9 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 font-semibold text-sm overflow-hidden">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`} 
            alt={name} 
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-stone-900 truncate">{name}</p>
          <p className="text-xs text-stone-500 truncate">{email}</p>
        </div>
      </div>
      <button 
        onClick={handleSignOut}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
      >
        <LogOut className="h-4 w-4 group-hover:text-red-600" />
        Sign Out
      </button>
    </div>
  );
}
