import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function switchLanguage(newLang: "en" | "ja") {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const pathParts = pathname.split("/");

  // Replace the language part (index 1) with the new language
  pathParts[1] = newLang;

  // Reconstruct the path
  const newPath = pathParts.join("/");

  redirect(newPath);
}
