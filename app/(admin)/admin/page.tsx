import { requireAdmin } from "@/lib/auth/guard";
import StatsCard from './components/StatsCard';
import InquiryTable from './components/InquiryTable';
import { MessageSquare, CheckCircle2, Clock, LayoutDashboard } from 'lucide-react';

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard 
          title="New Inquiries" 
          value="18" 
          description="Awaiting response" 
          icon={Clock} 
        />
        <StatsCard 
          title="Contacted" 
          value="12" 
          description="In conversation" 
          icon={MessageSquare} 
        />
        <StatsCard 
          title="Closed" 
          value="45" 
          description="Completed requests" 
          icon={CheckCircle2} 
        />
        <StatsCard 
          title="Total Inquiries" 
          value="75" 
          description="All time requests" 
          icon={LayoutDashboard} 
        />
      </div>

      {/* Recent Inquiries Table */}
      <InquiryTable />
    </main>
  );
}
