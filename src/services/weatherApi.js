const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Fetches 3-day forecast weather data for a destination.
 * @param {string} destination - City or location name.
 * @returns {Promise<object>} Parsed weather data (location, current, forecast).
 * @throws {Error} Normalized error with message: LOCATION_NOT_FOUND | NETWORK_ERROR
 */
export async function getWeather(destination) {
  const query = encodeURIComponent(destination.trim());
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=3&aqi=no&alerts=no`;

  let res;
  try {
    res = await fetch(url);
  } catch {
    throw new Error('NETWORK_ERROR');
  }

  if (!res.ok) {
    if (res.status === 400 || res.status === 404) {
      throw new Error('LOCATION_NOT_FOUND');
    }
    throw new Error('NETWORK_ERROR');
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('NETWORK_ERROR');
  }

  // WeatherAPI returns error object for invalid locations even with 200 status sometimes
  if (data.error) {
    throw new Error('LOCATION_NOT_FOUND');
  }

  return data;
}
