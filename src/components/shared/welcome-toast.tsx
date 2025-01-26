"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { APP_NAME } from "@/lib/constants";

export function WelcomeToast() {
  const { toast } = useToast();

  useEffect(() => {
    const hasShownWelcome = localStorage.getItem("hasShownWelcome");

    if (!hasShownWelcome) {
      toast({
        title: `Welcome to ${APP_NAME}! 👋`,
        description:
          "We're excited to help you manage and track performance effectively.",
        duration: 5000,
        className:
          "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-none",
      });

      localStorage.setItem("hasShownWelcome", "true");
    }
  }, [toast]);

  return null;
}
