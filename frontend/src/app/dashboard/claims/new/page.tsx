"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function NewClaimWizard() {
  const router = useRouter();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<string>('');
  const [selectedBenefitId, setSelectedBenefitId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/api/purchases/').then(res => setPurchases(res.data.results || res.data));
  }, []);

  const selectedPurchase = purchases.find(p => p.id.toString() === selectedPurchaseId);

  const handleCreateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/api/claims/', {
        purchase_id: selectedPurchaseId,
        benefit_id: selectedBenefitId
      });
      router.push(`/dashboard/claims/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to start claim');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Start a New Claim</h1>
      
      <form onSubmit={handleCreateDraft} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Purchase</label>
          <select 
            required 
            value={selectedPurchaseId} 
            onChange={(e) => { setSelectedPurchaseId(e.target.value); setSelectedBenefitId(''); }}
            className="w-full rounded-md border-gray-300 shadow-sm p-2 border text-gray-900"
          >
            <option value="">-- Select a Purchase --</option>
            {purchases.map(p => (
              <option key={p.id} value={p.id}>{p.product_name} - ${p.amount} ({p.purchase_date})</option>
            ))}
          </select>
        </div>

        {selectedPurchase && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Eligible Benefit</label>
            <select 
              required 
              value={selectedBenefitId} 
              onChange={(e) => setSelectedBenefitId(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm p-2 border text-gray-900"
            >
              <option value="">-- Select a Benefit --</option>
              {selectedPurchase.benefits?.filter((pb:any) => pb.is_activated).map((pb: any) => (
                <option key={pb.benefit.id} value={pb.benefit.id}>{pb.benefit.name} (Active until {pb.expiration_date})</option>
              ))}
            </select>
            {selectedPurchase.benefits?.filter((pb:any) => pb.is_activated).length === 0 && (
              <p className="text-red-500 text-sm mt-2">No active benefits found for this purchase.</p>
            )}
          </div>
        )}

        <div className="pt-4 flex space-x-4">
          <button 
            type="submit" 
            disabled={!selectedPurchaseId || !selectedBenefitId || loading} 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Generating AI Draft...' : 'Start Claim & Generate AI Draft'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
