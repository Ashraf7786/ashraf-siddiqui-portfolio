export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  state: string;
  year: number;
  category: 'Mountains' | 'Roads' | 'Cultures' | 'Cities' | 'Nature' | 'People';
  orientation: 'portrait' | 'landscape' | 'square';
  tags: string[];
}

export const GALLERY_CATEGORIES = ['All', 'Mountains', 'Roads', 'Cultures', 'Cities', 'Nature', 'People'] as const;

export const TRAVEL_PHOTOS: GalleryPhoto[] = [
  { id: 'g1', src: '/img/travel/kashmir_hero.jpg', alt: 'Dal Lake at Sunrise Kashmir', title: 'Dal Lake at Sunrise', location: 'Dal Lake, Srinagar', state: 'Kashmir', year: 2026, category: 'Mountains', orientation: 'landscape', tags: ['kashmir', 'dal lake', 'sunrise', 'mountains'] },
  { id: 'g2', src: '/img/travel/ladakh.jpg', alt: 'Nubra Valley Ladakh', title: 'Nubra Valley Cold Desert', location: 'Nubra Valley, Ladakh', state: 'Ladakh', year: 2026, category: 'Mountains', orientation: 'landscape', tags: ['ladakh', 'nubra valley', 'bactrian camels', 'desert'] },
  { id: 'g3', src: '/img/travel/rajasthan.jpg', alt: 'Mehrangarh Fort Jodhpur', title: 'Mehrangarh at Dusk', location: 'Mehrangarh Fort, Jodhpur', state: 'Rajasthan', year: 2025, category: 'Cultures', orientation: 'portrait', tags: ['rajasthan', 'jodhpur', 'fort', 'heritage'] },
  { id: 'g4', src: '/img/travel/kerala.jpg', alt: 'Kerala Backwaters', title: 'Backwaters of Kerala', location: 'Alleppey, Kerala', state: 'Kerala', year: 2024, category: 'Nature', orientation: 'landscape', tags: ['kerala', 'backwaters', 'nature', 'green'] },
  { id: 'g5', src: '/img/travel/kashmir_hero.jpg', alt: 'Gulmarg Snow Kashmir', title: 'First Snow at Gulmarg', location: 'Gulmarg, Kashmir', state: 'Kashmir', year: 2026, category: 'Mountains', orientation: 'portrait', tags: ['kashmir', 'gulmarg', 'snow', 'winter'] },
  { id: 'g6', src: '/img/travel/ladakh.jpg', alt: 'Pangong Tso Lake Ladakh', title: 'Pangong Tso Reflections', location: 'Pangong Tso, Ladakh', state: 'Ladakh', year: 2026, category: 'Nature', orientation: 'landscape', tags: ['ladakh', 'pangong', 'lake', 'reflections'] },
  { id: 'g7', src: '/img/travel/rajasthan.jpg', alt: 'Jaisalmer Golden Fort', title: 'The Golden City', location: 'Jaisalmer Fort, Rajasthan', state: 'Rajasthan', year: 2025, category: 'Cultures', orientation: 'square', tags: ['jaisalmer', 'golden fort', 'rajasthan', 'heritage'] },
  { id: 'g8', src: '/img/travel/kerala.jpg', alt: 'Munnar Tea Gardens', title: 'Munnar Tea Estates', location: 'Munnar, Kerala', state: 'Kerala', year: 2024, category: 'Nature', orientation: 'landscape', tags: ['munnar', 'tea', 'green', 'kerala'] },
  { id: 'g9', src: '/img/travel/kashmir_hero.jpg', alt: 'Pahalgam River Kashmir', title: 'Pahalgam River Valley', location: 'Pahalgam, Kashmir', state: 'Kashmir', year: 2026, category: 'Nature', orientation: 'landscape', tags: ['pahalgam', 'river', 'kashmir', 'valley'] },
  { id: 'g10', src: '/img/travel/ladakh.jpg', alt: 'Leh Palace Ladakh', title: 'Leh Palace Sunrise', location: 'Leh Palace, Ladakh', state: 'Ladakh', year: 2026, category: 'Cultures', orientation: 'portrait', tags: ['leh', 'palace', 'ladakh', 'sunrise'] },
  { id: 'g11', src: '/img/travel/rajasthan.jpg', alt: 'Hawa Mahal Jaipur', title: 'Hawa Mahal Pink City', location: 'Hawa Mahal, Jaipur', state: 'Rajasthan', year: 2025, category: 'Cities', orientation: 'portrait', tags: ['jaipur', 'hawa mahal', 'pink city', 'architecture'] },
  { id: 'g12', src: '/img/travel/kerala.jpg', alt: 'Varkala Beach Kerala', title: 'Cliffs of Varkala', location: 'Varkala Beach, Kerala', state: 'Kerala', year: 2024, category: 'Nature', orientation: 'landscape', tags: ['varkala', 'beach', 'cliffs', 'kerala'] },
];
