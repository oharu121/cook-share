export const dynamic = "force-dynamic";
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
import { getDictionary } from "@/config/dictionaries";

export default async function RecipesPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ lang: "en" | "ja" }>;
}) {
  // Await the searchParams
  const paramsResolved = await searchParams;
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const response = await fetch(
    `/api/recipes`,
  );
  const recipes = await response.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{dict.recipesPage.title}</h1>
        <Button asChild>
          <Link href={`/${lang}/recipes/create`}>
            {dict.recipesPage.createButton}
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Input
          placeholder={dict.recipesPage.searchPlaceholder}
          className="w-full"
          defaultValue={paramsResolved.search?.toString()}
        />
        <Select defaultValue={paramsResolved.difficulty?.toString()}>
          <SelectTrigger>
            <SelectValue placeholder={dict.recipesPage.difficultyPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">{dict.difficulty.easy}</SelectItem>
            <SelectItem value="medium">{dict.difficulty.medium}</SelectItem>
            <SelectItem value="hard">{dict.difficulty.hard}</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue={paramsResolved.time?.toString()}>
          <SelectTrigger>
            <SelectValue placeholder={dict.recipesPage.timePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">{dict.time.under15}</SelectItem>
            <SelectItem value="30">{dict.time.under30}</SelectItem>
            <SelectItem value="60">{dict.time.under60}</SelectItem>
            <SelectItem value="more">{dict.time.over60}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(
          (
            recipe: any, // eslint-disable-line @typescript-eslint/no-explicit-any
          ) => (
            <Card key={recipe.id} className="overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="inline-flex items-center">
                      🕒 {recipe.cookingTime} {dict.units.minutes}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="inline-flex items-center">
                      👤 {recipe.servings} {dict.units.servings}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {dict.recipesPage.by}{" "}
                  {recipe.user?.name || dict.recipesPage.anonymous}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" asChild className="flex-1">
                    <Link href={`/${lang}/recipes/${recipe.id}`}>
                      {dict.recipesPage.viewRecipe}
                    </Link>
                  </Button>
                  {recipe.template && (
                    <Button variant="secondary" asChild className="flex-1">
                      <Link
                        href={`/${lang}/recipes/create?template=${recipe.id}`}
                      >
                        {dict.recipesPage.useTemplate}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
