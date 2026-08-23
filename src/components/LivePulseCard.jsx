import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  RefreshCw, 
  CloudSun, 
  Shirt
} from 'lucide-react';
import { getWeather } from '../services/weatherApi';
import { getWeatherIconFromCondition } from '../utils/iconMap';
import TripMap from './TripMap';

export default function LivePulseCard({ destWeather }) {
  const [localWeather, setLocalWeather] = useState(null);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [error, setError] = useState(null);

  // Coordinates for the map
  const [localCoords, setLocalCoords] = useState(null);

  // Destination coordinates derived from destWeather prop (set by search)
  const destCoords = destWeather?.location
    ? { lat: destWeather.location.lat, lon: destWeather.location.lon }
    : null;
  const destName = destWeather?.location?.name || '';

  // Fetch local weather automatically on mount
  useEffect(() => {
    fetchLocalWeather();
  }, []);

  const fetchLocalWeather = () => {
    setLoadingLocal(true);
    setError(null);

    const loadWithQuery = async (query) => {
      try {
        const data = await getWeather(query);
        setLocalWeather(data);
        if (data.location) {
          setLocalCoords({ lat: data.location.lat, lon: data.location.lon });
        }
      } catch {
        try {
          const fallbackData = await getWeather('auto:ip');
          setLocalWeather(fallbackData);
          if (fallbackData.location) {
            setLocalCoords({ lat: fallbackData.location.lat, lon: fallbackData.location.lon });
          }
        } catch {
          setError('Unable to detect your location');
        }
      } finally {
        setLoadingLocal(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          loadWithQuery(coords);
        },
        () => {
          loadWithQuery('auto:ip');
        },
        { timeout: 6000 }
      );
    } else {
      loadWithQuery('auto:ip');
    }
  };

  const getLocalAdvice = (temp, conditionText = '') => {
    const isRain = conditionText?.toLowerCase().includes('rain');
    if (isRain) return 'Rainy today — Keep an umbrella handy';
    if (temp >= 28) return 'Warm & sunny — Wear light, breathable cotton';
    if (temp <= 14) return 'Chilly outside — A warm layer is recommended';
    return 'Pleasant weather — Comfortable everyday casuals';
  };

  const LocalIcon = localWeather?.current?.condition?.text 
    ? getWeatherIconFromCondition(localWeather.current.condition.text) 
    : CloudSun;

  const localName = localWeather?.location?.name || '';

  return (
    <div className="w-full max-w-md lg:max-w-lg mx-auto">
      <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl shadow-blue-950/10 p-5 relative overflow-hidden transition-all duration-300 hover:shadow-blue-900/15">
        
        {/* Background Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-blue-400/15 to-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-gradient-to-tr from-indigo-400/10 to-teal-400/15 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 relative z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Live Location Pulse
            </span>
          </div>
          <button
            onClick={fetchLocalWeather}
            title="Refresh location"
            disabled={loadingLocal}
            className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-slate-100"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingLocal ? 'animate-spin text-blue-500' : ''}`} />
          </button>
        </div>

        {/* Interactive Map */}
        <div className="mt-3 relative z-10">
          <TripMap
            localCoords={localCoords}
            destCoords={destCoords}
            localName={localName}
            destName={destName}
          />
        </div>

        {/* Your Location Info */}
        <div className="mt-3 relative z-10">
          {loadingLocal ? (
            <div className="animate-pulse space-y-2 py-2">
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
          ) : localWeather ? (
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <Navigation className="w-3 h-3 text-red-500 fill-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-600">Your Location</p>
                    <p className="text-sm font-bold text-slate-800 leading-tight">
                      {localWeather.location?.name}, {localWeather.location?.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-right">
                  <LocalIcon className="w-5 h-5 text-blue-500" />
                  <div>
                    <span className="text-lg font-extrabold text-slate-900 leading-none">
                      {Math.round(localWeather.current?.temp_c)}°C
                    </span>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {localWeather.current?.condition?.text}
                    </p>
                  </div>
                </div>
              </div>

              {/* Local advice chip */}
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-50 border border-slate-200/60 rounded-lg text-[11px] text-slate-600">
                <Shirt className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">
                  {getLocalAdvice(localWeather.current?.temp_c, localWeather.current?.condition?.text)}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-1">Location not detected</p>
          )}
        </div>

      </div>
    </div>
  );
}
