import React from 'react';
import { Luggage } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-slate-300 py-12 mt-auto border-t border-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-white font-extrabold text-2xl tracking-tight mb-4">
          <Luggage className="w-6 h-6 text-blue-400" strokeWidth={2.5} />
          SmartPacker
        </div>
        
        <p className="text-slate-400 font-medium text-lg mb-8">
          Pack smarter. Travel better.
        </p>
        
        <div className="w-24 h-px bg-slate-700 mb-8"></div>
        
        <p className="text-sm text-slate-500 font-medium mb-2">
          Built with React + WeatherAPI
        </p>
        <p className="text-sm text-slate-500 font-medium">
          &copy; 2026 SmartPacker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
