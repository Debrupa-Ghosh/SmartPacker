import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center animate-fade-in">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 relative">
        <div className="absolute inset-0 bg-blue-100 rounded-2xl animate-ping opacity-20"></div>
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" strokeWidth={2.5} />
      </div>
      <p className="text-lg font-bold text-slate-500 tracking-tight animate-pulse">
        Checking the weather and packing your guide...
      </p>
      
      {/* Skeletons to match layout shape roughly and avoid layout shift */}
      <div className="w-full max-w-5xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-40 px-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-slate-200/50 rounded-3xl p-6 h-48 animate-pulse border border-slate-100"></div>
        ))}
      </div>
    </div>
  );
}
