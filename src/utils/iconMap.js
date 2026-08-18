import {
  Umbrella,
  Sun,
  Wind,
  CloudRain,
  Snowflake,
  Glasses,
  GlassWater,
  Shirt,
  ShieldAlert,
  Footprints,
  Droplets,
  AlertTriangle,
  Eye,
  CloudLightning,
  CloudFog,
  HardHat,
  Layers,
  Package,
  Thermometer,
  Cloud,
  CloudSun
} from 'lucide-react';

export const recommendationIcons = {
  Umbrella,
  Sun,
  Wind,
  CloudRain,
  Snowflake,
  Glasses,
  GlassWater,
  Shirt,
  ShieldAlert,
  Footprints,
  Droplets,
  AlertTriangle,
  Eye,
  CloudLightning,
  CloudFog,
  HardHat,
  Layers,
  ShirtIcon: Shirt,
  Cloudy: Cloud,
  Thermometer
};

export function getRecommendationIcon(iconName) {
  return recommendationIcons[iconName] || Package;
}

export const categoryStyles = {
  rain: { bg: 'bg-blue-100/80', icon: 'text-blue-600', border: 'border-blue-200' },
  temperature: { bg: 'bg-orange-100/80', icon: 'text-orange-600', border: 'border-orange-200' }, // Defaults to warm, logic can override for cold
  humidity: { bg: 'bg-teal-100/80', icon: 'text-teal-600', border: 'border-teal-200' },
  uv: { bg: 'bg-amber-100/80', icon: 'text-amber-600', border: 'border-amber-200' },
  wind: { bg: 'bg-slate-200/80', icon: 'text-slate-600', border: 'border-slate-300' },
  condition: { bg: 'bg-indigo-100/80', icon: 'text-indigo-600', border: 'border-indigo-200' },
  default: { bg: 'bg-gray-100/80', icon: 'text-gray-600', border: 'border-gray-200' },
};

export function getCategoryStyle(category, reason = '') {
  if (!category) return categoryStyles.default;
  const lowerCat = category.toLowerCase();
  
  if (lowerCat === 'temperature' && (reason.toLowerCase().includes('cold') || reason.toLowerCase().includes('cool') || reason.toLowerCase().includes('freezing'))) {
      return { bg: 'bg-cyan-100/80', icon: 'text-cyan-600', border: 'border-cyan-200' };
  }
  
  return categoryStyles[lowerCat] || categoryStyles.default;
}

export function getWeatherIconFromCondition(conditionText) {
  const text = conditionText.toLowerCase();
  if (text.includes('thunder') || text.includes('lightning')) return CloudLightning;
  if (text.includes('snow') || text.includes('sleet') || text.includes('blizzard')) return Snowflake;
  if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) return CloudRain;
  if (text.includes('fog') || text.includes('mist')) return CloudFog;
  if (text.includes('cloud') || text.includes('overcast')) return Cloud;
  if (text.includes('partly')) return CloudSun;
  if (text.includes('sun') || text.includes('clear')) return Sun;
  return CloudSun;
}
