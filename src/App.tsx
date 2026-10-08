import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { SuitesSection } from './components/SuitesSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { GallerySection } from './components/GallerySection';
import { ExtraSections } from './components/ExtraSections';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { BookingConfirmation } from './components/BookingConfirmation';
import { LookupModal } from './components/LookupModal';
import type { Suite, BookingDetails } from './types';
import type { Currency } from './utils/currency';
import { INITIAL_BOOKINGS } from './mockData';

export function App() {
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [activeSection] = useState<string>('');

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [preselectedSuite, setPreselectedSuite] = useState<Suite | null>(null);

  // Search parameters passed from Hero bar
  const [searchCheckIn, setSearchCheckIn] = useState<string>('');
  const [searchCheckOut, setSearchCheckOut] = useState<string>('');
  const [searchGuests, setSearchGuests] = useState<number>(2);

  // Active bookings list
  const [bookingsList, setBookingsList] = useState<BookingDetails[]>(INITIAL_BOOKINGS);
  const [latestConfirmedBooking, setLatestConfirmedBooking] = useState<BookingDetails | null>(null);

  // Handlers
  const handleOpenBooking = () => {
    setPreselectedSuite(null);
    setIsBookingOpen(true);
  };

  const handleSelectSuiteToBook = (suite: Suite) => {
    setPreselectedSuite(suite);
    setIsBookingOpen(true);
  };

  const handleSearchFromHero = (checkIn: string, checkOut: string, guests: number) => {
    setSearchCheckIn(checkIn);
    setSearchCheckOut(checkOut);
    setSearchGuests(guests);
    setPreselectedSuite(null);
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (newBooking: BookingDetails) => {
    setBookingsList([newBooking, ...bookingsList]);
    setIsBookingOpen(false);
    setLatestConfirmedBooking(newBooking);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookingsList(
      bookingsList.map((b) => (b.bookingId === bookingId ? { ...b, status: 'Cancelled' as const } : b))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2A29] font-sans antialiased">
      {/* Sticky Navigation Header */}
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenBooking={handleOpenBooking}
        onOpenLookup={() => setIsLookupOpen(true)}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          currency={currency}
          onSearch={handleSearchFromHero}
        />

        {/* Owner Story & Philosophy */}
        <StorySection />

        {/* Accommodations / Suites */}
        <SuitesSection
          currency={currency}
          onSelectSuite={handleSelectSuiteToBook}
        />

        {/* Estate Amenities & Experiences */}
        <AmenitiesSection
          currency={currency}
          onBookExperience={(_expTitle) => {
            handleOpenBooking();
          }}
        />

        {/* Visual Tour Gallery with Lightbox */}
        <GallerySection />

        {/* Testimonials, Area Guide, FAQs & Contact */}
        <ExtraSections />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      {/* Booking Modal Flow */}
      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          preselectedSuite={preselectedSuite}
          initialCheckIn={searchCheckIn}
          initialCheckOut={searchCheckOut}
          initialGuests={searchGuests}
          currency={currency}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {/* Confirmation Screen Overlay */}
      {latestConfirmedBooking && (
        <BookingConfirmation
          booking={latestConfirmedBooking}
          currency={currency}
          onClose={() => setLatestConfirmedBooking(null)}
        />
      )}

      {/* My Reservation Lookup Modal */}
      {isLookupOpen && (
        <LookupModal
          isOpen={isLookupOpen}
          onClose={() => setIsLookupOpen(false)}
          bookings={bookingsList}
          currency={currency}
          onCancelBooking={handleCancelBooking}
        />
      )}
    </div>
  );
}

export default App;
