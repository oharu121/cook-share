import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // Parse JSON strings back to objects
    const parsedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients,
      steps: recipe.steps as string,
      subRecipes: recipe.subRecipes as string,
    };

    return NextResponse.json(parsedRecipe);
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 },
    );
  }
}
