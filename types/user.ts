import { Recipe } from "./recipe";

export interface User {
  id: string;
  name: string | null;
  email: string;
  bio: string | null;
  defaultPublic: boolean;
  emailNotifications: boolean;
  darkMode: boolean;
  recipes?: Recipe[];
  createdAt: Date;
  updatedAt: Date;
} 