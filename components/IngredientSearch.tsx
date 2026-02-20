import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Command } from "@/components/ui/command";
import { Ingredient } from "@/types/recipe";

interface IngredientSearchProps {
  onSelect: (ingredient: Ingredient) => void;
  lang: string;
  dict: {
    ingredients: {
      title: string;
      addButton: string;
      searchPlaceholder: string;
    };
  };
}

export function IngredientSearch({
  onSelect,
  lang,
  dict,
}: IngredientSearchProps) {
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length < 2) return;

    const fetchIngredients = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/ingredients/search?q=${search}&locale=${lang}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch ingredients");
        }
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchIngredients, 300);
    return () => clearTimeout(debounce);
  }, [search, lang]);

  return (
    <div className="relative">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={dict.ingredients.searchPlaceholder}
        className="w-full"
      />
      {search.length >= 2 && (
        <Command className="absolute w-full mt-1 border rounded-md shadow-lg">
          {loading ? (
            <div className="p-2">Loading...</div>
          ) : (
            ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="p-2 hover:bg-accent cursor-pointer"
                onClick={() => onSelect(ingredient)}
              >
                {ingredient.name}
              </div>
            ))
          )}
        </Command>
      )}
    </div>
  );
}
