'use client'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css"; // Optional, for global styles like Tailwind.
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className="relative min-h-screen flex flex-col bg-background text-text">
        <main className="flex-grow">{children}</main>
        {pathname !== "/login" && pathname !== "/register" && <Footer />}
      </body>
    </html>
  );
}
