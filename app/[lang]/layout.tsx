import { languages } from '@/config/languages';
import { Header } from '@/components/layout/header';
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
  const lang = languages.includes((await params).lang as any) ? (await params).lang : 'ja';
  const dict = await getDictionary(lang);
  
  // Check auth status
  let isAuthenticated = false;
  let user;

  try {
    const authResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/check`, {
      credentials: 'include',
      cache: 'no-store',
    });
    isAuthenticated = authResponse.ok;
    console.log('Auth response:', authResponse);

    if (isAuthenticated) {
      // Fetch user data if authenticated
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
        credentials: 'include',
        cache: 'no-store',
      });
      user = await userResponse.json();
    }
  } catch (error) {
    console.error('Auth check error:', error);
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
