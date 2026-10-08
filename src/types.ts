export interface Suite {
  id: string;
  name: string;
  tagline: string;
  description: string;
  sqm: number;
  maxGuests: number;
  bedType: string;
  pricePerNight: number;
  image: string;
  gallery: string[];
  features: string[];
}

export interface Amenity {
  id: string;
  category: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  pricePerGuest?: number;
  priceType: 'per_guest' | 'per_stay' | 'included';
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Villa & Grounds' | 'Suites & Interiors' | 'Dining & Wine' | 'Wellness & Pool';
  imageUrl: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  avatar: string;
  stayedSuite: string;
}

export interface LocalAttraction {
  id: string;
  name: string;
  category: 'Culture & Heritage' | 'Nature & Trails' | 'Gourmet & Dining' | 'Coastal & Beach';
  distance: string;
  description: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Check-in & Stay' | 'Booking & Cancellation' | 'Amenities & Services';
}

export interface ExtraAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: 'per_stay' | 'per_day' | 'per_guest';
}

export interface BookingDetails {
  bookingId: string;
  suiteId: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  addons: string[];
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
    estimatedArrivalTime?: string;
  };
  pricing: {
    nights: number;
    nightlyRate: number;
    baseTotal: number;
    addonsTotal: number;
    cleaningFee: number;
    taxAndService: number;
    grandTotal: number;
  };
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
}
