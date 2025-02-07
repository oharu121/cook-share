import { NextResponse } from "next/server";
import {
  getShoppingLists,
  createShoppingList,
  removeShoppingList,
} from "@/server/actions/shoppingList";

/** GET: Fetch all shopping lists */
export async function GET() {
  try {
    const shoppingLists = await getShoppingLists();
    return NextResponse.json(shoppingLists);
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

/** POST: Create a new shopping list */
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newList = await createShoppingList(name);
    return NextResponse.json(newList);
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
/** DELETE: Remove a shopping list */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Shopping list ID is required" },
        { status: 400 },
      );
    }

    await removeShoppingList(id);
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
