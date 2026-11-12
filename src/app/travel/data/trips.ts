import tripsData from "./trips.json";

export interface TripDayItinerary {
  day: number;
  title: string;
  description: string;
  mealsIncluded: string;
  nightStay: string;
}

export interface TripFAQ {
  question: string;
  answer: string;
}

export interface GroupTrip {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  destination: string;
  destinationSlug: string;
  state: string;
  coverImage: string;
  gallery: string[];
  departureDate: string; // e.g. "14 Feb 2026"
  returnDate: string;    // e.g. "21 Feb 2026"
  durationDays: number;
  durationLabel: string;
  departureCity: string;
  pricePerPerson: number;
  currency: string;
  maxGroupSize: number;
  availableSeats: number;
  totalSeats: number;
  difficulty: "Easy to Moderate" | "Moderate" | "Challenging" | string;
  status: "Confirmed" | "Almost Full" | "Early Bird Open" | "Draft Sample" | "Live" | "Upcoming" | string;
  isConfirmed: boolean; // Distinguish confirmed from draft sample
  isUpcoming?: boolean; // When true: locked preview with opacity, lock icon, tagline only
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  dayWiseItinerary: TripDayItinerary[];
  faqs: TripFAQ[];
  host: {
    name: string;
    role: string;
    experience: string;
    avatar: string;
    message: string;
  };
}

export const GROUP_TRIPS: GroupTrip[] = tripsData as unknown as GroupTrip[];
