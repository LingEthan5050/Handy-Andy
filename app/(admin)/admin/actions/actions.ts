'use server'

import { revalidatePath } from 'next/cache';
import { updateInquiryStatus, deleteInquiry } from '@/lib/db/inquiry';
import { InquiryStatus } from "@/generated/prisma/enums";
import { requireAdmin } from '@/lib/auth/guard';

export async function updateStatusAction(id: number, status: InquiryStatus) {
  await requireAdmin();
  
  try {
    await updateInquiryStatus(id, status);
    revalidatePath(`/admin/inquiries/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to update status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}


export async function deleteInquiryAction(id: number) {
  await requireAdmin();

  await deleteInquiry(id);

  revalidatePath("/admin");

  return { success: true };
}
