import type { Prisma } from '@prisma/client';
import { cache } from 'react';
import { getUser } from '../dal/user';
import { userSelect } from './user.dto';

// Define the select type for consistent recipe queries
export const recipeSelect = {
  id: true,
  title: true,
  description: true,
  ingredients: true,
  steps: true,
  cookingTime: true,
  difficulty: true,
  isPublic: true,
  createdAt: true,
  createdBy: true,
  user: {
    select: userSelect,
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
  ingredients: any[]; // Parsed from JSON
  steps: any[]; // Parsed from JSON
  cookingTime: number;
  difficulty: string;
  isPublic: boolean;
  createdAt: Date;
  author: {
    name: string | null;
    email: string | null;
  } | null;
};

// Permission checks
function canSeeRecipeDetails(viewer: UserSelect | null, recipe: RecipeSelect): boolean {
  if (!viewer) return recipe.isPublic;
  return recipe.isPublic || recipe.createdBy === viewer.id;
}

// DTO transformation functions
export const toRecipeDTO = cache(async (recipe: RecipeSelect): Promise<RecipeDTO | null> => {
  const viewer = await getUser();
  
  if (!canSeeRecipeDetails(viewer, recipe)) {
    return null;
  }

  return {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    ingredients: JSON.parse(recipe.ingredients as string),
    steps: JSON.parse(recipe.steps as string),
    cookingTime: recipe.cookingTime,
    difficulty: recipe.difficulty,
    isPublic: recipe.isPublic,
    createdAt: recipe.createdAt,
    author: recipe.user ? {
      name: recipe.user.name,
      email: viewer?.id === recipe.createdBy ? recipe.user.email : null,
    } : null,
  };
});

// Collection DTO
export const toRecipeListDTO = cache(async (recipes: RecipeSelect[]): Promise<RecipeDTO[]> => {
  const viewer = await getUser();
  
  const dtos = await Promise.all(
    recipes
      .filter(recipe => canSeeRecipeDetails(viewer, recipe))
      .map(recipe => toRecipeDTO(recipe))
  );

  return dtos.filter((dto): dto is RecipeDTO => dto !== null);
});