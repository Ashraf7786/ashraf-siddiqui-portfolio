export interface StorySection {
  id: string;
  heading: string;
  subheading?: string;
  content: string[];
  quote?: string;
  image?: {
    src: string;
    caption: string;
    alt: string;
  };
  fieldNote?: {
    title: string;
    text: string;
  };
}

export interface TravelStory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Mountain Stories" | "Road Adventures" | "Hidden India" | "Rail Diaries" | "Northeast Trails";
  destination: string;
  destinationSlug: string;
  state: string;
  year: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  coverImage: string;
  tagColor: string;
  tags: string[];
  excerpt: string;
  sections: StorySection[];
  relatedGuideSlug?: string;
  relatedStoriesSlugs?: string[];
}

export const TRAVEL_STORIES: TravelStory[] = [
  {
    id: "story-1",
    slug: "kashmir-heaven-on-earth",
    title: "Kashmir — Where the Mountains Breathe and Time Stands Still",
    subtitle: "From solitary shikara drifts on frozen Dal Lake to high-altitude powder runs at Apharwat Peak.",
    category: "Mountain Stories",
    destination: "Kashmir",
    destinationSlug: "kashmir",
    state: "Jammu and Kashmir",
    year: "2026",
    publishedAt: "February 2026",
    readTime: "8 min read",
    author: {
      name: "Ashraf Siddiqui",
      role: "Solo Explorer & Storyteller",
      avatar: "/img/travel/kashmir_hero.jpg",
      bio: "24 states explored across India. Documenting raw mountain passes, ancient trails, and local lives.",
    },
    coverImage: "/img/travel/kashmir_hero.jpg",
    tagColor: "#38bdf8",
    tags: ["Mountains", "Lakes", "Winter Expedition", "Himalayas"],
    excerpt: "From shikara rides on Dal Lake to Gulmarg's snow-blanketed meadows, Kashmir rewired my soul. Every sunrise painted the Himalayas gold.",
    relatedGuideSlug: "kashmir",
    relatedStoriesSlugs: ["ladakh-land-of-high-passes", "meghalaya-abode-of-clouds"],
    sections: [
      {
        id: "first-light",
        heading: "1. The Cold Whispers of Dal Lake at First Light",
        content: [
          "Srinagar in late winter is quiet in a way that modern cities have forgotten. When the alarm went off at 5:00 AM, the temperature gauge read minus four degrees Celsius. Outside the wooden lattice window of my houseboat, the surface of Dal Lake was motionless, cloaked under a thick mantle of pre-dawn vapour.",
          "Our shikara paddled out silently. The wooden oar carved through the water with rhythmic, gentle strokes. As the first sunbeams struck the crests of the Zabarwan range, the grey sky turned lavender, then warm peach, and finally blazing gold. The floating vegetable market began to come alive — men wrapped tightly in tweed pherans bargaining for fresh lotus stems (nadru) and crisp Kashmiri turnips from wooden boats."
        ],
        quote: "You do not visit Kashmir to escape reality; you visit Kashmir to discover what reality feels like when stripped of artificial urgency.",
        fieldNote: {
          title: "Field Note: Early Morning Shikara Etiquette",
          text: "Dress in at least three layers with windproof gloves. Take a traditional Kangri (clay pot fire basket encased in wicker) if offered by your boatman. Savor hot saffron Kehwa poured from a brass samovar directly on the water.",
        },
      },
      {
        id: "gulmarg-storm",
        heading: "2. Ascending Phase 2 into the Apharwat Blizzard",
        content: [
          "From Srinagar, the highway winds upward through pine forests draped in heavy snow until you reach Gulmarg. Known as the Meadow of Flowers in summer, in winter it is transformed into a pure alpine colosseum.",
          "Taking the second phase of the Gulmarg Gondola carries you to 13,780 feet — almost on the shoulder of Mount Apharwat. The air thinned noticeably. As the cabin docked, a sudden squall rolled over the ridge from the Pir Panjal range. Visibility dropped to ten paces, and the sound of wind whipping against ice was deafening. Standing there with crampons strapped on, looking across the great Himalayan expanses toward Nanga Parbat in Pakistan-administered territory, perspective shifts permanently."
        ],
        image: {
          src: "/img/travel/kashmir_hero.jpg",
          caption: "Apharwat Ridge at 14,000 feet just as the blizzard cleared to reveal the Pir Panjal mountain arc.",
          alt: "Snow mountains of Gulmarg Kashmir",
        },
      },
      {
        id: "pahalgam-quiet",
        heading: "3. The Healing Solitude of the Lidder Valley",
        content: [
          "Leaving Gulmarg behind, the journey continued south-east toward Pahalgam, the Valley of Shepherds. Unlike the intense ski crowds of the north, Pahalgam in February feels intimate and untouched.",
          "Walking alongside the freezing turquoise currents of the Lidder River toward Aru Valley, the only sound was the cracking of icicles hanging from pine boughs. I stayed at a small family-run homestay in Batakoot where the stove crackled with pine cones, and dinner was steaming haakh greens, slow-cooked rogan josh, and hot walnut chutney. Kashmir isn't merely scenic vistas; it is the extraordinary warmth of people who have weathered decades of harsh winters with open hearts."
        ],
        fieldNote: {
          title: "Practical Takeaway",
          text: "Never rush Kashmir in a standard 3-day package. Spend at least 6 to 8 days so you can absorb the slow tempo of the valley and adapt to high-altitude mountain weather changes.",
        },
      },
    ],
  },
  {
    id: "story-2",
    slug: "ladakh-land-of-high-passes",
    title: "Ladakh — Crossing the Roof of India on Two Wheels",
    subtitle: "Riding through 17,500-foot passes, monastery corridors, and the hypnotic blues of Pangong Tso.",
    category: "Road Adventures",
    destination: "Ladakh",
    destinationSlug: "ladakh",
    state: "Ladakh",
    year: "2022",
    publishedAt: "July 2022",
    readTime: "10 min read",
    author: {
      name: "Ashraf Siddiqui",
      role: "Solo Explorer & Storyteller",
      avatar: "/img/travel/kashmir_hero.jpg",
      bio: "24 states explored across India. Documenting raw mountain passes, ancient trails, and local lives.",
    },
    coverImage: "/img/travel/ladakh.jpg",
    tagColor: "#8b5cf6",
    tags: ["High Altitude", "Motorcycles", "Passes", "Cold Desert"],
    excerpt: "Pangong Lake's impossible blue, Khardung La's thin air, and a sky full of stars with zero light pollution — Ladakh obliterates perspective.",
    relatedGuideSlug: "ladakh",
    relatedStoriesSlugs: ["kashmir-heaven-on-earth", "rajasthan-the-land-of-kings"],
    sections: [
      {
        id: "manali-leh-highway",
        heading: "1. The Brutal Poetry of the Manali-Leh Highway",
        content: [
          "The Manali-Leh highway is not just a road; it is a pilgrimage of endurance. Stretching over 470 kilometers across five major high-altitude passes, it tests every bolt on your machine and every nerve in your body.",
          "Riding over Tanglang La at 17,480 feet in twilight, the oxygen level felt halved. The motorcycle engine sputtered in the thin air, starved for combustion, while freezing wind clawed at our visors. Yet descending into the Morey Plains — a dead-flat 40-kilometer high plateau carved by glacial melt — felt like touching the surface of Mars."
        ],
        quote: "Ladakh teaches you humility. When the mountain decides the road is closed, no schedule or ticket in the world can open it.",
      },
      {
        id: "pangong-mirage",
        heading: "2. The Chameleonic Waters of Pangong Tso",
        content: [
          "We arrived at Pangong Tso just before dusk after crossing Chang La. At 14,270 feet, the lake stretches 134 kilometers across international borders into Tibet.",
          "What strikes you first is the color. Depending on the angle of sunlight and cloud shadows, the water shifts from turquoise to royal cobalt, deep violet, and emerald within thirty minutes. That night in a basic canvas tent at Lukung, temperature plunged to minus six. Stepping outside at 2:00 AM revealed a canopy of stars so dense that the Milky Way cast faint silver shadows across the gravel."
        ],
        image: {
          src: "/img/travel/ladakh.jpg",
          caption: "Pangong Tso shore under crystal mountain light at 14,200 feet.",
          alt: "Pangong Lake Ladakh",
        },
      },
    ],
  },
  {
    id: "story-3",
    slug: "rajasthan-the-land-of-kings",
    title: "Rajasthan — Fortresses, Sand Ridges & Ancient Echoes",
    subtitle: "From camel caravans across Thar dunes to the blue maze beneath Mehrangarh ramparts.",
    category: "Hidden India",
    destination: "Rajasthan",
    destinationSlug: "rajasthan",
    state: "Rajasthan",
    year: "2023",
    publishedAt: "December 2023",
    readTime: "7 min read",
    author: {
      name: "Ashraf Siddiqui",
      role: "Solo Explorer & Storyteller",
      avatar: "/img/travel/kashmir_hero.jpg",
      bio: "24 states explored across India. Documenting raw mountain passes, ancient trails, and local lives.",
    },
    coverImage: "/img/travel/rajasthan.jpg",
    tagColor: "#f59e0b",
    tags: ["Desert", "Heritage", "Forts", "Folk Culture"],
    excerpt: "Camel rides at Jaisalmer, echoing corridors of Mehrangarh Fort, and the blue city of Jodhpur — Rajasthan is India in its most vivid, royal form.",
    relatedGuideSlug: "rajasthan",
    relatedStoriesSlugs: ["kashmir-heaven-on-earth", "ladakh-land-of-high-passes"],
    sections: [
      {
        id: "golden-fort",
        heading: "1. The Living Fort of Jaisalmer",
        content: [
          "Unlike most royal fortresses in the world which have been converted into preserved museums, Jaisalmer's Sonar Qila (Golden Fort) is alive. Three thousand residents still live inside its sandstone bastions, their laundry drying over intricately carved 12th-century jharokhas.",
          "Walking through the narrow labyrinth of alleys as temple bells mingled with the smell of freshly fried mirchi vadas and cardamom chai, you realize history here isn't trapped under glass — it breathes."
        ],
        quote: "In the Thar Desert, silence is not empty. It is heavy with five hundred years of ballads, royal chivalry, and desert resilience.",
      },
      {
        id: "sam-dunes",
        heading: "2. The Midnight Stillness of Sam Dunes",
        content: [
          "Thirty kilometers past Jaisalmer toward the border lies the Sam Sand Dunes. Riding out past the commercial camel operators into the deeper, undisturbed dunes as sunset bathed the yellow sand in deep crimson was an experience of pure stillness.",
          "Later that evening around a low fire, local Manganiyar musicians played the ravanahatha and sang songs of love and desert longing. The pitch of the desert voice carries across miles of open sand in a way that modern microphones can never replicate."
        ],
        image: {
          src: "/img/travel/rajasthan.jpg",
          caption: "Mehrangarh Fort towering above the old blue quarter of Jodhpur at dusk.",
          alt: "Mehrangarh Fort Jodhpur Rajasthan",
        },
      },
    ],
  },
  {
    id: "story-4",
    slug: "meghalaya-abode-of-clouds",
    title: "Meghalaya — Deep in the Forest of Living Bridges",
    subtitle: "Trekking 3,000 stone steps through rain-soaked rainforests to the roots of Nongriat.",
    category: "Northeast Trails",
    destination: "Meghalaya",
    destinationSlug: "meghalaya",
    state: "Meghalaya",
    year: "2024",
    publishedAt: "November 2024",
    readTime: "6 min read",
    author: {
      name: "Ashraf Siddiqui",
      role: "Solo Explorer & Storyteller",
      avatar: "/img/travel/kashmir_hero.jpg",
      bio: "24 states explored across India. Documenting raw mountain passes, ancient trails, and local lives.",
    },
    coverImage: "/img/travel/kashmir_hero.jpg",
    tagColor: "#10b981",
    tags: ["Root Bridges", "Rainforest", "Living Bridges", "Northeast"],
    excerpt: "Hiking down three thousand stone steps to the double-decker living root bridges of Nongriat, shrouded in perpetual mist and roaring streams.",
    relatedGuideSlug: "meghalaya",
    relatedStoriesSlugs: ["kashmir-heaven-on-earth", "ladakh-land-of-high-passes"],
    sections: [
      {
        id: "living-roots",
        heading: "1. Three Thousand Steps into Nongriat",
        content: [
          "The hike to Nongriat begins at Tyrna village. It drops steep into a tropical gorge over three thousand slick stone steps carved into the hillside. Moisture drips constantly from giant fern leaves, and the roaring sound of river water grows louder with every step.",
          "When you finally round the bend and set eyes upon the Double Decker Living Root Bridge (Jingkieng Nongriat), you are looking at bio-engineering that spans generations. Khasi elders trained the aerial roots of Ficus elastica trees across hollowed betel nut trunks over fifty to a hundred years. The bridges do not decay with water; with every passing monsoon, the living roots grow thicker and stronger."
        ],
        quote: "Nature does not hurry, yet everything is accomplished. Nowhere is this more evident than on a bridge grown patiently by human hands over three generations.",
      },
    ],
  },
];

