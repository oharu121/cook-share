'use client';

import { login } from "@/server/actions/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";

interface LoginFormProps {
  lang: string;
  dict: {
    auth: {
      login: {
        emailLabel: string;
        passwordLabel: string;
        submitButton: string;
        registerLink: string;
        loading: string;
      };
    };
  };
}

function SubmitButton({ dict, pending }: { dict: LoginFormProps['dict'], pending: boolean }) {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? dict.auth.login.loading : dict.auth.login.submitButton}
    </Button>
  );
}

export function LoginForm({ lang, dict }: LoginFormProps) {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="grid gap-6">
      <form action={action} className="space-y-4">
        <div className="grid gap-1">
          <label htmlFor="email">{dict.auth.login.emailLabel}</label>
          <input
            id="email"
            name="email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            className="w-full rounded-md border p-2"
            required
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email[0]}</p>
          )}
        </div>
        <div className="grid gap-1">
          <label htmlFor="password">{dict.auth.login.passwordLabel}</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-md border p-2"
            required
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password[0]}</p>
          )}
        </div>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <SubmitButton dict={dict} pending={pending} />
      </form>
      <div className="text-center text-sm">
        <Link 
          href={`/${lang}/register`}
          className="underline hover:text-primary"
        >
          {dict.auth.login.registerLink}
        </Link>
      </div>
    </div>
  );
} 