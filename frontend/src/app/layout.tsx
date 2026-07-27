import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AMEX SHIELD",
  description: "AI-powered benefit discovery and claims.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <header className="bg-blue-600 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-tight">AMEX SHIELD</Link>
            <nav className="flex space-x-6">
              <Link href="/dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
              <Link href="/dashboard/advisor" className="hover:text-blue-200 transition">AI Advisor</Link>
              <Link href="/dashboard/claim" className="hover:text-blue-200 transition">File a Claim</Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
