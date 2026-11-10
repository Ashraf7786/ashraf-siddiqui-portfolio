import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Photo Gallery | Ashraf Siddiqui Travel',
  description: 'Cinematic travel photos from Kashmir, Ladakh, Rajasthan and across India.',
  openGraph: {
    title: 'Photo Gallery | Ashraf Siddiqui Travel',
    description: 'Cinematic travel photos from Kashmir, Ladakh, Rajasthan and across India.',
    images: [{ url: '/img/travel/kashmir_hero.jpg', width: 1200, height: 630, alt: 'Travel Gallery — Ashraf Siddiqui' }],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
