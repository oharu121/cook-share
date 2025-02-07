import { NextResponse } from "next/server";
import {
  addIngredientsToShoppingList,
  createShoppingList,
} from "@/server/actions/shoppingList";

export async function POST(request: Request) {
  const { recipeId, shoppingListId, newListName } = await request.json();

  try {
    let listId = shoppingListId;

    if (newListName) {
      const newList = await createShoppingList(newListName);
      listId = newList.id;
    }

    await addIngredientsToShoppingList(recipeId, listId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
