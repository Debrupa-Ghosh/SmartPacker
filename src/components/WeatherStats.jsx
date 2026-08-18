import React from 'react';
import { Droplets, Wind, Sun, Eye, Thermometer, CloudRain } from 'lucide-react';

export default function WeatherStats({ weather }) {
  if (!weather || !weather.current) {
    return null;
  }

  const current = weather.current;

  const stats = [
    {
      id: 'humidity',
      label: 'Humidity',
      value: `${current.humidity}%`,
      icon: Droplets,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      id: 'wind',
      label: 'Wind',
      value: `${current.wind_kph} km/h`,
      icon: Wind,
      iconColor: 'text-teal-500',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-100',
    },
    {
      id: 'uv',
      label: 'UV Index',
      value: `${current.uv}`,
      icon: Sun,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
    },
    {
      id: 'visibility',
      label: 'Visibility',
      value: `${current.vis_km} km`,
      icon: Eye,
      iconColor: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
    },
    {
      id: 'feelslike',
      label: 'Feels Like',
      value: `${current.feelslike_c}°C`,
      icon: Thermometer,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-100',
    },
    {
      id: 'precipitation',
      label: 'Rain',
      value: `${current.precip_mm} mm`,
      icon: CloudRain,
      iconColor: 'text-sky-500',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const staggerClass = `stagger-${(index % 6) + 1}`;
        
        return (
          <div
            key={stat.id}
            className={`bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm shadow-slate-200/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center animate-fade-in opacity-0 ${staggerClass}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <div className={`p-3 rounded-2xl ${stat.bgColor} ${stat.iconColor} border ${stat.borderColor} mb-4 shadow-sm`}>
              <Icon className="w-5 h-5" strokeWidth={2} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              {stat.label}
            </span>
            <span className="text-lg font-extrabold text-navy-800 tracking-tight">
              {stat.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
