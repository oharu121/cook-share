import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/config/dictionaries";
import { headers } from "next/headers";

export default async function NotFound() {
  // Get the current language from the URL
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const lang = pathname.startsWith("/ja") ? "ja" : "en";
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-4 py-16 text-center">
        <h1 className="text-4xl font-bold">{dict.notFound.title}</h1>
        <h2 className="text-xl text-muted-foreground mb-4">
          {dict.notFound.subtitle}
        </h2>
        <p className="text-center text-muted-foreground max-w-125 mb-8">
          {dict.notFound.description}
        </p>
        <Button asChild>
          <Link href={`/${lang}`}>{dict.notFound.returnHome}</Link>
        </Button>
      </div>
    </div>
  );
}
