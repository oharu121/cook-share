"use client";

import { useState, useEffect } from "react";
import { Recipe, RecipeCategory, Ingredient, Step } from "@/types/recipe";
import { createRecipe } from "@/server/actions/recipe";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IngredientSearch } from "@/components/IngredientSearch";
import { StepEditor } from "@/components/StepEditor";
// import { SubRecipeEditor } from "@/components/SubRecipeEditor";
import { useRouter, useSearchParams } from "next/navigation";

interface CreateRecipeFormProps {
  lang: "en" | "ja";
  dict: {
    create: string;
    basicInfo: {
      title: string;
      titleLabel: string;
      description: string;
      tags: string;
      addTag: string;
    };
    ingredients: {
      title: string;
      addButton: string;
      searchPlaceholder: string;
      removeButton: string;
    };
    steps: {
      title: string;
      step: string;
      addButton: string;
    };
    details: {
      title: string;
      cookingTime: string;
      servings: string;
      difficulty: string;
    };
    difficulty: {
      easy: string;
      medium: string;
      hard: string;
    };
    publishing: {
      title: string;
      isPublic: string;
      isTemplate: string;
    };
    category: {
      title: string;
      placeholder: string;
    };
    categories: {
      breakfast: string;
      lunch: string;
      dinner: string;
      dessert: string;
      appetizer: string;
      mainCourse: string;
      vegetarian: string;
      quickAndEasy: string;
    };
    submit: string;
    cancel: string;
  };
}

