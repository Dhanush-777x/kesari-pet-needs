"use client";
import { PawPrint } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token exists in the cookies
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background bg-opacity-80 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-primary">Kesari Pet Needs</div>
        <div className="space-x-6 hidden md:flex">
          {!isLoggedIn ? (
            // Show Login and Register links if not logged in
            <>
              {pathname === "/register" ? (
                <a
                  href="/login"
                  className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-accent transition flex items-center space-x-2"
                >
                  Login
                </a>
              ) : (
                <a
                  href="/register"
                  className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-accent transition flex items-center space-x-2"
                >
                  Register
                </a>
              )}
            </>
          ) : (
            // Show other routes and logout button if logged in
            <>
              <div className="w-full max-w-lg relative">
                <input
                  type="search"
                  placeholder="Search for pet food, toys, services..."
                  className="w-full p-4 pl-12 text-text bg-white border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400"
                />
                <Search className="h-6 w-6 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <a
                href="/products"
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-accent transition flex items-center space-x-2"
              >
                <span>Explore</span>
                <PawPrint className="text-white" />
              </a>
              <button
                onClick={handleLogout}
                className="text-primary font-bold hover:text-secondary py-3 px-6"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
