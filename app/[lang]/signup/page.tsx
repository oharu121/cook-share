export const dynamic = "force-dynamic";

import { SignupForm } from "@/components/auth/signup-form";
import { getDictionary } from "@/config/dictionaries";

export default async function SignupPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ja" }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {dict.auth.signup.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {dict.auth.signup.description}
          </p>
        </div>
        <SignupForm lang={lang} dict={dict} />
      </div>
    </main>
  );
}
