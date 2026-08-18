import React from 'react';
import { MapPin, Thermometer, Droplets, Wind, Sun, CloudRain } from 'lucide-react';
import { getWeatherIconFromCondition } from '../utils/iconMap';

export default function CurrentWeather({ weather }) {
  if (!weather || !weather.current || !weather.location) {
    return null;
  }

  const { name, region, country } = weather.location;
  const current = weather.current;
  const conditionText = current.condition?.text || '';
  const WeatherIcon = getWeatherIconFromCondition(conditionText);
  
  const tempC = Math.round(current.temp_c);
  const feelsLikeC = Math.round(current.feelslike_c);
  const humidity = current.humidity;
  const windKph = current.wind_kph;
  const uv = current.uv;
  const rainChance = weather.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain ?? 0;

  const locationSubtitle = [region, country].filter(Boolean).join(', ');

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-slate-200/40 border border-white animate-fade-in relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header with Location */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-100/60 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600 shrink-0" strokeWidth={2.5} />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight">
              {name}
            </h2>
          </div>
          {locationSubtitle && (
            <p className="text-base font-medium text-slate-500 mt-1 pl-8">
              {locationSubtitle}
            </p>
          )}
        </div>
        <span className="self-start sm:self-center inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
          Current Weather
        </span>
      </div>

      {/* Main Temp & Condition */}
      <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex items-start gap-1">
          <span className="text-[5rem] sm:text-[7rem] md:text-[8rem] font-extrabold text-navy tracking-tighter leading-none">
            {tempC}
          </span>
          <span className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-cyan-500 mt-2 sm:mt-4">
            °C
          </span>
        </div>

        <div className="flex items-center gap-5 bg-gradient-to-br from-slate-50 to-white px-8 py-6 rounded-3xl border border-slate-100 shadow-sm w-full md:w-auto">
          <WeatherIcon className="w-16 h-16 sm:w-20 sm:h-20 text-blue-500 drop-shadow-md" strokeWidth={1.5} />
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
              {conditionText}
            </p>
            <p className="text-base text-slate-500 font-medium mt-1">
              Feels like {feelsLikeC}°C
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
