import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import GoogleSignInForm from "./google-signin-form";
import { auth } from "@/auth";
import { APP_NAME } from "@/src/lib/constants";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { theme } from "@/styles/theme";
import { cn } from "@/lib/utils";

interface SignInPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
  }>;
}

export const metadata: Metadata = {
  title: `Sign In - ${APP_NAME}`,
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl;

  if (session) {
    return redirect(callbackUrl || "/dashboard");
  }

  return (
    <div
      className={cn(
        "w-full min-h-[80vh] flex items-center justify-center px-4",
        theme.background.primary
      )}
    >
      <Card
        className={cn(
          "w-full max-w-md backdrop-blur-md shadow-xl border-0",
          theme.background.card
        )}
      >
        <CardHeader className="space-y-6 pb-8">
          <div className="flex justify-center">
            <Link href="/" className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full blur opacity-30"></div>
              <Image
                src="/assets/icons/logo.png"
                width={80}
                height={80}
                alt={APP_NAME}
                className="relative rounded-full"
              />
            </Link>
          </div>

          <div className="space-y-2 text-center">
            <h1
              className={cn(
                "text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent",
                theme.text.primary
              )}
            >
              Welcome Back
            </h1>
            <p className={cn(theme.text.secondary)}>
              Sign in to access your performance dashboard
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="transition-transform duration-300">
            <GoogleSignInForm />
          </div>

          <div className="text-center space-y-2">
            <p className={cn(theme.text.secondary)}>
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className={cn(theme.text.accent, theme.hover.text)}
              >
                Sign up
              </Link>
            </p>
            <p className={cn(theme.text.muted)}>
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                target="_blank"
                className={cn(theme.text.accent, theme.hover.text)}
              >
                Terms & Privacy Policy
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
