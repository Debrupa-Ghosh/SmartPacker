import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function TripInsight({ insight }) {
  if (!insight) return null;

  return (
    <div className="w-full animate-fade-in">
      <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200/60 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-sm shadow-amber-100/50">
        <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl shrink-0">
          <Lightbulb className="w-6 h-6" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-amber-800 mb-2">Trip Insight</h3>
          <p className="text-lg sm:text-xl font-medium text-amber-900/80 leading-relaxed">
            {insight}
          </p>
        </div>
      </div>
    </div>
  );
}
