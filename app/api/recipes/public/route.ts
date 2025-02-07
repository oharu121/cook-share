import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { recipeSelect, toRecipeListDTO } from "@/server/dto/recipe.dto";

export async function GET() {
  try {
    const where = {
      isPublic: true,
    };

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
    console.error("Failed to fetch public recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}
