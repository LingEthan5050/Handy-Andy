import { prisma } from './prisma';
import { ContactInquiry } from '@/types/contact';

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
