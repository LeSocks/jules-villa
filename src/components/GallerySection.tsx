import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../mockData';
import type { GalleryItem } from '../types';
import { Camera, X, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Villa & Grounds', 'Suites & Interiors', 'Dining & Wine', 'Wellness & Pool'];

  const filteredItems: GalleryItem[] = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-24 bg-[#F5F2EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[#D4AF37] font-sans text-xs uppercase tracking-widest font-semibold mb-3">
            <Camera className="w-4 h-4" />
            <span>Visual Tour</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C2A29] font-normal mb-4">
            Atmosphere & Details
          </h2>
          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            Step inside Villa Lumière through our curated gallery capturing golden light, architectural craftsmanship, and tranquil estate grounds.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2C2A29] text-white shadow'
                  : 'bg-white/80 text-stone-700 hover:bg-white border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer aspect-[4/3] sm:aspect-square bg-stone-200"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4AF37] font-semibold">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-medium">{item.title}</h4>
                <p className="text-xs font-sans text-stone-300 line-clamp-2 mt-1">
                  {item.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[10px] uppercase font-semibold text-[#F3E5AB]">
                  <Maximize className="w-3 h-3" />
                  <span>Enlarge</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">

          {/* Lightbox Header controls */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-20">
            <div className="text-xs uppercase tracking-widest font-sans text-stone-300">
              {lightboxIndex + 1} / {filteredItems.length}
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Lightbox Image & Info */}
          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center text-center text-white px-4">
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl mb-4"
            />
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              {filteredItems[lightboxIndex].category}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl mt-1">
              {filteredItems[lightboxIndex].title}
            </h3>
            <p className="text-sm font-sans text-stone-300 max-w-lg mt-2">
              {filteredItems[lightboxIndex].description}
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>
      )}
    </section>
  );
};
