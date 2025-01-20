import { Button } from "@/components/ui/button";
import Link from "next/link";
import { languages } from "@/config/languages";

interface LanguageSwitcherProps {
  currentLang: string;
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <Link 
          key={lang}
          href={`/${lang}`}
        >
          <Button 
            variant={currentLang === lang ? "secondary" : "ghost"}
            size="sm"
            className="w-12"
          >
            {lang.toUpperCase()}
          </Button>
        </Link>
      ))}
    </div>
  );
} 