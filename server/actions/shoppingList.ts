import { prisma } from "@/server/db";
import { getUser } from "../dal/user";

export async function addIngredientsToShoppingList(
  recipeId: string,
  shoppingListId: string,
) {
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
  });

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  // Ensure recipe.ingredients is an array and contains valid ingredient details
  const ingredients =
    (recipe.ingredients as Array<{
      id?: string; // `id` might not be present
      name: string; // Ingredient name
      amount: number;
    }>) || [];

  await prisma.$transaction(async (tx) => {
    for (const ingredient of ingredients) {
      let ingredientId = ingredient.id;

      // Check if the ingredient ID exists, if not, find by name
      let existingIngredient = ingredientId
        ? await tx.ingredient.findUnique({ where: { id: ingredientId } })
        : null;

      if (!existingIngredient) {
        // If ingredient ID is missing or invalid, check by name
        existingIngredient = await tx.ingredient.findFirst({
          where: { defaultName: ingredient.name },
        });

        if (!existingIngredient) {
          // If ingredient doesn't exist, create it
          existingIngredient = await tx.ingredient.create({
            data: {
              defaultName: ingredient.name,
            },
          });
        }
      }

      ingredientId = existingIngredient.id; // Now we have a valid ingredient ID

      // Add the ingredient to the shopping list
      const existingItem = await tx.shoppingListItem.findFirst({
        where: {
          shoppingListId,
          ingredientId,
        },
      });

      if (existingItem) {
        // Increment quantity if ingredient already exists
        await tx.shoppingListItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + ingredient.amount },
        });
      } else {
        // Add new ingredient entry
        await tx.shoppingListItem.create({
          data: {
            shoppingListId,
            ingredientId,
            quantity: ingredient.amount,
          },
        });
      }
    }

    // Track the recipe added to the shopping list
    await tx.shoppingListRecipe.upsert({
      where: { shoppingListId_recipeId: { shoppingListId, recipeId } },
      update: {},
      create: { shoppingListId, recipeId },
    });
  });
}

export async function getShoppingListById(id: string) {
  const shoppingList = await prisma.shoppingList.findUnique({
    where: { id },
    include: {
      items: {
        include: { ingredient: true },
      },
      recipes: {
        include: { recipe: true },
      },
    },
  });

  if (!shoppingList) {
    throw new Error("Shopping list not found");
  }

  return shoppingList;
}

export async function getShoppingLists() {
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  return prisma.shoppingList.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: { ingredient: true }, // Fetch ingredient details
      },
      recipes: {
        include: { recipe: true }, // Fetch recipes that contributed to the shopping list
      },
    },
  });
}

// Function to create a new shopping list
export async function createShoppingList(name: string) {
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const newList = await prisma.shoppingList.create({
    data: {
      name,
      userId: user.id,
    },
  });

  return newList;
}

// Function to remove a shopping list
export async function removeShoppingList(id: string) {
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  await prisma.shoppingList.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}

// Function to toggle the checked status of an item in a shopping list
export async function toggleItemChecked(itemId: string) {
  const item = await prisma.shoppingListItem.findUnique({
    where: { id: itemId },
  });

  if (!item) {
    throw new Error("Item not found");
  }

  await prisma.shoppingListItem.update({
    where: { id: itemId },
    data: { checked: !item.checked },
  });
}
