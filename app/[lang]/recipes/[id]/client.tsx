"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ShoppingList } from "@prisma/client";
import { User, Recipe, Step } from "@/types/recipe";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface RecipeDetailClientProps {
  lang: string;
  recipe: Recipe;
  shoppingLists: ShoppingList[];
  user: User | null;
  dict: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function RecipeDetailClient({
  lang,
  recipe,
  shoppingLists,
  user,
  dict,
}: RecipeDetailClientProps) {
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [newListName, setNewListName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToShoppingList = async () => {
    if (!selectedList && !newListName) {
      alert("Please select an existing list or enter a new list name.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/shopping-list/add-ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipeId: recipe.id,
          shoppingListId: selectedList || null,
          newListName: newListName || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add ingredients.");
      }

      alert("Ingredients added to shopping list!");
      setIsDialogOpen(false);
      setSelectedList(null);
      setNewListName("");
    } catch (error) {
      console.log(error);
      alert(
        error instanceof Error ? error.message : "An unknown error occurred.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">{recipe.title}</h1>
              <div className="flex gap-2">
                {user?.id === recipe.createdBy && (
                  <Button variant="outline" asChild>
                    <Link href={`/${lang}/recipes/${recipe.id}/edit`}>
                      {dict.buttons.editRecipe}
                    </Link>
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href={`/${lang}/recipes/create?clone=${recipe.id}`}>
                    {dict.buttons.clone}
                  </Link>
                </Button>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>{dict.buttons.addToShoppingList}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {dict.dialogs.selectOrCreateList}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <ul className="space-y-2">
                        {shoppingLists.map((list) => (
                          <li key={list.id}>
                            <Button
                              variant={
                                selectedList === list.id ? "default" : "outline"
                              }
                              onClick={() => setSelectedList(list.id)}
                            >
                              {list.name}
                            </Button>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col gap-2">
                        <p className="text-muted-foreground text-sm">
                          {dict.dialogs.orCreateNewList}
                        </p>
                        <Input
                          type="text"
                          placeholder={dict.placeholders.newListName}
                          value={newListName}
                          onChange={(e) => setNewListName(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        {dict.buttons.cancel}
                      </Button>
                      <Button
                        onClick={handleAddToShoppingList}
                        disabled={isLoading}
                      >
                        {isLoading ? dict.buttons.adding : dict.buttons.save}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <p className="text-muted-foreground mt-2">{recipe.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">{dict.labels.cookingTime}</h3>
              <p>
                {recipe.cookingTime} {dict.units.minutes}
              </p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">{dict.labels.servings}</h3>
              <p>
                {recipe.servings} {dict.units.people}
              </p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">{dict.labels.difficulty}</h3>
              <p className="capitalize">
                {dict.recipe.difficulty[recipe.difficulty]}
              </p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">{dict.labels.category}</h3>
              <p className="capitalize">
                {dict.categories[recipe.category || ""]}
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                {dict.sections.ingredients}
              </h2>
              <Card className="p-6">
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                {dict.sections.instructions}
              </h2>
              <Card className="p-6">
                <ol className="space-y-4">
                  {recipe.steps.map((step: Step, index: number) => (
                    <li key={index} className="flex gap-4">
                      <span className="font-medium text-muted-foreground">
                        {index + 1}.
                      </span>
                      <span>{step.description}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
