import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

async function getRecipe(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/recipes/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }
  return response.json();
}

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await getRecipe(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">{recipe.title}</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/recipes/${recipe.id}/edit`}>Edit Recipe</Link>
            </Button>
            {recipe.template && (
              <Button asChild>
                <Link href={`/recipes/create?template=${recipe.id}`}>
                  Use as Template
                </Link>
              </Button>
            )}
          </div>
        </div>
        <p className="text-muted-foreground mt-2">{recipe.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Cooking Time</h3>
          <p>{recipe.cookingTime} minutes</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Servings</h3>
          <p>{recipe.servings} people</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Difficulty</h3>
          <p className="capitalize">{recipe.difficulty}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <Card className="p-6">
            <ul className="space-y-2">
              {JSON.parse(recipe.ingredients).map(
                (ingredient: any, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </span>
                  </li>
                )
              )}
            </ul>
          </Card>
        </div>

        {/* Steps */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <Card className="p-6">
            <ol className="space-y-4">
              {JSON.parse(recipe.steps).map((step: any, index: number) => (
                <li key={index} className="flex gap-4">
                  <span className="font-medium text-muted-foreground">
                    {index + 1}.
                  </span>
                  <span>{step.instruction}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        <p>Created by {recipe.user.name || "Anonymous"}</p>
        <p>
          Last updated:{" "}
          {new Date(recipe.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
