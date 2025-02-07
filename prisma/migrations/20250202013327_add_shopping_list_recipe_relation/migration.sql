-- CreateTable
CREATE TABLE "ShoppingListRecipe" (
    "id" TEXT NOT NULL,
    "shoppingListId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "ShoppingListRecipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShoppingListRecipe" ADD CONSTRAINT "ShoppingListRecipe_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListRecipe" ADD CONSTRAINT "ShoppingListRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
