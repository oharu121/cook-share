export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { getDictionary } from "@/config/dictionaries";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang as "en" | "ja");

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {dict.auth.login.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {dict.auth.login.description}
          </p>
        </div>
        <LoginForm lang={lang} dict={dict} />
      </div>
    </div>
  );
}
