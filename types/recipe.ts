export type RecipeCategory =
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Dessert"
  | "Appetizer";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  cookingTime: number;
  servings: number;
  difficulty: string;
  category?: RecipeCategory;
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
  units: Unit[];
  unit?: string; // Selected unit
}

export interface Unit {
  id: string;
  name: string;
  abbreviation?: string;
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

export interface User {
  id: string;
  name: string | null;
  email: string;
  defaultPublic: boolean;
  emailNotifications: boolean;
  darkMode: boolean;
  // Add optional fields if needed
  password?: string | null;
  bio?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
