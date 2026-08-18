import React from 'react';
import { getRecommendationIcon, getCategoryStyle } from '../utils/iconMap';

const priorityBadgeMap = {
  high: 'bg-rose-100/80 text-rose-700 border-rose-200 shadow-sm shadow-rose-100/50',
  medium: 'bg-amber-100/80 text-amber-700 border-amber-200 shadow-sm shadow-amber-100/50',
  low: 'bg-green-100/80 text-green-700 border-green-200 shadow-sm shadow-green-100/50',
};

export default function RecommendationCard({
  title,
  reason,
  icon,
  category,
  priority = 'medium',
  index = 0
}) {
  const IconComponent = getRecommendationIcon(icon);
  const categoryStyle = getCategoryStyle(category, reason);

  const normalizedPriority = priority?.toLowerCase() || 'medium';
  const priorityBadgeStyle = priorityBadgeMap[normalizedPriority] || 'bg-gray-100 text-gray-700 border-gray-200';

  const capitalizedPriority = priority
    ? priority.charAt(0).toUpperCase() + priority.slice(1)
    : '';

  // Use a max of 8 stagger classes as defined in CSS
  const staggerClass = `stagger-${(index % 8) + 1}`;

  return (
    <div 
      className={`relative bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-slate-100/60 hover:shadow-lg hover:-translate-y-1 hover:border-slate-200 transition-all duration-300 flex flex-col items-start text-left animate-slide-up opacity-0 ${staggerClass}`}
      style={{ animationFillMode: 'forwards' }}
    >
      {capitalizedPriority && (
        <span
          className={`absolute top-5 right-5 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold border ${priorityBadgeStyle}`}
        >
          {capitalizedPriority}
        </span>
      )}

      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border shadow-sm ${categoryStyle.bg} ${categoryStyle.border}`}
      >
        <IconComponent className={`w-7 h-7 ${categoryStyle.icon}`} strokeWidth={1.75} />
      </div>

      <h3 className="text-lg font-bold text-navy-800 mb-2 pr-16 tracking-tight">
        {title}
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed font-medium">
        {reason}
      </p>
    </div>
  );
}
