export const dynamic = "force-dynamic";

import { getDictionary } from "@/config/dictionaries";
import ShoppingListsClient from "./client";

export default async function ShoppingListsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return <ShoppingListsClient lang={lang} dict={dict} />;
}
