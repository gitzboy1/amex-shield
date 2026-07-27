"use client";

import { useState } from "react";
import Link from "next/link";

export default function ClaimAssistant() {
  const [status, setStatus] = useState<"idle" | "uploading" | "extracted" | "submitted">("idle");

  const handleUpload = () => {
    setStatus("uploading");
    setTimeout(() => {
      setStatus("extracted");
    }, 1500); // simulate OCR delay
  };

  const handleSubmit = () => {
    setStatus("submitted");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Claim Assistant</h1>
        <p className="text-gray-600">Upload your receipt and let AI extract the details to prepare your claim automatically.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        
        {status === "idle" && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition cursor-pointer" onClick={handleUpload}>
            <div className="text-5xl mb-4">📄</div>
            <p className="text-gray-600 font-medium">Click to upload receipt (PDF, JPG, PNG)</p>
            <p className="text-gray-400 text-sm mt-2">Maximum file size 10MB</p>
          </div>
        )}

        {status === "uploading" && (
          <div className="p-12 text-center space-y-4">
            <div className="animate-spin text-5xl mb-4 mx-auto w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            <p className="text-blue-600 font-medium animate-pulse">AI is analyzing your receipt...</p>
          </div>
        )}

        {status === "extracted" && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center">
              <span className="text-xl mr-3">✅</span>
              <div>
                <p className="font-bold">Extraction Successful</p>
                <p className="text-sm">AI found the following information from your receipt.</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
              <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                <span className="text-gray-500 font-medium">Merchant</span>
                <span className="font-bold text-gray-900 text-right">Sony Store</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                <span className="text-gray-500 font-medium">Amount</span>
                <span className="font-bold text-gray-900 text-right">$349.00</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                <span className="text-gray-500 font-medium">Date</span>
                <span className="font-bold text-gray-900 text-right">24 Jul 2026</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-500 font-medium">Matched Benefit</span>
                <span className="font-bold text-blue-600 text-right">Extended Warranty</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button 
                onClick={() => setStatus("idle")} 
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                Upload different file
              </button>
              <button 
                onClick={handleSubmit}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition"
              >
                Submit Claim
              </button>
            </div>
          </div>
        )}

        {status === "submitted" && (
           <div className="p-12 text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900">Claim Submitted!</h2>
            <p className="text-gray-600">Your claim has been successfully filed. We will notify you of any updates.</p>
            <div className="pt-4">
              <Link href="/dashboard" className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition">
                Return to Dashboard
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
