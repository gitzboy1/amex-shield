"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <Link href="/dashboard" className="text-blue-600 font-semibold hover:underline">
            &larr; Back to App
          </Link>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Admin Portal</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className={`block p-3 rounded font-medium ${pathname === '/admin' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            Analytics Home
          </Link>
          <Link href="/admin/users" className={`block p-3 rounded font-medium ${pathname === '/admin/users' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            User Management
          </Link>
          <Link href="/admin/audit" className={`block p-3 rounded font-medium ${pathname === '/admin/audit' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            Audit Logs
          </Link>
          <Link href="/admin/settings" className={`block p-3 rounded font-medium ${pathname === '/admin/settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            System Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
