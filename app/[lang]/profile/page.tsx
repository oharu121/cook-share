import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Preferences } from "@/components/profile/preferences";
import { getUser } from "@/server/dal/user";
import {  getUserRecipes } from "@/server/dal/recipe";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const recipes = await getUserRecipes() || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button asChild>
            <Link href="/profile/settings">Edit Profile</Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4">
          <h3 className="font-semibold text-muted-foreground mb-1">
            Total Recipes
          </h3>
          <p className="text-2xl font-bold">{recipes.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-muted-foreground mb-1">
            Public Recipes
          </h3>
          <p className="text-2xl font-bold">
            {recipes.filter((r: any) => r.isPublic).length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-muted-foreground mb-1">
            Templates
          </h3>
          <p className="text-2xl font-bold">
            {recipes.filter((r: any) => r.template).length}
          </p>
        </Card>
      </div>

      {/* Recipe Lists */}
      <div className="space-y-8">
        {/* Recent Recipes */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Your Recent Recipes</h2>
            <Button variant="outline" asChild>
              <Link href="/recipes">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.slice(0, 6).map((recipe: any) => (
              <Card key={recipe.id} className="p-6">
                <h3 className="font-semibold mb-2">{recipe.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span>🕒 {recipe.cookingTime}min</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/recipes/${recipe.id}`}>View</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Templates */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Your Templates</h2>
            <Button variant="outline" asChild>
              <Link href="/recipes?filter=templates">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes
              .filter((r: any) => r.template)
              .slice(0, 3)
              .map((recipe: any) => (
                <Card key={recipe.id} className="p-6">
                  <h3 className="font-semibold mb-2">{recipe.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span>🕒 {recipe.cookingTime}min</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/recipes/${recipe.id}`}>View</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/recipes/create?template=${recipe.id}`}>
                          Use
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </section>
      </div>

      <Preferences 
        defaultPublic={user.defaultPublic}
        emailNotifications={user.emailNotifications}
        darkMode={user.darkMode}
      />
    </div>
  );
}
