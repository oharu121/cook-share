import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignupFormSchema } from "@/lib/validations/auth";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = SignupFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, name } = result.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with default values
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        defaultPublic: false,
        emailNotifications: true,
        darkMode: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        defaultPublic: true,
        emailNotifications: true,
        darkMode: true,
      },
    });

    return NextResponse.json(user);

  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
} 