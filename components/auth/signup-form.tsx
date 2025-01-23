'use client';

import { signup } from "@/server/actions/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";

interface SignupFormProps {
  lang: string;
  dict: {
    auth: {
      signup: {
        emailLabel: string;
        passwordLabel: string;
        nameLabel: string;
        submitButton: string;
        loginLink: string;
        loading: string;
      };
    };
  };
}

function SubmitButton({ dict, pending }: { dict: SignupFormProps['dict'], pending: boolean }) {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? dict.auth.signup.loading : dict.auth.signup.submitButton}
    </Button>
  );
}

export function SignupForm({ lang, dict }: SignupFormProps) {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="grid gap-6">
      <form action={action} className="space-y-4">
        <div className="grid gap-1">
          <label htmlFor="name">{dict.auth.signup.nameLabel}</label>
          <input
            id="name"
            name="name"
            type="text"
            autoCapitalize="none"
            autoComplete="name"
            autoCorrect="off"
            className="w-full rounded-md border p-2"
            required
          />
          {state?.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name[0]}</p>
          )}
        </div>
        <div className="grid gap-1">
          <label htmlFor="email">{dict.auth.signup.emailLabel}</label>
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
          <label htmlFor="password">{dict.auth.signup.passwordLabel}</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
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
          href={`/${lang}/login`}
          className="underline hover:text-primary"
        >
          {dict.auth.signup.loginLink}
        </Link>
      </div>
    </div>
  );
} 