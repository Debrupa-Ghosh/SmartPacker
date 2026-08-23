import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherStats from './components/WeatherStats';
import RecommendationSection from './components/RecommendationSection';
import Forecast from './components/Forecast';
import TripInsight from './components/TripInsight';
import HowItWorks from './components/HowItWorks';
import LoadingState from './components/LoadingState';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import { getWeather } from './services/weatherApi';
import { generateRecommendations, generateTripInsight } from './utils/recommendationEngine';

function App() {
  const [destination, setDestination] = useState('');
  const [weather, setWeather] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [tripInsight, setTripInsight] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resultsRef = useRef(null);

  const handleSearch = async (targetDest) => {
    const query = typeof targetDest === 'string' ? targetDest : destination;
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Please enter a destination.');
      return;
    }

    setDestination(trimmed);
    setError('');
    setLoading(true);
    setWeather(null);
    setRecommendations([]);
    setTripInsight('');

    try {
      const data = await getWeather(trimmed);
      setWeather(data);
      setRecommendations(generateRecommendations(data));
      setTripInsight(generateTripInsight(data));

      // Smooth-scroll to results after a brief paint delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      if (err.message === 'LOCATION_NOT_FOUND') {
        setError("Couldn't find that destination. Try another city or location.");
      } else if (err.message === 'INVALID_API_KEY' || err.message === 'MISSING_API_KEY') {
        setError("WeatherAPI Key is missing or invalid. Please check your .env configuration.");
      } else {
        setError("We couldn't load the weather right now. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const hasResults = weather !== null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero onSelectDestination={handleSearch} destWeather={weather}>
          <SearchBar
            destination={destination}
            setDestination={setDestination}
            onSearch={handleSearch}
            loading={loading}
          />
        </Hero>

        <ErrorMessage message={error} />

        {loading && <LoadingState />}

        {hasResults && !loading && (
          <div ref={resultsRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <section id="weather">
              <CurrentWeather weather={weather} />
              <div className="mt-6">
                <WeatherStats weather={weather} />
              </div>
            </section>

            <TripInsight insight={tripInsight} />

            <RecommendationSection recommendations={recommendations} />

            <Forecast forecastDays={weather.forecast?.forecastday} />
          </div>
        )}

        {!hasResults && !loading && !error && (
          <HowItWorks />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
