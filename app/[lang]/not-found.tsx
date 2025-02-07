import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/config/dictionaries";
import { headers } from "next/headers";
import { languages } from "@/config/languages";

export default async function NotFound() {
  // Get language from URL
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const urlLang = pathname.split("/")[1];
  const lang = languages.includes(urlLang as any) ? urlLang : "en"; // eslint-disable-line @typescript-eslint/no-explicit-any
  const dict = await getDictionary(lang as "en" | "ja");

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-4 py-16 text-center">
        <h1 className="text-4xl font-bold">{dict.notFound.title}</h1>
        <h2 className="text-xl text-muted-foreground mb-4">
          {dict.notFound.subtitle}
        </h2>
        <p className="text-center text-muted-foreground max-w-[500px] mb-8">
          {dict.notFound.description}
        </p>
        <Button asChild>
          <Link href={`/${lang}`}>{dict.notFound.returnHome}</Link>
        </Button>
      </div>
    </div>
  );
}
