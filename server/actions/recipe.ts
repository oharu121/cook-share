"use server";

import { Recipe } from "@/types/recipe";
import { getUser } from "@/server/dal/user";
import { prisma } from "@/server/db";
import { Prisma } from "@prisma/client";

export async function createRecipe(recipeData: Partial<Recipe>) {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Prepare the data according to Prisma's schema
    const { user: _, ...recipeWithoutUser } = recipeData;

    const recipe = await prisma.recipe.create({
      data: {
        title: recipeWithoutUser.title || "",
        description: recipeWithoutUser.description || "",
        cookingTime: recipeWithoutUser.cookingTime || 0,
        servings: recipeWithoutUser.servings || 1,
        difficulty: recipeWithoutUser.difficulty || "medium",
        category: recipeWithoutUser.category,
        isPublic: recipeWithoutUser.isPublic || false,
        template: recipeWithoutUser.template || false,
        tags: recipeWithoutUser.tags || [],
        createdBy: user.id,
        ingredients:
          (recipeWithoutUser.ingredients as unknown as Prisma.JsonArray) || [],
        steps: (recipeWithoutUser.steps as unknown as Prisma.JsonArray) || [],
        subRecipes:
          (recipeWithoutUser.subRecipes as unknown as Prisma.JsonArray) || [],
      },
    });

    return recipe;
  } catch (error) {
    console.error("Failed to create recipe:", error);
    throw error;
  }
}

// Add the updateRecipe function
export async function updateRecipe(id: string, recipeData: Partial<Recipe>) {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Prepare the data according to Prisma's schema
    const { user: _, ...recipeWithoutUser } = recipeData;
    console.log("recipeWithoutUser: ", recipeWithoutUser);
    const updatedRecipe = await prisma.recipe.update({
      where: { id, createdBy: user.id }, // Ensure the user owns the recipe
      data: {
        title: recipeWithoutUser.title || "",
        description: recipeWithoutUser.description || "",
        cookingTime: recipeWithoutUser.cookingTime || 0,
        servings: recipeWithoutUser.servings || 1,
        difficulty: recipeWithoutUser.difficulty || "medium",
        category: recipeWithoutUser.category,
        isPublic: recipeWithoutUser.isPublic || false,
        template: recipeWithoutUser.template || false,
        tags: recipeWithoutUser.tags || [],
        ingredients:
          (recipeWithoutUser.ingredients as unknown as Prisma.JsonArray) || [],
        steps: (recipeWithoutUser.steps as unknown as Prisma.JsonArray) || [],
        subRecipes:
          (recipeWithoutUser.subRecipes as unknown as Prisma.JsonArray) || [],
      },
    });

    return updatedRecipe;
  } catch (error) {
    console.error("Failed to update recipe:", error);
    throw error;
  }
}
