import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Step, Ingredient } from "@/types/recipe";
import { detectIngredients } from "@/lib/ingredientDetection";

interface StepEditorProps {
  step: Step;
  ingredients: Ingredient[];
  onChange: (updatedStep: Step) => void;
}

export function StepEditor({ step, ingredients, onChange }: StepEditorProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleTextChange = (text: string) => {
    const knownIngredients = ingredients.map((i) => i.name);
    const { detectedIngredients, highlightedText } = detectIngredients(
      text,
      knownIngredients
    );

    onChange({
      ...step,
      description: text,
      usedIngredients: detectedIngredients,
    });
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const { url } = await response.json();
      onChange({
        ...step,
        image: url,
      });
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={step.description}
        onChange={(e) => handleTextChange(e.target.value)}
        className="h-24"
      />
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
              handleImageUpload(file);
            }
          }}
          disabled={isUploading}
        />
        {isUploading && <span>Uploading...</span>}
        {step.image && (
          <div className="relative">
            <img
              src={step.image}
              alt={`Step ${step.order}`}
              className="w-24 h-24 object-cover rounded"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2"
              onClick={() => onChange({ ...step, image: undefined })}
            >
              ×
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {step.usedIngredients.map((ingredient) => (
          <span
            key={ingredient}
            className="px-2 py-1 bg-accent rounded-full text-sm"
          >
            {ingredient}
          </span>
        ))}
      </div>
    </div>
  );
}
