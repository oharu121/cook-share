import { cache } from 'react';
import type { IngredientMaster } from '@/types/recipe';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const searchIngredients = cache(async (query: string) => {
  try {
    return await prisma.ingredientMaster.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { commonNames: { has: query.toLowerCase() } },
        ],
      },
      take: 10,
    });
  } catch (error) {
    console.error('Failed to search ingredients:', error);
    return null;
  }
});

export const createIngredient = async (data: Partial<IngredientMaster>) => {
  try {
    return await prisma.ingredientMaster.create({
      data: {
        name: data.name!,
        allowedUnits: data.allowedUnits || [],
        commonNames: data.commonNames || [],
      },
    });
  } catch (error) {
    console.error('Failed to create ingredient:', error);
    return null;
  }
}; 