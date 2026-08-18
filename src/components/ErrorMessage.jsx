import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4 animate-fade-in">
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm shadow-rose-100/50">
        <div className="bg-rose-100 text-rose-600 p-2.5 rounded-xl shrink-0">
          <AlertTriangle className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <p className="text-rose-800 font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}
