'use client'

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Basic logic to show a few pages around current page
  const showPage = (page: number) => {
    if (page === 1 || page === totalPages) return true;
    if (Math.abs(page - currentPage) <= 1) return true;
    return false;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
      <div className="text-sm text-stone-500 dark:text-stone-500">
        Page <span className="font-medium text-stone-900 dark:text-stone-100">{currentPage}</span> of <span className="font-medium text-stone-900 dark:text-stone-100">{totalPages}</span>
      </div>
      
      <div className="flex items-center gap-1">
        <Link
          href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'}
          className={`p-2 rounded-lg transition-colors ${
            currentPage > 1 
              ? 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800' 
              : 'text-stone-300 pointer-events-none'
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>

        {pages.map((page) => (
          showPage(page) && (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage 
                  ? 'bg-stone-900 text-white' 
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {page}
            </Link>
          )
        ))}

        <Link
          href={currentPage < totalPages ? createPageUrl(currentPage + 1) : '#'}
          className={`p-2 rounded-lg transition-colors ${
            currentPage < totalPages 
              ? 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800' 
              : 'text-stone-300 pointer-events-none'
          }`}
          aria-label="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
