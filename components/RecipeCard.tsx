import { Recipe } from "@/types/recipe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface RecipeCardProps {
  recipe: Recipe;
  onClone?: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onClone }: RecipeCardProps) {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {recipe.title}
          {recipe.template && <Badge variant="secondary">Template</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{recipe.description}</p>
        <div className="flex justify-between text-sm">
          <span>🕒 {recipe.cookingTime} mins</span>
          <span>👥 {recipe.servings} servings</span>
          <span>📊 {recipe.difficulty}</span>
        </div>
        {(recipe.isPublic || recipe.template) && (
          <button
            onClick={() => onClone?.(recipe)}
            className="mt-4 w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Clone Recipe
          </button>
        )}
      </CardContent>
    </Card>
  );
}
