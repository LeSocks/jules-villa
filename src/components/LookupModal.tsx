import React, { useState } from 'react';
import type { BookingDetails } from '../types';
import { SUITES } from '../mockData';
import type { Currency } from '../utils/currency';
import { formatCurrency } from '../utils/currency';
import { X, Search, KeyRound, AlertCircle, Trash2 } from 'lucide-react';

interface LookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingDetails[];
  currency: Currency;
  onCancelBooking: (bookingId: string) => void;
}

export const LookupModal: React.FC<LookupModalProps> = ({
  isOpen,
  onClose,
  bookings,
  currency,
  onCancelBooking
}) => {
  const [searchRef, setSearchRef] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [foundBooking, setFoundBooking] = useState<BookingDetails | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFoundBooking(null);

    const refClean = searchRef.trim().toUpperCase();
    const emailClean = emailSearch.trim().toLowerCase();

    const result = bookings.find((b) => {
      const matchRef = refClean && b.bookingId.toUpperCase() === refClean;
      const matchEmail = emailClean && b.guestInfo.email.toLowerCase() === emailClean;
      return matchRef || matchEmail;
    });

    if (result) {
      setFoundBooking(result);
    } else {
      setError('No reservation found matching the provided reference code or email.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-2xl max-w-xl w-full shadow-2xl relative my-auto overflow-hidden animate-scaleUp border border-stone-200">

        {/* Header */}
        <div className="bg-[#2C2A29] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-xl">Manage Your Reservation</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                Booking Reference Code (e.g. VL-88291)
              </label>
              <input
                type="text"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="VL-XXXXX"
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm uppercase tracking-wider focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="text-center font-sans text-xs text-stone-400 uppercase tracking-widest font-semibold">
              — OR —
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                Guest Email Address
              </label>
              <input
                type="email"
                value={emailSearch}
                onChange={(e) => setEmailSearch(e.target.value)}
                placeholder="e.g. eleanor.r@example.com"
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2C2A29] hover:bg-[#D4AF37] text-white py-3 rounded-lg text-xs uppercase tracking-widest font-semibold shadow transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Lookup Reservation</span>
            </button>
          </form>

          {/* Error Notice */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-800 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Found Booking Card */}
          {foundBooking && (
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-md space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#D4AF37]">
                    {foundBooking.status} Stay
                  </span>
                  <h3 className="font-serif text-lg font-medium text-stone-900">
                    {SUITES.find((s) => s.id === foundBooking.suiteId)?.name || 'Suite Reservation'}
                  </h3>
                </div>
                <span className="font-mono text-xs bg-stone-100 px-2.5 py-1 rounded text-stone-700 font-bold">
                  {foundBooking.bookingId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-stone-700">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Dates</span>
                  <span className="font-semibold">{foundBooking.checkIn} → {foundBooking.checkOut}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Primary Guest</span>
                  <span className="font-semibold">{foundBooking.guestInfo.firstName} {foundBooking.guestInfo.lastName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Contact</span>
                  <span>{foundBooking.guestInfo.email}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Total Investment</span>
                  <span className="font-serif text-sm font-bold text-[#D4AF37]">
                    {formatCurrency(foundBooking.pricing.grandTotal, currency)}
                  </span>
                </div>
              </div>

              {foundBooking.guestInfo.specialRequests && (
                <div className="p-3 bg-stone-50 rounded text-xs text-stone-600">
                  <strong className="text-stone-800">Host Notes:</strong> {foundBooking.guestInfo.specialRequests}
                </div>
              )}

              {/* Action */}
              {foundBooking.status === 'Confirmed' && (
                <div className="pt-3 border-t border-stone-100 flex justify-end">
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you wish to cancel this stay reservation?')) {
                        onCancelBooking(foundBooking.bookingId);
                        setFoundBooking({ ...foundBooking, status: 'Cancelled' });
                      }
                    }}
                    className="text-red-600 hover:text-red-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Reservation</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
