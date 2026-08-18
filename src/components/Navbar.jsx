import React, { useState, useEffect } from 'react';
import { Luggage, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Weather', href: '#weather' },
    { name: 'Recommendations', href: '#recommendations' },
    { name: 'How It Works', href: '#how-it-works' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-100/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            aria-label="SmartPacker Home"
          >
            <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Luggage className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="text-navy-800 font-extrabold text-xl tracking-tight">SmartPacker</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-slate-600 hover:text-navy-800 focus:outline-none p-2 rounded-xl bg-white shadow-sm border border-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl px-4 py-4 space-y-2 animate-fade-in origin-top">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-4 py-3 rounded-xl text-base font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
