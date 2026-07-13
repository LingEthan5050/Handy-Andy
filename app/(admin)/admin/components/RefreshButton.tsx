'use client'

import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { RotateCw } from 'lucide-react';

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      className="cursor-pointer flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RotateCw className={`h-3.5 w-3.5 ${isPending ? 'animate-spin' : ''}`} />
      <span className="hidden sm:inline">{isPending ? 'Refreshing...' : 'Refresh'}</span>
    </button>
  );
}
