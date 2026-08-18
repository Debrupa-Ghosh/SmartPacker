import React from 'react';
import ForecastCard from './ForecastCard';
import { CalendarDays } from 'lucide-react';

export default function Forecast({ forecastDays }) {
  if (!forecastDays || forecastDays.length === 0) {
    return null;
  }

  return (
    <section id="forecast" className="w-full my-12 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl shadow-sm">
          <CalendarDays className="w-6 h-6" strokeWidth={1.75} />
        </div>
        <h2 className="text-3xl font-extrabold text-navy-800 tracking-tight">3-Day Forecast</h2>
      </div>
      
      {/* Horizontal scrolling on mobile, grid on desktop */}
      <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {forecastDays.map((day, index) => (
          <ForecastCard key={day.date || index} day={day} index={index} />
        ))}
      </div>
    </section>
  );
}
