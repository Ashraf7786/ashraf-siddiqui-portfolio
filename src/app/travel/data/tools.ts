export interface AltitudeDestination {
  id: string;
  name: string;
  region: string;
  state: string;
  altitudeFt: number;
  altitudeM: number;
  effectiveOxygenPct: number; // vs Sea Level (100%)
  riskLevel: "Low" | "Moderate" | "High" | "Extreme";
  nightHaltRecommended: boolean;
  minAcclimatizationHours: number;
  symptomsToWatch: string[];
  keyAdvice: string;
  emergencyProtocol: string;
}

export const ALTITUDE_DATABASE: AltitudeDestination[] = [
  {
    id: "khardung-la",
    name: "Khardung La Pass",
    region: "Ladakh",
    state: "Ladakh",
    altitudeFt: 17582,
    altitudeM: 5359,
    effectiveOxygenPct: 52,
    riskLevel: "Extreme",
    nightHaltRecommended: false, // Never sleep here
    minAcclimatizationHours: 72,
    symptomsToWatch: [
      "Severe throbbing headache",
      "Shortness of breath at rest",
      "Dizziness & disorientation",
      "Nausea / loss of appetite",
    ],
    keyAdvice:
      "Do not spend more than 20–25 minutes at the pass. Keep vehicle engine running if cold. Never attempt before at least 2 full days acclimatizing in Leh (11,500 ft).",
    emergencyProtocol:
      "Immediate descent towards South Pullu or Leh valley. Administer supplementary oxygen if SpO2 drops below 70%.",
  },
  {
    id: "chang-la",
    name: "Chang La Pass",
    region: "Ladakh",
    state: "Ladakh",
    altitudeFt: 17688,
    altitudeM: 5360,
    effectiveOxygenPct: 51,
    riskLevel: "Extreme",
    nightHaltRecommended: false,
    minAcclimatizationHours: 72,
    symptomsToWatch: [
      "Extreme fatigue",
      "Cold-induced numbness",
      "Rapid heart rate",
      "Chest tightness",
    ],
    keyAdvice:
      "Gateway to Pangong Lake. The army post at top provides emergency oxygen. Dress in windproof thermal outer shell; winds here drop wind-chill to -20°C in winter.",
    emergencyProtocol:
      "Descend towards Tangtse (12,800 ft) immediately. Do not push through symptoms.",
  },
  {
    id: "pangong-tso",
    name: "Pangong Tso (Spangmik / Merak)",
    region: "Ladakh",
    state: "Ladakh",
    altitudeFt: 14270,
    altitudeM: 4350,
    effectiveOxygenPct: 60,
    riskLevel: "High",
    nightHaltRecommended: true,
    minAcclimatizationHours: 48,
    symptomsToWatch: [
      "Insomnia & Cheyne-Stokes breathing at night",
      "Morning headache",
      "Dehydration from dry mountain air",
    ],
    keyAdvice:
      "Night temperatures plummet drastically. Avoid alcohol or heavy sedative medication. Drink at least 4L of warm water with electrolytes throughout the day.",
    emergencyProtocol:
      "If nocturnal breathlessness worsens, arrange portable oxygen and evacuate towards Tangtse medical center.",
  },
  {
    id: "chicham-bridge",
    name: "Chicham Bridge & Kibber",
    region: "Spiti Valley",
    state: "Himachal Pradesh",
    altitudeFt: 13596,
    altitudeM: 4144,
    effectiveOxygenPct: 62,
    riskLevel: "High",
    nightHaltRecommended: true,
    minAcclimatizationHours: 48,
    symptomsToWatch: [
      "Lightheadedness while walking inclines",
      "Dry hacking cough",
      "Cold-induced breathlessness",
    ],
    keyAdvice:
      "Asia's highest suspension bridge. Walk slow; climbing the 50 steps near Kibber homestays feels like running 400m at sea level. Keep buff over nose/mouth.",
    emergencyProtocol:
      "Descend to Kaza (12,500 ft) where the Community Health Center has oxygen cylinders.",
  },
  {
    id: "kaza-spiti",
    name: "Kaza & Key Monastery",
    region: "Spiti Valley",
    state: "Himachal Pradesh",
    altitudeFt: 12500,
    altitudeM: 3800,
    effectiveOxygenPct: 64,
    riskLevel: "Moderate",
    nightHaltRecommended: true,
    minAcclimatizationHours: 36,
    symptomsToWatch: [
      "Mild frontal headache",
      "Dry lips and nosebleeds",
      "Disturbed light sleep",
    ],
    keyAdvice:
      "If traveling via Shimla-Kinnaur route, acclimatization is gradual and natural. If coming via Manali-Atal Tunnel, take a mandatory rest day in Kaza before exploring.",
    emergencyProtocol:
      "Kaza CHC hospital is staffed with high-altitude medical officers and oxygen beds.",
  },
  {
    id: "leh-town",
    name: "Leh Town & Shanti Stupa",
    region: "Ladakh",
    state: "Ladakh",
    altitudeFt: 11562,
    altitudeM: 3524,
    effectiveOxygenPct: 67,
    riskLevel: "Moderate",
    nightHaltRecommended: true,
    minAcclimatizationHours: 48,
    symptomsToWatch: [
      "Jet-lag combined with altitude fatigue",
      "Mild headache on Day 1",
      "Shortness of breath when climbing stairs",
    ],
    keyAdvice:
      "Mandatory 48-hour complete rest if arriving by flight from Delhi (sea level to 11,500 ft in 75 mins). Do not visit Shanti Stupa stairs on Day 1.",
    emergencyProtocol:
      "SNM Hospital in Leh has the premier high-altitude hyperbaric and AMS medical ward in Northern India.",
  },
  {
    id: "gulmarg-apharwat",
    name: "Gulmarg Apharwat Peak (Phase 2)",
    region: "Kashmir",
    state: "Jammu and Kashmir",
    altitudeFt: 13780,
    altitudeM: 4200,
    effectiveOxygenPct: 62,
    riskLevel: "High",
    nightHaltRecommended: false,
    minAcclimatizationHours: 24,
    symptomsToWatch: [
      "Dizziness after Gondola exit",
      "Shivering in sub-zero winds",
      "Rapid breathlessness",
    ],
    keyAdvice:
      "The cable car takes you from 8,825 ft to 13,780 ft in 12 minutes. Stay hydrated and limit physical running in snow. Spend maximum 1 hour at Phase 2.",
    emergencyProtocol:
      "Board the gondola cabin down to Phase 1 (Kongdoori, 10,000 ft) immediately if feeling faint.",
  },
  {
    id: "sela-pass",
    name: "Sela Pass",
    region: "Tawang Circuit",
    state: "Arunachal Pradesh",
    altitudeFt: 13700,
    altitudeM: 4170,
    effectiveOxygenPct: 62,
    riskLevel: "High",
    nightHaltRecommended: false,
    minAcclimatizationHours: 36,
    symptomsToWatch: [
      "Sudden fog disorientation",
      "Cold headache",
      "Motion sickness combined with altitude",
    ],
    keyAdvice:
      "The pass stays frozen 6 months of the year. Stop only for 15 minutes near Sela Lake. Drive carefully as black ice is frequent.",
    emergencyProtocol:
      "Descend towards Jaswant Garh or Dirang valley (5,200 ft).",
  },
];

