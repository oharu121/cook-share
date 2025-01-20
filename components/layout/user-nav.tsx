import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface UserNavProps {
  user: {
    name: string;
    email: string;
  };
  lang: string;
  dict: {
    nav: {
      profile: {
        view: string;
        settings: string;
        signout: string;
        createRecipe: string;
      };
    };
  };
}

export function UserNav({ user, lang, dict }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/${lang}/profile`}>{dict.nav.profile.view}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/${lang}/recipes/create`}>{dict.nav.profile.createRecipe}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/${lang}/profile/settings`}>{dict.nav.profile.settings}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          {dict.nav.profile.signout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 