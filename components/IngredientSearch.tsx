import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Command } from "@/components/ui/command";
import { PrismaClient } from "@prisma/client";
import { IngredientMaster } from '@/types/recipe';

interface IngredientSearchProps {
  onSelect: (ingredient: IngredientMaster) => void;
}

export function IngredientSearch({ onSelect }: IngredientSearchProps) {
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState<IngredientMaster[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length < 2) return;

    const fetchIngredients = async () => {
      setLoading(true);
      const response = await fetch(`/api/ingredients/search?q=${search}`);
      const data = await response.json();
      setIngredients(data);
      setLoading(false);
    };

    const debounce = setTimeout(fetchIngredients, 300);
    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <div className="relative">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search ingredients..."
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
