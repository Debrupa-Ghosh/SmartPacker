import React from 'react';
import { Droplets } from 'lucide-react';
import { getWeatherIconFromCondition } from '../utils/iconMap';

export default function ForecastCard({ day, index }) {
  if (!day || !day.day) return null;

  const dateObj = new Date(day.date + 'T00:00:00');
  const dayLabel = index === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const conditionText = day.day.condition?.text || '';
  const WeatherIcon = getWeatherIconFromCondition(conditionText);
  
  const maxTemp = Math.round(day.day.maxtemp_c);
  const minTemp = Math.round(day.day.mintemp_c);
  const rainChance = day.day.daily_chance_of_rain ?? 0;

  const staggerClass = `stagger-${(index % 3) + 1}`;

  return (
    <div 
      className={`min-w-[260px] md:min-w-0 flex-1 snap-center bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-slate-100/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center animate-slide-up opacity-0 ${staggerClass}`}
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="bg-slate-50 border border-slate-100 rounded-full px-4 py-1.5 mb-4">
        <h3 className="font-extrabold text-sm uppercase tracking-widest text-navy-800">{dayLabel}</h3>
      </div>
      <p className="text-sm font-semibold text-slate-400 mb-4">{formattedDate}</p>

      <div className="h-20 flex items-center justify-center">
        <WeatherIcon className="w-14 h-14 text-blue-500 drop-shadow-sm" strokeWidth={1.5} />
      </div>

      <p className="text-sm font-bold text-slate-600 mt-2 mb-4 min-h-[1.25rem]">
        {conditionText}
      </p>

      <div className="text-2xl font-extrabold text-navy-800 mb-4 flex items-baseline gap-1">
        <span>{maxTemp}°</span>
        <span className="text-slate-300 font-medium text-xl">/</span>
        <span className="text-slate-500 font-bold text-xl">{minTemp}°</span>
      </div>

      <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mt-auto w-full justify-center">
        <Droplets className="w-4 h-4 text-blue-500" strokeWidth={2.5} />
        <span>{rainChance}% Rain</span>
      </div>
    </div>
  );
}
