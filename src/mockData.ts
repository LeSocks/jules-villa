import type { Suite, Amenity, Experience, GalleryItem, Review, LocalAttraction, FAQItem, ExtraAddon } from './types';

export const VILLA_DETAILS = {
  name: "Villa Lumière",
  tagline: "A Sanctuary of Timeless Warmth & Soft Luxury",
  location: "Cap d'Antibes, French Riviera",
  address: "42 Boulevard de la Garoupe, 06600 Antibes, France",
  phone: "+33 4 93 12 34 56",
  email: "concierge@villalumiere-antibes.com",
  owner: {
    name: "Helena & Marc de Saint-Germain",
    title: "Founders & Hosts",
    quote: "When we restored Villa Lumière, our sole purpose was to recreate the cherished warmth of a beloved family home. Every linen, every hand-carved beam, and every fresh pastry in the morning is crafted so you don't just stay with us—you feel you belong here.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    signatureImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
  }
};

export const SUITES: Suite[] = [
  {
    id: "suite-luminiere",
    name: "The Lumière Grand Suite",
    tagline: "Panoramic Riviera views with private sun terrace and marble bath",
    description: "The crown jewel of Villa Lumière. Bathed in golden Mediterranean light, this master suite features a super king-size bed draped in hand-woven organic linens, a private 40m² stone terrace overlooking the azure bay, and an ensuite spa bathroom with a freestanding soaking tub.",
    sqm: 85,
    maxGuests: 2,
    bedType: "Super King Bed",
    pricePerNight: 850,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200"
    ],
    features: [
      "Private 40m² Sun Terrace with Ocean View",
      "Freestanding French Marble Soaking Tub",
      "Dyson Supersonic Care & Diptyque Toiletries",
      "Bespoke Minibar with Vintage Rosé Selection",
      "Sonos Sound System & High-Speed Wi-Fi 6"
    ]
  },
  {
    id: "suite-olive",
    name: "The Olive Garden Pavilion",
    tagline: "Direct access to centennial olive groves and private plunge pool",
    description: "Nestled on the ground garden tier, The Olive Garden Pavilion offers an intimate retreat framed by century-old olive trees and fragrant lavender. Features private garden access, a heated courtyard plunge pool, and rich terra-cotta tones.",
    sqm: 70,
    maxGuests: 2,
    bedType: "King Bed",
    pricePerNight: 680,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200"
    ],
    features: [
      "Private Courtyard & Heated Plunge Pool",
      "Direct Path to Centennial Olive Gardens",
      "Artisan Terracotta Architecture & Fireplace",
      "Rainfall Shower & Organic Herbal Amenities",
      "Complimentary Artisanal Breakfast Basket"
    ]
  },
  {
    id: "suite-azure",
    name: "The Azure Horizon Suite",
    tagline: "Airy elegance with double balconies overlooking the infinity pool",
    description: "Designed for effortless relaxation, featuring floor-to-ceiling French doors opening to twin balconies. Enjoy sweeping sunset views over the heated infinity pool and Mediterranean coastline.",
    sqm: 62,
    maxGuests: 3,
    bedType: "King Bed + Daybed",
    pricePerNight: 590,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200"
    ],
    features: [
      "Twin French Balconies with Sunset Views",
      "Custom Italian Leather Lounge Seating",
      "Nespresso Vertuo & Premium Organic Teas",
      "Spacious Walk-in Cedar Closet",
      "Personalized Evening Turn-Down Service"
    ]
  },
  {
    id: "villa-entire",
    name: "Exclusive Private Villa Takeover",
    tagline: "All 6 suites, full grounds, dedicated chef & host staff for total privacy",
    description: "Experience Villa Lumière in absolute exclusivity. Complete access to all 6 suites, private grounds, infinity pool, wine cellar, and dedicated staff including chef, host, and daily housekeeping.",
    sqm: 650,
    maxGuests: 12,
    bedType: "6 King Bedrooms",
    pricePerNight: 3600,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
    ],
    features: [
      "Entire 650m² Villa & 5,000m² Private Gardens",
      "Dedicated Private Executive Chef & Host",
      "Heated Heated Infinity Pool & Spa Facilities",
      "Unlimited Access to Sommelier Curated Cellar",
      "Chauffeur & Airport Transfer Included"
    ]
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: "pool",
    category: "Outdoors",
    title: "Heated Infinity Pool",
    description: "20-meter heated saltwater infinity pool overlooking the Mediterranean with sun loungers and cabana service.",
    iconName: "Waves"
  },
  {
    id: "dining",
    category: "Gastronomy",
    title: "Farm-to-Table Dining",
    description: "Daily breakfast featuring organic eggs, freshly baked croissants, and fruits harvested directly from our gardens.",
    iconName: "UtensilsCrossed"
  },
  {
    id: "wine",
    category: "Gastronomy",
    title: "Private Wine Cellar",
    description: "Over 800 curated bottles of organic French vintages and local Provence rosés, available for guided tastings.",
    iconName: "Wine"
  },
  {
    id: "wellness",
    category: "Wellness",
    title: "In-Villa Spa & Yoga",
    description: "Private holistic wellness sessions, sound baths, and custom body treatments under the pine grove.",
    iconName: "Sparkles"
  },
  {
    id: "concierge",
    category: "Hospitality",
    title: "24/7 Home Host Concierge",
    description: "Personalized itinerary planning, yacht charters, reservation locks, and discreet warm service.",
    iconName: "HeartHandshake"
  },
  {
    id: "gardens",
    category: "Outdoors",
    title: "Provençal Botanical Gardens",
    description: "Five thousand square meters of terraced lavender, citrus orchards, and secluded reading nooks.",
    iconName: "Trees"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-sunset-cruise",
    title: "Private Riviera Sunset Yacht Charter",
    subtitle: "Navigate the secluded coves of Cap d'Antibes with champagne & local oysters",
    description: "Board our vintage Riva wooden yacht for a 3-hour twilight excursion along the coastline. Enjoy chilled Dom Pérignon and artisanal Provençal tapas prepared by our chef.",
    pricePerGuest: 280,
    priceType: "per_guest",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "exp-chef-table",
    title: "5-Course Provencal Feast & Cooking Masterclass",
    subtitle: "A culinary journey guided by Chef Jean-Luc in our open garden kitchen",
    description: "Accompany Chef Jean-Luc to the local Antibes market in the morning, followed by a hands-on masterclass and a romantic 5-course dinner paired with grand cru wines.",
    pricePerGuest: 195,
    priceType: "per_guest",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "exp-wellness-day",
    title: "Holistic Mind & Body Day Retreat",
    subtitle: "Morning yoga, outdoor aromatherapy massage, and personalized nutrition plan",
    description: "Rejuvenate your senses with sunrise yoga overlooking the sea, a 90-minute massage using lavender oils infused on-site, and a customized detox lunch menu.",
    pricePerGuest: 220,
    priceType: "per_guest",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Villa Facade & Terrace at Sunset",
    category: "Villa & Grounds",
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200",
    description: "Warm golden lights illuminating the classic Provençal stone facade."
  },
  {
    id: "g2",
    title: "Heated Infinity Edge Pool",
    category: "Wellness & Pool",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200",
    description: "Saltwater infinity pool blending into the Mediterranean horizon."
  },
  {
    id: "g3",
    title: "Lumière Grand Suite Bedroom",
    category: "Suites & Interiors",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
    description: "Serene bedroom flooded with natural light and refined linen details."
  },
  {
    id: "g4",
    title: "Al Fresco Garden Breakfast",
    category: "Dining & Wine",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200",
    description: "Freshly harvested fruits and artisanal pastries served under the pergola."
  },
  {
    id: "g5",
    title: "Centennial Olive Grove",
    category: "Villa & Grounds",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
    description: "Tranquil stone walkways lined with ancient olive trees."
  },
  {
    id: "g6",
    title: "Private Wine Tasting Room",
    category: "Dining & Wine",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200",
    description: "Underground vaulted cellar stocked with hand-picked regional vintages."
  },
  {
    id: "g7",
    title: "Freestanding Soaking Tub",
    category: "Suites & Interiors",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
    description: "Spa bathroom with sunset views and organic botanical bath oils."
  },
  {
    id: "g8",
    title: "Yoga Pavilion at Dawn",
    category: "Wellness & Pool",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200",
    description: "Open-air wooden deck dedicated to peaceful morning meditation."
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Charlotte & Jonathan Vance",
    location: "London, United Kingdom",
    rating: 5,
    date: "September 2024",
    title: "An unforgettably warm, luxurious home away from home",
    comment: "From the instant Helena greeted us with warm lavender tea to our final evening tasting rare vintages under the olive trees, Villa Lumière felt like staying with dear friends who happen to own a royal estate. Immaculate attention to every detail.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    stayedSuite: "The Lumière Grand Suite"
  },
  {
    id: "r2",
    author: "Dr. Alexander Sterling",
    location: "Zurich, Switzerland",
    rating: 5,
    date: "August 2024",
    title: "The pinnacle of Mediterranean hospitality",
    comment: "We rented the entire villa for a family reunion. The balance between ultimate luxury and deep homey comfort is extraordinary. Chef Jean-Luc's meals were better than any Michelin-starred restaurant in Cannes.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    stayedSuite: "Exclusive Private Villa Takeover"
  },
  {
    id: "r3",
    author: "Sophia Chen & David Miller",
    location: "San Francisco, USA",
    rating: 5,
    date: "July 2024",
    title: "Pure magic & unmatched serenity",
    comment: "The Olive Garden Pavilion was a dream. Waking up to the scent of lavender and taking a morning swim in our private plunge pool was the highlight of our summer. We are already booking for next year!",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    stayedSuite: "The Olive Garden Pavilion"
  }
];

