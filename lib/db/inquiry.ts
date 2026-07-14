import { prisma } from './prisma';
import { ContactInquiry } from '@/types/contact';
import { InquiryRecord, GetInquiriesOptions } from '@/types/inquiry';
import { InquiryStatus } from "@/generated/prisma/enums";

export async function createInquiry(data: ContactInquiry) {
  return await prisma.inquiry.create({
    data: {
        inquiry: data.inquiry,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
    },
  });
}

export async function getInquiryById(id: number) {
  return await prisma.inquiry.findUnique({
    where: { id },
  });
}

export async function updateInquiryStatus(id: number, status: InquiryStatus) {
  return await prisma.inquiry.update({
    where: { id },
    data: { status },
  });
}

export async function deleteInquiry(id: number) {
  return await prisma.inquiry.delete({
    where: { id },
  });
}

export async function getInquiries(options: GetInquiriesOptions = {}) {
  const page = Math.max(1, options.page || 1);
  const pageSize = options.pageSize || 10;
  const skip = (page - 1) * pageSize;

  // Resolve sorting
  let orderBy: any = { createdAt: 'desc' }; // default
  if (options.sort) {
    switch (options.sort) {
      case 'date_asc':
        orderBy = { createdAt: 'asc' };
        break;
      case 'name_asc':
        orderBy = { name: 'asc' };
        break;
      case 'name_desc':
        orderBy = { name: 'desc' };
        break;
      case 'date_desc':
        orderBy = { createdAt: 'desc' };
        break;
    }
  } else if (options.orderBy) {
    orderBy = options.orderBy;
  }

  const where: any = {};
  
  // Validate and apply status filter
  if (options.status) {
    const validStatuses = Object.values(InquiryStatus) as string[];
    if (validStatuses.includes(options.status)) {
      where.status = options.status;
    }
  }

  if (options.search) {
    where.OR = [
      { name: { contains: options.search, mode: 'insensitive' } },
      { email: { contains: options.search, mode: 'insensitive' } },
    ];
  }

  const [inquiries, totalCount] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        inquiry: true,
        status: true,
        createdAt: true,
      },
      orderBy,
      take: pageSize,
      skip,
    }),
    prisma.inquiry.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    inquiries: inquiries as unknown as InquiryRecord[],
    totalCount,
    totalPages,
    currentPage: page,
  };
}
