"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RefreshClient = () => {
  const router = useRouter();

  // send rrequest for change access Token
  useEffect(() => {
    fetch("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        window.location.reload();
      } else {
        router.push("/login-register");
      }
    });
  }, [router]);

  return null;
};

export default RefreshClient;
