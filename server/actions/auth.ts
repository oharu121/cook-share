"use server";

import { createSession, deleteSession } from "@/server/lib/session";
import {
  SignupFormSchema,
  LoginFormSchema,
} from "@/client/lib/validations/auth";
import { prisma } from "@/server/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function signup(
  state:
    | {
        message?: string;
        errors?: {
          name?: string[];
          email?: string[];
          password?: string[];
        };
        success?: boolean;
      }
    | undefined,
  payload?: FormData,
): Promise<{
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  success?: boolean;
  redirectPath?: string;
}> {
  if (!payload) {
    return {
      message: "Invalid request. No data provided.",
      success: false,
    };
  }

  const rawFormData = {
    email: payload.get("email"),
    password: payload.get("password"),
    name: payload.get("name"),
  };

  // Validate input
  const result = SignupFormSchema.safeParse(rawFormData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { email, password, name } = result.data;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        message: "User with this email already exists.",
        success: false,
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        defaultPublic: false,
        emailNotifications: true,
        darkMode: false,
      },
    });
    await createSession({ email, id: user.id });

    // Return the redirect path instead of calling `redirect()`
    return { success: true, redirectPath: "/recipes" };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      message: "Something went wrong. Please try again.",
      success: false,
    };
  }
}

export async function logout(
  state:
    | { message?: string; success?: boolean; redirectPath?: string }
    | undefined,
): Promise<{ message?: string; success?: boolean; redirectPath?: string }> {
  try {
    await deleteSession();
    return { success: true, redirectPath: "/login" };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      message: "Failed to log out. Please try again.",
      success: false,
      redirectPath: "/login",
    };
  }
}

export async function login(
  state:
    | {
        errors?: { email?: string[]; password?: string[] };
        message?: string;
        redirectPath?: string;
        success?: boolean;
      }
    | undefined,
  formData?: FormData,
): Promise<{
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
  redirectPath?: string;
  success?: boolean;
}> {
  if (!formData) {
    return {
      message: "Invalid request. No data provided.",
      success: false,
      redirectPath: undefined,
    };
  }

  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Validate input
  const result = LoginFormSchema.safeParse(rawFormData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
      redirectPath: undefined,
    };
  }

  const { email, password } = result.data;
  let redirectPath: string | undefined = undefined;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user || !user.password) {
      return { message: "Invalid credentials", success: false, redirectPath };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { message: "Invalid credentials", success: false, redirectPath };
    }

    await createSession({ email, id: user.id });

    redirectPath = "/recipes";
    return { success: true, redirectPath };
  } catch (error) {
    console.error("Login error:", error);
    return {
      message: "Something went wrong. Please try again.",
      success: false,
      redirectPath,
    };
  }
}
