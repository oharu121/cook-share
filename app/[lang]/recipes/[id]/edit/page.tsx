import { EditRecipeForm } from "@/components/recipe/edit-recipe-form";
import { getDictionary } from "@/config/dictionaries";

interface EditRecipePageProps {
  params: Promise<{ lang: string; id: string }>;
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex-1 overflow-y-auto py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{dict.recipes.edit}</h1>
          <EditRecipeForm lang={lang} dict={dict.recipes} recipeId={id} />
        </div>
      </div>
    </main>
  );
}
