import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import GoogleSignUpForm from "./google-signup-form";
import { cn } from "@/lib/utils";
import { theme } from "@/styles/theme";

interface SignUpPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

export const metadata: Metadata = {
  title: `Sign Up - ${APP_NAME}`,
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl;

  if (session) {
    redirect(callbackUrl || "/");
  }

  return (
    <div className="container relative min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl border-0 dark:bg-gray-900/80">
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
                priority
              />
            </Link>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Welcome to {APP_NAME}
            </h1>
            <p className={cn(theme.text.secondary)}>
              Sign up with your company email to access the performance
              management system
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <GoogleSignUpForm />

          <div className="text-center space-y-2">
            <p className={cn(theme.text.secondary)}>
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className={cn(theme.text.accent, theme.hover.text)}
              >
                Sign in
              </Link>
            </p>
            <p className={cn(theme.text.muted)}>
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                target="_blank"
                className="text-emerald-600 hover:text-emerald-500"
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
