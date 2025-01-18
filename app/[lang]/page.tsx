import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Recipe } from "@/types/recipe";
import Link from "next/link";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | CookShare',
}

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Appetizer",
  "Main Course",
  "Vegetarian",
  "Quick & Easy"
];

type Props = {
  params: { lang: string }
}

export default async function Home({ params }: Props) {
  // Get the language from params
  const lang = params.lang;

  // Fetch featured recipes from the API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/recipes`
  );
  console.log(response);
  const recipes: Recipe[] = await response.json();

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to CookShare</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Discover, create, and share amazing recipes with our community
        </p>
        <Button asChild>
          <Link href={`/${lang}/recipes/create`}>Create Recipe</Link>
        </Button>
      </section>

      {/* Featured Templates Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes
            .filter((recipe) => recipe.template)
            .slice(0, 3)
            .map((recipe) => (
              <Card key={recipe.id} className="p-4">
                <h3 className="font-semibold mb-2">{recipe.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {recipe.description}
                </p>
                <Button variant="outline" asChild>
                  <Link href={`/${lang}/recipes/${recipe.id}`}>View Template</Link>
                </Button>
              </Card>
            ))}
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Popular Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes
            .filter((recipe) => recipe.isPublic)
            .slice(0, 6)
            .map((recipe) => (
              <Card key={recipe.id} className="p-4">
                <h3 className="font-semibold mb-2">{recipe.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {recipe.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span>🕒 {recipe.cookingTime}min</span>
                    <span className="mx-2">•</span>
                    <span>👤 {recipe.servings} servings</span>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href={`/${lang}/recipes/${recipe.id}`}>View Recipe</Link>
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category}
              className="p-4 text-center hover:bg-accent cursor-pointer"
            >
              <Link
                href={`/recipes?category=${category.toLowerCase()}`}
                className="block"
              >
                <h3 className="font-medium">{category}</h3>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
