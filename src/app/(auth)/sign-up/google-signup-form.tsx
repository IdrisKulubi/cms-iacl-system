"use client";
import { Button } from "@/src/components/ui/button";
import { SignInWithGoogle } from "@/lib/actions/user.actions";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { theme } from "@/styles/theme";

export default function GoogleSignUpForm() {
  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        className={cn(
          "w-full flex items-center justify-center gap-2 h-12",
          theme.background.secondary,
          theme.hover.bg,
          theme.text.primary,
          theme.border.primary,
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        variant="outline"
        aria-label="sign up with google"
      >
        {!pending && (
          <Image
            src="/assets/icons/google.svg"
            alt="Google"
            width={20}
            height={20}
          />
        )}
        <span className={cn(theme.text.primary)}>
          {pending ? "Redirecting..." : "Continue with Google"}
        </span>
      </Button>
    );
  };

  return (
    <form action={SignInWithGoogle}>
      <SignUpButton />
    </form>
  );
}
