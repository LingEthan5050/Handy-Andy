import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/guard';
import { getInquiryById } from '@/lib/db/inquiry';
import { formatDate } from '@/lib/utils/date';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import StatusBadge from '@/app/(admin)/admin/components/StatusBadge';
import StatusUpdate from '@/app/(admin)/admin/components/inquiry-details/StatusUpdate';
import DeleteInquiry from '@/app/(admin)/admin/components/inquiry-details/DeleteInquiry';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ returnTo: string }>;
}

export default async function InquiryDetailPage({ params, searchParams }: PageProps) {
  await requireAdmin();
  
  const { id } = await params;
  const { returnTo = "/admin" } = await searchParams;
  const inquiry = await getInquiryById(parseInt(id));

  if (!inquiry) {
    notFound();
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <Link 
          href="/admin" 
          className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Inquiries
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">{inquiry.name}</h1>
            <p className="text-sm text-stone-500">Inquiry #{inquiry.id}</p>
          </div>
          <StatusBadge status={inquiry.status} />
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <p className="text-sm text-stone-900">{inquiry.email}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <p className="text-sm text-stone-900">{inquiry.phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                Inquiry Type
              </label>
              <p className="text-sm text-stone-900">{inquiry.inquiry}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                Submitted Date
              </label>
              <p className="text-sm text-stone-900">{formatDate(inquiry.createdAt)}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                Last Updated
              </label>
              <p className="text-sm text-stone-900">{formatDate(inquiry.updatedAt)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-stone-200 bg-stone-50/50">
          <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
            Message
          </label>
          <div className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">
            {inquiry.message}
          </div>
        </div>

        <div className="p-6 border-t border-stone-200 bg-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-stone-900">Actions:</span>
              <StatusUpdate inquiryId={inquiry.id} currentStatus={inquiry.status} />
            </div>
            <DeleteInquiry inquiryId={inquiry.id} returnTo={returnTo}/>
          </div>
        </div>
      </div>
    </div>
  );
}