export interface ChecklistItem {
  id: string;
  name: string;
  category: "Layering & Clothing" | "Footwear & Protection" | "Electronics & Power" | "Medical & High-Altitude" | "Permits, Docs & Cash";
  essential: boolean;
  note: string;
}

export interface TerrainPackingPreset {
  id: string;
  name: string;
  subtitle: string;
  tempRange: string;
  items: ChecklistItem[];
}

export const PACKING_PRESETS: TerrainPackingPreset[] = [
  {
    id: "himalayan-winter",
    name: "Himalayan High Altitude & Winter",
    subtitle: "Spiti, Ladakh, Gulmarg, Zanskar (-10°C to -25°C)",
    tempRange: "-25°C to 5°C",
    items: [
      { id: "hw-1", name: "Merino Wool Thermal Inners (2 Pairs)", category: "Layering & Clothing", essential: true, note: "Top + Bottom heavy GSM thermal base" },
      { id: "hw-2", name: "Fleece Mid-Layer Jacket (250+ GSM)", category: "Layering & Clothing", essential: true, note: "Traps body heat between shell and thermals" },
      { id: "hw-3", name: "Down Feather Jacket (-20°C Rated with Hood)", category: "Layering & Clothing", essential: true, note: "700+ fill power windproof outer parka" },
      { id: "hw-4", name: "Wind & Waterproof Softshell Trekking Pants", category: "Layering & Clothing", essential: true, note: "Fleece-lined interior with snow gaiter hem" },
      { id: "hw-5", name: "Balaclava & Polar Fleece Neck Buff", category: "Layering & Clothing", essential: true, note: "Protects face from dry freezing mountain wind" },
      { id: "hw-6", name: "Waterproof Ankle-Support Hiking Boots", category: "Footwear & Protection", essential: true, note: "Gore-Tex or treated leather with vibram grip" },
      { id: "hw-7", name: "Woolen Heavy Trekking Socks (4 Pairs)", category: "Footwear & Protection", essential: true, note: "Merino wool prevents frostbite & blister chafing" },
      { id: "hw-8", name: "Micro-Spikes / Crampons for Snow & Ice", category: "Footwear & Protection", essential: false, note: "Crucial for walking on black ice in Spiti & Ladakh" },
      { id: "hw-9", name: "UV400 Polarized Sunglasses (Category 3/4)", category: "Footwear & Protection", essential: true, note: "Prevents snow blindness from 90% snow reflectivity" },
      { id: "hw-10", name: "Cold-Resistant Power Bank (20,000 mAh)", category: "Electronics & Power", essential: true, note: "Store inside inner jacket; freezing temps drain batteries in 30 mins" },
      { id: "hw-11", name: "Camera Spare Batteries (At least 3 extra)", category: "Electronics & Power", essential: true, note: "Keep in warm pocket next to body heat" },
      { id: "hw-12", name: "Headlamp with Red Light & Extra AAA Cells", category: "Electronics & Power", essential: true, note: "For village blackouts and night walks" },
      { id: "hw-13", name: "Diamox (Acetazolamide 250mg) *Doctor Prescribed*", category: "Medical & High-Altitude", essential: true, note: "Preventive AMS medicine. Consult physician before use" },
      { id: "hw-14", name: "Portable Finger Pulse Oximeter", category: "Medical & High-Altitude", essential: true, note: "Check SpO2 and pulse twice daily (Morning & Evening)" },
      { id: "hw-15", name: "Oral Rehydration Salts (ORS / Electral 10pkts)", category: "Medical & High-Altitude", essential: true, note: "Counteracts rapid dehydration from dry thin air" },
      { id: "hw-16", name: "Broad Spectrum Sunscreen (SPF 50+ PA++++)", category: "Medical & High-Altitude", essential: true, note: "UV intensity rises 10% per 1,000 ft elevation" },
      { id: "hw-17", name: "Petroleum Jelly / Heavy Cold Cream", category: "Medical & High-Altitude", essential: true, note: "Prevents nostril cracking and lip windburn" },
      { id: "hw-18", name: "Inner Line Permit (ILP) Printouts (5 Copies)", category: "Permits, Docs & Cash", essential: true, note: "Required for Nubra, Pangong, Hanle, Chushul checkposts" },
      { id: "hw-19", name: "Physical Government ID (Original Aadhar/Passport)", category: "Permits, Docs & Cash", essential: true, note: "Digilocker is NOT accepted at high-altitude army gates" },
      { id: "hw-20", name: "Emergency Cash (₹10,000–₹15,000 in ₹500 notes)", category: "Permits, Docs & Cash", essential: true, note: "ATMs in Kaza and Tangtse frequently run out of cash" },
    ],
  },
  {
    id: "indian-railways-backpacking",
    name: "Indian Railways & Solo Backpacking",
    subtitle: "24 States Interstate Travel (Sleeper / 3AC / Road)",
    tempRange: "15°C to 35°C",
    items: [
      { id: "ir-1", name: "Lightweight Quick-Dry Cotton/Linen Shirts", category: "Layering & Clothing", essential: true, note: "Breathable for long train routes across Central & West India" },
      { id: "ir-2", name: "Travel Cargo Pants with Zipper Pockets", category: "Layering & Clothing", essential: true, note: "Keep wallet & phone secure while sleeping on berths" },
      { id: "ir-3", name: "Compact Microfiber Quick-Dry Towel", category: "Layering & Clothing", essential: true, note: "Dries in 30 minutes; takes minimal backpack volume" },
      { id: "ir-4", name: "Breathable Walking Shoes / Cross-Trainers", category: "Footwear & Protection", essential: true, note: "Comfortable for 15,000+ daily steps exploring old cities" },
      { id: "ir-5", name: "Slip-On Camp Sandals / Chappals", category: "Footwear & Protection", essential: true, note: "Essential for overnight train lavatory visits and hostel showers" },
      { id: "ir-6", name: "Steel Wire Luggage Chain & Number Padlock", category: "Footwear & Protection", essential: true, note: "Chain your rucksack to the lower berth hook on Indian Railways" },
      { id: "ir-7", name: "Multi-Plug Extension Board (3-Pin)", category: "Electronics & Power", essential: true, note: "Train berth charging sockets are often loose or occupied" },
      { id: "ir-8", name: "Power Bank with Fast Charging (10,000+ mAh)", category: "Electronics & Power", essential: true, note: "Crucial when sleeper coach sockets do not supply current" },
      { id: "ir-9", name: "Noise-Cancelling Earbuds / Silicone Earplugs", category: "Electronics & Power", essential: true, note: "Blocks loud chai wallahs, station announcements and snoring" },
      { id: "ir-10", name: "Hand Sanitizer & Pocket Wet Wipes", category: "Medical & High-Altitude", essential: true, note: "Sanitizing hands before eating train pantry meals" },
      { id: "ir-11", name: "Basic First-Aid (Paracetamol, Vomistop, Band-Aids)", category: "Medical & High-Altitude", essential: true, note: "Immediate remedy for motion sickness and unexpected food bugs" },
      { id: "ir-12", name: "Insulated Stainless Steel Water Bottle (1L)", category: "Medical & High-Altitude", essential: true, note: "Refill from railway RO water kiosks at stations" },
      { id: "ir-13", name: "Confirmed Train Tickets / PNR Saved Offline", category: "Permits, Docs & Cash", essential: true, note: "Mobile network drops between state junctions" },
      { id: "ir-14", name: "Passport Photos (4 Copies) + ID Photocopies", category: "Permits, Docs & Cash", essential: true, note: "Required for registering at offbeat state guest houses" },
      { id: "ir-15", name: "Cash in Mixed Small Denominations (₹50, ₹100)", category: "Permits, Docs & Cash", essential: true, note: "Local auto-rickshaws, chai vendors and village sumos" },
    ],
  },
  {
    id: "thar-desert-heritage",
    name: "Thar Desert & Heritage Circuits",
    subtitle: "Rajasthan, Gujarat, Kutch & Malwa Plateaus",
    tempRange: "5°C (Night) to 35°C (Day)",
    items: [
      { id: "td-1", name: "Loose Breathable Cotton Kurta / Shirts", category: "Layering & Clothing", essential: true, note: "Blocks intense daytime desert sun without trapping sweat" },
      { id: "td-2", name: "Fleece or Light Woolen Jacket for Nights", category: "Layering & Clothing", essential: true, note: "Desert temperatures drop close to 4°C after midnight" },
      { id: "td-3", name: "Cotton Rajasthani Gamcha / Shemagh Scarf", category: "Layering & Clothing", essential: true, note: "Shields face and hair from stinging sandstorm gusts" },
      { id: "td-4", name: "Closed-Toe Desert Shoes with Sand Gaiters", category: "Footwear & Protection", essential: true, note: "Prevents burning sand from entering socks during dune walks" },
      { id: "td-5", name: "UV Polarized Sunglasses with Side Shields", category: "Footwear & Protection", essential: true, note: "Golden sand glares fiercely under midday Rajasthani sun" },
      { id: "td-6", name: "Camera Lens Dust Blower & Rain/Dust Sleeves", category: "Electronics & Power", essential: true, note: "Fine Thar desert sand easily ruins camera focus rings" },
      { id: "td-7", name: "Car Charger Adapter for Long Road Trips", category: "Electronics & Power", essential: true, note: "For 400km highway stretches across Barmer & Jaisalmer" },
      { id: "td-8", name: "Aloe Vera Gel & Intensive Lip Balm", category: "Medical & High-Altitude", essential: true, note: "Soothes desert sunburn and dry chapped skin" },
      { id: "td-9", name: "Electrolyte Drink Mix (ORS)", category: "Medical & High-Altitude", essential: true, note: "Replaces salts lost in 35°C midday sun" },
      { id: "td-10", name: "State Highway Toll Fastag & Vehicle RC", category: "Permits, Docs & Cash", essential: true, note: "For road-tripping across Rajasthan State Mega-Highways" },
      { id: "td-11", name: "Cash Reserve for Desert Camel Caravans", category: "Permits, Docs & Cash", essential: true, note: "Zero digital UPI network in remote Sam sand dunes" },
    ],
  },
];

export interface CostEstimatorRates {
  transportDaily: Record<string, number>;
  stayDaily: Record<string, number>;
  foodDaily: Record<string, number>;
  activityMiscDaily: number;
}

export const ESTIMATOR_RATES: CostEstimatorRates = {
  transportDaily: {
    "Sleeper Class Trains & State Buses": 450,
    "3AC Indian Railways Express": 950,
    "Shared 4x4 Mountain Sumo / Maxx": 1200,
    "Self-Drive Bike (Himalayan / Classic 350)": 1800,
    "Private Taxi / Vehicle Hire": 3500,
  },
  stayDaily: {
    "Local Village Homestay (With Dinner)": 900,
    "Backpacker Hostel Dorm (Hosteller/Zostel)": 650,
    "Budget Heritage Guesthouse": 1200,
    "Riverside / Alpine Campsite": 1400,
    "Comfort 3-Star Hotel": 2600,
  },
  foodDaily: {
    "Local Dhaba, Chai Stalls & Street Food": 350,
    "Balanced Cafés & Homestay Thalis": 650,
    "Restaurant Dining & Regional Specialties": 1100,
  },
  activityMiscDaily: 250, // Entry tickets, monument passes, guide tips, chai buffer
};

