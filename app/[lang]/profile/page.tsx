import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

async function getUserProfile() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`);
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return response.json();
}

async function getUserRecipes() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/recipes/user`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user recipes");
  }
  return response.json();
}

export default async function ProfilePage() {
  const user = await getUserProfile();
  const recipes = await getUserRecipes();

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

      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Switch
            checked={user.defaultPublic}
            onCheckedChange={updatePreference}
            id="defaultPublic"
          />
          <Label htmlFor="defaultPublic">Default Public Recipes</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={user.emailNotifications}
            onCheckedChange={updatePreference}
            id="emailNotifications"
          />
          <Label htmlFor="emailNotifications">Email Notifications</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={user.darkMode}
            onCheckedChange={updatePreference}
            id="darkMode"
          />
          <Label htmlFor="darkMode">Dark Mode</Label>
        </div>
      </div>
    </div>
  );
}
