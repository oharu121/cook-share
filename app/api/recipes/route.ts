import { NextResponse } from "next/server";
import { verifySession } from "@/server/lib/session";
import {
  recipeSelect,
  toRecipeDTO,
  toRecipeListDTO,
} from "@/server/dto/recipe.dto";
import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const time = searchParams.get("time");
    const search = searchParams.get("search");
    const filter = searchParams.get("filter");

    let where: Prisma.RecipeWhereInput = {
      OR: [{ isPublic: true }, { template: true }],
    };

    // Apply filters
    if (category) {
      where.category = category;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (time) {
      where.cookingTime = {
        lte: parseInt(time),
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (filter === "templates") {
      where = { template: true };
    }

    const recipes = await prisma.recipe.findMany({
      where,
      select: recipeSelect,
      orderBy: {
        createdAt: "desc",
      },
    });

    const recipeDTOs = await toRecipeListDTO(recipes);
    return NextResponse.json(recipeDTOs);
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await verifySession();
    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const recipe = await prisma.recipe.create({
      data: {
        ...data,
        createdBy: session.id,
        ingredients: JSON.stringify(data.ingredients),
        steps: JSON.stringify(data.steps),
        user: { connect: { id: session.id } },
      },
      select: recipeSelect,
    });

    const recipeDTO = await toRecipeDTO(recipe);
    if (!recipeDTO) {
      return NextResponse.json(
        { error: "Failed to process recipe" },
        { status: 500 },
      );
    }

    return NextResponse.json(recipeDTO);
  } catch (error) {
    console.error("Failed to create recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 },
    );
  }
}
