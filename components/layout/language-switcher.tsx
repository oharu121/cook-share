import { Button } from "@/components/ui/button";
import { languages } from "@/config/languages";
import { switchLanguage } from "@/server/actions/language";

interface LanguageSwitcherProps {
  currentLang: string;
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <form
          key={lang}
          action={async () => {
            "use server";
            await switchLanguage(lang as "en" | "ja");
          }}
        >
          <Button
            type="submit"
            variant={currentLang === lang ? "secondary" : "ghost"}
            size="sm"
            className="w-12"
          >
            {lang.toUpperCase()}
          </Button>
        </form>
      ))}
    </div>
  );
}
