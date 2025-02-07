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
  params: Promise<{ lang: "en" | "ja" }>;
}) {
  const lang = languages.includes((await params).lang as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    ? (await params).lang
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
