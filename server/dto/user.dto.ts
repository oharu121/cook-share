import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { getUser } from "@/server/dal/user";

// Define the select type for consistent user queries
export const userSelect = {
  id: true,
  name: true,
  email: true,
  defaultPublic: true,
  emailNotifications: true,
  darkMode: true,
} as const;

// Infer the return type from the select
type UserSelect = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

export type UserDTO = {
  id: string;
  name: string | null;
  email: string | null;
  preferences: {
    darkMode: boolean;
    emailNotifications: boolean;
  };
};

// Permission checks
function canSeeEmail(viewer: UserSelect | null, user: UserSelect): boolean {
  if (!viewer) return false;
  return viewer.id === user.id;
}

// DTO transformation
export const toUserDTO = cache(async (user: UserSelect): Promise<UserDTO> => {
  const viewer = await getUser();

  return {
    id: user.id,
    name: user.name,
    email: canSeeEmail(viewer, user) ? user.email : null,
    preferences: {
      darkMode: user.darkMode,
      emailNotifications: user.emailNotifications,
    },
  };
});
