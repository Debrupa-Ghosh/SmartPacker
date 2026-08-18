/**
 * Rule-based recommendation engine.
 * Turns weather data into packing decisions.
 */

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

/**
 * Generates packing recommendations from weather data.
 * @param {object} weatherData - Full response from WeatherAPI.com
 * @returns {Array<{title: string, reason: string, icon: string, category: string, priority: string}>}
 */
export function generateRecommendations(weatherData) {
  const current = weatherData.current;
  const forecastDays = weatherData.forecast.forecastday;

  const tempC = current.temp_c;
  const feelsLikeC = current.feelslike_c;
  const humidity = current.humidity;
  const windKph = current.wind_kph;
  const uv = current.uv;
  const conditionText = current.condition.text.toLowerCase();

  // Aggregate rain chance across forecast days
  const maxRainChance = Math.max(
    ...forecastDays.map((d) => d.day.daily_chance_of_rain)
  );

  // Aggregate UV across forecast days
  const maxUV = Math.max(uv, ...forecastDays.map((d) => d.day.uv));

  // Aggregate wind across forecast days
  const maxWind = Math.max(windKph, ...forecastDays.map((d) => d.day.maxwind_kph));

  // Map of item title → recommendation object (for dedup)
  const items = new Map();

  function add(title, reason, icon, category, priority) {
    if (items.has(title)) {
      const existing = items.get(title);
      // Upgrade priority if the new one is higher
      if (PRIORITY_ORDER[priority] < PRIORITY_ORDER[existing.priority]) {
        existing.priority = priority;
      }
      // Optionally merge reason if different
      if (!existing.reason.includes(reason)) {
        existing.reason = `${existing.reason} ${reason}`;
      }
      return;
    }
    items.set(title, { title, reason, icon, category, priority });
  }

  // --- Temperature rules ---
  if (tempC >= 32) {
    add('Light clothes', 'High temperatures expected — stay cool.', 'Sun', 'temperature', 'high');
    add('Water bottle', 'Stay hydrated in the heat.', 'GlassWater', 'temperature', 'high');
    add('Sunglasses', 'Bright and hot conditions ahead.', 'Glasses', 'temperature', 'medium');
  } else if (tempC >= 27) {
    add('Light clothes', 'Warm weather — dress light.', 'Sun', 'temperature', 'medium');
    add('Water bottle', 'Stay hydrated in warm weather.', 'GlassWater', 'temperature', 'medium');
  } else if (tempC >= 18) {
    add('Comfortable clothes', 'Pleasant temperatures expected.', 'Shirt', 'temperature', 'low');
  } else if (tempC >= 12) {
    add('Light jacket', 'It will be cool — a light layer helps.', 'ShirtIcon', 'temperature', 'medium');
  } else if (tempC >= 5) {
    add('Warm jacket', 'Cold weather expected — bundle up.', 'Cloudy', 'temperature', 'high');
    add('Warm clothes', 'Layer up for the cold.', 'Shirt', 'temperature', 'high');
  } else {
    add('Heavy jacket', 'Very cold conditions — heavy layers needed.', 'Snowflake', 'temperature', 'high');
    add('Multiple warm layers', 'Sub-zero or near-freezing temps — layer heavily.', 'Layers', 'temperature', 'high');
  }

  // --- Rain rules ---
  if (maxRainChance >= 80) {
    add('Umbrella', 'Heavy rain is very likely during your trip.', 'Umbrella', 'rain', 'high');
    add('Raincoat', 'Strong chance of rain — stay dry.', 'CloudRain', 'rain', 'high');
    add('Waterproof shoes', 'Expect wet conditions underfoot.', 'Footprints', 'rain', 'high');
  } else if (maxRainChance >= 70) {
    add('Umbrella', 'Rain is likely during your trip.', 'Umbrella', 'rain', 'medium');
    add('Raincoat', 'Good chance of rain — bring a raincoat.', 'CloudRain', 'rain', 'medium');
    add('Waterproof shoes', 'Rain may make paths slippery.', 'Footprints', 'rain', 'medium');
  } else if (maxRainChance >= 50) {
    add('Umbrella', 'Rain is possible — better to be prepared.', 'Umbrella', 'rain', 'medium');
  }

  // --- Humidity rules ---
  if (humidity >= 75) {
    add('Moisturizer', 'High humidity can affect your skin.', 'Droplets', 'humidity', 'low');
    add('Breathable clothes', 'Humid conditions — breathable fabrics help.', 'Wind', 'humidity', 'medium');
  }

  // --- UV rules ---
  if (maxUV >= 8) {
    add('Sunscreen', 'Very high UV — protect your skin.', 'ShieldAlert', 'uv', 'high');
    add('Sunglasses', 'Strong UV rays — protect your eyes.', 'Glasses', 'uv', 'high');
    add('Cap or hat', 'Shield your head from intense sun.', 'HardHat', 'uv', 'high');
  } else if (maxUV >= 6) {
    add('Sunscreen', 'UV index is elevated — wear sunscreen.', 'ShieldAlert', 'uv', 'medium');
    add('Sunglasses', 'Moderate-to-high UV — sunglasses recommended.', 'Glasses', 'uv', 'medium');
  }

  // --- Wind rules ---
  if (maxWind >= 40) {
    add('Windproof jacket', 'Very strong winds expected — protect yourself.', 'Wind', 'wind', 'high');
  } else if (maxWind >= 25) {
    add('Windproof jacket', 'Breezy conditions — a windbreaker helps.', 'Wind', 'wind', 'medium');
  }

  // --- Condition-text rules ---
  if (conditionText.includes('thunder')) {
    add('Raincoat', 'Thunderstorms in the forecast.', 'CloudLightning', 'condition', 'high');
    add('Umbrella', 'Thunderstorm conditions — stay prepared.', 'Umbrella', 'condition', 'high');
    add('Outdoor caution', 'Thunderstorms possible — limit outdoor exposure during storms.', 'AlertTriangle', 'condition', 'high');
  } else if (conditionText.includes('rain') || conditionText.includes('drizzle') || conditionText.includes('shower')) {
    add('Umbrella', 'Rainy conditions expected.', 'Umbrella', 'rain', 'medium');
    add('Raincoat', 'Rain in the forecast — pack a raincoat.', 'CloudRain', 'rain', 'medium');
  }

  if (conditionText.includes('snow') || conditionText.includes('sleet') || conditionText.includes('blizzard')) {
    add('Warm clothes', 'Snowy conditions — dress warmly.', 'Snowflake', 'condition', 'high');
    add('Waterproof shoes', 'Snow or sleet expected — keep feet dry.', 'Footprints', 'condition', 'high');
  }

  if (conditionText.includes('fog') || conditionText.includes('mist')) {
    add('Warm layer', 'Fog or mist expected — an extra layer keeps you comfortable.', 'CloudFog', 'condition', 'medium');
    add('Visibility caution', 'Low visibility conditions — take care outdoors.', 'Eye', 'condition', 'medium');
  }

  if (conditionText.includes('sunny') || conditionText.includes('clear')) {
    add('Sunglasses', 'Clear skies — sunglasses are a must.', 'Glasses', 'condition', 'low');
  }

  // Sort by priority: high → medium → low
  const sorted = Array.from(items.values()).sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  );

  return sorted;
}

