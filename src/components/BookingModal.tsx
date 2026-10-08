import React, { useState, useEffect } from 'react';
import { SUITES, EXTRA_ADDONS } from '../mockData';
import type { Suite, BookingDetails } from '../types';
import type { Currency } from '../utils/currency';
import { formatCurrency } from '../utils/currency';
import { X, Check, ArrowRight, HeartHandshake, Sparkles, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSuite?: Suite | null;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  currency: Currency;
  onBookingConfirmed: (booking: BookingDetails) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedSuite,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  currency,
  onBookingConfirmed,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const nextWeekStr = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSuite, setSelectedSuite] = useState<Suite>(preselectedSuite || SUITES[0]);
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || todayStr);
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || nextWeekStr);
  const [adults, setAdults] = useState<number>(initialGuests);
  const [children, setChildren] = useState<number>(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Guest Information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState('15:00');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedSuite) {
      setSelectedSuite(preselectedSuite);
    }
  }, [preselectedSuite]);

  useEffect(() => {
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialGuests) setAdults(initialGuests);
  }, [initialCheckIn, initialCheckOut, initialGuests]);

  if (!isOpen) return null;

  // Calculate pricing
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const baseTotal = selectedSuite.pricePerNight * nights;

  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const found = EXTRA_ADDONS.find((a) => a.id === addonId);
    if (!found) return acc;
    if (found.unit === 'per_guest') return acc + found.price * (adults + children);
    return acc + found.price;
  }, 0);

  const cleaningFee = selectedSuite.id === 'villa-entire' ? 450 : 150;
  const taxAndService = Math.round((baseTotal + addonsTotal) * 0.1);
  const grandTotal = baseTotal + addonsTotal + cleaningFee + taxAndService;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (new Date(checkOut) <= new Date(checkIn)) {
      setErrorMsg('Check-out date must be after check-in date.');
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please complete all required contact information.');
      return;
    }
    setStep(3);
  };

  const handleCompleteBooking = () => {
    const bookingId = `VL-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: BookingDetails = {
      bookingId,
      suiteId: selectedSuite.id,
      checkIn,
      checkOut,
      guests: { adults, children },
      addons: selectedAddons,
      guestInfo: {
        firstName,
        lastName,
        email,
        phone,
        specialRequests,
        estimatedArrivalTime
      },
      pricing: {
        nights,
        nightlyRate: selectedSuite.pricePerNight,
        baseTotal,
        addonsTotal,
        cleaningFee,
        taxAndService,
        grandTotal
      },
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onBookingConfirmed(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-2xl max-w-4xl w-full shadow-2xl relative my-auto overflow-hidden animate-scaleUp border border-stone-200">

        {/* Header Bar */}
        <div className="bg-[#2C2A29] text-white px-6 py-5 flex items-center justify-between border-b border-stone-700">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Villa Lumière Direct Reservation
              </span>
            </div>
            <h2 className="font-serif text-2xl font-normal mt-0.5">
              {step === 1 && 'Select Dates & Suite'}
              {step === 2 && 'Personalize Your Stay & Details'}
              {step === 3 && 'Review & Confirm Sanctuary Booking'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-stone-200 h-1.5 w-full">
          <div
            className="bg-[#D4AF37] h-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-800 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Dates & Suite Selection */}
          {step === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-8">
              {/* Dates & Guests Row */}
              <div className="bg-stone-100 p-5 rounded-xl border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 font-semibold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 font-semibold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                    Guests (Adults & Children)
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-1/2 bg-white border border-stone-300 rounded px-2 py-2 text-xs font-semibold"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 12].map((num) => (
                        <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>

                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-1/2 bg-white border border-stone-300 rounded px-2 py-2 text-xs font-semibold"
                    >
                      {[0, 1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Suite Options Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-stone-700 mb-3">
                  Choose Accommodation Suite
                </label>
                <div className="space-y-4">
                  {SUITES.map((suite) => (
                    <div
                      key={suite.id}
                      onClick={() => setSelectedSuite(suite)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col sm:flex-row items-center gap-4 ${
                        selectedSuite.id === suite.id
                          ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-md'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <img
                        src={suite.image}
                        alt={suite.name}
                        className="w-full sm:w-28 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <h4 className="font-serif text-lg font-medium text-stone-900">{suite.name}</h4>
                          <span className="font-serif text-base font-semibold text-[#D4AF37]">
                            {formatCurrency(suite.pricePerNight, currency)} <span className="text-xs text-stone-500 font-normal">/ night</span>
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-1 line-clamp-1">{suite.tagline}</p>
                        <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          {suite.sqm}m² • Up to {suite.maxGuests} Guests • {suite.bedType}
                        </span>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-stone-300 flex items-center justify-center shrink-0">
                        {selectedSuite.id === suite.id && <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Total for {nights} night{nights > 1 ? 's' : ''}: <strong className="text-stone-900 font-serif text-base">{formatCurrency(baseTotal, currency)}</strong>
                </span>
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#b8952b] text-white font-sans text-xs uppercase tracking-widest font-semibold py-3 px-6 rounded-lg shadow-md transition-all flex items-center gap-2"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Bespoke Addons & Guest Details */}
          {step === 2 && (
            <form onSubmit={handleNextStep2} className="space-y-8">

              {/* Bespoke Addons */}
              <div>
                <h3 className="font-serif text-xl text-stone-900 font-medium mb-1">
                  Bespoke In-Villa Enhancements
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  Select optional personalized touches to make your arrival and stay seamless.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXTRA_ADDONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#D4AF37] border-[#D4AF37] text-white' : 'border-stone-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="flex justify-between items-center">
                            <h4 className="font-serif text-sm font-medium text-stone-900">{addon.name}</h4>
                            <span className="text-xs font-semibold text-[#D4AF37]">
                              +{formatCurrency(addon.price, currency)}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-600 mt-1 leading-snug">{addon.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guest Information */}
              <div className="pt-6 border-t border-stone-200">
                <h3 className="font-serif text-xl text-stone-900 font-medium mb-4">
                  Primary Guest Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Helena"
                      required
                      className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Saint-Germain"
                      required
                      className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                      Email Address (Confirmation will be sent here) *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. helena@example.com"
                      required
                      className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                      required
                      className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                      Estimated Arrival Time
                    </label>
                    <select
                      value={estimatedArrivalTime}
                      onChange={(e) => setEstimatedArrivalTime(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none"
                    >
                      <option value="14:00">2:00 PM (Early Check-In Request)</option>
                      <option value="15:00">3:00 PM (Standard Check-In)</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="21:00">Late Arrival (After 9:00 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                      Dietary or Special Host Notes
                    </label>
                    <input
                      type="text"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Anniversary celebration, gluten-free preference"
                      className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-stone-600 hover:text-stone-900 font-sans text-xs uppercase tracking-wider font-semibold"
                >
                  Back to Suite
                </button>

                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#b8952b] text-white font-sans text-xs uppercase tracking-widest font-semibold py-3 px-6 rounded-lg shadow-md transition-all flex items-center gap-2"
                >
                  <span>Review Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Final Breakdown & Confirmation */}
          {step === 3 && (
            <div className="space-y-6">

              <div className="bg-[#2C2A29] text-white p-6 rounded-xl border border-stone-700 flex flex-col sm:flex-row justify-between gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                    Reservation Summary
                  </span>
                  <h3 className="font-serif text-2xl mt-1">{selectedSuite.name}</h3>
                  <p className="text-stone-300 text-xs mt-1">
                    {checkIn} to {checkOut} ({nights} night{nights > 1 ? 's' : ''})
                  </p>
                  <p className="text-stone-300 text-xs mt-0.5">
                    {adults} Adult{adults > 1 ? 's' : ''} {children > 0 ? `, ${children} Child(ren)` : ''}
                  </p>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 border-stone-700">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400">Primary Guest</span>
                  <p className="font-serif text-lg font-medium text-white">{firstName} {lastName}</p>
                  <p className="text-stone-300 text-xs">{email}</p>
                  <p className="text-stone-300 text-xs">{phone}</p>
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="bg-stone-100 p-6 rounded-xl border border-stone-200">
                <h4 className="font-serif text-lg font-medium text-stone-900 mb-3 border-b border-stone-200 pb-2">
                  Transparent Pricing Breakdown
                </h4>

                <div className="space-y-2 text-xs text-stone-700 font-sans">
                  <div className="flex justify-between">
                    <span>{selectedSuite.name} ({nights} night{nights > 1 ? 's' : ''} @ {formatCurrency(selectedSuite.pricePerNight, currency)})</span>
                    <span className="font-semibold text-stone-900">{formatCurrency(baseTotal, currency)}</span>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between text-[#8C6D27]">
                      <span>Bespoke Addons & Enhancements</span>
                      <span className="font-semibold">+{formatCurrency(addonsTotal, currency)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-600">
                    <span>In-Villa Housekeeping & Turn-Down Preparation</span>
                    <span>{formatCurrency(cleaningFee, currency)}</span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Local Riviera Tourist Tax & Service Fees (10%)</span>
                    <span>{formatCurrency(taxAndService, currency)}</span>
                  </div>

                  <div className="pt-3 border-t border-stone-300 flex justify-between items-center text-sm">
                    <span className="font-serif text-stone-900 font-bold">Total Stay Investment</span>
                    <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                      {formatCurrency(grandTotal, currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Host Guarantee Badge */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#D4AF37]/40 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-xs text-stone-600 leading-relaxed">
                  <strong className="text-stone-800">Our Host Commitment:</strong> No hidden deposit charges required today. Helena & Marc will personally email you your official welcome pack and stay agenda upon confirmation.
                </p>
              </div>

              {/* Final Actions */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-stone-600 hover:text-stone-900 font-sans text-xs uppercase tracking-wider font-semibold"
                >
                  Edit Details
                </button>

                <button
                  type="button"
                  onClick={handleCompleteBooking}
                  className="bg-[#D4AF37] hover:bg-[#b8952b] text-white font-sans text-xs uppercase tracking-widest font-semibold py-3.5 px-8 rounded-lg shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Reservation</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
