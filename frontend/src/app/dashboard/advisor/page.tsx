"use client";

import { useState } from "react";
import Link from "next/link";
import api from '@/lib/api';

export default function AIAdvisor() {
  const [product, setProduct] = useState("");
  const [card, setCard] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product && card) {
      setLoading(true);
      try {
        const res = await api.post('/api/advisor/', { product, card });
        setResult(res.data);
        setShowResult(true);
      } catch (err) {
        console.error("Failed to fetch recommendation", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Benefit Advisor</h1>
        <p className="text-gray-600">Tell me what you are buying, and I'll tell you which card to use to maximize your protections.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleAsk} className="space-y-6">
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">What are you purchasing?</label>
            <input 
              type="text" 
              placeholder="e.g. MacBook, Flight to London, iPhone"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Which card are you considering?</label>
            <select 
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              value={card}
              onChange={(e) => setCard(e.target.value)}
              required
            >
              <option value="" disabled>Select a card</option>
              <option value="Platinum">The Platinum Card®</option>
              <option value="Gold">American Express® Gold Card</option>
              <option value="Everyday">Amex EveryDay® Credit Card</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {loading ? "Analyzing..." : "Get Recommendation"}
          </button>
        </form>

        {showResult && result && (
          <div className="mt-8 pt-8 border-t border-gray-100 animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold text-gray-900 mb-4">AI Recommendation:</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">💳</span>
                <span className="text-xl font-bold text-blue-900">Use {result.card}</span>
              </div>
              
              <p className="text-blue-800 mb-4">
                {result.message}
              </p>

              <h4 className="font-semibold text-blue-900 mb-2">You'll receive:</h4>
              <ul className="space-y-2 text-blue-800">
                {result.benefits.map((benefit: any, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span> 
                    <strong>{benefit.name}</strong> &nbsp;({benefit.desc})
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => {setShowResult(false); setProduct(""); setCard("");}}
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Ask another question
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
