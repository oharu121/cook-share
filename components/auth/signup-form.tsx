'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export function SignupForm({ lang, dict }: SignupFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      router.push(`/${lang}/login`);
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
            <label htmlFor="name">{dict.auth.signup.nameLabel}</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              className="w-full rounded-md border p-2"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">{dict.auth.signup.emailLabel}</label>
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
            <label htmlFor="password">{dict.auth.signup.passwordLabel}</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              disabled={isLoading}
              className="w-full rounded-md border p-2"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? dict.auth.signup.loading : dict.auth.signup.submitButton}
          </Button>
        </div>
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