import { useCallback } from "react";
import { Ingredient } from "@/types/recipe";

type UseIngredientUnitReturn = [(index: number, newUnit: string) => void];

export function useIngredientUnit(
  ingredients: Ingredient[] | undefined,
  setIngredients: React.Dispatch<
    React.SetStateAction<Ingredient[] | undefined>
  >,
): UseIngredientUnitReturn {
  const updateUnit = useCallback(
    (index: number, newUnit: string) => {
      setIngredients((prevIngredients) =>
        (prevIngredients || []).map((ingredient, i) =>
          i === index ? { ...ingredient, unit: newUnit } : ingredient,
        ),
      );
    },
    [setIngredients],
  );

  return [updateUnit];
}
