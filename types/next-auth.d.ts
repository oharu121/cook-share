import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    password?: string | null;
    bio?: string | null;
    defaultPublic?: boolean;
    emailNotifications?: boolean;
    darkMode?: boolean;
  }
}
