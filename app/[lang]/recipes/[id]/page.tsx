export const dynamic = "force-dynamic";

import { getUser } from "@/server/dal/user";
import { getShoppingLists } from "@/server/actions/shoppingList";
import { getRecipe } from "@/server/dal/recipe"; // Move the API call here
import RecipeDetailClient from "./client";
import { getDictionary } from "@/config/dictionaries";

interface RecipeDetailPageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

export default async function RecipeDetailPage({
  params,
}: RecipeDetailPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  // ✅ Fetch recipe data on the server
  const recipe = (await getRecipe(id)) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  const shoppingLists = await getShoppingLists();
  const user = await getUser();

  if (!recipe || !user) {
    return <div>{dict.errors.recipeNotFound}</div>;
  }

  return (
    <RecipeDetailClient
      lang={lang}
      recipe={recipe}
      shoppingLists={shoppingLists}
      user={user}
      dict={dict}
    />
  );
}
