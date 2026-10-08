import React from 'react';
import { VILLA_DETAILS } from '../mockData';
import { Sparkles, Heart, Coffee, Sun } from 'lucide-react';

export const StorySection: React.FC = () => {
  const owner = VILLA_DETAILS.owner;

  return (
    <section id="story" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative subtle background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Column 1: Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src={owner.avatar}
                alt={owner.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif text-2xl italic mb-1">{owner.name}</p>
                <p className="text-xs font-sans tracking-widest uppercase text-stone-300">{owner.title}</p>
              </div>
            </div>

            {/* Overlapping secondary detail image */}
            <div className="absolute -bottom-8 -right-6 w-1/2 aspect-square rounded-xl overflow-hidden shadow-2xl border-4 border-[#FAF8F5] hidden sm:block z-20">
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800"
                alt="Provençal morning table setting"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Quote badge */}
            <div className="absolute -top-6 -left-6 bg-[#2C2A29] text-white p-6 rounded-xl shadow-xl max-w-xs z-20 hidden md:block">
              <Sparkles className="w-5 h-5 text-[#D4AF37] mb-2" />
              <p className="font-serif italic text-sm leading-relaxed text-stone-200">
                "Luxury isn't about grandeur; it's about feeling utterly cared for."
              </p>
            </div>
          </div>

          {/* Column 2: Story Text Content */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-[#D4AF37] font-sans text-xs uppercase tracking-widest font-semibold mb-3">
              <Heart className="w-4 h-4 fill-[#D4AF37]" />
              <span>Our Philosophy & Heart</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C2A29] font-normal leading-tight mb-6">
              Created to Be Your Very Own <br />
              <span className="italic text-[#8C6D27]">Provençal Sanctuary</span>
            </h2>

            <div className="space-y-4 font-sans text-stone-700 text-base leading-relaxed">
              <p>
                When we first discovered this historic 19th-century Cap d'Antibes estate, we envisioned something far deeper than another luxury hotel. We set out to create a sanctuary where the formal boundaries of hospitality dissolve, leaving only pure warmth, elegance, and peace.
              </p>
              <p>
                At Villa Lumière, every single morning begins with the aroma of freshly roasted beans, citrus pulled from our orchards, and hand-laminated croissants baked by our in-house chef. There are no check-in counters or rigid schedules—only your rhythm.
              </p>
            </div>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-8 border-t border-stone-200">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37] shrink-0">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-stone-900 font-medium mb-1">Genuine Warmth</h4>
                  <p className="text-xs text-stone-600 leading-normal">
                    Personalized, discreet attention tailored to your exact preferences before you even arrive.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37] shrink-0">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-stone-900 font-medium mb-1">Unrushed Time</h4>
                  <p className="text-xs text-stone-600 leading-normal">
                    Linger in the garden reading nooks, sip local vintages at dusk, and savor every moment.
                  </p>
                </div>
              </div>
            </div>

            {/* Owner Quote Box */}
            <div className="mt-8 bg-stone-100/80 p-6 rounded-xl border-l-4 border-[#D4AF37]">
              <p className="font-serif italic text-stone-800 text-sm sm:text-base leading-relaxed">
                "{owner.quote}"
              </p>
              <p className="mt-3 text-xs font-sans tracking-widest text-[#D4AF37] uppercase font-semibold">
                — {owner.name}, Hosts
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
