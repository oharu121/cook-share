"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/server/actions/auth";
import { useState, useTransition } from "react";

interface LogoutMenuItemProps {
  label: string;
}

export function LogoutMenuItem({ label }: LogoutMenuItemProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logout(undefined);
      if (result.success && result.redirectPath) {
        router.push(result.redirectPath);
      } else if (result.message) {
        setErrorMessage(result.message);
      }
    });
  };

  return (
    <div>
      <DropdownMenuItem
        className="text-red-600 cursor-pointer"
        onClick={handleLogout}
        disabled={pending}
      >
        {pending ? "Logging out..." : label}
      </DropdownMenuItem>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
