import React from 'react';
import LivePulseCard from './LivePulseCard';

export default function Hero({ children, onSelectDestination, destWeather }) {
  return (
    <section className="relative overflow-hidden bg-surface py-12 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Copy & Search */}
        <div className="flex-1 text-center lg:text-left z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wide mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Weather-Based Packing Advisor
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-navy tracking-tight leading-[1.1] mb-6">
            Pack smarter.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Travel better.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium">
            Tell us where you&apos;re going. We&apos;ll check the weather and tell you exactly what to carry.
          </p>
          
          <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-20">
            {children}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500 mt-4 font-medium flex-wrap">
              <span className="text-slate-400">Trending:</span>
              {['Darjeeling', 'Goa', 'London', 'Tokyo'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination(city)}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors cursor-pointer"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Pulse Card with Map */}
        <div className="w-full z-10 animate-fade-in flex justify-center lg:justify-end">
          <LivePulseCard destWeather={destWeather} />
        </div>
        
      </div>
    </section>
  );
}
