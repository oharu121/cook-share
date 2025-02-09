export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/config/dictionaries";

export const metadata: Metadata = {
  title: "Home | CookShare",
};

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ja" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {dict.landingPage.heroTitle}
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          {dict.landingPage.heroDescription}
        </p>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          {dict.landingPage.featuresTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.landingPage.features.map((feature, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          {dict.landingPage.ctaTitle}
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          {dict.landingPage.ctaDescription}
        </p>
        <Button asChild>
          <Link href={`/${lang}/signup`}>
            {dict.landingPage.registerButton}
          </Link>
        </Button>
      </section>
    </main>
  );
}
