// components/AuthGuard.js
"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      setIsVerified(true); // Allow rendering if authenticated
    }
  }, []);

  // Only render children if authenticated
  return isVerified ? children : null;
};

export default AuthGuard;
