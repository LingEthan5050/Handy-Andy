'use client'

import React, { useState } from 'react';
import { deleteInquiryAction } from '@/app/(admin)/admin/actions/actions';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DeleteInquiryProps {
  inquiryId: number;
}

export default function DeleteInquiry({ inquiryId }: DeleteInquiryProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteInquiryAction(inquiryId);

      if (result.success) {
        router.replace("/admin");
        router.refresh();
      }
    } catch (error) {
      alert("Failed to delete inquiry");
      setIsConfirming(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isConfirming) {
    return (
      <button
        onClick={() => setIsConfirming(true)}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
      >
        <Trash2 className="h-4 w-4" />
        Delete Inquiry
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Delete Inquiry?</h3>
          <p className="text-sm text-stone-500 mt-2">
            This action cannot be undone. This inquiry will be permanently removed from the database.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => setIsConfirming(false)}
            disabled={isDeleting}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isDeleting && <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
