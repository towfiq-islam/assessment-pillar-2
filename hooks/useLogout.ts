"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";

export function useLogout() {
  const [isLogoutPending, setIsLogoutPending] = useState(false);

  const handleLogout = async () => {
    if (isLogoutPending) return;
    setIsLogoutPending(true);
    try {
      await signOut({ callbackUrl: "/" });
    } finally {
      setIsLogoutPending(false);
    }
  };

  return { isLogoutPending, handleLogout };
}
