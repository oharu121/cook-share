import type { Ingredient, Prisma } from "@prisma/client";
import { cache } from "react";
import { getUser } from "../dal/user";
import { userSelect } from "./user.dto";
import { Step, SubRecipe } from "@/types/recipe";

// Define the select type for consistent recipe queries
export const recipeSelect = {
  id: true,
  title: true,
  description: true,
  ingredients: true,
  steps: true,
  cookingTime: true,
  servings: true,
  difficulty: true,
  category: true,
  isPublic: true,
  template: true,
  tags: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  subRecipes: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
} as const;

// Infer the return type from the select
type RecipeSelect = Prisma.RecipeGetPayload<{
  select: typeof recipeSelect;
}>;

// Use the same user type from user.dto
type UserSelect = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

export type RecipeDTO = {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  cookingTime: number;
  servings: number;
  difficulty: string;
  category?: string;
  isPublic: boolean;
  template: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  subRecipes: SubRecipe[];
  author: {
    id: string;
    name: string | null;
    email: string | null;
  } | null;
};

// Permission checks
function canSeeRecipeDetails(
  viewer: UserSelect | null,
  recipe: RecipeSelect,
): boolean {
  if (!viewer) return recipe.isPublic;
  return recipe.isPublic || recipe.createdBy === viewer.id;
}

// DTO transformation functions
export const toRecipeDTO = cache(
  async (recipe: RecipeSelect): Promise<RecipeDTO | null> => {
    const viewer = await getUser();

    if (!canSeeRecipeDetails(viewer, recipe)) {
      return null;
    }

    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients as unknown as Ingredient[],
      steps: recipe.steps as unknown as Step[],
      cookingTime: recipe.cookingTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      category: recipe.category || undefined,
      isPublic: recipe.isPublic,
      template: recipe.template,
      tags: recipe.tags || [],
      createdBy: recipe.createdBy,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
      subRecipes: recipe.subRecipes as unknown as SubRecipe[],
      author: recipe.user
        ? {
            id: recipe.user.id,
            name: recipe.user.name,
            email: viewer?.id === recipe.createdBy ? recipe.user.email : null,
          }
        : null,
    };
  },
);

// Collection DTO
export const toRecipeListDTO = cache(
  async (recipes: RecipeSelect[]): Promise<RecipeDTO[]> => {
    const viewer = await getUser();

    const dtos = await Promise.all(
      recipes
        .filter((recipe) => canSeeRecipeDetails(viewer, recipe))
        .map((recipe) => toRecipeDTO(recipe)),
    );

    return dtos.filter((dto): dto is RecipeDTO => dto !== null);
  },
);
