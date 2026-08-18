import React from 'react';
import { MapPin, CloudSun, Luggage } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: MapPin,
      title: 'Enter your destination',
      description: 'Type where you\'re heading — any city worldwide.',
      color: 'blue'
    },
    {
      icon: CloudSun,
      title: 'We analyze the weather',
      description: 'We fetch real-time weather and forecast data for your trip.',
      color: 'cyan'
    },
    {
      icon: Luggage,
      title: 'Get your packing guide',
      description: 'Receive personalized recommendations on what to carry.',
      color: 'indigo'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight mb-4">How It Works</h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">SmartPacker translates weather forecasts into actionable packing lists in three simple steps.</p>
        </div>

        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-100 -z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const staggerClass = `stagger-${index + 1}`;
              
              return (
                <div key={index} className={`flex flex-col items-center text-center relative animate-slide-up opacity-0 ${staggerClass}`} style={{ animationFillMode: 'forwards' }}>
                  
                  {/* Icon Circle */}
                  <div className={`w-24 h-24 rounded-full bg-white border-4 border-slate-50 shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 relative z-10`}>
                    <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-${step.color}-100 text-${step.color}-600 font-bold flex items-center justify-center border-2 border-white shadow-sm`}>
                      {index + 1}
                    </div>
                    <Icon className={`w-10 h-10 text-${step.color}-500`} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-navy-800 mb-3">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
