import React from 'react';
import { Search, X, Loader2 } from 'lucide-react';

export default function SearchBar({ destination, setDestination, onSearch, loading = false }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading && onSearch) {
      onSearch();
    }
  };

  const handleClear = () => {
    setDestination('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white/90 backdrop-blur-md p-2 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white/40 transition-all duration-300 relative z-20 group focus-within:ring-4 focus-within:ring-blue-500/20"
    >
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            id="destination-input"
            aria-label="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            placeholder="Where are you traveling to?"
            disabled={loading}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="shrink-0 whitespace-nowrap px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <span>Check Weather</span>
          )}
        </button>
      </div>
    </form>
  );
}
