import { InquiryStatus, InquiryType } from "@/generated/prisma/enums";

export interface InquiryRecord {
  id: number;
  name: string;
  email: string;
  inquiry: InquiryType;
  status: InquiryStatus;
  createdAt: Date;
}

export type InquirySortOption = 'date_desc' | 'date_asc' | 'name_asc' | 'name_desc';

export interface GetInquiriesOptions {
  page?: number;
  pageSize?: number;
  sort?: InquirySortOption;
  orderBy?: {
    createdAt: 'asc' | 'desc';
    name?: 'asc' | 'desc';
  };
  status?: InquiryStatus;
  search?: string;
}

export interface PaginatedInquiries {
  inquiries: InquiryRecord[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
