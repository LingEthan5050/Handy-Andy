import React from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { InquiryRecord } from '@/types/inquiry';
import { formatDate } from '@/lib/utils/date';
import Link from 'next/link';

interface InquiryTableProps {
  inquiries: InquiryRecord[];
  activeStatus?: string;
}

export default function InquiryTable({ inquiries, activeStatus }: InquiryTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        <div className="p-6 border-b border-stone-200">
          <h3 className="text-lg font-semibold text-stone-900">Recent Inquiries</h3>
          <p className="text-sm text-stone-500">Latest customer contact requests.</p>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Inquiry Type</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-sm">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-stone-500">
                  {activeStatus 
                    ? `No ${activeStatus.toLowerCase()} inquiries found.` 
                    : 'No inquiries found.'}
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900">{inquiry.name}</td>
                  <td className="px-6 py-4 text-stone-600">{inquiry.email}</td>
                  <td className="px-6 py-4 text-stone-600">{inquiry.inquiry}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={inquiry.status} />
                  </td>
                  <td className="px-6 py-4 text-stone-500">{formatDate(inquiry.createdAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded transition-colors" 
                        title="See Details"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
