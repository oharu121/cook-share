export const dynamic = "force-dynamic";

import { CreateRecipeForm } from "@/components/recipe/create-recipe-form";
import { getDictionary } from "@/config/dictionaries";

interface CreateRecipePageProps {
  params: Promise<{ lang: "en" | "ja" }>;
}

export default async function CreateRecipePage({
  params,
}: CreateRecipePageProps) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <main className="flex-1 overflow-y-auto py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{dict.recipes.create}</h1>
          <CreateRecipeForm lang={lang} dict={dict.recipes} />
        </div>
      </div>
    </main>
  );
}
