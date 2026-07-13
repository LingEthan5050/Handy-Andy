import { prisma } from './prisma';
import { InquiryStatus } from "@/generated/prisma/enums";

export interface DashboardStats {
  newInquiries: number;
  contactedInquiries: number;
  closedInquiries: number;
  totalInquiries: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const stats = await prisma.inquiry.groupBy({
    by: ['status'],
    _count: {
      _all: true,
    },
  });

  const totalCount = await prisma.inquiry.count();

  // Initialize counts
  const counts: Record<InquiryStatus, number> = {
    NEW: 0,
    CONTACTED: 0,
    CLOSED: 0,
  };

  // Fill counts from group by result
  stats.forEach((group) => {
    if (group.status) {
      counts[group.status] = group._count._all;
    }
  });

  return {
    newInquiries: counts.NEW,
    contactedInquiries: counts.CONTACTED,
    closedInquiries: counts.CLOSED,
    totalInquiries: totalCount,
  };
}
