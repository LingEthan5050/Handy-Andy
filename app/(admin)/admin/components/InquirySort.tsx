'use client'

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InquirySortOption } from '@/types/inquiry';

interface InquirySortProps {
  baseUrl: string;
}

export default function InquirySort({ baseUrl }: InquirySortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'date_desc';

  const sortOptions: { label: string; value: InquirySortOption }[] = [
    { label: 'Newest First', value: 'date_desc' },
    { label: 'Oldest First', value: 'date_asc' },
    { label: 'Name (A–Z)', value: 'name_asc' },
    { label: 'Name (Z–A)', value: 'name_desc' },
  ];

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    // Reset to page 1 when changing sort
    params.set('page', '1');
    router.push(`${baseUrl}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-stone-500 dark:text-stone-500 whitespace-nowrap">
        Sort by:
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="appearance-none bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 pr-10 pl-3 transition-all"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
