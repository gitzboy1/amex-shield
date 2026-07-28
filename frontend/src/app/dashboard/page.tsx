"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import StatCard from '@/components/dashboard/StatCard';
import Link from 'next/link';

export default function DashboardHome() {
  const [summary, setSummary] = useState<any>(null);
  const [upcoming, setUpcoming] = useState<any[]>([]);

  useEffect(() => {
    api.get('/api/dashboard/summary/').then(res => setSummary(res.data));
    api.get('/api/dashboard/upcoming/').then(res => setUpcoming(res.data));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
        <Link href="/dashboard/purchases/add" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          + Add Purchase
        </Link>
      </div>
      
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Purchases" value={summary.total_purchases} icon={<span className="text-xl">🛍️</span>} />
          <StatCard title="Protected Purchases" value={summary.protected_purchases} icon={<span className="text-xl">🛡️</span>} />
          <StatCard title="Total Protected Value" value={`$${summary.total_protected_value}`} icon={<span className="text-xl">💰</span>} />
          <StatCard title="Expiring Soon" value={summary.expiring_soon} icon={<span className="text-xl">⚠️</span>} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Upcoming Expirations</h2>
          {upcoming.length > 0 ? (
            <ul className="space-y-3">
              {upcoming.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{item.product_name}</p>
                    <p className="text-sm text-gray-500">{item.benefit_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-500">{item.days_remaining} days left</p>
                    <p className="text-xs text-gray-400">{item.expiration_date}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No benefits expiring soon.</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Quick Actions</h2>
          <div className="space-y-4">
            <Link href="/dashboard/upload" className="block w-full p-3 bg-blue-50 rounded border border-blue-100 hover:bg-blue-100 transition text-blue-700 font-medium">
              ✨ Scan Receipt with AI &rarr;
            </Link>
            <Link href="/dashboard/claims/new" className="block w-full p-3 bg-orange-50 rounded border border-orange-100 hover:bg-orange-100 transition text-orange-700 font-medium">
              📝 File a New Claim &rarr;
            </Link>
            <Link href="/dashboard/purchases" className="block w-full p-3 bg-gray-50 rounded border hover:bg-gray-100 transition text-gray-700 font-medium">
              View All Purchases &rarr;
            </Link>
            <Link href="/dashboard/timeline" className="block w-full p-3 bg-gray-50 rounded border hover:bg-gray-100 transition text-gray-700 font-medium">
              View Benefit Timeline &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
