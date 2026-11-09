export interface DestinationPlace {
  name: string;
  description: string;
  tag: string;
}

export interface DestinationItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface DestinationData {
  slug: string;
  name: string;
  tagline: string;
  state: string;
  stateId: string;
  country: string;
  region: string;
  duration: string;
  yearVisited: string;
  heroImage: string;
  gallery: string[];
  overview: string;
  personalExperience: string;
  bestTimeToVisit: {
    idealMonths: string;
    seasons: string;
    weatherTips: string;
  };
  howToReach: {
    byAir: string;
    byRail: string;
    byRoad: string;
  };
  placesToExplore: DestinationPlace[];
  estimatedBudget: {
    range: string;
    basis: string;
    note: string;
  };
  itinerarySample: DestinationItineraryDay[];
}

export const DESTINATIONS_DATA: Record<string, DestinationData> = {
  kashmir: {
    slug: "kashmir",
    name: "Kashmir Valley",
    tagline: "Heaven on Earth",
    state: "Jammu and Kashmir",
    stateId: "jk",
    country: "India",
    region: "North India",
    duration: "7 - 9 Days",
    yearVisited: "2026",
    heroImage: "/img/travel/kashmir_hero.jpg",
    gallery: [
      "/img/travel/kashmir_hero.jpg",
      "/img/travel/ladakh.jpg",
      "/img/travel/rajasthan.jpg",
    ],
    overview:
      "Framed by snow-clad Pir Panjal ranges and dotted with blooming chinar trees, Kashmir Valley is an enduring testament to natural grandeur. From serene shikara rides on Dal Lake to the alpine meadows of Gulmarg, every corner feels sculpted by poetry.",
    personalExperience:
      "Waking up at 5:00 AM on Dal Lake with the mist slowly lifting off the water was unforgettable. You hear the soft oars slicing through the water, followed by the floating flower vendor drifting by. Kashmir wasn't just another stamp on my map; it rewired how I experience silence.",
    bestTimeToVisit: {
      idealMonths: "April to October (Spring/Autumn), Dec to Feb (Snow lovers)",
      seasons: "Pleasant Summer (15°C - 30°C) | Snowy Winter (-2°C - 10°C)",
      weatherTips: "Heavy woollens essential for Gulmarg and Sonmarg throughout the year.",
    },
    howToReach: {
      byAir: "Sheikh ul-Alam International Airport (SXR), Srinagar, connects directly to Delhi, Mumbai, and Bengaluru.",
      byRail: "Udhampur / Jammu Tawi railway station connects to all major Indian cities. The USBRL rail link provides breathtaking scenic views.",
      byRoad: "NH 44 connects Srinagar to Jammu through the iconic Shyama Prasad Mukherjee Tunnel.",
    },
    placesToExplore: [
      {
        name: "Dal Lake & Nigeen Lake",
        description: "Stay aboard traditional hand-carved cedar houseboats and experience the floating vegetable market at dawn.",
        tag: "Waterways",
      },
      {
        name: "Gulmarg Gondola & Apharwat Peak",
        description: "One of the highest cable cars in the world, taking you up to 13,780 feet for skiing and panoramic peaks.",
        tag: "Alpine",
      },
      {
        name: "Betaab Valley & Aru Valley (Pahalgam)",
        description: "Pristine pine groves surrounded by roaring mountain streams and lush camping grounds.",
        tag: "Valleys",
      },
      {
        name: "Sonmarg & Thajiwas Glacier",
        description: "The 'Meadow of Gold' offering pony treks up to perennial glacier ice fields.",
        tag: "Glaciers",
      },
    ],
    estimatedBudget: {
      range: "₹22,000 – ₹38,000 per person",
      basis: "Estimated basis 7-day budget-to-midrange trip (2024 estimates for 2 pax sharing)",
      note: "Includes local cab transfers, moderate houseboat + hotel stay, meals and standard Gondola phase 1 & 2 tickets. Flights excluded.",
    },
    itinerarySample: [
      {
        day: 1,
        title: "Arrival in Srinagar & Dal Lake Sunset",
        activities: [
          "Airport transfer to Dal Lake houseboat",
          "Sunset Shikara ride through floating gardens & Char Chinar",
          "Evening walk along Boulevard Road",
        ],
      },
      {
        day: 2,
        title: "Old Srinagar Heritage & Mughal Gardens",
        activities: [
          "Explore Jama Masjid and Jamia market",
          "Visit Nishat Bagh and Shalimar Bagh terraced fountains",
          "Traditional Kashmiri Wazwan dinner experience",
        ],
      },
      {
        day: 3,
        title: "Gulmarg Alpine Adventure",
        activities: [
          "Scenic morning drive to Gulmarg (54 km)",
          "Gulmarg Gondola Phase 1 & Phase 2 up to Apharwat Peak",
          "Walking tour across the Gulmarg golf course",
        ],
      },
      {
        day: 4,
        title: "Pahalgam Valley of Shepherds",
        activities: [
          "Drive along saffron fields of Pampore to Pahalgam",
          "Explore Betaab Valley and Chandanwari base camp",
          "Riverside cafe exploration along Lidder River",
        ],
      },
      {
        day: 5,
        title: "Aru Valley Trek & Countryside Walk",
        activities: [
          "Short morning hike towards Overa-Aru wildlife sanctuary",
          "Local Gujjar settlement interactions",
          "Return to Srinagar for handicraft and walnut wood shopping",
        ],
      },
    ],
  },

  ladakh: {
    slug: "ladakh",
    name: "Ladakh",
    tagline: "The Land of High Passes",
    state: "Ladakh",
    stateId: "jk",
    country: "India",
    region: "North India",
    duration: "8 - 11 Days",
    yearVisited: "2022",
    heroImage: "/img/travel/ladakh.jpg",
    gallery: [
      "/img/travel/ladakh.jpg",
      "/img/travel/kashmir_hero.jpg",
      "/img/travel/rajasthan.jpg",
    ],
    overview:
      "Perched high on the Tibetan plateau, Ladakh is a world apart. Jagged mountains carved by wind and ice, ancient Tibetan Buddhist monasteries perched precariously on rock needles, and emerald rivers slicing through desolate canyons.",
    personalExperience:
      "Crossing Khardung La on two wheels with cold wind cutting through three layers of gear taught me pure humility. Standing next to Pangong Tso as the waters transitioned from turquoise to deep navy under a moonlit sky felt completely extraterrestrial.",
    bestTimeToVisit: {
      idealMonths: "Mid-May to late September",
      seasons: "Pleasant Summer (10°C - 25°C) | Sub-zero Night Temps",
      weatherTips: "Acclimatisation for at least 48 hours in Leh (11,500 ft) is mandatory before ascending passes.",
    },
    howToReach: {
      byAir: "Kushok Bakula Rimpochee Airport (IXL), Leh — one of the highest commercial airports in the world.",
      byRail: "Nearest railhead is Jammu Tawi or Chandigarh, followed by road transfer.",
      byRoad: "Epic overland road trips via Manali-Leh Highway (475 km) or Srinagar-Leh Highway (420 km).",
    },
    placesToExplore: [
      {
        name: "Pangong Tso",
        description: "A 134 km long endorheic lake shared between India and Tibet, famous for changing hues.",
        tag: "Lakes",
      },
      {
        name: "Nubra Valley & Hunder Sand Dunes",
        description: "Cold mountain desert featuring double-humped Bactrian camels and Shyok river banks.",
        tag: "Desert",
      },
      {
        name: "Thiksey & Diskit Monasteries",
        description: "Majestic 12-storey monastic complexes housing giant Maitreya Buddha statues.",
        tag: "Monastery",
      },
      {
        name: "Khardung La & Chang La",
        description: "Legendary high-altitude motorable mountain passes at 17,500+ feet.",
        tag: "Passes",
      },
    ],
    estimatedBudget: {
      range: "₹28,000 – ₹45,000 per person",
      basis: "Estimated basis 9-day shared expedition (2024 season estimates)",
      note: "Includes SUV/bike permit, inner-line permits, oxygen canister backup, homestay & campsite lodging.",
    },
    itinerarySample: [
      {
        day: 1,
        title: "Arrival in Leh & Complete Rest",
        activities: [
          "Arrival at Leh airport (3,500m)",
          "Rest at hotel for altitude acclimatisation",
          "Evening gentle stroll through Leh Bazaar",
        ],
      },
      {
        day: 2,
        title: "Leh Local Monasteries & Shanti Stupa",
        activities: [
          "Visit Shanti Stupa for panoramic valley views",
          "Explore Leh Palace and Hall of Fame museum",
          "Sunset over Indus-Zanskar Sangam",
        ],
      },
      {
        day: 3,
        title: "Crossing Khardung La to Nubra Valley",
        activities: [
          "Climb over Khardung La pass (17,582 ft)",
          "Descend into Nubra Valley and visit Diskit Monastery",
          "Bactrian camel safari on Hunder cold sand dunes",
        ],
      },
      {
        day: 4,
        title: "Nubra Valley to Pangong Tso via Shyok",
        activities: [
          "Scenic off-road drive along Shyok River canyon",
          "First glimpse of Pangong Lake's vibrant turquoise waters",
          "Stargazing under Bortle-1 dark night skies",
        ],
      },
    ],
  },

  rajasthan: {
    slug: "rajasthan",
    name: "Rajasthan",
    tagline: "The Land of Kings",
    state: "Rajasthan",
    stateId: "rj",
    country: "India",
    region: "West India",
    duration: "7 - 10 Days",
    yearVisited: "2023",
    heroImage: "/img/travel/rajasthan.jpg",
    gallery: [
      "/img/travel/rajasthan.jpg",
      "/img/travel/kashmir_hero.jpg",
      "/img/travel/kerala.jpg",
    ],
    overview:
      "From the golden ramparts of Jaisalmer rising out of the Thar Desert to the mirror lakes of Udaipur and the vibrant streets of the Pink City Jaipur — Rajasthan represents India at its most regal, expressive, and culturally intense.",
    personalExperience:
      "As someone based in Jaipur, Rajasthan is etched into my bloodstream. Sleeping on a sand dune under open constellations 40 kilometres from Jaisalmer with nothing but camel bells in the distance is an experience every traveller must have.",
    bestTimeToVisit: {
      idealMonths: "October to March",
      seasons: "Pleasant Winter (10°C - 26°C) | Desert Nights get chilly (5°C)",
      weatherTips: "Sun protection and hydration are key during daytime desert excursions.",
    },
    howToReach: {
      byAir: "International and domestic airports at Jaipur (JAI), Jodhpur (JDH), and Udaipur (UDR).",
      byRail: "Exceptional rail network connecting Jaipur Junction, Jodhpur, and Bikaner to Mumbai, Delhi, and Kolkata.",
      byRoad: "Smooth 6-lane expressways (Delhi-Mumbai Expressway, NH 48) make driving a pleasure.",
    },
    placesToExplore: [
      {
        name: "Jaisalmer Fort & Sam Sand Dunes",
        description: "The only living golden sandstone fort in India and desert safari under starlit skies.",
        tag: "Desert",
      },
      {
        name: "Mehrangarh Fort & Blue City (Jodhpur)",
        description: "Imposing fortress looming 400 feet above cobalt-blue historic Brahmin houses.",
        tag: "Forts",
      },
      {
        name: "Lake Pichola & City Palace (Udaipur)",
        description: "Romantic lake system flanked by white marble palaces and Aravali hills.",
        tag: "Lakes",
      },
      {
        name: "Amer Fort & Nahargarh (Jaipur)",
        description: "Spectacular Rajput architecture and sunset panoramic views over the Pink City.",
        tag: "Heritage",
      },
    ],
    estimatedBudget: {
      range: "₹18,000 – ₹30,000 per person",
      basis: "Estimated basis 7-day multi-city journey (2023–2024 estimates)",
      note: "Includes heritage haveli stays, desert camp, train transfers between Jaipur-Jodhpur-Jaisalmer.",
    },
    itinerarySample: [
      {
        day: 1,
        title: "Jaipur — The Royal Pink City",
        activities: [
          "Amer Fort morning exploration and Stepwell (Panna Meena)",
          "Hawa Mahal photo stop and City Palace tour",
          "Sunset at Nahargarh Fort overlooking the city lights",
        ],
      },
      {
        day: 2,
        title: "Jaipur to Jodhpur (The Blue City)",
        activities: [
          "Morning train or scenic drive to Jodhpur (330 km)",
          "Walk through the labyrinth blue lanes of Navchokiya",
          "Sunset overlooking Mehrangarh ramparts from Stepwell square",
        ],
      },
      {
        day: 3,
        title: "Jodhpur to Thar Desert (Jaisalmer)",
        activities: [
          "Morning tour of Mehrangarh Fort and Jaswant Thada",
          "Afternoon scenic desert drive to Jaisalmer (280 km)",
          "Evening arrival at golden sandstone ramparts",
        ],
      },
      {
        day: 4,
        title: "Sam Dunes & Desert Night Camp",
        activities: [
          "Living Fort walking tour & Patwon Ki Haveli",
          "Afternoon drive to Sam Sand Dunes for 4x4 dune bashing",
          "Traditional Kalbelia folk dance and stargazing camp dinner",
        ],
      },
    ],
  },

  meghalaya: {
    slug: "meghalaya",
    name: "Meghalaya",
    tagline: "The Abode of the Clouds",
    state: "Meghalaya",
    stateId: "ml",
    country: "India",
    region: "Northeast India",
    duration: "5 - 7 Days",
    yearVisited: "2024",
    heroImage: "/img/travel/kashmir_hero.jpg",
    gallery: [
      "/img/travel/kashmir_hero.jpg",
      "/img/travel/ladakh.jpg",
      "/img/travel/rajasthan.jpg",
    ],
    overview:
      "Perched high on dramatic emerald tablelands in Northeast India, Meghalaya is a mist-shrouded wonderland. Here, ancient Khasi tribes trained rubber tree roots to grow across rushing rivers creating living architecture that strengthens with age.",
    personalExperience:
      "Descending 3,000 stone steps into the tropical rainforest canyon to reach the Double Decker Living Root Bridge at Nongriat felt like entering another geological era. The crystal waters of the Umngot River at Dawki were so transparent that boats literally seemed to float on air.",
    bestTimeToVisit: {
      idealMonths: "October to April (Post-monsoon crystal waters & caving) | June-September (Dramatic waterfalls)",
      seasons: "Pleasant & Mist-filled (12°C - 24°C)",
      weatherTips: "Sturdy trekking shoes with good grip are essential for the rainforest root bridge steps.",
    },
    howToReach: {
      byAir: "Shillong Airport at Umroi (30 km) or Lokpriya Gopinath Bordoloi International Airport, Guwahati (120 km).",
      byRail: "Guwahati Railway Station (100 km) connects to all major cities in India, followed by a scenic mountain drive.",
      byRoad: "NH 6 connects Guwahati to Shillong via picturesque rolling green hills and Umiam Lake.",
    },
    placesToExplore: [
      {
        name: "Double Decker Living Root Bridge (Nongriat)",
        description: "Centuries-old bio-engineering marvel created by guiding Ficus elastica tree roots across mountain streams.",
        tag: "Heritage",
      },
      {
        name: "Dawki & Umngot River",
        description: "Glass-like emerald river where the boat shadows are cast clearly onto the pebbled riverbed.",
        tag: "River",
      },
      {
        name: "Nohkalikai Falls & Seven Sisters",
        description: "India's tallest plunge waterfall (1,115 feet) dropping into a dramatic turquoise pool.",
        tag: "Waterfalls",
      },
      {
        name: "Mawsmai & Arwah Caves",
        description: "Illuminated natural limestone and sandstone cave networks with prehistoric marine fossils.",
        tag: "Caves",
      },
    ],
    estimatedBudget: {
      range: "₹18,000 – ₹32,000 per person",
      basis: "Estimated basis 6-day Meghalaya circuit (2024 season estimates for 2 pax sharing)",
      note: "Includes private cab transfers across Shillong-Cherrapunji-Dawki, village homestays, entry fees.",
    },
    itinerarySample: [
      {
        day: 1,
        title: "Guwahati to Shillong via Umiam Lake",
        activities: [
          "Scenic mountain drive from Guwahati airport to Shillong",
          "Sunset stop at Umiam Lake (Barapani)",
          "Evening walk and live music in Police Bazar",
        ],
      },
      {
        day: 2,
        title: "Shillong to Cherrapunji (Sohra)",
        activities: [
          "Visit Elephant Falls and Mawkdok Dympep Valley Viewpoint",
          "Explore Mawsmai Cave and Nohkalikai Falls viewpoint",
          "Sunset over Bangladesh plains from Sohra cliffs",
        ],
      },
      {
        day: 3,
        title: "Nongriat Living Root Bridge Trek",
        activities: [
          "Morning descent from Tyrna village down 3,000 stone steps",
          "Cross single and double-decker living root bridges",
          "Swim in natural turquoise pools at Rainbow Falls",
        ],
      },
      {
        day: 4,
        title: "Dawki Crystal Waters & Mawlynnong",
        activities: [
          "Country boat safari on crystal clear Umngot River",
          "Visit Mawlynnong (Cleanest Village in Asia)",
          "Return to Shillong for evening cafe trails",
        ],
      },
    ],
  },
};

