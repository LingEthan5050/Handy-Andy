'use client'

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { InquiryStatus } from "@/generated/prisma/enums";

interface InquiryFilterProps {
  baseUrl: string;
}

export default function InquiryFilter({ baseUrl }: InquiryFilterProps) {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') || 'ALL';

  const filters: { label: string; value: string }[] = [
    { label: 'All', value: 'ALL' },
    { label: 'New', value: InquiryStatus.NEW },
    { label: 'Contacted', value: InquiryStatus.CONTACTED },
    { label: 'Closed', value: InquiryStatus.CLOSED },
  ];

  const createFilterUrl = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === 'ALL') {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    // Reset to page 1 when changing filter
    params.set('page', '1');
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
      {filters.map((filter) => {
        const isActive = currentStatus === filter.value;
        return (
          <Link
            key={filter.value}
            href={createFilterUrl(filter.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              isActive 
                ? 'bg-stone-900 text-white shadow-sm' 
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}
