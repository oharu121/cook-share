"use server";

import { verifySession } from "@/server/lib/session";
import { revalidatePath } from "next/cache";
import { prisma } from "@/server/db";

export async function updatePreference(key: string, value: boolean) {
  try {
    const session = await verifySession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    await prisma.user.update({
      where: { id: session.id as string },
      data: { [key]: value },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error("Failed to update preference:", error);
    return { success: false, error: "Failed to update preference" };
  }
}
