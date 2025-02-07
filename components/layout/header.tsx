import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import { LanguageSwitcher } from "./language-switcher";

interface HeaderProps {
  isAuthenticated?: boolean;
  lang: string;
  user?: {
    name: string;
    email: string;
  };
  dict: {
    nav: {
      recipes: string;
      browse: string;
      create: string;
      login: string;
      signup: string;
      shoppingLists: string;
      profile: {
        view: string;
        settings: string;
        signout: string;
        createRecipe: string;
      };
    };
  };
}

export function Header({ isAuthenticated, lang, user, dict }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo and main nav */}
          <div className="flex items-center space-x-8">
            <Link href={`/${lang}`} className="text-xl font-bold">
              CookShare
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                href={`/${lang}/browse`}
                className="text-muted-foreground hover:text-foreground"
              >
                {dict.nav.browse}
              </Link>
              {isAuthenticated && (
                <Link
                  href={`/${lang}/recipes`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {dict.nav.recipes}
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  href={`/${lang}/recipes/create`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {dict.nav.create}
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  href={`/${lang}/shopping-lists`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {dict.nav.shoppingLists}
                </Link>
              )}
            </div>
          </div>

          {/* Language switcher and auth */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher currentLang={lang} />
            {isAuthenticated && user ? (
              <UserNav user={user} lang={lang} dict={dict} />
            ) : (
              <>
                <Link href={`/${lang}/login`}>
                  <Button variant="ghost">{dict.nav.login}</Button>
                </Link>
                <Link href={`/${lang}/signup`}>
                  <Button>{dict.nav.signup}</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
