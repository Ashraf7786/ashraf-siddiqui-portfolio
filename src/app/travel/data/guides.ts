export interface GuideFoodHighlight {
  dishName: string;
  description: string;
  recommendedPlace: string;
}

export interface GuideAccommodation {
  type: "Homestay" | "Boutique Heritage" | "Alpine Camp" | "Houseboat";
  name: string;
  location: string;
  priceRange: string;
  whyRecommended: string;
}

export interface GuideItineraryDay {
  dayNumber: number;
  dayTitle: string;
  fromLocation: string;
  toLocation: string;
  distanceKm: number;
  travelTimeHours: number;
  altitudeMeters?: number;
  morningActivity: string;
  afternoonActivity: string;
  eveningActivity: string;
  stayLocation: string;
  foodTip: string;
  practicalTip: string;
}

export interface TravelGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  destination: string;
  destinationSlug: string;
  state: string;
  stateId: string;
  heroImage: string;
  durationDays: number;
  durationLabel: string;
  category: "High Altitude Mountain" | "Desert Expedition" | "Offbeat Northeast" | "Road Circuit" | "Cultural Heritage";
  season: "Winter Snow" | "Spring Bloom" | "Autumn Gold" | "Summer Passes";
  difficulty: "Easy to Moderate" | "Moderate" | "Challenging";
  totalDistanceKm: number;
  idealMonths: string;
  overview: string;
  budgetEstimate: {
    currency: "INR (₹)";
    perPersonMin: number;
    perPersonMax: number;
    dateEstimated: string; // e.g. "Q1 2026"
    assumptions: string[];
    costBreakdown: {
      category: string;
      estimatedCost: string;
      details: string;
    }[];
    disclaimer: string;
  };
  transportLogistics: {
    entryPoint: string;
    exitPoint: string;
    recommendedMode: string;
    localCabsInfo: string;
    selfDriveTips: string;
  };
  packingEssentials: string[];
  permitsAndPasses: string[];
  foodAndCulinaryHighlights: GuideFoodHighlight[];
  accommodationRecommendations: GuideAccommodation[];
  dayByDayItinerary: GuideItineraryDay[];
}

