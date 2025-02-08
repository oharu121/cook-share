import { cache } from "react";
import { prisma } from "@/server/db";

export const getLocalizedIngredients = cache(
  async (query: string, locale: string) => {
    console.log("query: ", query);
    try {
      const ingredients = await prisma.ingredient.findMany({
        where: {
          OR: [
            { defaultName: { contains: query, mode: "insensitive" } }, // English search
            {
              translations: {
                some: { name: { contains: query, mode: "insensitive" } },
              },
            }, // Any translation
          ],
        },
        include: {
          translations: true,
          ingredientUnits: {
            include: {
              unit: true,
            },
          },
        },
      });

      const result = ingredients.map((ingredient) => ({
        id: ingredient.id,
        name:
          ingredient.translations.find((t) => t.locale === locale)?.name ||
          ingredient.defaultName,
        units: ingredient.ingredientUnits.map((iu) => ({
          id: iu.unit.id,
          name:
            iu.unit.locale === locale
              ? iu.unit.defaultName
              : iu.unit.defaultName, // Adjust if needed
        })),
      }));
      console.log("result: ", result);
      return result;
    } catch (error) {
      console.error("Failed to get localized ingredients:", error);
      return null;
    }
  },
);
