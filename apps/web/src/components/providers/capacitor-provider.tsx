"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { App } from "@capacitor/app";
import { SplashScreen } from "@capacitor/splash-screen";

export const CapacitorProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    SplashScreen.hide();

    App.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      } else {
        router.back();
      }
    });
  }, [router]);

  return <>{children}</>;
};