export interface TravelTimelineItem {
  year: string;
  state: string;
  region: string;
  title: string;
  summary: string;
  slug?: string;
  isInternational?: boolean;
}

export const TRAVEL_TIMELINE: TravelTimelineItem[] = [
  {
    year: "2026",
    state: "Jammu & Kashmir",
    region: "North India",
    title: "Alpine Kashmir & Pir Panjal Expeditions",
    summary: "Dal Lake houseboats, Gulmarg Gondola Apharwat, and autumn across Pahalgam valley.",
    slug: "kashmir",
  },
  {
    year: "2026",
    state: "Maharashtra",
    region: "West India",
    title: "Sahyadri Forts & Western Ghats Monsoons",
    summary: "Marine Drive heritage walks, Lonavala waterfall trails, and ancient rock-cut caves.",
  },
  {
    year: "2026",
    state: "West Bengal & Darjeeling",
    region: "East India",
    title: "Colonial Heritage & Himalayan Tea Terraces",
    summary: "Victoria Memorial, Darjeeling toy train, and sunrise over Mt. Kanchenjunga.",
  },
  {
    year: "2026",
    state: "Assam & Brahmaputra",
    region: "Northeast India",
    title: "Kaziranga Grasslands & River Safari",
    summary: "One-horned rhino sightings at dawn and Brahmaputra sunset river journeys.",
  },
  {
    year: "2026",
    state: "Sikkim",
    region: "Northeast India",
    title: "Glacial Lakes & Sacred Monasteries",
    summary: "Gurudongmar high altitude lake at 17,800 ft, Tsomgo Lake, and Rumtek monastery.",
  },
  {
    year: "2025",
    state: "Telangana",
    region: "South India",
    title: "Nizami Fortresses & Historic Granite Hills",
    summary: "Golconda Fort acoustics, Charminar bazaars, and Ramappa Kakatiya temple.",
  },
  {
    year: "2024",
    state: "Meghalaya & Northeast",
    region: "Northeast India",
    title: "Living Roots & Mountain Clouds",
    summary: "Cherrapunji living root bridges, Dawki crystal waters, and misty canyons.",
    slug: "meghalaya",
  },
  {
    year: "2023",
    state: "Rajasthan",
    region: "West India",
    title: "Deep Thar Desert & Fort Trails",
    summary: "Camping on untouched dunes of Jaisalmer, Mehrangarh ramparts, and Pushkar lake.",
    slug: "rajasthan",
  },
  {
    year: "2023",
    state: "International Exploration",
    region: "Global",
    title: "First Country Beyond Borders",
    summary: "Milestone: 1st international country explored beyond India — expanding horizons.",
    isInternational: true,
  },
  {
    year: "2022",
    state: "Ladakh",
    region: "North India",
    title: "High Altitude Passes & Pangong",
    summary: "Motorcycling over Khardung La, stargazing at Pangong Tso, and Nubra dunes.",
    slug: "ladakh",
  },
  {
    year: "2021",
    state: "Himachal Pradesh & Uttarakhand",
    region: "North India",
    title: "Himalayan Foothills & Holy Rivers",
    summary: "Rishikesh riverbanks, Parvati valley trails, and Dharamshala pine forests.",
  },
];

