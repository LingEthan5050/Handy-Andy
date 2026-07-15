import { getInquiries } from "@/lib/db/inquiry";
import { getDashboardStats } from "@/lib/db/stats";
import StatsCard from './components/StatsCard';
import InquiryTable from './components/InquiryTable';
import Pagination from './components/Pagination';
import InquiryFilter from './components/InquiryFilter';
import InquirySort from './components/InquirySort';
import { MessageSquare, CheckCircle2, Clock, LayoutDashboard } from 'lucide-react';
import { InquiryStatus } from "@/generated/prisma/enums";
import { InquirySortOption } from "@/types/inquiry";
import Link from 'next/link';

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const status = typeof params.status === 'string' ? (params.status as InquiryStatus) : undefined;
  const sort = (typeof params.sort === 'string' ? params.sort : 'date_desc') as InquirySortOption;

  const [stats, { inquiries, totalPages, currentPage }] = await Promise.all([
    getDashboardStats(),
    getInquiries({
      page,
      pageSize: 5,
      status,
      sort,
    }),
  ]);

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard 
          title="New Inquiries" 
          value={stats.newInquiries.toString()} 
          description="Awaiting response" 
          icon={Clock} 
        />
        <StatsCard 
          title="Contacted" 
          value={stats.contactedInquiries.toString()} 
          description="In conversation" 
          icon={MessageSquare} 
        />
        <StatsCard 
          title="Closed" 
          value={stats.closedInquiries.toString()} 
          description="Completed requests" 
          icon={CheckCircle2} 
        />
        <StatsCard 
          title="Total Inquiries" 
          value={stats.totalInquiries.toString()} 
          description="All time requests" 
          icon={LayoutDashboard} 
        />
      </div>

      {/* Inquiries Section */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
          <InquiryTable inquiries={inquiries} activeStatus={status} preview={true}/>
          <div className="flex items-center justify-end px-6 py-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-900 transition-colors group"
            >
              View All
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

