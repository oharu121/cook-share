import { cache } from 'react';
import { Prisma, PrismaClient } from '@prisma/client';
import { verifySession } from '@/server/lib/session';
import { userSelect } from '@/server/dto/user.dto';

const prisma = new PrismaClient();
/**
 * Retrieves the authenticated user from the database.
 * If no session is found, returns null.
 */
export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    return await prisma.user.findUnique({
      where: { id: session.id },
      select: userSelect,
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
});

export const updateUser = async (data: Prisma.UserUpdateInput) => {
  const session = await verifySession();
  if (!session) return null;

  try {
    return await prisma.user.update({
      where: { id: session.id },
      data,
      select: userSelect,
    });
  } catch (error) {
    console.error('Failed to update user:', error);
    return null;
  }
};
