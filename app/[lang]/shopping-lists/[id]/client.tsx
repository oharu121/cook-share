"use client";

import { useState, useEffect, useCallback } from "react";
import { ShoppingList, ShoppingListItem } from "@prisma/client";

interface ShoppingListDetailClientProps {
  id: string;
  dict: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function ShoppingListDetailClient({
  id,
  dict,
}: ShoppingListDetailClientProps) {
  const [shoppingList, setShoppingList] = useState<
    | (ShoppingList & {
        items: (ShoppingListItem & {
          ingredient: { defaultName: string } | null;
        })[];
        recipes: { recipe: { title: string; id: string } }[];
      })
    | null
  >(null);

  const fetchShoppingList = useCallback(async () => {
    try {
      const response = await fetch(`/api/shopping-list/${id}`);
      if (response.ok) {
        const list = await response.json();
        setShoppingList(list);
      } else {
        console.error("Failed to fetch shopping list");
      }
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch(`/api/shopping-list/${id}`);
        if (response.ok && !cancelled) {
          const list = await response.json();
          setShoppingList(list);
        }
      } catch (error) {
        if (!cancelled) console.error("Error fetching shopping list:", error);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  const handleCheck = async (itemId: string) => {
    try {
      const response = await fetch(`/api/shopping-list/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        fetchShoppingList(); // Refresh the list after updating
      } else {
        const errorData = await response.json();
        console.error("Failed to toggle item:", errorData.error);
      }
    } catch (error) {
      console.error("Error toggling item:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{shoppingList?.name}</h1>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          {dict.shoppingLists.ingredients}
        </h2>
        <ul>
          {shoppingList?.items.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
              />
              <span
                className={item.checked ? "line-through text-gray-500" : ""}
              >
                {item.quantity}{" "}
                {item.ingredient?.defaultName || "Unknown Ingredient"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="mt-6">
        <h2 className="text-xl font-semibold">
          {dict.shoppingLists.recipesInThisList}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shoppingList?.recipes.map(({ recipe }) => (
            <Card key={recipe.id} className="p-6">
              <div className="flex justify-between items-center">
                  <h3 className="font-semibold mb-2">{recipe.title}</h3>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/${lang}/recipes/${recipe.id}`}>
                    {dict.profile.view}
                    </Link>
                  </Button>
                </div>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  );
}
