"use server";

import { requireAdmin } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary/cloudinary";

interface UpdateAvatarInput {
    image: string;
    publicId: string;
}

export async function updateAvatarAction({
    image,
    publicId,
}: UpdateAvatarInput) {
    const user = await requireAdmin();

    // Get the previous Cloudinary image
    const currentUser = await prisma.user.findUnique({
        where: {
            email: user.email!,
        },
            select: {
            cloudinaryPublicId: true,
        },
    });

    // Update the user first
    await prisma.user.update({
        where: {
        email: user.email!,
        },
        data: {
        image,
        cloudinaryPublicId: publicId,
        },
    });

    // Delete the old avatar after a successful update
    if (currentUser?.cloudinaryPublicId) {
        try {
        await cloudinary.uploader.destroy(currentUser.cloudinaryPublicId);
        } catch (error) {
        console.error("Failed to delete old avatar:", error);
        }
    }

    revalidatePath("/admin/settings");
    return { success: true };
}