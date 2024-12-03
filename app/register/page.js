"use client";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  useEffect(() => {
    // Redirect to home if already logged in
    if (Cookies.get("token")) {
      router.push("/home");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert("User registered successfully!");
    }
  };

  return (
    <div className="bg-light relative min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex items-center flex-grow">
        <div className="bg-secondary shadow-lg rounded-lg py-12 px-10 container mx-auto max-w-md">
          <h1 className="text-3xl font-bold text-center">Register</h1>
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
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
