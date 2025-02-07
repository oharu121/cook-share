import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed Ingredients
  await prisma.ingredient.createMany({
    data: [
      { id: "1", defaultName: "Flour" },
      { id: "2", defaultName: "Sugar" }, // Example of another ingredient
    ],
    skipDuplicates: true, // Optional: skips creating records that already exist
  });

  // Create translations separately
  await prisma.ingredientTranslation.createMany({
    data: [
      { ingredientId: "1", locale: "ja", name: "小麦粉" },
      { ingredientId: "1", locale: "fr", name: "Farine" },
      { ingredientId: "2", locale: "ja", name: "砂糖" }, // Example translation for another ingredient
      { ingredientId: "2", locale: "fr", name: "Sucre" },
    ],
    skipDuplicates: true, // Optional: skips creating records that already exist
  });

  // Seed Units
  await prisma.unit.createMany({
    data: [
      { id: "1", defaultName: "gram", locale: "en", abbreviation: "g" },
      { id: "2", defaultName: "kilogram", locale: "en", abbreviation: "kg" },
      { id: "3", defaultName: "cup", locale: "en", abbreviation: "cup" },
      { id: "4", defaultName: "グラム", locale: "ja", abbreviation: "g" },
      { id: "5", defaultName: "キログラム", locale: "ja", abbreviation: "kg" },
      { id: "6", defaultName: "カップ", locale: "ja", abbreviation: "カップ" },
    ],
    skipDuplicates: true,
  });

  // Seed IngredientUnits (Linking Ingredients & Units)
  await prisma.ingredientUnit.createMany({
    data: [
      { ingredientId: "1", unitId: "1" }, // Flour -> gram
      { ingredientId: "1", unitId: "2" }, // Flour -> kilogram
      { ingredientId: "1", unitId: "3" }, // Flour -> cup
      { ingredientId: "2", unitId: "1" }, // Sugar -> gram
      { ingredientId: "2", unitId: "2" }, // Sugar -> kilogram
      { ingredientId: "2", unitId: "3" }, // Sugar -> cup
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
