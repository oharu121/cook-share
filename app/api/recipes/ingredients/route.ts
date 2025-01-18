import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter required" },
      { status: 400 }
    );
  }

  try {
    const ingredients = await prisma.ingredientMaster.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { commonNames: { has: query.toLowerCase() } },
        ],
      },
      take: 10,
    });

    return NextResponse.json(ingredients);
  } catch (error) {
    console.error("Failed to search ingredients:", error);
    return NextResponse.json(
      { error: "Failed to search ingredients" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const ingredient = await prisma.ingredientMaster.create({
      data: {
        name: data.name,
        allowedUnits: data.allowedUnits,
        commonNames: data.commonNames,
      },
    });

    return NextResponse.json(ingredient);
  } catch (error) {
    console.error("Failed to create ingredient:", error);
    return NextResponse.json(
      { error: "Failed to create ingredient" },
      { status: 500 }
    );
  }
}