export function CreateRecipeForm({ lang, dict }: CreateRecipeFormProps) {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("clone");
  const router = useRouter();
  const [recipe, setRecipe] = useState<Partial<Recipe>>({
    title: "",
    description: "",
    tags: [],
    ingredients: [],
    steps: [],
    subRecipes: [],
    cookingTime: 0,
    servings: 1,
    difficulty: "medium",
    isPublic: false,
    template: false,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      if (recipeId) {
        try {
          const response = await fetch(`/api/recipes/${recipeId}`);
          const data = await response.json();
          setRecipe(data);
        } catch (error) {
          console.error("Failed to fetch recipe:", error);
        }
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addIngredient = (selectedIngredient: Ingredient) => {
    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name: selectedIngredient.name,
      amount: 0,
      units: selectedIngredient.units,
    };

    setRecipe((prev) => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), newIngredient],
    }));
  };

  const addStep = () => {
    const step: Step = {
      id: crypto.randomUUID(),
      order: (recipe.steps?.length || 0) + 1,
      description: "",
      usedIngredients: [],
    };

    setRecipe((prev) => ({
      ...prev,
      steps: [...(prev.steps || []), step],
    }));
  };

  // const addSubRecipe = () => {
  //   const subRecipe: SubRecipe = {
  //     id: crypto.randomUUID(),
  //     name: "",
  //     ingredients: [],
  //     steps: [],
  //   };

  //   setRecipe((prev) => ({
  //     ...prev,
  //     subRecipes: [...(prev.subRecipes || []), subRecipe],
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createRecipe(recipe);
      if (response?.id) {
        router.push(`/${lang}/recipes/${response.id}`);
      }
    } catch (error) {
      console.error("Failed to create recipe:", error);
      // You might want to add error handling UI here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">{dict.basicInfo.title}</h2>
        <div className="space-y-4">
          <div>
            <Label>{dict.basicInfo.titleLabel}</Label>
            <Input
              value={recipe.title}
              onChange={(e) =>
                setRecipe((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Recipe title"
            />
          </div>
          <div>
            <Label>{dict.basicInfo.description}</Label>
            <Textarea
              value={recipe.description}
              onChange={(e) =>
                setRecipe((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe your recipe"
            />
          </div>
          <div>
            <Label>{dict.basicInfo.tags}</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder={dict.basicInfo.addTag}
              />
              <Button
                type="button"
                onClick={() => {
                  if (newTag.trim()) {
                    setRecipe((prev) => ({
                      ...prev,
                      tags: [...(prev.tags || []), newTag.trim()],
                    }));
                    setNewTag("");
                  }
                }}
              >
                {dict.basicInfo.addTag}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recipe.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => {
                      setRecipe((prev) => ({
                        ...prev,
                        tags: prev.tags?.filter((_, i) => i !== index),
                      }));
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Ingredients */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{dict.ingredients.title}</h2>
          <IngredientSearch onSelect={addIngredient} lang={lang} dict={dict} />
        </div>
        <div className="space-y-2">
          {recipe.ingredients?.map((ingredient, index) => (
            <div key={ingredient.id} className="flex items-center gap-2">
              <Input
                type="number"
                value={ingredient.amount}
                onChange={(e) => {
                  const newAmount = parseFloat(e.target.value) || 0;
                  setRecipe((prev) => ({
                    ...prev,
                    ingredients: prev.ingredients?.map((ing, i) =>
                      i === index ? { ...ing, amount: newAmount } : ing,
                    ),
                  }));
                }}
                className="w-20"
              />
              <select
                value={ingredient.unit || ""}
                onChange={(e) => {
                  const newUnit = e.target.value;
                  setRecipe((prev) => ({
                    ...prev,
                    ingredients: prev.ingredients?.map((ing, i) =>
                      i === index ? { ...ing, unit: newUnit } : ing,
                    ),
                  }));
                }}
                className="border rounded p-1"
              >
                {ingredient.units.map((unit) => (
                  <option key={unit.id} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>
              <span>{ingredient.name}</span>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setRecipe((prev) => ({
                    ...prev,
                    ingredients: prev.ingredients?.filter(
                      (_, i) => i !== index,
                    ),
                  }));
                }}
              >
                {dict.ingredients.removeButton}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Sub-Recipes */}
      {/* <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sub-Recipes</h2>
          <Button type="button" onClick={addSubRecipe}>
            Add Sub-Recipe
          </Button>
        </div>
        <div className="space-y-4">
          {recipe.subRecipes?.map((subRecipe, index) => (
            <SubRecipeEditor
              key={subRecipe.id}
              subRecipe={subRecipe}
              onChange={(updated) => {
                setRecipe((prev) => ({
                  ...prev,
                  subRecipes: prev.subRecipes?.map((sr, i) =>
                    i === index ? updated : sr,
                  ),
                }));
              }}
              onDelete={() => {
                setRecipe((prev) => ({
                  ...prev,
                  subRecipes: prev.subRecipes?.filter((_, i) => i !== index),
                }));
              }}
            />
          ))}
        </div>
      </Card> */}

      {/* Steps */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{dict.steps.title}</h2>
          <Button type="button" onClick={addStep}>
            {dict.steps.addButton}
          </Button>
        </div>
        <div className="space-y-4">
          {recipe.steps?.map((step, index) => (
            <div key={step.id}>
              <Label>
                {dict.steps.step} {index + 1}
              </Label>
              <StepEditor
                key={step.id}
                step={step}
                ingredients={recipe.ingredients || []}
                onChange={(updated) => {
                  setRecipe((prev) => ({
                    ...prev,
                    steps: prev.steps?.map((s, i) =>
                      i === index ? updated : s,
                    ),
                  }));
                }}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Recipe Details */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">{dict.details.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>{dict.details.cookingTime}</Label>
            <Input
              type="number"
              value={recipe.cookingTime}
              onChange={(e) =>
                setRecipe((prev) => ({
                  ...prev,
                  cookingTime: parseInt(e.target.value) || 0,
                }))
              }
            />
          </div>
          <div>
            <Label>{dict.details.servings}</Label>
            <Input
              type="number"
              value={recipe.servings}
              onChange={(e) =>
                setRecipe((prev) => ({
                  ...prev,
                  servings: parseInt(e.target.value) || 1,
                }))
              }
            />
          </div>
          <div>
            <Label>{dict.details.difficulty}</Label>
            <Select
              value={recipe.difficulty}
              onValueChange={(value: "easy" | "medium" | "hard") =>
                setRecipe((prev) => ({ ...prev, difficulty: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">{dict.difficulty.easy}</SelectItem>
                <SelectItem value="medium">{dict.difficulty.medium}</SelectItem>
                <SelectItem value="hard">{dict.difficulty.hard}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="category-trigger">{dict.category.title}</Label>
            <Select
              value={recipe.category}
              onValueChange={(value: RecipeCategory) =>
                setRecipe((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger id="category-trigger">
                <SelectValue placeholder={dict.category.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">
                  {dict.categories.breakfast}
                </SelectItem>
                <SelectItem value="lunch">{dict.categories.lunch}</SelectItem>
                <SelectItem value="dinner">{dict.categories.dinner}</SelectItem>
                <SelectItem value="dessert">
                  {dict.categories.dessert}
                </SelectItem>
                <SelectItem value="appetizer">
                  {dict.categories.appetizer}
                </SelectItem>
                <SelectItem value="mainCourse">
                  {dict.categories.mainCourse}
                </SelectItem>
                <SelectItem value="vegetarian">
                  {dict.categories.vegetarian}
                </SelectItem>
                <SelectItem value="quickAndEasy">
                  {dict.categories.quickAndEasy}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Publishing Options */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">{dict.publishing.title}</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={recipe.isPublic}
              onChange={(e) =>
                setRecipe((prev) => ({ ...prev, isPublic: e.target.checked }))
              }
            />
            <Label htmlFor="isPublic">{dict.publishing.isPublic}</Label>
          </div>
        </div>
      </Card>

      <div className="space-y-4"></div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/${lang}/recipes`)}
        >
          {dict.cancel}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : dict.submit}
        </Button>
      </div>
    </form>
  );
}
