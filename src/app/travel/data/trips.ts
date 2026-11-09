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
  difficulty: "Easy to Moderate" | "Moderate" | "Challenging";
  status: "Confirmed" | "Almost Full" | "Early Bird Open" | "Draft Sample";
  isConfirmed: boolean; // Distinguish confirmed from draft sample
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

export const GROUP_TRIPS: GroupTrip[] = [
  {
    id: "trip-kashmir-2026",
    slug: "kashmir-winter-expedition-2026",
    title: "Kashmir Winter & Alpine Powder Expedition",
    tagline: "Experience frozen Dal Lake, Gulmarg's 14,000-ft peaks, and pine-clad Pahalgam valleys with a curated small group.",
    destination: "Kashmir",
    destinationSlug: "kashmir",
    state: "Jammu and Kashmir",
    coverImage: "/img/travel/kashmir_hero.jpg",
    gallery: [
      "/img/travel/kashmir_hero.jpg",
      "/img/travel/ladakh.jpg",
      "/img/travel/rajasthan.jpg",
    ],
    departureDate: "14 Feb 2026",
    returnDate: "21 Feb 2026",
    durationDays: 8,
    durationLabel: "8 Days / 7 Nights",
    departureCity: "Srinagar (SXR)",
    pricePerPerson: 28500,
    currency: "INR (₹)",
    maxGroupSize: 12,
    availableSeats: 4,
    totalSeats: 12,
    difficulty: "Moderate",
    status: "Almost Full",
    isConfirmed: true,
    overview:
      "A meticulously designed 8-day winter journey across Kashmir. Hosted personally by Ashraf Siddiqui, this expedition combines high-altitude snow experiences at Apharwat Peak with intimate heritage walks through downtown Srinagar and cozy homestay evenings in Pahalgam.",
    highlights: [
      "2 nights aboard a traditional cedarwood heritage houseboat on peaceful Nigeen Lake",
      "Gondola Phase 1 & 2 tickets to 13,780 ft on Apharwat Peak included",
      "Private 4x4 mountain transit with professional snow drivers and tire chains",
      "Authentic multi-course Kashmiri Wazwan feast and morning Harissa breakfast in Old Srinagar",
      "Curated small-group experience capped strictly at 12 fellow travelers",
    ],
    inclusions: [
      "All accommodation (Double-occupancy in boutique heritage stays & heated houseboats)",
      "Daily breakfast and traditional dinners throughout the 8 days",
      "Private dedicated 4x4 vehicles (Scorpio / Innova) for all intercity and mountain transit",
      "Gondola Phase 1 & Phase 2 official passes in Gulmarg",
      "2-hour sunrise Shikara ride on Dal Lake & Nigeen Lake",
      "Certified local mountain guides and 24/7 expedition host support",
      "Driver allowances, toll taxes, fuel, and permit charges",
    ],
    exclusions: [
      "Airfare to and from Srinagar International Airport (SXR)",
      "Lunches, personal snacks, and extra Kehwa outside scheduled meals",
      "Winter gear rental (heavy snow jackets/boots) if you do not bring your own",
      "Personal expenses, shopping, pony rides, and optional ski equipment",
      "Travel insurance (highly recommended)",
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar & Nigeen Lake Houseboat Welcome",
        description: "Airport pickup; check into hand-carved cedar houseboat; evening shikara ride at sunset with saffron kehwa.",
        mealsIncluded: "Dinner",
        nightStay: "Nigeen Lake Cedar Houseboat",
      },
      {
        day: 2,
        title: "Old Srinagar Heritage Walk & Floating Vegetable Market",
        description: "5:00 AM floating market shikara drift; walking tour of Jamia Masjid deodar pillars and downtown pashmina weavers.",
        mealsIncluded: "Breakfast & Traditional Wazwan Dinner",
        nightStay: "Nigeen Lake Cedar Houseboat",
      },
      {
        day: 3,
        title: "Ascent to Gulmarg Alpine Meadow via Tangmarg",
        description: "Drive through snow-covered pine forests with tire chains; St. Mary's 1902 church walk and winter ski slope views.",
        mealsIncluded: "Breakfast & Dinner",
        nightStay: "Gulmarg Pine Cottages",
      },
      {
        day: 4,
        title: "14,000 ft on Apharwat Peak (Gondola Phase 1 & 2)",
        description: "Ride Asia's highest cable car to Mount Apharwat; crampon hike along the high-altitude snow ridge overlooking Pir Panjal.",
        mealsIncluded: "Breakfast & Dinner",
        nightStay: "Gulmarg Pine Cottages",
      },
      {
        day: 5,
        title: "Descent to Pahalgam Valley of Shepherds via Awantipora",
        description: "Drive through saffron fields of Pampore; 9th-century temple ruins; settle into cozy riverside homestay beside Lidder River.",
        mealsIncluded: "Breakfast & Dinner",
        nightStay: "Batakoot Riverside Homestay, Pahalgam",
      },
      {
        day: 6,
        title: "Aru Valley & Betaab Valley Winter Trails",
        description: "Excursion to pristine pine groves of Aru; frozen river vistas in Betaab Valley; evening market walk for walnuts.",
        mealsIncluded: "Breakfast & Dinner",
        nightStay: "Batakoot Riverside Homestay, Pahalgam",
      },
      {
        day: 7,
        title: "Baisaran Meadow Hike & Return to Srinagar",
        description: "Scenic pine forest walk up to Baisaran 'Mini Switzerland'; drive back to Srinagar; farewell dinner on the Bund.",
        mealsIncluded: "Breakfast & Celebration Dinner",
        nightStay: "Boutique Heritage Hotel, Rajbagh",
      },
      {
        day: 8,
        title: "Final Kehwa & Airport Departures",
        description: "Morning souvenir shopping for saffron and papier-mâché; transfer to Srinagar Airport for flights home.",
        mealsIncluded: "Breakfast",
        nightStay: "Trip Concludes",
      },
    ],
    faqs: [
      {
        question: "How cold will it get in Kashmir during February?",
        answer: "Daytime temperatures in Srinagar range from 5°C to 12°C, dropping to -2°C to 2°C at night. In Gulmarg, temperatures can plunge to -8°C at night. All our accommodations feature traditional bukhari wood heaters or central electric heating with heated electric blankets.",
      },
      {
        question: "Can beginners join this trip? Is high fitness required?",
        answer: "Yes, absolutely! This is an experiential expedition suitable for travelers of average fitness. Walking in snow is slow and peaceful. Crampons and walking sticks are provided for ridge walks.",
      },
      {
        question: "What is the group size and who else travels?",
        answer: "The group is strictly capped at 12 people. Our community comprises photographers, solo professionals, creatives, and adventure enthusiasts aged between 22 and 45. Solo travelers are warmly welcomed and matched with a same-gender roommate.",
      },
      {
        question: "What is the booking and payment process?",
        answer: "In this phase, submitting your registration reserves your seat enquiry without immediate card payment. Our team verifies seat availability and contacts you on WhatsApp within 24 hours to confirm your spot with an advance deposit.",
      },
    ],
    host: {
      name: "Ashraf Siddiqui",
      role: "Expedition Leader & Creator",
      experience: "24 Indian states explored · 6 expeditions led",
      avatar: "/img/travel/kashmir_hero.jpg",
      message: "I personally lead every minute of this journey. We travel slow, respect local communities, and create genuine bonds that outlive the trip.",
    },
  },
  {
    id: "trip-spiti-2026",
    slug: "spiti-valley-circuit-2026",
    title: "Spiti Valley Middle Land 4x4 Circuit",
    tagline: "Traverse high Himalayan mountain passes, thousand-year-old Tibetan monasteries, and the world's highest post office.",
    destination: "Spiti",
    destinationSlug: "himachal",
    state: "Himachal Pradesh",
    coverImage: "/img/travel/ladakh.jpg",
    gallery: [
      "/img/travel/ladakh.jpg",
      "/img/travel/kashmir_hero.jpg",
      "/img/travel/rajasthan.jpg",
    ],
    departureDate: "10 Jun 2026",
    returnDate: "19 Jun 2026",
    durationDays: 10,
    durationLabel: "10 Days / 9 Nights",
    departureCity: "Shimla (SLV)",
    pricePerPerson: 34000,
    currency: "INR (₹)",
    maxGroupSize: 10,
    availableSeats: 7,
    totalSeats: 10,
    difficulty: "Challenging",
    status: "Confirmed",
    isConfirmed: true,
    overview:
      "A rugged overland journey through the Middle Land connecting Tibet and India. Crossing Kunzum Pass, staying in ancient village homestays like Langza, and gazing into the starlit void at 14,000 feet.",
    highlights: [
      "Send a postcard from the World's Highest Post Office in Hikkim (14,567 ft)",
      "Stay in mud-brick homestays in Langza under the shadow of Chau Chau Kang Nilda peak",
      "Explore 1000-year-old Key Monastery and meditate with resident monks",
      "Drive across Asia's highest suspension bridge at Chicham (13,596 ft)",
      "Camp beside the celestial crescent waters of Chandratal Lake",
    ],
    inclusions: [
      "9 nights stay in local homestays and alpine camps",
      "Breakfast and dinners daily (nutritious local vegetarian meals)",
      "High ground clearance 4x4 vehicles with experienced mountain drivers",
      "Permits, entry fees, and oxygen cylinders in every vehicle",
      "Expedition leader and local Spitian community coordinator",
    ],
    exclusions: [
      "Travel from your home city to Shimla",
      "Lunches and personal shopping",
      "Insurance and medical evacuation expenses",
    ],
    dayWiseItinerary: [
      { day: 1, title: "Shimla to Sangla Valley", description: "Drive along Hindustan-Tibet road through Kinnaur gorges.", mealsIncluded: "Dinner", nightStay: "Sangla Riverside Camp" },
      { day: 2, title: "Sangla to Kalpa & Kinner Kailash Views", description: "Visit Chitkul (last Indian village) and watch sunset over sacred Kinner Kailash.", mealsIncluded: "Breakfast & Dinner", nightStay: "Kalpa Heritage Stay" },
      { day: 3, title: "Kalpa to Nako & Tabo Monastery", description: "Cross into Spiti district; visit thousand-year-old UNESCO Tabo mud monastery.", mealsIncluded: "Breakfast & Dinner", nightStay: "Tabo Guesthouse" },
      { day: 4, title: "Tabo to Dhankar Fort & Kaza", description: "Climb Dhankar monastery perched on cliff edge; reach Spiti headquarters in Kaza.", mealsIncluded: "Breakfast & Dinner", nightStay: "Kaza Homestay" },
      { day: 5, title: "Key Monastery & Kibber High Village", description: "Morning prayers at Key Monastery; explore Kibber wildlife sanctuary.", mealsIncluded: "Breakfast & Dinner", nightStay: "Kaza Homestay" },
      { day: 6, title: "Hikkim, Komic & Langza Fossil Village", description: "Send postcards from Hikkim; explore Langza prehistoric marine fossils.", mealsIncluded: "Breakfast & Dinner", nightStay: "Langza Mud Homestay" },
      { day: 7, title: "Chicham Bridge & Chandratal Lake", description: "Cross Chicham gorge; camp beside the moon lake Chandratal at 14,100 ft.", mealsIncluded: "Breakfast & Dinner", nightStay: "Chandratal Swiss Tents" },
      { day: 8, title: "Chandratal over Rohtang Pass to Manali", description: "Navigate raw river crossings and boulder beds; cross Rohtang Pass to Manali.", mealsIncluded: "Breakfast & Dinner", nightStay: "Old Manali Cottage" },
      { day: 9, title: "Manali Leisure & Cafe Stroll", description: "Relax aching muscles in natural hot springs; celebration dinner in Old Manali.", mealsIncluded: "Breakfast & Dinner", nightStay: "Old Manali Cottage" },
      { day: 10, title: "Departure from Manali", description: "Overnight Volvo bus or airport transfer to Kullu/Chandigarh.", mealsIncluded: "Breakfast", nightStay: "Trip Concludes" },
    ],
    faqs: [
      { question: "Is Spiti suitable for first-time high-altitude travelers?", answer: "We take the gradual ascent route via Shimla and Kinnaur, allowing your body to adapt slowly to altitude over 4 days before reaching Kaza." },
      { question: "Will my phone work in Spiti?", answer: "Only BSNL and Jio postpaid connections receive network coverage in Kaza. Enjoy the digital detox!" },
    ],
    host: {
      name: "Ashraf Siddiqui",
      role: "Expedition Leader",
      experience: "Led 4 Spiti Valley circuits",
      avatar: "/img/travel/kashmir_hero.jpg",
      message: "Spiti strips life to its raw essentials. You will return transformed.",
    },
  },
  {
    id: "trip-ladakh-2026",
    slug: "ladakh-high-passes-overland-2026",
    title: "Ladakh High Passes Overland Expedition",
    tagline: "Overland 10-day circuit crossing Khardung La, Nubra cold desert dunes, Turtuk village, and Pangong Tso.",
    destination: "Ladakh",
    destinationSlug: "ladakh",
    state: "Ladakh",
    coverImage: "/img/travel/ladakh.jpg",
    gallery: [
      "/img/travel/ladakh.jpg",
      "/img/travel/kashmir_hero.jpg",
      "/img/travel/rajasthan.jpg",
    ],
    departureDate: "18 Jul 2026",
    returnDate: "27 Jul 2026",
    durationDays: 10,
    durationLabel: "10 Days / 9 Nights",
    departureCity: "Leh (IXL)",
    pricePerPerson: 38500,
    currency: "INR (₹)",
    maxGroupSize: 12,
    availableSeats: 6,
    totalSeats: 12,
    difficulty: "Moderate",
    status: "Confirmed",
    isConfirmed: true,
    overview:
      "A bucket-list overland Himalayan crossing across the highest motorable roads on planet Earth. Built with mandatory 48-hour acclimatization in Leh, double-humped camel safaris in Hunder, and starlit camps along the Tibetan border.",
    highlights: [
      "Khardung La Pass crossing at 17,982 ft",
      "Stargazing camps beside the changing blues of Pangong Tso",
      "Visit Turtuk — India's northernmost Balti border village",
      "Morning prayers at 15th-century Thiksey Monastery",
      "Small group capped at 12 participants",
    ],
    inclusions: [
      "9 nights stay (Boutique guesthouse in Leh, luxury tents in Nubra & Pangong)",
      "Daily breakfast and dinners",
      "All Inner Line Permits and Wildlife / Environmental fees",
      "Private Innova / Scorpio vehicles with oxygen support",
      "Certified local guide and expedition host",
    ],
    exclusions: [
      "Flights to/from Leh Airport (IXL)",
      "Lunches and beverages",
      "Personal medical insurance",
    ],
    dayWiseItinerary: [
      { day: 1, title: "Touchdown in Leh & Compulsory Rest", description: "Arrive at 11,500 ft; mandatory 24-hr rest to acclimatize safely.", mealsIncluded: "Dinner", nightStay: "Leh Boutique Guesthouse" },
      { day: 2, title: "Indus Valley Monasteries & Shanti Stupa", description: "Visit Thiksey, Shey Palace, and sunset at Shanti Stupa.", mealsIncluded: "Breakfast & Dinner", nightStay: "Leh Boutique Guesthouse" },
      { day: 3, title: "Crossing Khardung La into Nubra Valley", description: "Ascend 17,982 ft pass; descend into Hunder sand dunes.", mealsIncluded: "Breakfast & Dinner", nightStay: "Nubra Luxury Camps" },
      { day: 4, title: "Turtuk Balti Border Village", description: "Walk through apricot orchards in Turtuk; meet local Balti elders.", mealsIncluded: "Breakfast & Dinner", nightStay: "Nubra Luxury Camps" },
      { day: 5, title: "Shyok River Route to Pangong Tso", description: "Overland gorge drive along turquoise river; arrive at Pangong Lake.", mealsIncluded: "Breakfast & Dinner", nightStay: "Pangong Lakeshore Camp" },
      { day: 6, title: "Pangong Sunrise & Return over Chang La", description: "Cross 17,590 ft Chang La; visit Hemis Monastery; return to Leh.", mealsIncluded: "Breakfast & Dinner", nightStay: "Leh Boutique Guesthouse" },
      { day: 7, title: "Magnetic Hill, Sangam & Alchi Frescoes", description: "Confluence of Indus & Zanskar rivers; 11th-century frescoes at Alchi.", mealsIncluded: "Breakfast & Dinner", nightStay: "Leh Boutique Guesthouse" },
      { day: 8, title: "Leh Palace, Tsemo Fort & Local Bazaars", description: "Explore historic Leh Palace; shop for pashmina and apricots.", mealsIncluded: "Breakfast & Dinner", nightStay: "Leh Boutique Guesthouse" },
      { day: 9, title: "Stok Village Cultural Day & Farewell Feast", description: "Visit Stok royal museum; celebration dinner with Tibetan dishes.", mealsIncluded: "Breakfast & Dinner", nightStay: "Leh Boutique Guesthouse" },
      { day: 10, title: "Departure from Leh Airport", description: "Morning flights home over the snow peaks of Karakoram.", mealsIncluded: "Breakfast", nightStay: "Trip Concludes" },
    ],
    faqs: [
      { question: "Is oxygen provided in vehicles?", answer: "Yes, every vehicle carries medical oxygen canisters and oximeters for daily monitoring." },
      { question: "What permits are needed?", answer: "All Inner Line Permits are handled by our team before you land." },
    ],
    host: {
      name: "Ashraf Siddiqui",
      role: "Expedition Leader",
      experience: "24 states explored · 8 Ladakh circuits",
      avatar: "/img/travel/kashmir_hero.jpg",
      message: "Ladakh will change your perspective on size and stillness forever.",
    },
  },
  {
    id: "trip-meghalaya-sample",
    slug: "meghalaya-living-root-bridges-2026",
    title: "Meghalaya Living Root Bridges & Waterfalls",
    tagline: "Hike 3,000 steps to the Double Decker Root Bridge, swim in crystal clear Dawki, and explore Asia's cleanest village.",
    destination: "Meghalaya",
    destinationSlug: "meghalaya",
    state: "Meghalaya",
    coverImage: "/img/travel/kashmir_hero.jpg",
    gallery: [
      "/img/travel/kashmir_hero.jpg",
      "/img/travel/rajasthan.jpg",
      "/img/travel/ladakh.jpg",
    ],
    departureDate: "15 Oct 2026",
    returnDate: "21 Oct 2026",
    durationDays: 7,
    durationLabel: "7 Days / 6 Nights",
    departureCity: "Guwahati (GAU)",
    pricePerPerson: 26000,
    currency: "INR (₹)",
    maxGroupSize: 12,
    availableSeats: 12,
    totalSeats: 12,
    difficulty: "Moderate",
    status: "Draft Sample",
    isConfirmed: false,
    overview:
      "A preliminary draft itinerary for our autumn 2026 Northeast expedition. Registration is open for early interest; confirmed dates will be announced in mid-2026.",
    highlights: [
      "Hike to the Double Decker Living Root Bridge in Nongriat",
      "Boat ride on the glass-like waters of Umngot River in Dawki",
      "Explore Mawlynnong (Asia's cleanest village)",
      "Stand at the edge of Nohkalikai Falls in Cherrapunji",
    ],
    inclusions: [
      "6 nights stay in boutique eco-resorts and homestays",
      "Breakfast and dinners",
      "Private AC vehicle transfers",
    ],
    exclusions: [
      "Airfare to Guwahati",
      "Personal trekking gear",
    ],
    dayWiseItinerary: [
      { day: 1, title: "Guwahati to Shillong", description: "Scenic drive past Umiam Lake; cafe evening in Shillong.", mealsIncluded: "Dinner", nightStay: "Shillong Heritage Stay" },
      { day: 2, title: "Shillong to Cherrapunji", description: "Waterfalls, caves, and dramatic misty gorge viewpoints.", mealsIncluded: "Breakfast & Dinner", nightStay: "Cherrapunji Eco Resort" },
      { day: 3, title: "Nongriat Root Bridge Trek", description: "3,000 stone steps down to the living bio-engineered wonder.", mealsIncluded: "Breakfast & Dinner", nightStay: "Nongriat Homestay" },
      { day: 4, title: "Rainbow Falls & Climb Back to Tyrna", description: "Turquoise lagoon plunge pool; return climb to Cherrapunji.", mealsIncluded: "Breakfast & Dinner", nightStay: "Cherrapunji Eco Resort" },
      { day: 5, title: "Dawki & Mawlynnong Clean Village", description: "Crystal Umngot river boating; stroll through flower gardens.", mealsIncluded: "Breakfast & Dinner", nightStay: "Dawki Riverside Camp" },
      { day: 6, title: "Krang Shuri Falls & Return to Shillong", description: "Blue natural swimming pools; farewell dinner in Shillong.", mealsIncluded: "Breakfast & Dinner", nightStay: "Shillong Heritage Stay" },
      { day: 7, title: "Departure to Guwahati Airport", description: "Airport transfer for flights home.", mealsIncluded: "Breakfast", nightStay: "Trip Concludes" },
    ],
    faqs: [
      { question: "Is this trip confirmed?", answer: "This is a draft sample itinerary. You may register your early interest, and our team will notify you when bookings officially open." },
    ],
    host: {
      name: "Ashraf Siddiqui",
      role: "Expedition Leader",
      experience: "Solo traveler across Northeast India",
      avatar: "/img/travel/kashmir_hero.jpg",
      message: "Meghalaya's rainforests and living root bridges are unlike anywhere else on earth.",
    },
  },
];

