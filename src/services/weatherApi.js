const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Fetches 3-day forecast weather data for a destination.
 * @param {string} destination - City or location name.
 * @returns {Promise<object>} Parsed weather data (location, current, forecast).
 * @throws {Error} Normalized error with message: LOCATION_NOT_FOUND | INVALID_API_KEY | NETWORK_ERROR
 */
export async function getWeather(destination) {
  if (!API_KEY) {
    throw new Error('MISSING_API_KEY');
  }

  const query = encodeURIComponent(destination.trim());
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=3&aqi=no&alerts=no`;

  let res;
  try {
    res = await fetch(url);
  } catch {
    throw new Error('NETWORK_ERROR');
  }

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error('INVALID_API_KEY');
    }
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
    if (data.error.code === 2006 || data.error.code === 2008) {
      throw new Error('INVALID_API_KEY');
    }
    throw new Error('LOCATION_NOT_FOUND');
  }

  return data;
}
