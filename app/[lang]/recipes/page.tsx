import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/recipes`
  );
  const recipes = await response.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Recipes</h1>
        <Button asChild>
          <Link href="/recipes/create">Create Recipe</Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Input
          placeholder="Search recipes..."
          className="w-full"
          defaultValue={searchParams.search?.toString()}
        />
        <Select defaultValue={searchParams.difficulty?.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue={searchParams.time?.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Cooking Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">Under 15 mins</SelectItem>
            <SelectItem value="30">Under 30 mins</SelectItem>
            <SelectItem value="60">Under 1 hour</SelectItem>
            <SelectItem value="more">Over 1 hour</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe: any) => (
          <Card key={recipe.id} className="overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {recipe.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="inline-flex items-center">
                    🕒 {recipe.cookingTime}min
                  </span>
                  <span className="mx-2">•</span>
                  <span className="inline-flex items-center">
                    👤 {recipe.servings} servings
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" asChild className="flex-1">
                  <Link href={`/recipes/${recipe.id}`}>View Recipe</Link>
                </Button>
                {recipe.template && (
                  <Button variant="secondary" asChild className="flex-1">
                    <Link href={`/recipes/create?template=${recipe.id}`}>
                      Use Template
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
