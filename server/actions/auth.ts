'use server'

import { createSession, deleteSession } from "@/server/lib/session";
import { SignupFormSchema, LoginFormSchema } from "@/client/lib/validations/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function signup(
    state: {
      message?: string;
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      success?: boolean;
    } | undefined,
    payload?: FormData
  ): Promise<{
    message?: string;
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
    };
    success?: boolean;
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
  
      // Redirect after success
      redirect("/profile");
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        message: "Something went wrong. Please try again.",
        success: false,
      };
    }
  }

export async function logout() {
  let redirectPath: string | null = null
  
  try {
    await deleteSession()
    redirectPath = '/login'
  } catch (error) {
    console.error("Logout error:", error);
    redirectPath = '/login'
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }
}

export async function login(
  state: { 
    errors?: { 
      email?: string[]; 
      password?: string[]; 
    }; 
    message?: undefined;
  } | { 
    message: string; 
    errors?: undefined;
  } | undefined,
  formData?: FormData
) {
  if (!formData) {
    return {
      message: "Invalid request. No data provided.",
    };
  }

  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  // Validate input
  const result = LoginFormSchema.safeParse(rawFormData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  let redirectPath: string | null = null

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user || !user.password) {
      return { message: "Invalid credentials" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { message: "Invalid credentials" };
    }

    await createSession({ email, id: user.id });
    redirectPath = '/profile'
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { message: "Something went wrong. Please try again." };
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }
}
