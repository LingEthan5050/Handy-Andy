import React from 'react';
import { InquiryStatus } from "@/generated/prisma/enums";

interface StatusBadgeProps {
  status: InquiryStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusMap: Record<InquiryStatus, { label: string; style: string }> = {
    NEW: { 
      label: 'New', 
      style: 'bg-blue-100 text-blue-700 border-blue-200' 
    },
    CONTACTED: { 
      label: 'Contacted', 
      style: 'bg-yellow-100 text-yellow-700 border-yellow-200' 
    },
    CLOSED: { 
      label: 'Closed', 
      style: 'bg-green-100 text-green-700 border-green-200' 
    },
  };

  const { label, style } = statusMap[status];

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      {label}
    </span>
  );
}
