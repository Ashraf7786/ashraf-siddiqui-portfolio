import galleryData from './gallery.json';

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
  notes?: string;
}

export const GALLERY_CATEGORIES = ['All', 'Mountains', 'Roads', 'Cultures', 'Cities', 'Nature', 'People'] as const;

export const TRAVEL_PHOTOS: GalleryPhoto[] = (galleryData as unknown as GalleryPhoto[]) || [];
