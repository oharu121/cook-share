import { languages } from '@/config/languages';
import { Header } from '@/components/layout/header';
import { checkAuthStatus } from '@/lib/auth';
import { getDictionary } from "@/lib/dictionaries";

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'ja' }>
}) {
  const isAuthenticated = await checkAuthStatus();
  const lang = languages.includes((await params).lang as any) ? (await params).lang : 'ja';
  const dict = await getDictionary(lang);
  
  // Fetch user data if authenticated
  let user;
  if (isAuthenticated) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`);
    user = await response.json();
  }

  return (
    <div lang={lang}>
      <Header 
        isAuthenticated={isAuthenticated} 
        lang={lang} 
        user={user} 
        dict={dict}
      />
      {children}
    </div>
  );
}
