import { User } from "./user";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  cookingTime: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  category?: string;
  isPublic: boolean;
  template: boolean;
  clonedFrom?: string;
  createdBy: string;
  user?: User;
  tags: string[];
  subRecipes: SubRecipe[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export interface Step {
  id: string;
  order: number;
  description: string;
  image?: string;
  usedIngredients: string[]; // Array of ingredient IDs used in this step
}

export interface SubRecipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  steps: Step[];
}

export interface IngredientMaster {
  id: string;
  name: string;
  allowedUnits: string[];
  commonNames: string[]; // For partial search
}
