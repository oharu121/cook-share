import { getAllRecipes } from "@/server/dal/recipe";
import RecipeFilters from "./recipe-filter"; // Import the new component
import { getDictionary } from "@/config/dictionaries";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BrowsePage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ lang: "en" | "ja" }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  const paramsResolved = await searchParams;

  const recipes = await getAllRecipes(paramsResolved); // Pass search filters

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{dict.hero.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">
          {dict.hero.description}
        </p>
      </section>

      {/* Filters */}
      <RecipeFilters dict={dict} />

      {/* Recipes Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          {dict.sections.recipe.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.length === 0 ? (
            <p>{dict.sections.recipe.noRecipes}</p>
          ) : (
            recipes.map((recipe) => (
              <Card key={recipe.id} className="p-4">
                <h3 className="font-semibold mb-2">{recipe.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {recipe.description}
                </p>
                <Button variant="outline" asChild>
                  <Link href={`/${lang}/recipes/${recipe.id}`}>
                    {dict.sections.recipe.viewButton}
                  </Link>
                </Button>
              </Card>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