export const LOCAL_ATTRACTIONS: LocalAttraction[] = [
  {
    id: "a1",
    name: "Plage de la Garoupe",
    category: "Coastal & Beach",
    distance: "3 min drive / 10 min walk",
    description: "A pristine white-sand cove with crystal clear waters and private beach clubs.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "a2",
    name: "Old Town Antibes & Provençal Market",
    category: "Culture & Heritage",
    distance: "8 min drive",
    description: "Cobblestone streets, ancient ramparts, and vibrant daily markets selling artisanal cheeses, flowers, and spices.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "a3",
    name: "Musée Picasso (Château Grimaldi)",
    category: "Culture & Heritage",
    distance: "10 min drive",
    description: "Historic castle studio overlooking the sea, housing key masterpieces created by Pablo Picasso in 1946.",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "a4",
    name: "Cap d'Antibes Coastal Footpath (Sentier du Littoral)",
    category: "Nature & Trails",
    distance: "5 min walk",
    description: "A breathtaking cliffside trail winding past dramatic limestone crags and grand seaside estates.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "What makes Villa Lumière feel like a home rather than a hotel?",
    answer: "Villa Lumière is personally managed by owners Helena & Marc. Every detail—from handwritten welcome letters and home-baked morning pastries to custom linen choices—is designed with intimate hospitality in mind. You have complete freedom and privacy with 24/7 personalized care.",
    category: "Check-in & Stay"
  },
  {
    id: "faq2",
    question: "What are the standard check-in and check-out times?",
    answer: "Standard check-in is from 3:00 PM onwards, and check-out is by 11:00 AM. However, we gladly accommodate early arrivals and late departures whenever possible, offering luggage storage and full access to garden & lounge facilities.",
    category: "Check-in & Stay"
  },
  {
    id: "faq3",
    question: "Are dietary requirements accommodated for daily breakfast?",
    answer: "Absolutely. Our chef prepares fresh, organic daily breakfasts tailored to your exact dietary preferences (gluten-free, vegan, keto, dairy-free, or specific allergies).",
    category: "Amenities & Services"
  },
  {
    id: "faq4",
    question: "What is the cancellation & modification policy?",
    answer: "Reservations cancelled up to 14 days prior to arrival receive a full refund or free rescheduling credit. For details on buyout or group stays, please consult our host team.",
    category: "Booking & Cancellation"
  },
  {
    id: "faq5",
    question: "Is airport transfer available?",
    answer: "Yes! We provide complimentary luxury chauffeur transfer from Nice Côte d'Azur Airport (NCE) for guests booking 3+ nights or full villa buyouts.",
    category: "Amenities & Services"
  }
];

