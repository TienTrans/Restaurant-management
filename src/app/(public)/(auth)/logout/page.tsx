"use client";

import { useAppStore } from "@/components/app-provider";
import {
  getAccessTokenFromLocalStorage,
  getRefeshTokenFromLocalStorage,
} from "@/lib/token-utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

function Logout() {
  const { mutateAsync } = useLogoutMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const setRole = useAppStore((state) => state.setRole);
  const disconnectSocket = useAppStore((state) => state.disconnectSocket);
  const accessTokenFromUrl = searchParams.get("accessToken");
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const ref = useRef<any>(null);
  useEffect(() => {
    if (
      !ref.current &&
      ((accessTokenFromUrl &&
        accessTokenFromUrl === getAccessTokenFromLocalStorage()) ||
        (refreshTokenFromUrl &&
          refreshTokenFromUrl === getRefeshTokenFromLocalStorage()))
    ) {
      ref.current = mutateAsync;
      mutateAsync().then(() => {
        setTimeout(() => {
          ref.current = null;
        }, 1000);
        setRole(undefined);
        disconnectSocket();
        router.push("/login");
      });
    } else {
      router.push("/");
    }
  }, [
    mutateAsync,
    router,
    accessTokenFromUrl,
    refreshTokenFromUrl,
    setRole,
    disconnectSocket,
  ]);
  return <div>logout page</div>;
}

export default function LogoutPage() {
  return (
    <Suspense>
      <Logout />
    </Suspense>
  );
}
