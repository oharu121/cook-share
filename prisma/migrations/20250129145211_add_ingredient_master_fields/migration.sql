/*
  Warnings:

  - You are about to drop the column `allowedUnits` on the `IngredientMaster` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `IngredientMaster` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameEn]` on the table `IngredientMaster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameJa]` on the table `IngredientMaster` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameEn` to the `IngredientMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameJa` to the `IngredientMaster` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "IngredientMaster_name_key";

-- AlterTable
ALTER TABLE "IngredientMaster" DROP COLUMN "allowedUnits",
DROP COLUMN "name",
ADD COLUMN     "allowedUnitsEn" TEXT[],
ADD COLUMN     "allowedUnitsJa" TEXT[],
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "nameJa" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "IngredientMaster_nameEn_key" ON "IngredientMaster"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientMaster_nameJa_key" ON "IngredientMaster"("nameJa");
