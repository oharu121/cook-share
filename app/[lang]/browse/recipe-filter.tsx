"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DictionaryType } from "@/config/dictionaries";

interface RecipeFiltersProps {
  dict: DictionaryType;
}

export default function RecipeFilters({ dict }: RecipeFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficulty") || "",
  );
  const [time, setTime] = useState(searchParams.get("time") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  // Function to update query params
  const updateFilters = (
    newFilters: Partial<{
      search: string;
      difficulty: string;
      time: string;
      category: string;
    }>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setDifficulty("");
    setTime("");
    setCategory("");
    router.push(pathname); // Clears query parameters
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {dict.sections.filter.title}
      </h2>
      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder={dict.recipesPage.searchPlaceholder}
            className="w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              updateFilters({ search: e.target.value });
            }}
          />
        </div>

        <div className="relative">
          <Select
            value={difficulty}
            onValueChange={(value) => {
              setDifficulty(value);
              updateFilters({ difficulty: value });
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={dict.recipesPage.difficultyPlaceholder}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">{dict.difficulty.easy}</SelectItem>
              <SelectItem value="medium">{dict.difficulty.medium}</SelectItem>
              <SelectItem value="hard">{dict.difficulty.hard}</SelectItem>
              <button
                className="absolute right-3 top-2 text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setDifficulty("");
                  updateFilters({ difficulty: "" });
                }}
              >
                {dict.recipesPage.resetButton}
              </button>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Select
            value={time}
            onValueChange={(value) => {
              setTime(value);
              updateFilters({ time: value });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={dict.recipesPage.timePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">{dict.time.under15}</SelectItem>
              <SelectItem value="30">{dict.time.under30}</SelectItem>
              <SelectItem value="60">{dict.time.under60}</SelectItem>
              <SelectItem value="more">{dict.time.over60}</SelectItem>
              <button
                className="absolute right-3 top-2 text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setTime("");
                  updateFilters({ time: "" });
                }}
              >
                {dict.recipesPage.resetButton}
              </button>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Categories Section */}
      <h2 className="text-xl font-semibold mb-4">
        {dict.sections.categories.title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {Object.entries(dict.categories).map(([key, value]) => (
          <Card
            key={key}
            className={`p-4 text-center cursor-pointer hover:bg-accent ${
              category === key ? "bg-primary text-white" : ""
            }`}
            onClick={() => {
              const newCategory = category === key ? "" : key;
              setCategory(newCategory);
              updateFilters({ category: newCategory });
            }}
          >
            <h3 className="font-medium">{value}</h3>
          </Card>
        ))}
      </div>

      {/* Reset Filters Button (Only show if a filter is applied) */}
      {(search || difficulty || time || category) && (
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={resetFilters}>
            {dict.recipesPage.resetButton}
          </Button>
        </div>
      )}
    </div>
  );
}
