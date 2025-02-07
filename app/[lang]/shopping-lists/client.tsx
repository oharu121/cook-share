"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingList } from "@prisma/client";

interface ShoppingListsClientProps {
  lang: string;
  dict: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function ShoppingListsClient({
  lang,
  dict,
}: ShoppingListsClientProps) {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [newListName, setNewListName] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchShoppingLists() {
      const res = await fetch("/api/shopping-list");
      if (res.ok) {
        const lists = await res.json();
        setShoppingLists(lists);
      } else {
        console.error("Failed to fetch shopping lists");
      }
    }
    fetchShoppingLists();
  }, []);

  const handleCreateList = async () => {
    if (!newListName) return;

    const res = await fetch("/api/shopping-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newListName }),
    });

    if (res.ok) {
      const newList = await res.json();
      setShoppingLists([...shoppingLists, newList]);
      setNewListName("");
    } else {
      console.error("Failed to create shopping list");
    }
  };

  const handleDeleteList = async (id: string) => {
    const res = await fetch("/api/shopping-list", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setShoppingLists(shoppingLists.filter((list) => list.id !== id));
    } else {
      console.error("Failed to delete shopping list");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{dict.shoppingLists.title}</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder={dict.shoppingLists.newListNamePlaceholder}
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="border rounded p-2 mb-4"
        />
        <Button onClick={handleCreateList}>
          {dict.shoppingLists.createNewListButton}
        </Button>
        {shoppingLists.map((list) => (
          <Card key={list.id} className="p-4 flex justify-between">
            <h2 className="font-semibold">{list.name}</h2>
            <div>
              <Button
                onClick={() =>
                  router.push(`/${lang}/shopping-lists/${list.id}`)
                }
              >
                {dict.shoppingLists.viewButton}
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteList(list.id)}
              >
                {dict.shoppingLists.deleteButton}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
