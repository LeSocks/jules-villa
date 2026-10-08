import React, { useState } from 'react';
import { SUITES } from '../mockData';
import type { Suite } from '../types';
import type { Currency } from '../utils/currency';
import { formatCurrency } from '../utils/currency';
import { Users, Maximize2, BedDouble, Check, ArrowRight, Eye, X } from 'lucide-react';

interface SuitesSectionProps {
  currency: Currency;
  onSelectSuite: (suite: Suite) => void;
}

export const SuitesSection: React.FC<SuitesSectionProps> = ({ currency, onSelectSuite }) => {
  const [selectedModalSuite, setSelectedModalSuite] = useState<Suite | null>(null);

  return (
    <section id="suites" className="py-24 bg-[#F5F2EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#D4AF37] font-sans text-xs uppercase tracking-widest font-semibold mb-3">
            Accommodations & Living Spaces
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C2A29] font-normal mb-6">
            Sanctuaries of Rest & Elegance
          </h2>
          <p className="font-sans text-stone-600 text-base leading-relaxed">
            Each suite at Villa Lumière is uniquely styled with hand-curated art, natural linens, and direct connection to the sea breeze or olive gardens.
          </p>
        </div>

        {/* Suites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SUITES.map((suite) => (
            <div
              key={suite.id}
              className="bg-[#FAF8F5] rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Hover overlay */}
              <div className="relative aspect-[16/10] overflow-hidden cursor-pointer" onClick={() => setSelectedModalSuite(suite)}>
                <img
                  src={suite.image}
                  alt={suite.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Price tag badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-stone-900 font-sans text-xs font-bold shadow-md">
                  {formatCurrency(suite.pricePerNight, currency)} <span className="text-stone-500 font-normal">/ night</span>
                </div>

                {/* Badge if full villa takeover */}
                {suite.id === 'villa-entire' && (
                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold shadow">
                    Full Takeover
                  </div>
                )}

                {/* Title & Tagline overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-2xl font-normal group-hover:text-[#F3E5AB] transition-colors">
                    {suite.name}
                  </h3>
                  <p className="text-xs font-sans text-stone-300 line-clamp-1 mt-0.5">
                    {suite.tagline}
                  </p>
                </div>
              </div>

              {/* Meta Specs Bar */}
              <div className="px-6 py-3 bg-stone-100/70 border-b border-stone-200/60 flex items-center justify-between text-xs font-sans text-stone-600">
                <div className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{suite.sqm} m²</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Up to {suite.maxGuests} Guests</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{suite.bedType}</span>
                </div>
              </div>

              {/* Suite Content & Highlights */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <p className="font-sans text-sm text-stone-600 line-clamp-3 leading-relaxed">
                  {suite.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-stone-400">
                    Suite Highlights
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {suite.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedModalSuite(suite)}
                    className="flex-1 border border-stone-300 hover:border-stone-800 text-stone-800 py-2.5 px-3 rounded text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>

                  <button
                    onClick={() => onSelectSuite(suite)}
                    className="flex-1 bg-[#2C2A29] hover:bg-[#D4AF37] text-white py-2.5 px-3 rounded text-xs uppercase tracking-wider font-semibold transition-all shadow flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>Reserve Suite</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Suite Quick View Modal */}
      {selectedModalSuite && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8 animate-scaleUp">

            {/* Close Modal Button */}
            <button
              onClick={() => setSelectedModalSuite(null)}
              className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Gallery Header */}
            <div className="relative aspect-[16/9]">
              <img
                src={selectedModalSuite.image}
                alt={selectedModalSuite.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Suite Preview
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl">{selectedModalSuite.name}</h3>
                <p className="text-stone-300 text-sm">{selectedModalSuite.tagline}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-3 gap-4 p-4 bg-stone-100 rounded-xl text-center text-xs text-stone-700 font-sans">
                <div>
                  <span className="block text-stone-400 uppercase text-[10px] tracking-wider">Size</span>
                  <span className="font-semibold text-stone-900">{selectedModalSuite.sqm} m²</span>
                </div>
                <div>
                  <span className="block text-stone-400 uppercase text-[10px] tracking-wider">Capacity</span>
                  <span className="font-semibold text-stone-900">{selectedModalSuite.maxGuests} Guests</span>
                </div>
                <div>
                  <span className="block text-stone-400 uppercase text-[10px] tracking-wider">Bedding</span>
                  <span className="font-semibold text-stone-900">{selectedModalSuite.bedType}</span>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg font-medium text-stone-900 mb-2">The Sanctuary Details</h4>
                <p className="text-stone-600 text-sm leading-relaxed">{selectedModalSuite.description}</p>
              </div>

              {/* Gallery Thumbnails */}
              {selectedModalSuite.gallery && selectedModalSuite.gallery.length > 1 && (
                <div>
                  <h4 className="font-serif text-sm font-medium text-stone-900 mb-3">Gallery Preview</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedModalSuite.gallery.map((imgUrl, i) => (
                      <img
                        key={i}
                        src={imgUrl}
                        alt="Gallery preview"
                        className="w-full h-24 object-cover rounded-lg border border-stone-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Features */}
              <div>
                <h4 className="font-serif text-sm font-medium text-stone-900 mb-3">Amenities & Features Included</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {selectedModalSuite.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-stone-500 text-xs block">Rate starting from</span>
                  <span className="font-serif text-2xl font-medium text-stone-900">
                    {formatCurrency(selectedModalSuite.pricePerNight, currency)} <span className="text-sm font-normal text-stone-500">/ night</span>
                  </span>
                </div>

                <button
                  onClick={() => {
                    const s = selectedModalSuite;
                    setSelectedModalSuite(null);
                    onSelectSuite(s);
                  }}
                  className="bg-[#D4AF37] hover:bg-[#b8952b] text-white px-6 py-3 rounded-lg text-xs uppercase tracking-widest font-semibold shadow-lg transition-all"
                >
                  Proceed to Reserve
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
