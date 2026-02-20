export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getUser } from "@/server/dal/user";
import { getUserRecipes } from "@/server/dal/recipe";
import { redirect } from "next/navigation";
import { getDictionary } from "@/config/dictionaries";
import { getShoppingLists } from "@/server/actions/shoppingList";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const recipes = (await getUserRecipes()) || [];
  const shoppingLists = (await getShoppingLists()) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          {/* <Button asChild>
            <Link href="/profile/settings">{dict.profile.editProfile}</Link>
          </Button> */}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4">
          <h3 className="font-semibold text-muted-foreground mb-1">
            {dict.profile.totalRecipes}
          </h3>
          <p className="text-2xl font-bold">{recipes.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-muted-foreground mb-1">
            {dict.profile.publicRecipes}
          </h3>
          <p className="text-2xl font-bold">
            {
              recipes.filter(
                (
                  r: any, // eslint-disable-line @typescript-eslint/no-explicit-any
                ) => r.isPublic,
              ).length
            }
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-muted-foreground mb-1">
            {dict.profile.shoppingLists}
          </h3>
          <p className="text-2xl font-bold">{shoppingLists.length}</p>
        </Card>
      </div>

      {/* Recipe Lists */}
      <div className="space-y-8">
        {/* Recent Recipes */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {dict.profile.recentRecipes}
            </h2>
            <Button variant="outline" asChild>
              <Link href={`/${lang}/recipes`}>{dict.profile.viewAll}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.slice(0, 6).map(
              (
                recipe: any, // eslint-disable-line @typescript-eslint/no-explicit-any
              ) => (
                <Card key={recipe.id} className="p-6">
                  <h3 className="font-semibold mb-2">{recipe.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span>
                        🕒 {recipe.cookingTime}
                        {dict.profile.minutes}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/${lang}/recipes/${recipe.id}`}>
                        {dict.profile.view}
                      </Link>
                    </Button>
                  </div>
                </Card>
              ),
            )}
          </div>
        </section>

        {/* Shopping Lists */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {dict.profile.shoppingLists}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shoppingLists.map((shoppingList) => (
              <Card key={shoppingList.id} className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold mb-2">{shoppingList.name}</h3>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/${lang}/shopping-lists/${shoppingList.id}`}>
                      {dict.profile.view}
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* <Preferences
        defaultPublic={user.defaultPublic}
        emailNotifications={user.emailNotifications}
        darkMode={user.darkMode}
        dict={dict}
      /> */}
    </div>
  );
}
