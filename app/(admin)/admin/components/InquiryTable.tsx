import React from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

const placeholderInquiries = [
  { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Kitchen Remodel', status: 'New' as const, date: '2026-07-08' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'Bathroom Fix', status: 'Contacted' as const, date: '2026-07-07' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', type: 'Deck Repair', status: 'Closed' as const, date: '2026-07-06' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', type: 'Painting', status: 'New' as const, date: '2026-07-05' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', type: 'Flooring', status: 'Contacted' as const, date: '2026-07-04' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', type: 'General Repair', status: 'New' as const, date: '2026-07-03' },
];

export default function InquiryTable() {
  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-stone-200">
        <h3 className="text-lg font-semibold text-stone-900">Recent Inquiries</h3>
        <p className="text-sm text-stone-500">Latest customer contact requests.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Inquiry Type</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-sm">
            {placeholderInquiries.map((inquiry) => (
              <tr key={inquiry.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4 font-medium text-stone-900">{inquiry.name}</td>
                <td className="px-6 py-4 text-stone-600">{inquiry.email}</td>
                <td className="px-6 py-4 text-stone-600">{inquiry.type}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={inquiry.status} />
                </td>
                <td className="px-6 py-4 text-stone-500">{inquiry.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded transition-colors" title="View">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded transition-colors" title="Edit Status">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
