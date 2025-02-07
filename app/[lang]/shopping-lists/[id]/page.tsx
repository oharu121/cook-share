import ShoppingListDetailClient from "./client";
import { getDictionary } from "@/config/dictionaries";
interface ShoppingListDetailPageProps {
  params: Promise<{ id: string; lang: "en" | "ja" }>;
}

export default async function ShoppingListDetailPage({
  params,
}: ShoppingListDetailPageProps) {
  const { id } = await params;
  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  // Fetch any necessary server-side data here
  // For example, you might fetch initial data for the shopping list
  // const initialData = await fetchShoppingListData(id);

  return <ShoppingListDetailClient id={id} dict={dict} />;
}
