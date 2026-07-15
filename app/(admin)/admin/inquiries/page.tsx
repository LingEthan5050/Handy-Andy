import { requireAdmin } from "@/lib/auth/guard";
import { getInquiries } from "@/lib/db/inquiry";
import InquiryTable from '../components/InquiryTable';
import Pagination from '../components/Pagination';
import InquiryFilter from '../components/InquiryFilter';
import InquirySort from '../components/InquirySort';
import { InquiryStatus } from "@/generated/prisma/enums";
import { InquirySortOption } from "@/types/inquiry";

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();
  
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const status = typeof params.status === 'string' ? (params.status as InquiryStatus) : undefined;
  const sort = (typeof params.sort === 'string' ? params.sort : 'date_desc') as InquirySortOption;

  const { inquiries, totalPages, currentPage } = await getInquiries({
    page,
    pageSize: 10,
    status,
    sort,
  });

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">Inquiry Management</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <InquiryFilter baseUrl="/admin/inquiries" />
            <InquirySort baseUrl="/admin/inquiries" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
          <InquiryTable inquiries={inquiries} activeStatus={status} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            baseUrl="/admin/inquiries" 
          />
        </div>
      </div>
    </main>
  );
}
