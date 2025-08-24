// components/RefreshClient.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RefreshClient = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAndRefresh = async () => {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.status === 200) {
        // refresh the page after get new access token
        window.location.reload();
      } else {
        // redirect to login page
        router.push("/login-register");
      }
    };

    checkAndRefresh();
  }, [router]);

  return null;
};

export default RefreshClient;
