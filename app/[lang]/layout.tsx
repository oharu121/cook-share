import { languages } from "@/config/languages";
import { Header } from "@/components/layout/header";
import { getDictionary } from "@/config/dictionaries";
import { getUser } from "@/server/dal/user";
import { verifySession } from "@/server/lib/session";

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = languages.includes(resolvedParams.lang as "en" | "ja")
    ? (resolvedParams.lang as "en" | "ja")
    : "ja";
  const dict = await getDictionary(lang);

  const session = await verifySession(); // Redirects if unauthenticated
  const user = session ? await getUser() : null;

  return (
    <div lang={lang}>
      <Header
        isAuthenticated={!!session}
        lang={lang}
        user={user ? { name: user.name || "", email: user.email } : undefined}
        dict={dict}
      />
      {children}
    </div>
  );
}
