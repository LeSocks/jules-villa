import React, { useState } from 'react';
import { VILLA_DETAILS } from '../mockData';
import { Heart, Mail, Phone, MapPin, Send, Check } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenLookup }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1C1A19] text-stone-400 font-sans pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">

          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <a href="#" className="inline-block">
              <span className="font-serif text-2xl text-white tracking-wider font-medium">
                VILLA LUMIÈRE
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mt-1">
                Cap d'Antibes • France
              </span>
            </a>
            <p className="text-xs text-stone-400 leading-relaxed">
              A private luxury sanctuary devoted to genuine warmth, slow mornings, and unforgettable family memories on the French Riviera.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Cap d'Antibes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+33 4 93 12 34 56</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-white text-sm tracking-wider uppercase font-medium">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#story" className="hover:text-[#D4AF37] transition-colors">Our Story & Hosts</a></li>
              <li><a href="#suites" className="hover:text-[#D4AF37] transition-colors">Suites & Accommodations</a></li>
              <li><a href="#amenities" className="hover:text-[#D4AF37] transition-colors">Bespoke Amenities</a></li>
              <li><a href="#experiences" className="hover:text-[#D4AF37] transition-colors">Riviera Experiences</a></li>
              <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Visual Gallery</a></li>
              <li><a href="#location" className="hover:text-[#D4AF37] transition-colors">Cap d'Antibes Guide</a></li>
            </ul>
          </div>

          {/* Column 3: Guest Portal */}
          <div className="space-y-3">
            <h4 className="font-serif text-white text-sm tracking-wider uppercase font-medium">
              Guest Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#D4AF37] transition-colors text-left">
                  Reserve Your Stay
                </button>
              </li>
              <li>
                <button onClick={onOpenLookup} className="hover:text-[#D4AF37] transition-colors text-left">
                  My Reservation Lookup
                </button>
              </li>
              <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Private Concierge Desk</a></li>
              <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Full Villa Buyout Inquiries</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-white text-sm tracking-wider uppercase font-medium">
              Seasonal Journal
            </h4>
            <p className="text-xs text-stone-400">
              Receive rare vintage announcements and seasonal notes directly from Helena & Marc.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-800 text-[#D4AF37] rounded-lg text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-stone-800 border border-stone-700 rounded px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#b8952b] text-white px-3 py-2 rounded text-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Villa Lumière Cap d'Antibes. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for discerning travelers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
