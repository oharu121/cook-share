import { languages,  } from '@/config/languages';

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang:  'en' | 'ja'  }>
}>) {

  const lang = languages.includes((await params).lang as any) ? (await params).lang : 'ja';

  return (
    <div lang={lang}>
      {children}
    </div>
  )
}
