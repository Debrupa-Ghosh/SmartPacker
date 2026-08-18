import React from 'react';
import RecommendationCard from './RecommendationCard';
import { Luggage } from 'lucide-react';

export default function RecommendationSection({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section id="recommendations" className="w-full mt-12 mb-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 to-transparent -z-10 rounded-3xl -mx-4 sm:-mx-8 px-4 sm:px-8"></div>
      
      <div className="pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-xl shadow-sm">
            <Luggage className="w-6 h-6" strokeWidth={1.75} />
          </div>
          <h2 className="text-3xl font-extrabold text-navy-800 tracking-tight">SmartPacker Says&hellip;</h2>
        </div>
        <p className="text-slate-500 font-medium text-lg mb-8 ml-14">Based on the weather, here&apos;s what you should carry.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <RecommendationCard 
              key={rec.title} 
              {...rec} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
