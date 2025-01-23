'use client';

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/server/actions/auth";

interface LogoutMenuItemProps {
  label: string;
}

export function LogoutMenuItem({ label }: LogoutMenuItemProps) {
  return (
    <DropdownMenuItem 
      className="text-red-600 cursor-pointer"
      onClick={() => logout()}
    >
      {label}
    </DropdownMenuItem>
  );
} 