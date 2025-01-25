import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { APP_NAME } from "@/src/lib/constants";
import GoogleSignUpForm from "./google-signup-form";
import { Session } from "next-auth";

interface SignUpPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

export const metadata: Metadata = {
  title: `Sign Up - ${APP_NAME}`,
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const session = (await auth()) as Session | null;
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl;

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl border-0">
        <CardHeader className="space-y-6 pb-8">
          <div className="flex justify-center transition-transform duration-300 opacity-0 animate-fadeIn">
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

          <div className="space-y-2 text-center transition-opacity duration-500 ease-in-out opacity-0 animate-slideUp delay-200">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Welcome to {APP_NAME}
            </h1>
            <p className="text-sm text-gray-600">
              Sign up with your company email to access the performance
              management system
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="transition-transform duration-500 ease-in-out transform translate-y-5 opacity-0 animate-slideUp delay-400">
            <GoogleSignUpForm />
          </div>

          <div className="text-center space-y-2 transition-transform duration-500 ease-in-out transform translate-y-5 opacity-0 animate-slideUp delay-500">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                Sign in
              </Link>
            </p>
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                target="_blank"
                className="font-medium text-emerald-600 hover:text-emerald-500"
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