export const EXTRA_ADDONS: ExtraAddon[] = [
  {
    id: "addon-champagne",
    name: "Welcome Vintage Dom Pérignon & Caviar",
    description: "A chilled bottle of Dom Pérignon vintage paired with 50g Royal Oscietra caviar waiting in your suite upon arrival.",
    price: 350,
    unit: "per_stay"
  },
  {
    id: "addon-massage",
    name: "In-Suite 90-Minute Aromatherapy Massage",
    description: "Deep relaxing tissue massage on your private terrace using organic Mediterranean botanical oils.",
    price: 180,
    unit: "per_guest"
  },
  {
    id: "addon-transfer",
    name: "Luxury Chauffeur Transfer (Nice NCE Airport)",
    description: "Private Mercedes Maybach transfer directly between Nice Côte d'Azur Airport and Villa Lumière.",
    price: 120,
    unit: "per_stay"
  },
  {
    id: "addon-picnic",
    name: "Gourmet Coastal Picnic Basket",
    description: "Handcrafted wicker basket filled with artisanal cheeses, cured meats, wine, fresh sourdough, and fruits for your beach day.",
    price: 140,
    unit: "per_stay"
  }
];

export const INITIAL_BOOKINGS = [
  {
    bookingId: "VL-88291",
    suiteId: "suite-luminiere",
    checkIn: "2025-06-10",
    checkOut: "2025-06-15",
    guests: { adults: 2, children: 0 },
    addons: ["addon-champagne"],
    guestInfo: {
      firstName: "Eleanor",
      lastName: "Rutherford",
      email: "eleanor.r@example.com",
      phone: "+44 7700 900077",
      specialRequests: "Celebrating our 10th anniversary. Excited to stay with you!"
    },
    pricing: {
      nights: 5,
      nightlyRate: 850,
      baseTotal: 4250,
      addonsTotal: 350,
      cleaningFee: 150,
      taxAndService: 475,
      grandTotal: 5225
    },
    status: "Confirmed" as const,
    createdAt: "2025-01-15"
  }
];
