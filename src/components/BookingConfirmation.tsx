import React from 'react';
import type { BookingDetails } from '../types';
import type { Currency } from '../utils/currency';
import { formatCurrency } from '../utils/currency';
import { SUITES, EXTRA_ADDONS, VILLA_DETAILS } from '../mockData';
import { CheckCircle2, MapPin, Phone, Mail, Printer, HeartHandshake, Home } from 'lucide-react';

interface BookingConfirmationProps {
  booking: BookingDetails;
  currency: Currency;
  onClose: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  currency,
  onClose
}) => {
  const suite = SUITES.find((s) => s.id === booking.suiteId) || SUITES[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-2xl max-w-2xl w-full shadow-2xl relative my-auto overflow-hidden animate-scaleUp border border-stone-200">

        {/* Banner */}
        <div className="bg-[#2C2A29] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex p-3 bg-[#D4AF37]/20 rounded-full text-[#D4AF37] mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="block text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Reservation Confirmed & Secured
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl mt-1">
            We Look Forward to Welcoming You
          </h2>

          <p className="font-sans text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-2">
            A confirmation receipt and detailed host welcome guide have been sent to <strong className="text-white">{booking.guestInfo.email}</strong>.
          </p>

          <div className="mt-4 inline-block bg-white/10 px-4 py-1.5 rounded-full font-mono text-xs tracking-wider text-stone-200 border border-white/20">
            Booking Reference: <span className="text-[#D4AF37] font-bold">{booking.bookingId}</span>
          </div>
        </div>

        {/* Confirmation Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">

          {/* Main Booking Summary Card */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={suite.image}
                  alt={suite.name}
                  className="w-16 h-16 object-cover rounded-lg shrink-0"
                />
                <div>
                  <h3 className="font-serif text-lg font-medium text-stone-900">{suite.name}</h3>
                  <p className="text-xs text-stone-500">{suite.tagline}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase text-stone-400 font-bold block">Grand Total</span>
                <span className="font-serif text-xl font-bold text-[#D4AF37]">
                  {formatCurrency(booking.pricing.grandTotal, currency)}
                </span>
              </div>
            </div>

            {/* Stay Dates */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans text-stone-700">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Check-In</span>
                <span className="font-semibold text-stone-900">{booking.checkIn}</span>
                <span className="block text-[10px] text-stone-500">From 3:00 PM</span>
              </div>

              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Check-Out</span>
                <span className="font-semibold text-stone-900">{booking.checkOut}</span>
                <span className="block text-[10px] text-stone-500">By 11:00 AM</span>
              </div>

              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Guests</span>
                <span className="font-semibold text-stone-900">
                  {booking.guests.adults} Adult{booking.guests.adults > 1 ? 's' : ''}
                  {booking.guests.children > 0 ? `, ${booking.guests.children} Child(ren)` : ''}
                </span>
              </div>

              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Duration</span>
                <span className="font-semibold text-stone-900">
                  {booking.pricing.nights} Night{booking.pricing.nights > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Selected Addons if any */}
            {booking.addons.length > 0 && (
              <div className="pt-3 border-t border-stone-100">
                <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">
                  Selected Bespoke Addons
                </span>
                <div className="flex flex-wrap gap-2">
                  {booking.addons.map((addonId) => {
                    const addon = EXTRA_ADDONS.find((a) => a.id === addonId);
                    if (!addon) return null;
                    return (
                      <span key={addonId} className="bg-stone-100 text-stone-800 text-[11px] px-2.5 py-1 rounded-full">
                        ✓ {addon.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Personal Note from Hosts */}
          <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#D4AF37]/30 flex gap-4 items-start">
            <HeartHandshake className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
            <div className="text-xs text-stone-700 leading-relaxed">
              <h4 className="font-serif text-sm text-stone-900 font-medium mb-1">A Note from Helena & Marc</h4>
              <p>
                "Dear {booking.guestInfo.firstName}, we are honored to host you at Villa Lumière. Please feel free to reach out directly to us if you require pre-arrival restaurant locks or yacht arrangements. Safe travels!"
              </p>
            </div>
          </div>

          {/* Location & Host Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600 font-sans">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{VILLA_DETAILS.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{VILLA_DETAILS.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{VILLA_DETAILS.email}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-stone-100 p-5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto text-stone-700 hover:text-stone-900 text-xs font-sans uppercase font-semibold flex items-center justify-center gap-2 px-4 py-2 border border-stone-300 rounded hover:bg-white transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Confirmation</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#2C2A29] hover:bg-[#D4AF37] text-white text-xs font-sans uppercase tracking-wider font-semibold px-6 py-2.5 rounded shadow transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Villa Website</span>
          </button>
        </div>

      </div>
    </div>
  );
};
