/*
  Warnings:

  - A unique constraint covering the columns `[shoppingListId,recipeId]` on the table `ShoppingListRecipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShoppingListRecipe_shoppingListId_recipeId_key" ON "ShoppingListRecipe"("shoppingListId", "recipeId");
