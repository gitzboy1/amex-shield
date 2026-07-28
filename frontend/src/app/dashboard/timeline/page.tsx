"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function TimelinePage() {
  const [timeline, setTimeline] = useState<any[]>([]);

  useEffect(() => {
    api.get('/api/dashboard/timeline/').then(res => setTimeline(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Benefit Activation Timeline</h1>
      
      <div className="relative border-l border-gray-200 ml-3">
        {timeline.map((item) => (
          <div key={item.id} className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </span>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-gray-900">{item.product_name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3"><strong className="text-blue-700">{item.benefit_name}</strong> applied.</p>
              <div className="flex text-xs text-gray-500 space-x-4">
                <div>
                  <span className="block font-medium">Activated</span>
                  <span>{item.activation_date}</span>
                </div>
                <div>
                  <span className="block font-medium">Expires</span>
                  <span>{item.expiration_date || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {timeline.length === 0 && (
          <p className="text-gray-500 ml-6">No benefit history found.</p>
        )}
      </div>
    </div>
  );
}
