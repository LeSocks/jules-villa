import React from 'react';
import { AMENITIES, EXPERIENCES } from '../mockData';
import type { Currency } from '../utils/currency';
import { formatCurrency } from '../utils/currency';
import { Waves, UtensilsCrossed, Wine, Sparkles, HeartHandshake, Trees, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface AmenitiesSectionProps {
  currency: Currency;
  onBookExperience: (expTitle: string) => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ currency, onBookExperience }) => {

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves className="w-6 h-6 text-[#D4AF37]" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6 text-[#D4AF37]" />;
      case 'Wine': return <Wine className="w-6 h-6 text-[#D4AF37]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#D4AF37]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />;
      case 'Trees': return <Trees className="w-6 h-6 text-[#D4AF37]" />;
      default: return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="amenities" className="py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#D4AF37] font-sans text-xs uppercase tracking-widest font-semibold mb-3">
            Bespoke Services & Estate Features
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C2A29] font-normal mb-6">
            Every Comfort of Home, Redefined
          </h2>
          <p className="font-sans text-stone-600 text-base leading-relaxed">
            From sunrise yoga beneath ancient pine trees to Sommelier-guided wine tastings, every moment is curated with gentle, thoughtful elegance.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {AMENITIES.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200/60 hover:shadow-md transition-all hover:border-[#D4AF37]/50 flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  {getIcon(amenity.iconName)}
                </div>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                  {amenity.category}
                </span>
                <h3 className="font-serif text-2xl text-stone-900 font-medium mb-3">
                  {amenity.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Experiences Banner */}
        <div id="experiences" className="mt-20 pt-16 border-t border-stone-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-[#D4AF37] font-sans text-xs uppercase tracking-widest font-semibold mb-2">
                Tailored Moments
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2C2A29]">
                Signature Riviera Experiences
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-sm text-stone-500 max-w-md mt-3 md:mt-0">
              Can be reserved individually or seamlessly added to your stay booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-stone-200 flex flex-col group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  {exp.pricePerGuest && (
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {formatCurrency(exp.pricePerGuest, currency)} <span className="text-[10px] font-normal text-stone-300">/ guest</span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-xl font-medium text-stone-900 mb-2">
                      {exp.title}
                    </h4>
                    <p className="font-sans text-xs text-[#D4AF37] font-semibold mb-3">
                      {exp.subtitle}
                    </p>
                    <p className="font-sans text-xs text-stone-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onBookExperience(exp.title)}
                    className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-sans font-semibold text-stone-800 hover:text-[#D4AF37] transition-colors w-full"
                  >
                    <span>Request Experience</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
