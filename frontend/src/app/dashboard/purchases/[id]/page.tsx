"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function PurchaseDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [purchase, setPurchase] = useState<any>(null);

  useEffect(() => {
    api.get(`/api/purchases/${id}/`).then(res => setPurchase(res.data)).catch(err => {
      console.error(err);
      alert('Failed to load purchase');
      router.push('/dashboard/purchases');
    });
  }, [id, router]);

  if (!purchase) return <div className="p-8 text-center text-gray-500">Loading purchase...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Purchase Details</h1>
        <button onClick={() => router.back()} className="text-blue-600 hover:underline">
          &larr; Back
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-500">Product</p>
            <p className="font-semibold text-gray-900">{purchase.product_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Merchant</p>
            <p className="font-semibold text-gray-900">{purchase.merchant_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-semibold text-gray-900">${purchase.amount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold text-gray-900">{purchase.purchase_date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Card Used</p>
            <p className="font-semibold text-gray-900">{purchase.card_used}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-semibold text-gray-900">{purchase.category || 'N/A'}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">Eligible Benefits & AI Summary</h2>
      
      {purchase.benefits && purchase.benefits.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {purchase.benefits.map((pb: any) => (
            <div key={pb.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-blue-800 text-lg flex items-center">
                  <span className="mr-2">🛡️</span> {pb.benefit.name}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${pb.is_activated ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {pb.is_activated ? 'Active Coverage' : 'Inactive'}
                </span>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4 flex-grow">
                <p className="text-sm text-blue-900 leading-relaxed font-medium">✨ AI Analysis:</p>
                <p className="text-sm text-blue-800 mt-1">{pb.ai_summary || "Our AI is currently analyzing this benefit for you."}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-3 mt-auto border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Activation</span>
                  <span className="font-semibold text-gray-800">{pb.activation_date}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: pb.is_activated ? '50%' : '100%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Expiration</span>
                  <span className="font-bold text-red-500">{pb.expiration_date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-200">
          <p className="text-gray-500">No benefits are active for this purchase.</p>
        </div>
      )}
    </div>
  );
}
