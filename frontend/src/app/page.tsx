"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-center px-4 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40" />

      <section className="max-w-4xl space-y-8 z-10 relative py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-700 rounded-full text-sm font-bold tracking-wide shadow-sm border border-blue-100 uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          AMEX SHIELD Early Access
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Never Miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Card Benefit</span> Again
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
          We proactively track your purchases, evaluate eligibility, and guide you through claims using state-of-the-art AI.
        </p>
        
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Go to Dashboard
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link 
            href="/dashboard/advisor" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 font-semibold rounded-xl shadow-sm hover:bg-slate-50 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            Try AI Advisor
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl z-10 relative mb-24 px-4">
        {[
          { icon: "🛡️", title: "Automated Discovery", desc: "We analyze your transactions to instantly spot eligible protections and alert you before they expire." },
          { icon: "🤖", title: "AI Claim Assistant", desc: "Upload receipts and let AI extract data to pre-fill and precisely organize your claim forms." },
          { icon: "💡", title: "Benefit Advisor", desc: "Ask questions and get personalized recommendations on which card to use for your next big purchase." }
        ].map((feature, i) => (
          <div key={i} className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2 group text-left">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner transform group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
