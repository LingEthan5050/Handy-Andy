'use client'

import React, { useState } from 'react';
import { updateStatusAction } from '@/app/(admin)/admin/actions/actions';
import { InquiryStatus } from "@/generated/prisma/enums";

interface StatusUpdateProps {
  inquiryId: number;
  currentStatus: InquiryStatus;
}

export default function StatusUpdate({ inquiryId, currentStatus }: StatusUpdateProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: InquiryStatus) => {
    if (newStatus === currentStatus) return;

    setIsUpdating(true);
    try {
      const result = await updateStatusAction(inquiryId, newStatus);
      if (!result.success) {
        alert(result.error);
      }
    } catch (error) {
      alert('An unexpected error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value as InquiryStatus)}
        disabled={isUpdating}
        className="cursor-pointer bg-white border border-stone-200 text-stone-700 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block p-2 transition-all disabled:opacity-50"
      >
        {Object.values(InquiryStatus).map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
      {isUpdating && (
        <div className="h-4 w-4 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
      )}
    </div>
  );
}
