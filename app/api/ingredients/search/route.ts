import { NextResponse } from "next/server";
import { getLocalizedIngredients } from "@/server/dal/ingredient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const locale = searchParams.get("locale") || "en";
  if (!query) {
    return NextResponse.json(
      { error: "Query parameter required" },
      { status: 400 },
    );
  }

  try {
    const ingredients = await getLocalizedIngredients(query, locale);

    return NextResponse.json(ingredients);
  } catch (error) {
    console.error("Failed to search ingredients:", error);
    return NextResponse.json(
      { error: "Failed to search ingredients" },
      { status: 500 },
    );
  }
}
