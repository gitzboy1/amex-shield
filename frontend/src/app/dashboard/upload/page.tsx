"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function UploadReceiptPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setError(null);
      setReviewData(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    
    const data = new FormData();
    data.append('receipt', file);

    try {
      const response = await api.post('/api/receipts/upload/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.status === 202) {
        // Low confidence - needs review
        setReviewData(response.data.extracted_data);
        setFormData({
          merchant_name: response.data.extracted_data.merchant_name.value,
          product_name: response.data.extracted_data.product_name.value,
          category: response.data.extracted_data.category.value,
          amount: response.data.extracted_data.amount.value,
          purchase_date: response.data.extracted_data.purchase_date.value,
        });
      } else if (response.status === 201) {
        // Success
        router.push(`/dashboard/purchases/${response.data.purchase.id}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upload receipt.');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/api/purchases/', formData);
      router.push(`/dashboard/purchases/${response.data.id}`);
    } catch (err) {
      setError('Failed to save corrected purchase.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Upload Receipt</h1>
      
      {!reviewData ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="mb-6">
            <label htmlFor="receipt-upload" className="cursor-pointer bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-12 flex flex-col items-center justify-center hover:bg-blue-100 transition">
              <span className="text-4xl mb-3">📄</span>
              <span className="text-blue-700 font-medium">Click to select a receipt image (JPEG/PNG)</span>
              <span className="text-sm text-gray-500 mt-2">Max 10MB</span>
              <input 
                id="receipt-upload" 
                type="file" 
                accept="image/jpeg, image/png" 
                className="hidden" 
                onChange={handleFileChange} 
              />
            </label>
          </div>

          {preview && (
            <div className="mb-6 text-left">
              <p className="font-medium text-gray-700 mb-2">Selected File:</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Receipt preview" className="max-h-64 rounded-md shadow-sm border mx-auto" />
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <button 
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Processing with AI...' : 'Scan Receipt'}
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-200">
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
            <p className="text-orange-800 font-medium">Review Required</p>
            <p className="text-sm text-orange-700 mt-1">Our AI extracted the following fields, but the confidence score was low for some items. Please verify and correct them before saving.</p>
          </div>
          
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Merchant Name 
                  {reviewData.merchant_name.confidence < 0.8 && <span className="text-xs text-red-500 ml-2">(Low Confidence: {Math.round(reviewData.merchant_name.confidence * 100)}%)</span>}
                </label>
                <input required type="text" name="merchant_name" value={formData.merchant_name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                  {reviewData.product_name.confidence < 0.8 && <span className="text-xs text-red-500 ml-2">(Low Confidence: {Math.round(reviewData.product_name.confidence * 100)}%)</span>}
                </label>
                <input required type="text" name="product_name" value={formData.product_name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 text-gray-900" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                <input required type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
                <input required type="date" name="purchase_date" value={formData.purchase_date} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 text-gray-900" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 text-gray-900">
                  <option value="Electronics">Electronics</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Travel">Travel</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex space-x-4">
              <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50">
                {loading ? 'Saving...' : 'Confirm & Save'}
              </button>
              <button type="button" onClick={() => setReviewData(null)} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