/**
 * Generates a short human-readable trip insight from weather data.
 * @param {object} weatherData - Full response from WeatherAPI.com
 * @returns {string}
 */
export function generateTripInsight(weatherData) {
  const current = weatherData.current;
  const location = weatherData.location;
  const forecastDays = weatherData.forecast.forecastday;

  const tempC = current.temp_c;
  const humidity = current.humidity;
  const conditionText = current.condition.text.toLowerCase();
  const maxRainChance = Math.max(
    ...forecastDays.map((d) => d.day.daily_chance_of_rain)
  );
  const maxUV = Math.max(current.uv, ...forecastDays.map((d) => d.day.uv));
  const maxWind = Math.max(current.wind_kph, ...forecastDays.map((d) => d.day.maxwind_kph));

  const parts = [];

  // Temperature insight
  if (tempC >= 32) {
    parts.push(`It's going to be hot in ${location.name} — expect temperatures around ${Math.round(tempC)}°C.`);
  } else if (tempC >= 27) {
    parts.push(`Warm weather ahead in ${location.name} with temperatures near ${Math.round(tempC)}°C.`);
  } else if (tempC >= 18) {
    parts.push(`${location.name} is looking pleasant at around ${Math.round(tempC)}°C.`);
  } else if (tempC >= 5) {
    parts.push(`It's chilly in ${location.name} — temperatures are around ${Math.round(tempC)}°C, so dress warmly.`);
  } else {
    parts.push(`${location.name} is very cold right now at ${Math.round(tempC)}°C — pack heavy winter gear.`);
  }

  // Rain insight
  if (maxRainChance >= 70) {
    parts.push(`There's a strong chance of rain (up to ${maxRainChance}%), so waterproof gear is essential.`);
  } else if (maxRainChance >= 50) {
    parts.push(`Rain is possible (${maxRainChance}% chance), so an umbrella would be wise.`);
  }

  // Humidity insight
  if (humidity >= 75) {
    parts.push(`Humidity is high at ${humidity}% — opt for breathable fabrics.`);
  }

  // UV insight
  if (maxUV >= 8) {
    parts.push(`UV levels are very high (index ${maxUV}) — sunscreen and a hat are strongly recommended.`);
  } else if (maxUV >= 6) {
    parts.push(`UV is moderate-to-high (index ${maxUV}) — don't forget sunscreen.`);
  }

  // Wind insight
  if (maxWind >= 40) {
    parts.push(`Expect strong winds up to ${Math.round(maxWind)} km/h — secure loose items and bring a windbreaker.`);
  } else if (maxWind >= 25) {
    parts.push(`It'll be breezy with winds around ${Math.round(maxWind)} km/h.`);
  }

  // Condition-specific insight
  if (conditionText.includes('thunder')) {
    parts.push('Thunderstorms are possible — plan indoor alternatives.');
  } else if (conditionText.includes('snow')) {
    parts.push('Snowfall is expected — winter boots and layers are a must.');
  } else if (conditionText.includes('fog') || conditionText.includes('mist')) {
    parts.push('Foggy conditions may reduce visibility — take care if driving.');
  }

  return parts.join(' ');
}
