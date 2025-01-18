"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { SubRecipeEditor } from "@/components/SubRecipeEditor";
import { Recipe, SubRecipe, Ingredient, Step } from "@/types/recipe";

export default function CreateRecipePage() {
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

  const [newTag, setNewTag] = useState("");

  const addIngredient = (ingredient: Ingredient) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), ingredient],
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

  const addSubRecipe = () => {
    const subRecipe: SubRecipe = {
      id: crypto.randomUUID(),
      name: "",
      ingredients: [],
      steps: [],
    };

    setRecipe((prev) => ({
      ...prev,
      subRecipes: [...(prev.subRecipes || []), subRecipe],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) throw new Error("Failed to create recipe");

      // Redirect to the new recipe
      const data = await response.json();
      window.location.href = `/recipes/${data.id}`;
    } catch (error) {
      console.error("Failed to create recipe:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={recipe.title}
                onChange={(e) =>
                  setRecipe((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Recipe title"
              />
            </div>
            <div>
              <Label>Description</Label>
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
              <Label>Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
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
                  Add
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
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <IngredientSearch onSelect={addIngredient} />
          </div>
          <div className="space-y-2">
            {recipe.ingredients?.map((ingredient, index) => (
              <div key={ingredient.id} className="flex items-center gap-2">
                <span>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setRecipe((prev) => ({
                      ...prev,
                      ingredients: prev.ingredients?.filter(
                        (_, i) => i !== index
                      ),
                    }));
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Sub-Recipes */}
        <Card className="p-6">
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
                      i === index ? updated : sr
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
        </Card>

        {/* Steps */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Steps</h2>
            <Button type="button" onClick={addStep}>
              Add Step
            </Button>
          </div>
          <div className="space-y-4">
            {recipe.steps?.map((step, index) => (
              <div key={step.id}>
                <Label>Step {index + 1}</Label>
                <StepEditor
                  step={step}
                  ingredients={recipe.ingredients || []}
                  onChange={(updated) => {
                    setRecipe((prev) => ({
                      ...prev,
                      steps: prev.steps?.map((s, i) =>
                        i === index ? updated : s
                      ),
                    }));
                  }}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Publishing Options */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Publishing Options</h2>
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
              <Label htmlFor="isPublic">Make this recipe public</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="template"
                checked={recipe.template}
                onChange={(e) =>
                  setRecipe((prev) => ({ ...prev, template: e.target.checked }))
                }
              />
              <Label htmlFor="template">Save as template</Label>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              value={recipe.category}
              onValueChange={(value) =>
                setRecipe((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
                <SelectItem value="Dessert">Dessert</SelectItem>
                <SelectItem value="Appetizer">Appetizer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create Recipe</Button>
        </div>
      </form>
    </div>
  );
}
