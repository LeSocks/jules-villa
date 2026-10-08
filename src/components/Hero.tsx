import React, { useState } from 'react';
import { Calendar as CalendarIcon, Users, ArrowRight, Star, ShieldCheck, HeartHandshake } from 'lucide-react';
import type { Currency } from '../utils/currency';
import { formatCurrency } from '../utils/currency';

interface HeroProps {
  currency: Currency;
  onSearch: (checkIn: string, checkOut: string, guests: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ currency, onSearch }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const nextWeekStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(nextWeekStr);
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(checkIn, checkOut, guests);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Visual Background image with subtle zoom animation & overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=2000"
          alt="Villa Lumière Estate"
          className="w-full h-full object-cover scale-105 animate-pulse duration-10000 opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-black/40 to-black/70" />
      </div>

      {/* Main Hero Banner Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12">
        {/* Star rating & Host Welcome badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6 text-xs uppercase tracking-widest text-stone-200">
          <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
          <span>Voted Top Private Haven in Côte d'Azur</span>
          <span className="text-white/40">•</span>
          <span className="text-[#D4AF37] font-semibold">Hosted by Helena & Marc</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-tight mb-6 drop-shadow-lg">
          Where Every Stay <br className="hidden sm:inline" />
          <span className="italic font-light text-[#F3E5AB]">Feels Like Coming Home</span>
        </h1>

        {/* Subtitle / Owner Intent */}
        <p className="max-w-2xl mx-auto font-sans text-stone-200 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10 text-shadow">
          An intimate, family-owned sanctuary in Cap d’Antibes blending effortless Mediterranean luxury with the heartfelt warmth of private hospitality.
        </p>

        {/* Floating Quick Search & Booking Engine Bar */}
        <div className="bg-white/95 backdrop-blur-xl text-stone-800 p-4 sm:p-6 rounded-xl shadow-2xl border border-white/40 max-w-4xl mx-auto text-left transform transition-all hover:shadow-stone-900/20">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

            {/* Check-in */}
            <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-stone-200 pb-3 md:pb-0 md:pr-4">
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" /> Check-In
              </label>
              <input
                type="date"
                min={todayStr}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer"
              />
            </div>

            {/* Check-out */}
            <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-stone-200 pb-3 md:pb-0 md:pr-4">
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" /> Check-Out
              </label>
              <input
                type="date"
                min={checkIn || todayStr}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer"
              />
            </div>

            {/* Guests */}
            <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-stone-200 pb-3 md:pb-0 md:pr-4">
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Guest (Solo Retreat)</option>
                <option value={2}>2 Guests (Couple)</option>
                <option value={4}>4 Guests (Family/Friends)</option>
                <option value={6}>6 Guests (Group)</option>
                <option value={12}>Up to 12 Guests (Full Villa)</option>
              </select>
            </div>

            {/* Submit CTA */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#b8952b] text-white font-sans text-xs uppercase tracking-widest font-semibold py-3.5 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {/* Reassurances below search bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300 font-sans tracking-wide">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
            <span>Direct Booking Host Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Complimentary Daily Breakfast & Chauffeur</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] font-semibold">From {formatCurrency(590, currency)}</span>
            <span>/ night</span>
          </div>
        </div>
      </div>
    </div>
  );
};
