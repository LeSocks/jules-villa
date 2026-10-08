import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, KeyRound } from 'lucide-react';
import type { Currency } from '../utils/currency';

interface NavbarProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenBooking: () => void;
  onOpenLookup: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyChange,
  onOpenBooking,
  onOpenLookup,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Story', href: '#story' },
    { label: 'Suites', href: '#suites' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-md py-3 text-[#2C2A29]'
          : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex flex-col group">
          <span className="font-serif text-2xl sm:text-3xl tracking-wider font-medium leading-none group-hover:text-[#D4AF37] transition-colors">
            VILLA LUMIÈRE
          </span>
          <span className={`text-[10px] uppercase tracking-[0.3em] font-sans mt-1 ${isScrolled ? 'text-stone-500' : 'text-stone-300'}`}>
            Cap d'Antibes • Côte d'Azur
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 font-sans text-xs uppercase tracking-widest font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors duration-200 hover:text-[#D4AF37] relative py-1 ${
                activeSection === link.href.substring(1) ? 'text-[#D4AF37] border-b border-[#D4AF37]' : ''
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls (Currency, My Reservation, Book Now) */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Currency Dropdown */}
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className={`text-xs uppercase tracking-wider font-sans font-medium px-2 py-1.5 rounded border bg-transparent cursor-pointer transition-colors ${
              isScrolled
                ? 'border-stone-300 text-stone-800 hover:border-[#D4AF37]'
                : 'border-white/30 text-white hover:border-white bg-black/20'
            }`}
          >
            <option value="EUR" className="text-stone-900">EUR (€)</option>
            <option value="USD" className="text-stone-900">USD ($)</option>
            <option value="GBP" className="text-stone-900">GBP (£)</option>
            <option value="CHF" className="text-stone-900">CHF (Fr)</option>
          </select>

          {/* Lookup Booking */}
          <button
            onClick={onOpenLookup}
            className={`text-xs uppercase tracking-wider font-sans font-medium px-3 py-1.5 rounded flex items-center gap-1.5 transition-all ${
              isScrolled
                ? 'text-stone-700 hover:text-[#D4AF37]'
                : 'text-stone-200 hover:text-white'
            }`}
            title="Manage or find your booking"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>My Booking</span>
          </button>

          {/* Book Stay CTA */}
          <button
            onClick={onOpenBooking}
            className="bg-[#D4AF37] hover:bg-[#c29f2e] text-white px-5 py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Stay</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="bg-[#D4AF37] text-white px-3 py-1.5 rounded text-xs uppercase tracking-wider font-semibold"
          >
            Reserve
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-stone-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-stone-900' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-stone-200 shadow-xl px-6 py-6 transition-all animate-fadeIn">
          <nav className="flex flex-col space-y-4 font-sans text-sm tracking-wider uppercase font-medium text-stone-800">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-stone-100 hover:text-[#D4AF37]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span>Currency</span>
              <div className="flex gap-2">
                {(['EUR', 'USD', 'GBP', 'CHF'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onCurrencyChange(c);
                    }}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      currency === c ? 'bg-[#D4AF37] text-white' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLookup();
              }}
              className="w-full text-center border border-stone-300 py-2.5 rounded font-sans text-xs uppercase tracking-wider font-semibold text-stone-700 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              Find My Reservation
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#D4AF37] text-white py-3 rounded font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Reserve Your Sanctuary
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