export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    id: "guide-kashmir-winter",
    slug: "kashmir-winter-expedition-guide",
    title: "Kashmir Winter & Alpine Powder Guide",
    subtitle: "Complete 8-day itinerary through frozen Dal Lake, Gulmarg's Apharwat Peak, and pine-clad Pahalgam valleys.",
    destination: "Kashmir",
    destinationSlug: "kashmir",
    state: "Jammu and Kashmir",
    stateId: "jk",
    heroImage: "/img/travel/kashmir_hero.jpg",
    durationDays: 8,
    durationLabel: "8 Days / 7 Nights",
    category: "High Altitude Mountain",
    season: "Winter Snow",
    difficulty: "Moderate",
    totalDistanceKm: 340,
    idealMonths: "December to March (Snow) or April to October (Spring/Autumn)",
    overview:
      "A thoroughly field-tested winter itinerary traversing Srinagar, Gulmarg, and Pahalgam. Designed for travelers seeking raw mountain tranquility, sub-zero snowscapes, and slow authentic Kashmiri cultural interactions.",
    budgetEstimate: {
      currency: "INR (₹)",
      perPersonMin: 24000,
      perPersonMax: 42000,
      dateEstimated: "Estimated Q1 2026",
      assumptions: [
        "Based on two travelers sharing private cabs and double-occupancy stays.",
        "Includes Phase 1 & Phase 2 Gulmarg Gondola tickets booked officially online.",
        "Excludes roundtrip flight tickets into Srinagar Airport (SXR).",
        "Includes traditional Kashmiri meals, Kehwa, and Shikara rides.",
      ],
      costBreakdown: [
        { category: "Intercity 4x4 Cab with Chains", estimatedCost: "₹14,000 – ₹18,000 (total for cab)", details: "Private Scorpio / Innova with local certified winter driver" },
        { category: "Houseboats & Alpine Stays", estimatedCost: "₹2,500 – ₹5,000 / night", details: "Traditional heated houseboats and pine-paneled mountain cottages" },
        { category: "Food, Kehwa & Wazwan", estimatedCost: "₹800 – ₹1,500 / day / person", details: "Authentic dhabas, roadside harissa, and family-run wazwan" },
        { category: "Gondola, Shikara & Activity Passes", estimatedCost: "₹3,500 – ₹5,000 / person", details: "Phase 1 & 2 Gondola passes plus 2-hour sunrise Shikara" },
        { category: "Buffer / Incidental Contingency", estimatedCost: "₹3,000 / person", details: "Winter shoe/jacket rentals and sledge tips" },
      ],
      disclaimer:
        "Budget figures are realistic solo explorer estimates based on actual field experience. Seasonal surcharges apply during peak snowfall. Never present uncertain prices as guaranteed.",
    },
    transportLogistics: {
      entryPoint: "Sheikh ul-Alam International Airport (SXR), Srinagar",
      exitPoint: "Sheikh ul-Alam International Airport (SXR), Srinagar",
      recommendedMode: "Pre-arranged 4x4 vehicle with snow chains for mountain ascents (Tangmarg to Gulmarg).",
      localCabsInfo: "Local taxi union rules apply in Gulmarg and Pahalgam. Outside commercial cabs must halt at Tangmarg during heavy snow, requiring union 4x4 transfer.",
      selfDriveTips: "Self-driving is not advised during winter without extensive mountain snow chain driving experience.",
    },
    packingEssentials: [
      "Waterproof snow boots with deep rubber lug soles",
      "Thermal base layers (Merino wool recommended, 2-3 pairs)",
      "Down jacket rated to -10°C with windproof outer shell",
      "Fleece-lined ski gloves, neck gaiter, and balaclava",
      "Polarized UV sunglasses (crucial against snow blindness)",
      "High SPF sunscreen and cold-weather lip balm",
      "Portable power bank (cold drains smartphone batteries 3x faster)",
    ],
    permitsAndPasses: [
      "Valid Government Photo ID (Aadhaar / Passport) required at all checkpoints",
      "Gulmarg Gondola Phase 1 & 2 ticket (Must be booked online at least 3-4 weeks in advance)",
      "Postpaid SIM card required (Prepaid SIM cards from outside J&K do not work due to telecommunication regulations; Airtel & Jio have reliable coverage)",
    ],
    foodAndCulinaryHighlights: [
      {
        dishName: "Kashmiri Harissa",
        description: "Slow-cooked mutton mashed with aromatic spices over 12 hours into a savory breakfast paste, served piping hot with fresh girda bread.",
        recommendedPlace: "Aali Kadal, Downtown Old Srinagar",
      },
      {
        dishName: "Traditional Kehwa & Sheermal",
        description: "Green tea brewed with saffron strands, whole green cardamom, cinnamon, and slivered almonds, paired with saffron-tinted crumbly sheermal.",
        recommendedPlace: "Chai Jaai Tea Room, The Bund, Srinagar",
      },
      {
        dishName: "Tabak Maaz & Rogan Josh",
        description: "Crisp twice-cooked lamb ribs followed by melt-in-mouth mutton slow-cooked in Kashmiri chili oil and curd gravy.",
        recommendedPlace: "Mughal Darbar or Ahdoos, Residency Road",
      },
    ],
    accommodationRecommendations: [
      {
        type: "Houseboat",
        name: "Sukoon Luxury Heritage Houseboat",
        location: "Nigeen Lake, Srinagar",
        priceRange: "₹6,000 – ₹10,000 / night",
        whyRecommended: "Located on tranquil Nigeen Lake away from the Dal commercial bustle, featuring cedar woodwork and Bukhari heaters.",
      },
      {
        type: "Alpine Camp",
        name: "Heevan Retreat",
        location: "Gulmarg Alpine Plateau",
        priceRange: "₹7,500 – ₹14,000 / night",
        whyRecommended: "Walking distance from the Gondola boarding terminal with sweeping vistas of snow-blanketed deodar forests.",
      },
      {
        type: "Homestay",
        name: "Batakoot River Pine Homestay",
        location: "Pahalgam Valley Rim",
        priceRange: "₹2,800 – ₹4,500 / night",
        whyRecommended: "Authentic local family hospitality, roaring wood fires, and home-cooked haakh greens right beside the Lidder river.",
      },
    ],
    dayByDayItinerary: [
      {
        dayNumber: 1,
        dayTitle: "Arrival in Srinagar & Dal Lake Twilight",
        fromLocation: "Srinagar Airport (SXR)",
        toLocation: "Nigeen Lake Houseboat",
        distanceKm: 22,
        travelTimeHours: 1,
        altitudeMeters: 1585,
        morningActivity: "Arrive at Srinagar Airport; transfer to traditional wooden houseboat on tranquil Nigeen Lake.",
        afternoonActivity: "Acclimatize with steaming saffron Kehwa on the cedar sun-deck; stroll through the heritage Bund along the Jhelum River.",
        eveningActivity: "Sunset Shikara ride through floating gardens as twilight turns the Zabarwan mountain ridge lavender.",
        stayLocation: "Nigeen Lake Cedar Houseboat",
        foodTip: "Try warm Kashmiri Kehwa with crushed almonds and girda bread at the Boulevard.",
        practicalTip: "Get a local postpaid SIM card right outside the airport terminal if your domestic SIM is prepaid.",
      },
      {
        dayNumber: 2,
        dayTitle: "Old Srinagar Heritage & Mughal Terraces",
        fromLocation: "Nigeen Lake",
        toLocation: "Downtown Srinagar",
        distanceKm: 18,
        travelTimeHours: 1,
        altitudeMeters: 1590,
        morningActivity: "Sunrise visit to the floating vegetable market on Dal Lake; explore historic Jamia Masjid with 378 deodar wood pillars.",
        afternoonActivity: "Explore craft artisans in Downtown: hand-knotted pashmina weaving and walnut wood carving workshops.",
        eveningActivity: "Walk through Pari Mahal terraced garden overlooking the Dal valley during dusk.",
        stayLocation: "Nigeen Lake Cedar Houseboat",
        foodTip: "Lunch at Ahdoos on Residency Road: ordered traditional Gushtaba and Rogan Josh.",
        practicalTip: "Hire a licensed heritage walk guide in Downtown Srinagar for rich architectural context.",
      },
      {
        dayNumber: 3,
        dayTitle: "Ascent to the Alpine Realm of Gulmarg",
        fromLocation: "Srinagar",
        toLocation: "Gulmarg",
        distanceKm: 54,
        travelTimeHours: 2.5,
        altitudeMeters: 2650,
        morningActivity: "Early morning drive via Tangmarg. Fit snow chains on vehicle tires at Tangmarg for the mountain ascent.",
        afternoonActivity: "Check into pine cottage; walk through the frozen Gulmarg meadow to the historic 1902 St. Mary's Stone Church.",
        eveningActivity: "Watch winter skiers practice on the beginner slope slopes; gather around traditional bukhari heater with Kashmiri tea.",
        stayLocation: "Gulmarg Alpine Cottage",
        foodTip: "Try hot spicy Nadru Monji (crispy lotus stem fritters) from local street stalls in Gulmarg market.",
        practicalTip: "Keep your Gondola Phase 1 & 2 printed tickets readily accessible with your ID for the next morning.",
      },
      {
        dayNumber: 4,
        dayTitle: "14,000 ft on Apharwat Peak (Gondola Phase 1 & 2)",
        fromLocation: "Gulmarg Base",
        toLocation: "Apharwat Ridge",
        distanceKm: 10,
        travelTimeHours: 0.5,
        altitudeMeters: 4180,
        morningActivity: "Board Gondola Phase 1 to Kongdoori (10,000 ft), then Phase 2 cable car up to the shoulder of Mount Apharwat (13,780 ft).",
        afternoonActivity: "Walk along the Apharwat snow ridge with crampons. View Nanga Parbat and Pir Panjal arc across clear sky.",
        eveningActivity: "Descend back to meadow level; relax with hot soup and fireside stories at the resort lounge.",
        stayLocation: "Gulmarg Alpine Cottage",
        foodTip: "Warm up with hot mutton soup and momos at Kongdoori midway station.",
        practicalTip: "Stay hydrated. The thin air at 14,000 feet causes fast dehydration; take slow measured steps.",
      },
      {
        dayNumber: 5,
        dayTitle: "Journey to Pahalgam & The Valley of Shepherds",
        fromLocation: "Gulmarg",
        toLocation: "Pahalgam",
        distanceKm: 140,
        travelTimeHours: 4.5,
        altitudeMeters: 2130,
        morningActivity: "Descend from Gulmarg down to Tangmarg; take the scenic national highway through Pampore saffron fields.",
        afternoonActivity: "Stop at historic Awantipora ruins (9th-century Vishnu temple); proceed along the roaring turquoise Lidder river.",
        eveningActivity: "Arrive in Pahalgam; settle into riverside homestay and listen to the rushing mountain waters.",
        stayLocation: "Batakoot Riverside Homestay, Pahalgam",
        foodTip: "Buy authentic pure saffron and fresh Kashmiri walnuts directly from grower cooperatives in Pampore.",
        practicalTip: "Road between Khanabal and Pahalgam can have icy patches in winter; keep cab driver speeds moderate.",
      },
      {
        dayNumber: 6,
        dayTitle: "Aru Valley, Betaab Valley & Pine Forests",
        fromLocation: "Pahalgam",
        toLocation: "Aru Valley & Betaab",
        distanceKm: 32,
        travelTimeHours: 1.5,
        altitudeMeters: 2420,
        morningActivity: "Hire local union vehicle for excursion to Aru Valley — a peaceful village surrounded by deep pine glades.",
        afternoonActivity: "Explore Betaab Valley, named after the Bollywood film, framed by snow-crested mountain walls and frozen brooks.",
        eveningActivity: "Visit local Pahalgam market; discover handcrafted Kangris and hand-embroidered woolen shawls.",
        stayLocation: "Batakoot Riverside Homestay, Pahalgam",
        foodTip: "Enjoy hot Kashmiri Dum Aloo cooked in fennel and dry ginger powder with steaming rice.",
        practicalTip: "Horse/pony rides in Betaab have government-fixed rates; check the rate board before boarding.",
      },
      {
        dayNumber: 7,
        dayTitle: "Baisaran Meadow Trek & Return to Srinagar",
        fromLocation: "Pahalgam",
        toLocation: "Srinagar",
        distanceKm: 95,
        travelTimeHours: 3,
        altitudeMeters: 1585,
        morningActivity: "Scenic hike up through deodar trails to Baisaran, famously called 'Mini Switzerland' for its rolling green/snowy bowl.",
        afternoonActivity: "Drive back toward Srinagar; stop at Apple Valley orchards in Bijbehara for fresh winter apple juice.",
        eveningActivity: "Final evening shopping at Lal Chowk and Polo View high street; farewell dinner overlooking the illuminated river.",
        stayLocation: "Boutique Hotel, Rajbagh, Srinagar",
        foodTip: "Order authentic Kashmiri Kahwa gift boxes and Kashmiri honey to take home.",
        practicalTip: "Polo View is a pedestrian-only street with reliable fixed-price artisanal government emporiums.",
      },
      {
        dayNumber: 8,
        dayTitle: "Morning Kehwa & Airport Departure",
        fromLocation: "Srinagar",
        toLocation: "Srinagar Airport (SXR)",
        distanceKm: 14,
        travelTimeHours: 1,
        altitudeMeters: 1585,
        morningActivity: "Last sunrise stroll along Boulevard road; pack handcrafted souvenirs and pashmina shawls.",
        afternoonActivity: "Transfer to Srinagar Airport. Allow 3 hours prior to departure for multi-tier security checks.",
        eveningActivity: "Flight departure onward home with lifelong Himalayan memories.",
        stayLocation: "Homebound flight",
        foodTip: "Sip one final hot saffron tea at the airport lounge before boarding.",
        practicalTip: "Srinagar Airport has stringent 3-tier security baggage screening; arrive 3 full hours ahead.",
      },
    ],
  },
  {
    id: "guide-ladakh-circuit",
    slug: "ladakh-high-passes-circuit",
    title: "Ladakh High Passes & Cold Desert Circuit",
    subtitle: "10-day high-altitude overland expedition covering Leh, Khardung La, Nubra Valley dunes, and Pangong Tso.",
    destination: "Ladakh",
    destinationSlug: "ladakh",
    state: "Ladakh",
    stateId: "la",
    heroImage: "/img/travel/ladakh.jpg",
    durationDays: 10,
    durationLabel: "10 Days / 9 Nights",
    category: "High Altitude Mountain",
    season: "Summer Passes",
    difficulty: "Challenging",
    totalDistanceKm: 780,
    idealMonths: "June to September",
    overview:
      "A rigorous, mind-expanding expedition across the roof of India. Built with mandatory 48-hour acclimatization in Leh, high-altitude pass crossings, ancient gompas, and starlit camps beside Tibetan border lakes.",
    budgetEstimate: {
      currency: "INR (₹)",
      perPersonMin: 32000,
      perPersonMax: 54000,
      dateEstimated: "Estimated Q1 2026",
      assumptions: [
        "Based on two travelers sharing a dedicated private 4x4 vehicle (Innova/Xylo).",
        "Includes Inner Line Permits (ILP) and Environmental Protection fees.",
        "Excludes flights into Kushok Bakula Rimpochee Airport (IXL).",
        "Includes mid-range guesthouses in Leh and luxury tents in Nubra & Pangong.",
      ],
      costBreakdown: [
        { category: "Dedicated 4x4 Circuit Cab", estimatedCost: "₹24,000 – ₹32,000 (total for cab)", details: "Leh union registered 4x4 vehicle covering all passes" },
        { category: "Guesthouses & Tented Camps", estimatedCost: "₹2,500 – ₹6,000 / night", details: "Eco-stays in Leh and insulated Swiss camps in Nubra/Pangong" },
        { category: "Meals & Tibetan Food", estimatedCost: "₹700 – ₹1,200 / day / person", details: "Thukpa, tingmo, momos, and traditional ladakhi meals" },
        { category: "Inner Line Permits & Monastery Fees", estimatedCost: "₹1,200 / person", details: "Official LAHDC Ladakh autonomous permits" },
        { category: "Emergency Oxygen / Health buffer", estimatedCost: "₹2,000 / person", details: "Portable oxygen canisters and altitude medications" },
      ],
      disclaimer:
        "Estimates reflect actual overland expeditions in Ladakh. Fuel and union cab rates are revised annually by the Leh Taxi Union. Prices are estimates, not guarantees.",
    },
    transportLogistics: {
      entryPoint: "Kushok Bakula Rimpochee Airport (IXL), Leh (3,500m)",
      exitPoint: "Kushok Bakula Rimpochee Airport (IXL), Leh",
      recommendedMode: "High ground clearance 4x4 vehicle (Toyota Innova Crysta or Mahindra Scorpio).",
      localCabsInfo: "Outside self-drive rental cars and bikes are strictly prohibited for sightseeing in Nubra/Pangong by the local union. You must hire a Leh-registered taxi or motorcycle.",
      selfDriveTips: "Renting local 500cc Royal Enfield motorcycles in Leh requires an Indian Driving License and security deposit.",
    },
    packingEssentials: [
      "Diamox / Altitude medication (consult physician before traveling)",
      "Layered clothing: windcheater, down jacket, thermal innerwear",
      "Heavy UV sunglasses (Category 3 or 4) to protect against severe high-altitude glare",
      "Thermos flask for hot water on pass journeys",
      "Cash (ATMs outside Leh in Nubra/Pangong are frequently offline)",
    ],
    permitsAndPasses: [
      "Ladakh Inner Line Permit (ILP) required for Nubra Valley, Pangong Tso, and Tso Moriri",
      "Environmental and Red Cross fee receipts",
    ],
    foodAndCulinaryHighlights: [
      {
        dishName: "Ladakhi Skyu & Thukpa",
        description: "Hearty traditional stew with hand-shaped thumb dough pasta, root vegetables, and mountain herbs.",
        recommendedPlace: "The Tibetan Kitchen, Fort Road, Leh",
      },
      {
        dishName: "Butter Tea (Gur Gur Chai)",
        description: "Churned black tea with yak butter and salt, ideal for warming the body and preventing altitude headaches.",
        recommendedPlace: "Likir and Thiksey Monastery courtyards",
      },
    ],
    accommodationRecommendations: [
      {
        type: "Homestay",
        name: "Stok Heritage Apricot Homestay",
        location: "Stok Village, Leh",
        priceRange: "₹3,500 – ₹5,500 / night",
        whyRecommended: "Located beneath Stok Kangri, surrounded by apricot orchards with authentic dry-compost and modern bathrooms.",
      },
      {
        type: "Alpine Camp",
        name: "Lukung Lakeshore Camp",
        location: "Pangong Tso",
        priceRange: "₹4,500 – ₹7,500 / night",
        whyRecommended: "Witness the sunrise over Pangong's cobalt waters directly from your tent doorstep.",
      },
    ],
    dayByDayItinerary: [
      {
        dayNumber: 1,
        dayTitle: "Arrival in Leh & Compulsory Acclimatization",
        fromLocation: "Leh Airport (IXL)",
        toLocation: "Leh Town",
        distanceKm: 5,
        travelTimeHours: 0.5,
        altitudeMeters: 3500,
        morningActivity: "Touch down at Leh Airport; transfer straight to hotel. Absolute mandatory bed rest for 24 hours.",
        afternoonActivity: "Drink at least 4 liters of water and garlic soup; do not climb stairs or exert physically.",
        eveningActivity: "Gentle evening stroll on flat Leh Main Bazaar; early sleep to adapt to 3,500 meters altitude.",
        stayLocation: "Boutique Hotel, Leh",
        foodTip: "Drink garlic soup and plenty of warm water; avoid alcohol and sleeping pills on Day 1.",
        practicalTip: "Do not plan any excursions on Day 1. Acute Mountain Sickness (AMS) is real and preventable.",
      },
      {
        dayNumber: 2,
        dayTitle: "Indus Valley Monasteries: Thiksey & Shey",
        fromLocation: "Leh",
        toLocation: "Thiksey & Shey",
        distanceKm: 45,
        travelTimeHours: 1.5,
        altitudeMeters: 3550,
        morningActivity: "Witness the morning prayer ceremony and conch blowing at Thiksey Monastery (resembling Lhasa's Potala Palace).",
        afternoonActivity: "Visit Shey Palace and its 12-meter high copper-gilded Buddha statue; stop at Sindhu Ghat.",
        eveningActivity: "Sunset at Shanti Stupa overlooking the entire Leh valley and the jagged peaks of Stok Range.",
        stayLocation: "Boutique Hotel, Leh",
        foodTip: "Taste steamed vegetable tingmo with spicy chili dip at monastery cafe.",
        practicalTip: "Remove shoes and rotate prayer wheels only in clockwise direction.",
      },
      {
        dayNumber: 3,
        dayTitle: "Crossing Khardung La (17,982 ft) into Nubra Valley",
        fromLocation: "Leh",
        toLocation: "Hunder (Nubra)",
        distanceKm: 125,
        travelTimeHours: 5,
        altitudeMeters: 3048,
        morningActivity: "Ascend the winding road to legendary Khardung La Pass; brief 15-minute photo stop at the high pass.",
        afternoonActivity: "Descend into the emerald Nubra Valley; explore the 106-foot tall Maitreya Buddha statue at Diskit Monastery.",
        eveningActivity: "Sunset camel safari across the silver sand dunes of Hunder on double-humped Bactrian camels.",
        stayLocation: "Eco Tented Camp, Hunder",
        foodTip: "Fresh seabuckthorn berry juice served at Nubra roadside stalls.",
        practicalTip: "Do not spend more than 20 minutes at Khardung La top to prevent sudden oxygen drops.",
      },
      {
        dayNumber: 4,
        dayTitle: "Turtuk Village — The Last Indian Hamlet",
        fromLocation: "Hunder",
        toLocation: "Turtuk",
        distanceKm: 85,
        travelTimeHours: 3,
        altitudeMeters: 2800,
        morningActivity: "Drive along the Shyok River to Turtuk, a picturesque Balti village part of Pakistan until the 1971 war.",
        afternoonActivity: "Walk through apricot orchards and cobblestone alleys; meet Balti village elders and visit the royal heritage house.",
        eveningActivity: "Return to Hunder; stargaze under some of the darkest, clearest skies in Asia.",
        stayLocation: "Eco Tented Camp, Hunder",
        foodTip: "Taste fresh Balti apricot pancakes and walnut kernel soup in Turtuk.",
        practicalTip: "Turtuk has a distinct culture, language, and customs; always ask permission before photographing residents.",
      },
      {
        dayNumber: 5,
        dayTitle: "Shyok River Route to Pangong Tso (14,270 ft)",
        fromLocation: "Hunder",
        toLocation: "Spangmik (Pangong)",
        distanceKm: 165,
        travelTimeHours: 6,
        altitudeMeters: 4350,
        morningActivity: "Drive along the dramatic, raw gorge road following the turbulent turquoise Shyok River via Agham and Shyok.",
        afternoonActivity: "First glimpse of the unbelievable blue waters of Pangong Lake through the mountain cleft.",
        eveningActivity: "Watch the lake shift colors from turquoise to violet at sunset; bundle up for freezing night temperatures.",
        stayLocation: "Lakeshore Camp, Lukung / Spangmik",
        foodTip: "Hot dal, rice, and freshly fried pakoras served right inside the heated dining tent.",
        practicalTip: "Pangong temperatures drop below freezing even in July; wear complete winter gear before stepping outside at night.",
      },
      {
        dayNumber: 6,
        dayTitle: "Chang La Pass Crossing & Return to Leh",
        fromLocation: "Pangong Tso",
        toLocation: "Leh",
        distanceKm: 150,
        travelTimeHours: 5.5,
        altitudeMeters: 3500,
        morningActivity: "Wake up at 5:30 AM to catch the magical mirror reflection sunrise on Pangong Lake.",
        afternoonActivity: "Cross Chang La pass (17,590 ft), the third-highest motorable pass; visit Hemis Monastery — largest in Ladakh.",
        eveningActivity: "Return to Leh town; enjoy a hot shower and celebratory Ladakhi dinner.",
        stayLocation: "Boutique Hotel, Leh",
        foodTip: "Celebratory feast of mutton momos and hot soup at The Tibetan Kitchen.",
        practicalTip: "Chang La often has ice melt streams across the road after 2 PM; an early morning crossing is much smoother.",
      },
      {
        dayNumber: 7,
        dayTitle: "Magnetic Hill, Sangam & Alchi Frescoes",
        fromLocation: "Leh",
        toLocation: "Alchi & Nimmu",
        distanceKm: 70,
        travelTimeHours: 2,
        altitudeMeters: 3100,
        morningActivity: "Drive west along NH 1; test the gravity-defying optical illusion at Magnetic Hill; witness the confluence (Sangam) of Zanskar and Indus rivers.",
        afternoonActivity: "Explore Alchi Choskor (11th-century monastic complex), famous for Kashmiri-style wood carvings and wall frescoes.",
        eveningActivity: "Return to Leh; visit Gurudwara Pathar Sahib managed by the Indian Army.",
        stayLocation: "Boutique Hotel, Leh",
        foodTip: "Have hot langar prasad (dal, roti, and kheer) at Gurudwara Pathar Sahib.",
        practicalTip: "Photography inside the sanctum of Alchi Monastery is strictly prohibited to preserve thousand-year-old natural pigments.",
      },
      {
        dayNumber: 8,
        dayTitle: "Leh Palace, Tsemo & Local Artisan Walk",
        fromLocation: "Leh",
        toLocation: "Leh Palace",
        distanceKm: 10,
        travelTimeHours: 0.5,
        altitudeMeters: 3500,
        morningActivity: "Climb up to Leh Palace, a nine-story royal fortress built in 1553 offering panoramic city views.",
        afternoonActivity: "Hike up to Tsemo Fort perched on the crag above; shop for Tibetan turquoise jewelry and yak wool blankets.",
        eveningActivity: "Cafe hopping in Changspa lane; savoring locally roasted Himalayan pour-over coffee.",
        stayLocation: "Boutique Hotel, Leh",
        foodTip: "Try apricot jam with buckwheat crepes at the garden cafes of Changspa.",
        practicalTip: "Buy certified handmade Pashmina wool marked with the official government GI-tag seal.",
      },
      {
        dayNumber: 9,
        dayTitle: "Buffer Day & High-Altitude Lake Excursion",
        fromLocation: "Leh",
        toLocation: "Stok Village",
        distanceKm: 25,
        travelTimeHours: 1,
        altitudeMeters: 3600,
        morningActivity: "Relaxed morning in Stok Village; visit Stok Palace Museum housing the royal crowns and thangkas.",
        afternoonActivity: "Gentle trek through the surrounding mountain stream beds; final gear packing and photography review.",
        eveningActivity: "Rooftop farewell bonfire with traditional Ladakhi folk songs under the Himalayan stars.",
        stayLocation: "Stok Heritage Homestay",
        foodTip: "Home-cooked Ladakhi Paba (roasted barley flour) with tangdur curd.",
        practicalTip: "Always retain a buffer day in Ladakh in case of high-altitude pass road closures due to landslides or weather.",
      },
      {
        dayNumber: 10,
        dayTitle: "Morning Departure from Kushok Bakula Airport",
        fromLocation: "Leh",
        toLocation: "Leh Airport (IXL)",
        distanceKm: 5,
        travelTimeHours: 0.5,
        altitudeMeters: 3500,
        morningActivity: "Early morning transfer to Kushok Bakula Airport. Request a window seat on the left side of the aircraft.",
        afternoonActivity: "Breathtaking aerial views of the snow-clad Karakoram, Nun Kun peaks, and Pir Panjal range on flight back.",
        eveningActivity: "Touchdown in Delhi/home with memories of the Land of High Passes.",
        stayLocation: "Homebound flight",
        foodTip: "Grab butter cookies and dry fruits at Leh Airport departure lounge.",
        practicalTip: "Left-side window seat on Leh to Delhi flight gives unmatched views of the Himalayan mountain crests.",
      },
    ],
  },
  {
    id: "guide-rajasthan-trail",
    slug: "rajasthan-royal-desert-trail",
    title: "Rajasthan Fortresses & Thar Sand Dunes",
    subtitle: "8-day cultural and desert road journey across the Golden City of Jaisalmer, Blue City of Jodhpur, and Lake City of Udaipur.",
    destination: "Rajasthan",
    destinationSlug: "rajasthan",
    state: "Rajasthan",
    stateId: "rj",
    heroImage: "/img/travel/rajasthan.jpg",
    durationDays: 8,
    durationLabel: "8 Days / 7 Nights",
    category: "Desert Expedition",
    season: "Winter Snow",
    difficulty: "Easy to Moderate",
    totalDistanceKm: 650,
    idealMonths: "October to March",
    overview:
      "A grand royal overland odyssey across the heart of Rajasthan. From the living sandstone citadel of Jaisalmer and Thar camel caravans to the soaring cliffs of Mehrangarh and the romantic water palaces of Udaipur.",
    budgetEstimate: {
      currency: "INR (₹)",
      perPersonMin: 18000,
      perPersonMax: 35000,
      dateEstimated: "Estimated Q1 2026",
      assumptions: [
        "Based on two travelers traveling together with intercity train/cab transfers.",
        "Includes heritage haveli stays and one desert camp overnight at Sam dunes.",
        "Includes monument entry fees and camel safari.",
      ],
      costBreakdown: [
        { category: "Intercity Cab / Train", estimatedCost: "₹8,000 – ₹12,000", details: "AC train journeys or intercity private cab" },
        { category: "Heritage Haveli Stays", estimatedCost: "₹2,200 – ₹4,500 / night", details: "Restored 18th-century Rajput havelis with courtyards" },
        { category: "Traditional Rajasthani Meals", estimatedCost: "₹600 – ₹1,200 / day / person", details: "Dal Baati Churma, Ker Sangri, and Laal Maas" },
        { category: "Fort Tickets & Camel Safari", estimatedCost: "₹2,500 / person", details: "Audio guides, fort entry tickets, and sunset camel trek" },
        { category: "Handicrafts & Buffer", estimatedCost: "₹3,000 / person", details: "Blue pottery, block prints, and local gratuities" },
      ],
      disclaimer:
        "Estimates reflect actual independent travel in Rajasthan during peak winter season (Nov-Feb). Summer rates may be lower.",
    },
    transportLogistics: {
      entryPoint: "Jodhpur Airport (JDH) or Jaisalmer Railway Station (JSM)",
      exitPoint: "Maharana Pratap Airport (UDR), Udaipur",
      recommendedMode: "Comfortable AC sedan or heritage train link (e.g. Jodhpur-Jaisalmer Express).",
      localCabsInfo: "Auto-rickshaws are the most practical way to navigate the narrow alleys of Jodhpur's blue city and Jaisalmer Fort.",
      selfDriveTips: "The desert expressway (NH 11 and NH 125) has pristine tarmac and minimal traffic.",
    },
    packingEssentials: [
      "Breathable cotton shirts for daytime; warm jacket for freezing desert nights",
      "Wide-brimmed sun hat, sunglasses, and high-SPF sunscreen",
      "Comfortable slip-on walking shoes for cobbled fort ramps and temples",
      "Cotton scarf / safa to protect face against windblown desert sand",
    ],
    permitsAndPasses: [
      "Government Photo ID required at heritage monuments and desert camps",
      "Composite Monument Tickets in Jaipur/Jodhpur can be booked online to skip ticket queues",
    ],
    foodAndCulinaryHighlights: [
      {
        dishName: "Dal Baati Churma & Gatte ki Sabzi",
        description: "Hard wheat balls baked over cow-dung embers, crushed in pure desi ghee, served with five-lentil dal and sweet powdered churma.",
        recommendedPlace: "Krishna Dal Bati Restro, Jodhpur",
      },
      {
        dishName: "Fiery Laal Maas",
        description: "Tender goat mutton cooked with Mathania red chilies, garlic, and yogurt in slow copper pots.",
        recommendedPlace: "Handi Restaurant / Darikhana",
      },
      {
        dishName: "Pyaaz Kachori & Mirchi Vada",
        description: "Spicy onion and potato-filled crispy pastries served with sweet tamarind and pungent green chili chutneys.",
        recommendedPlace: "Janta Sweet Home, Nai Sarak, Jodhpur",
      },
    ],
    accommodationRecommendations: [
      {
        type: "Boutique Heritage",
        name: "Killa Bhawan Heritage Haveli",
        location: "Inside Jaisalmer Golden Fort",
        priceRange: "₹4,500 – ₹8,000 / night",
        whyRecommended: "Built directly into the 12th-century fort ramparts with sunset views over the golden city.",
      },
      {
        type: "Alpine Camp",
        name: "Desert Luxury Glamping Camp",
        location: "Sam Sand Dunes, Jaisalmer",
        priceRange: "₹4,000 – ₹7,500 / night",
        whyRecommended: "Deep in the sand ridges with live Manganiyar musical performances around an open desert bonfire.",
      },
    ],
    dayByDayItinerary: [
      {
        dayNumber: 1,
        dayTitle: "Arrival in Jodhpur & The Blue City Labyrinth",
        fromLocation: "Jodhpur",
        toLocation: "Clock Tower & Brahmpuri",
        distanceKm: 15,
        travelTimeHours: 1,
        altitudeMeters: 231,
        morningActivity: "Arrive in Jodhpur; check into a restored heritage haveli near the historic Clock Tower (Ghanta Ghar).",
        afternoonActivity: "Explore the bustling Sardar Market; sample world-famous makhaniya lassi at Shri Mishrilal Hotel.",
        eveningActivity: "Guided photography walk through Brahmpuri — the indigo-painted blue quarter beneath Mehrangarh cliffs.",
        stayLocation: "Heritage Haveli, Jodhpur",
        foodTip: "Grab hot pyaaz kachori and makhaniya lassi from Ghanta Ghar market.",
        practicalTip: "Wear comfortable walking shoes with good grip; the cobbled alleys of the blue city are steep and polished.",
      },
      {
        dayNumber: 2,
        dayTitle: "Mehrangarh Fort & Jaswant Thada Cenotaphs",
        fromLocation: "Jodhpur",
        toLocation: "Mehrangarh",
        distanceKm: 8,
        travelTimeHours: 0.5,
        altitudeMeters: 350,
        morningActivity: "Early entry to Mehrangarh Fort (400 feet above the city). Tour the Sheesh Mahal, Phool Mahal, and royal palanquins.",
        afternoonActivity: "Zipline with Flying Fox over the desert moats and battlements; visit the milky-white marble Jaswant Thada cenotaphs.",
        eveningActivity: "Rooftop dinner overlooking the illuminated golden walls of Mehrangarh Fort.",
        stayLocation: "Heritage Haveli, Jodhpur",
        foodTip: "Try authentic Laal Maas slow-cooked with Mathania red chilies for dinner.",
        practicalTip: "Get the audio guide at Mehrangarh; it is recognized as one of the best audio tours in the world.",
      },
      {
        dayNumber: 3,
        dayTitle: "Desert Highway to the Golden City of Jaisalmer",
        fromLocation: "Jodhpur",
        toLocation: "Jaisalmer",
        distanceKm: 285,
        travelTimeHours: 4.5,
        altitudeMeters: 225,
        morningActivity: "Embark on the scenic desert highway drive through Pokhran and scrubland toward the Golden City of Jaisalmer.",
        afternoonActivity: "Catch the first glimpse of Sonar Qila rising like a sandcastle from the Thar horizon; check into a fort haveli.",
        eveningActivity: "Sunset boat ride on Gadisar Lake surrounded by ornate yellow sandstone shrines and ghats.",
        stayLocation: "Fort Heritage Haveli, Jaisalmer",
        foodTip: "Sample Ker Sangri (desert bean and berry stir-fry) with hot bajra rotis and white butter.",
        practicalTip: "Stop at Pokhran highway dhabas for fresh buffalo milk tea and hot dal kachori.",
      },
      {
        dayNumber: 4,
        dayTitle: "Sonar Qila Living Fort & Ancient Havelis",
        fromLocation: "Jaisalmer Fort",
        toLocation: "Patwon ki Haveli",
        distanceKm: 6,
        travelTimeHours: 0.5,
        altitudeMeters: 230,
        morningActivity: "Explore the living corridors of Sonar Qila (Jaisalmer Fort), visiting seven intricately carved 12th-century Jain temples.",
        afternoonActivity: "Marvel at the stone filigree lattices of Patwon ki Haveli, Salim Singh ki Haveli, and Nathmal ki Haveli.",
        eveningActivity: "Sunset tea on the fort bastions watching the sun dip into the desert plains.",
        stayLocation: "Fort Heritage Haveli, Jaisalmer",
        foodTip: "Try sweet Ghotua Laddoos made with pure desi ghee at local heritage halwai shops.",
        practicalTip: "Support local fort artisans by buying camel leather journals and embroidered fabrics directly from craftsmen.",
      },
      {
        dayNumber: 5,
        dayTitle: "Kuldhara Ghost Village & Thar Sand Dunes Camp",
        fromLocation: "Jaisalmer",
        toLocation: "Sam Sand Dunes",
        distanceKm: 45,
        travelTimeHours: 1,
        altitudeMeters: 210,
        morningActivity: "Visit the abandoned 13th-century ghost village of Kuldhara, cursed and deserted overnight by Paliwal Brahmins.",
        afternoonActivity: "Drive into the deep sand ridges of Sam Sand Dunes; board camels for an overland ride into the undisturbed dunes.",
        eveningActivity: "Sunset over golden sand dunes; campfire dinner with hypnotic Manganiyar folk singing and Kalbelia fire dances.",
        stayLocation: "Luxury Desert Camp, Sam Dunes",
        foodTip: "Enjoy campfire-baked Baatis with five-dal tadka and hot jalebis under the desert night sky.",
        practicalTip: "Desert temperatures drop rapidly after dark; pack a fleece or light wool jacket even in early autumn/spring.",
      },
      {
        dayNumber: 6,
        dayTitle: "Overland to Udaipur via Ranakpur Jain Temple",
        fromLocation: "Jaisalmer",
        toLocation: "Udaipur",
        distanceKm: 310,
        travelTimeHours: 6,
        altitudeMeters: 598,
        morningActivity: "Early morning desert departure toward Udaipur, the City of Lakes, climbing into the Aravali mountain range.",
        afternoonActivity: "Visit the world-renowned Ranakpur Jain Temple complex, featuring 1,444 uniquely carved white marble pillars.",
        eveningActivity: "Arrive in Udaipur; take an evening boat ride on Lake Pichola with views of the illuminated Lake Palace.",
        stayLocation: "Lakeside Heritage Haveli, Udaipur",
        foodTip: "Lunch at Ranakpur temple bhojanalaya: wholesome traditional vegetarian satvik meal.",
        practicalTip: "Dress respectfully for Ranakpur Jain Temple: shoulders and knees must be fully covered.",
      },
      {
        dayNumber: 7,
        dayTitle: "City Palace, Jagdish Temple & Saheliyon ki Bari",
        fromLocation: "Udaipur",
        toLocation: "Lake Pichola",
        distanceKm: 12,
        travelTimeHours: 0.5,
        altitudeMeters: 600,
        morningActivity: "Tour the sprawling Udaipur City Palace on the banks of Lake Pichola — Rajasthan’s largest royal palace complex.",
        afternoonActivity: "Visit 1651 Jagdish Temple; wander through the ornate fountains and marble elephant courtyards of Saheliyon ki Bari.",
        eveningActivity: "Watch Dharohar cultural folk dance show at Bagore ki Haveli right on the water edge of Gangaur Ghat.",
        stayLocation: "Lakeside Heritage Haveli, Udaipur",
        foodTip: "Dine on the rooftop overlooking Lake Pichola and the illuminated Jag Mandir island.",
        practicalTip: "Book tickets for the Dharohar Folk Show at Bagore ki Haveli in the afternoon; seats sell out by 5 PM.",
      },
      {
        dayNumber: 8,
        dayTitle: "Monsoon Palace & Departure",
        fromLocation: "Udaipur",
        toLocation: "Udaipur Airport (UDR)",
        distanceKm: 25,
        travelTimeHours: 1,
        altitudeMeters: 598,
        morningActivity: "Drive up to Sajjangarh (Monsoon Palace) perched 3,100 feet on the Aravali hilltop overlooking all five lakes.",
        afternoonActivity: "Final souvenir shopping for miniature paintings and silver jewelry at Hathipole market.",
        eveningActivity: "Transfer to Maharana Pratap Airport (UDR) for flight departure onward.",
        stayLocation: "Homebound flight",
        foodTip: "Sip spiced saffron buttermilk (chaas) at the market before departing.",
        practicalTip: "Udaipur Airport is 24 km from the city center; allow at least 45 minutes for the drive.",
      },
    ],
  },
];

