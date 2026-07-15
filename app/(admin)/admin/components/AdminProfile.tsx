'use client'

import Image from 'next/image';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useAdmin } from '@/app/providers/AdminProvider';


export default function AdminProfile() {
  const user = useAdmin();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const displayRole = user.role.charAt(0) + user.role.slice(1).toLowerCase();
  const displayName = user.name ?? displayRole;
  const displayEmail = user.email ?? '';

  const initials = displayName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
      <div className="mt-auto border-t border-stone-200 dark:border-stone-800 p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-stone-200 text-sm font-semibold text-stone-600 dark:text-stone-400">
            {user.image ? (
              <Image
                src={user.image}
                alt={displayName}
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-stone-900 dark:text-stone-100">
              {displayName}
            </p>

            <p className="truncate text-xs text-stone-500 dark:text-stone-500">
              {displayEmail}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="cursor-pointer group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 transition-colors hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600"
        >
          <LogOut className="h-4 w-4 group-hover:text-red-600" />
          Sign Out
        </button>
      </div>
    );
}
