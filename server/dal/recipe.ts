import { cache } from 'react';
import { verifySession } from '../lib/session';
import { Prisma, PrismaClient } from '@prisma/client';
import { toRecipeDTO, toRecipeListDTO } from '../dto/recipe.dto';

const prisma = new PrismaClient();
/**
 * Retrieves the authenticated user's recipes from the database.
 */
export const getUserRecipes = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const recipes = await prisma.recipe.findMany({
      where: { createdBy: session.id },
      include: {
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return toRecipeListDTO(recipes);
  } catch (error) {
    console.error('Failed to fetch user recipes:', error);
    return null;
  }
});

export const getRecipe = cache(async (id: string) => {
  try {
    return await prisma.recipe.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Failed to fetch recipe:', error);
    return null;
  }
});

export const createRecipe = async (data: Prisma.RecipeCreateInput) => {
  const session = await verifySession();
  if (!session) return null;

  try {
    return await prisma.recipe.create({
      data: {
        ...data,
        user: { connect: { id: session.id } },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Failed to create recipe:', error);
    return null;
  }
};

export const updateRecipe = async (
  id: string, 
  data: Prisma.RecipeUpdateInput
) => {
  const session = await verifySession();
  if (!session) return null;

  try {
    return await prisma.recipe.update({
      where: { id, createdBy: session.id }, // Ensure user owns recipe
      data,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Failed to update recipe:', error);
    return null;
  }
};