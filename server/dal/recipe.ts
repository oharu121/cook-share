import { cache } from "react";
import { verifySession } from "../lib/session";
import { prisma } from "@/server/db";
import { recipeSelect, toRecipeListDTO } from "../dto/recipe.dto";
import { Prisma } from "@prisma/client";
import { RecipeCategory } from "@/types/recipe";

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
      orderBy: { createdAt: "desc" },
    });

    return toRecipeListDTO(recipes);
  } catch (error) {
    console.error("Failed to fetch user recipes:", error);
    return null;
  }
});

export const getAllRecipes = async (filters?: {
  search?: string;
  difficulty?: string;
  time?: string;
  category?: string;
}) => {
  const whereClause: Prisma.RecipeWhereInput = {};

  if (filters?.search) {
    whereClause.title = { contains: filters.search, mode: "insensitive" };
  }

  if (filters?.difficulty) {
    whereClause.difficulty = filters.difficulty;
  }

  if (filters?.time) {
    if (filters.time === "more") {
      whereClause.cookingTime = { gt: 60 };
    } else {
      const cookingTime = parseInt(filters.time, 10);
      if (!isNaN(cookingTime)) {
        whereClause.cookingTime = { lte: cookingTime };
      }
    }
  }

  if (filters?.category) {
    whereClause.category = filters.category;
  }

  const recipes = await prisma.recipe.findMany({
    where: whereClause,
    select: recipeSelect,
    orderBy: { createdAt: "desc" },
  });

  return toRecipeListDTO(recipes);
};

export async function getRecipe(id: string) {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } }, // Fetch only necessary user fields
    },
  });

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  return {
    ...recipe,
    category: recipe.category as RecipeCategory | undefined, // Ensure TypeScript understands the type
    ingredients: (() => {
      try {
        return Array.isArray(recipe.ingredients)
          ? recipe.ingredients
          : JSON.parse(recipe.ingredients as string);
      } catch {
        return [];
      }
    })() as { id: string; amount: number; unit?: string; name: string }[], // ✅ Ensure correct type
    steps: (() => {
      try {
        return Array.isArray(recipe.steps)
          ? recipe.steps
          : JSON.parse(recipe.steps as string);
      } catch {
        return [];
      }
    })() as { description: string }[], // ✅ Ensure correct type
    subRecipes: (() => {
      try {
        return Array.isArray(recipe.subRecipes)
          ? recipe.subRecipes
          : JSON.parse(recipe.subRecipes as string);
      } catch {
        return [];
      }
    })() as unknown[],
  };
}

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
    console.error("Failed to create recipe:", error);
    return null;
  }
};

export const updateRecipe = async (
  id: string,
  data: Prisma.RecipeUpdateInput,
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
    console.error("Failed to update recipe:", error);
    return null;
  }
};
