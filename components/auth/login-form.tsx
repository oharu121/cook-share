'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export function LoginForm({ lang, dict }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      // Verify the login was successful by checking auth
      const authCheck = await fetch('/api/auth/check', {
        credentials: 'include',
      });

      if (!authCheck.ok) {
        throw new Error('Authentication failed after login');
      }

      router.push(`/${lang}`);
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <label htmlFor="email">{dict.auth.login.emailLabel}</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className="w-full rounded-md border p-2"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">{dict.auth.login.passwordLabel}</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              disabled={isLoading}
              className="w-full rounded-md border p-2"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? dict.auth.login.loading : dict.auth.login.submitButton}
          </Button>
        </div>
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