"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight">AMEX SHIELD</Link>
        <nav className="flex space-x-6 items-center">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
              <Link href="/dashboard/advisor" className="hover:text-blue-200 transition">AI Advisor</Link>
              <Link href="/dashboard/claim" className="hover:text-blue-200 transition">File a Claim</Link>
              <Link href="/dashboard/profile" className="hover:text-blue-200 transition">Profile</Link>
              <button onClick={() => logout()} className="hover:text-blue-200 transition text-sm bg-blue-700 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-200 transition">Login</Link>
              <Link href="/register" className="hover:text-blue-200 transition text-sm bg-white text-blue-600 px-3 py-1 rounded font-semibold">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
