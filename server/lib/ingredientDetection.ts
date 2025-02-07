interface DetectionResult {
  detectedIngredients: string[];
  highlightedText: string;
}

export function detectIngredients(
  text: string,
  knownIngredients: string[],
): DetectionResult {
  const detectedIngredients: string[] = [];
  let highlightedText = text;

  // Sort ingredients by length (longest first) to avoid partial matches
  const sortedIngredients = [...knownIngredients].sort(
    (a, b) => b.length - a.length,
  );

  for (const ingredient of sortedIngredients) {
    const regex = new RegExp(`\\b${ingredient}\\b`, "gi");
    if (regex.test(text)) {
      detectedIngredients.push(ingredient);
      // Wrap detected ingredients in highlight spans
      highlightedText = highlightedText.replace(
        regex,
        `<span class="bg-yellow-100 dark:bg-yellow-900">$&</span>`,
      );
    }
  }

  return {
    detectedIngredients,
    highlightedText,
  };
}
