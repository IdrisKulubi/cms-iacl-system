"use client";
import { useFormState } from "react-dom";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EmailSignInForm() {
  const [errorMessage, dispatch] = useFormState(signIn, undefined);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Company Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
          />
        </div>
      </div>

      {errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      )}

      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
} 