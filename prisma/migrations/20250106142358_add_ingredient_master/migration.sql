/*
  Warnings:

  - Added the required column `subRecipes` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "subRecipes" JSONB NOT NULL,
ADD COLUMN     "tags" TEXT[];

-- CreateTable
CREATE TABLE "IngredientMaster" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "allowedUnits" TEXT[],
    "commonNames" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IngredientMaster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IngredientMaster_name_key" ON "IngredientMaster"("name");
