"use client";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Redirect to seller dashboard if already logged in
    if (Cookies.get("sellerToken")) {
      router.push("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/sellerLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        // Store the token in cookies
        Cookies.set("sellerToken", data.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        alert("Login successful!");

        router.push("/dashboard"); // Redirect seller to dashboard
      }
    } catch (error) {
      console.error("An error occurred during seller login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-light relative min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex items-center flex-grow">
        <div className="bg-secondary shadow-lg rounded-lg py-12 px-10 container mx-auto max-w-md">
          <h1 className="text-3xl font-bold text-center">Seller Login</h1>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Enter password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Login 
              </button>
             <div className="text-center mt-4">
              <Link
              href="/login"
              className="text-blue-600 hover:underline"
            >
             Back 
            </Link>
              </div> 

            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SellerLogin;
