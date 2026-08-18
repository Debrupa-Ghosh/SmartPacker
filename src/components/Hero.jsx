import React from 'react';
import { Sun, Cloud, Thermometer, Wind, Umbrella, MapPin, Shirt } from 'lucide-react';

export default function Hero({ children }) {
  return (
    <section className="relative overflow-hidden bg-surface py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Copy & Search */}
        <div className="flex-1 text-center lg:text-left z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wide mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Weather-Based Packing Advisor
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-navy tracking-tight leading-[1.1] mb-6">
            Pack smarter.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Travel better.</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
            Tell us where you&apos;re going. We&apos;ll check the weather and tell you exactly what to carry.
          </p>
          
          <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-20">
            {children}
            <p className="text-sm text-slate-400 mt-4 font-medium">
              Try <span className="text-slate-500">Darjeeling</span>, <span className="text-slate-500">Goa</span>, <span className="text-slate-500">London</span>, or <span className="text-slate-500">Tokyo</span>.
            </p>
          </div>
        </div>

        {/* Right Column: Decorative Card */}
        <div className="w-full max-w-md lg:max-w-lg z-10 hidden md:block mt-8">
          <div className="relative w-full animate-float flex justify-center">
            
            {/* Main glass card */}
            <div className="rounded-3xl bg-white shadow-xl p-6 space-y-5 max-w-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  Tokyo, Japan
                </div>
                <Sun className="w-6 h-6 text-amber-400" />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-navy-900">18°</span>
                <div className="flex items-center gap-1 text-gray-400">
                  <Cloud className="w-6 h-6" />
                  <span className="text-sm">Partly cloudy</span>
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  SmartPacker says
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Umbrella className="w-4 h-4 text-blue-500" />
                  Carry a compact umbrella
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Shirt className="w-4 h-4 text-blue-500" />
                  Pack a light jacket
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
}
