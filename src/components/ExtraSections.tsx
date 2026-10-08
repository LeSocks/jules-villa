import React, { useState } from 'react';
import { REVIEWS, LOCAL_ATTRACTIONS, FAQS, VILLA_DETAILS } from '../mockData';
import { Star, MapPin, ChevronDown, ChevronUp, Send, CheckCircle2, Phone, Mail, Clock, MessageSquareQuote, Compass } from 'lucide-react';

export const ExtraSections: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(FAQS[0].id);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
  };

  return (
    <div className="space-y-0">

      {/* SECTION 1: Guest Testimonials & Experiences */}
      <section id="reviews" className="py-24 bg-[#FAF8F5] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-[#D4AF37] font-sans text-xs uppercase tracking-widest font-semibold mb-3">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Memories Shared By Guests</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#2C2A29] font-normal mb-4">
              Heartfelt Words & Stories
            </h2>
            <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
              Read how our guests describe their stays—from quiet morning coffee under the olive trees to unforgettable family gatherings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 flex flex-col justify-between group hover:shadow-lg transition-all"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4 text-[#D4AF37]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>

                  <h3 className="font-serif text-xl text-stone-900 font-medium mb-3">
                    "{review.title}"
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed italic mb-6">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-sans text-xs font-bold text-stone-900">{review.author}</h4>
                    <span className="text-[10px] text-stone-500 block">{review.location} • Stayed in {review.stayedSuite}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: Local Area & Cap d'Antibes Guide */}
      <section id="location" className="py-24 bg-[#F5F2EC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Column 1: Map info & textual overview */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-[#D4AF37] font-sans text-xs uppercase tracking-widest font-semibold mb-3">
                <Compass className="w-4 h-4" />
                <span>Prime Cap d'Antibes Location</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2A29] font-normal mb-6">
                Between the Azure Sea & Provençal Heritage
              </h2>

              <p className="font-sans text-stone-600 text-sm leading-relaxed mb-6">
                Villa Lumière sits secluded on the coveted peninsula of Cap d'Antibes. We are just a short strolling distance from the iconic Plage de la Garoupe and minutes from the bustling markets of Old Town Antibes.
              </p>

              <div className="space-y-4 font-sans text-xs text-stone-700">
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-stone-200">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">Address</strong>
                    <span>{VILLA_DETAILS.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-stone-200">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">Transit & Accessibility</strong>
                    <span>25 min drive from Nice Côte d'Azur Airport (NCE) • 15 min drive from Cannes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Local Attractions Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LOCAL_ATTRACTIONS.map((attr) => (
                <div
                  key={attr.id}
                  className="bg-white rounded-xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={attr.image}
                      alt={attr.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-0.5 rounded text-[10px] font-sans font-semibold">
                      {attr.distance}
                    </div>
                  </div>

                  <div className="p-4 flex-1">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-[#D4AF37] font-bold">
                      {attr.category}
                    </span>
                    <h4 className="font-serif text-base font-medium text-stone-900 mt-0.5">{attr.name}</h4>
                    <p className="font-sans text-xs text-stone-600 mt-1 leading-normal">
                      {attr.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: FAQs Accordion */}
      <section className="py-24 bg-[#FAF8F5] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <span className="text-[#D4AF37] font-sans text-xs uppercase tracking-widest font-semibold mb-2 block">
              Guest Inquiries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2A29]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left font-serif text-lg font-medium text-stone-900 flex items-center justify-between gap-4 hover:text-[#D4AF37] transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 font-sans text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 mt-1 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 4: Contact & Concierge Inquiry Form */}
      <section id="contact" className="py-24 bg-[#2C2A29] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#D4AF37] font-sans text-xs uppercase tracking-widest font-semibold block">
                Direct Host Communication
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
                Have Special Requests or Questions?
              </h2>
              <p className="font-sans text-stone-300 text-sm leading-relaxed">
                Whether you are planning a private retreat, a multi-generational holiday, or a buyout event, Helena & Marc are available to answer your personal inquiries.
              </p>

              <div className="pt-6 space-y-4 font-sans text-xs text-stone-300 border-t border-stone-700">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>{VILLA_DETAILS.phone} (Call or WhatsApp)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span>{VILLA_DETAILS.email}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/5 backdrop-blur-lg p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl">
              {contactSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto" />
                  <h3 className="font-serif text-2xl font-normal">Thank You For Writing</h3>
                  <p className="font-sans text-xs text-stone-300 max-w-sm mx-auto">
                    Helena or Marc will respond to your message personally within a few hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Lord Edward Sterling"
                      className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Your Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. edward@sterling.com"
                      className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Inquiry / Note to Hosts</label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Share your planned dates, preferred suites, or special requests..."
                      className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-[#b8952b] text-white py-3.5 rounded-lg font-semibold uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Hosts</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
