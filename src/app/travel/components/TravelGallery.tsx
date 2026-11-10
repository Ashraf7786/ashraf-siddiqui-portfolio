'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TRAVEL_PHOTOS, GALLERY_CATEGORIES, type GalleryPhoto } from '../data/gallery';

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const photo = photos[index];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#f5f5f5] transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <XIcon />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#f5f5f5] transition-colors disabled:opacity-30"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={index === 0}
        aria-label="Previous photo"
      >
        <ChevronLeft />
      </button>

      {/* Image */}
      <div
        className="relative w-full max-w-5xl max-h-[80vh] mx-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[70vh]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
      </div>

      {/* Next */}
      <button
        className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#f5f5f5] transition-colors disabled:opacity-30"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={index === photos.length - 1}
        aria-label="Next photo"
      >
        <ChevronRight />
      </button>

      {/* Metadata bar */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-[#f5f5f5] mb-1" style={{ fontFamily: 'var(--font-fredoka)' }}>
            {photo.title}
          </h3>
          <div className="flex items-center gap-2 text-[#e8e8e8]/70 text-sm mb-3">
            <MapPinIcon />
            <span>{photo.location}</span>
            <span className="ml-2">{photo.year}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {photo.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-white/10 text-[#e8e8e8]/80 text-xs">
                #{tag}
              </span>
            ))}
          </div>
          {photo.notes && (
            <p className="mt-2.5 text-xs text-[#e8e8e8]/80 italic max-w-2xl bg-white/5 p-2 rounded-lg border-l-2 border-white/30">
              &ldquo;{photo.notes}&rdquo;
            </p>
          )}
          <p className="mt-3 text-[#e8e8e8]/50 text-xs">
            {index + 1} / {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TravelGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(TRAVEL_PHOTOS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/travel/gallery")
      .then((r) => r.json())
      .then((d) => {
        if (d.photos && Array.isArray(d.photos) && d.photos.length > 0) {
          setPhotos(d.photos);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = activeCategory === 'All'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const preview = filtered.slice(0, 9);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') setLightboxIndex(null);
    if (e.key === 'ArrowLeft') setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i));
    if (e.key === 'ArrowRight') setLightboxIndex(i => (i !== null && i < preview.length - 1 ? i + 1 : i));
  }, [lightboxIndex, preview.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="gallery" className="py-20 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-[#111113] text-[#e8e8e8]">
                <CameraIcon />
              </div>
              <span className="text-sm uppercase tracking-widest text-[#e8e8e8]/50 font-medium">
                Photo Gallery
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#f5f5f5] leading-tight"
              style={{ fontFamily: 'var(--font-fredoka)' }}
            >
              Frames from the Road
            </h2>
            <p className="mt-3 text-[#e8e8e8]/60 max-w-lg">
              Every frame tells a story — mountains, cultures, roads and moments from across India.
            </p>
          </div>

          <Link
            href="/travel/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#e8e8e8]/20 text-[#e8e8e8] hover:bg-[#111113] transition-colors text-sm font-medium shrink-0"
          >
            View Full Gallery
            <ArrowRightIcon />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {GALLERY_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#e8e8e8] text-[#080808]'
                  : 'bg-[#111113] text-[#e8e8e8]/70 hover:bg-[#1a1a1c] hover:text-[#f5f5f5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid — CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {preview.map((photo, idx) => (
            <div
              key={photo.id}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-2xl bg-[#111113]"
              onClick={() => setLightboxIndex(idx)}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  photo.orientation === 'portrait'
                    ? 'aspect-[3/4]'
                    : photo.orientation === 'square'
                    ? 'aspect-square'
                    : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-[#f5f5f5] font-semibold text-sm leading-tight" style={{ fontFamily: 'var(--font-fredoka)' }}>
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-[#e8e8e8]/70 text-xs">
                    <MapPinIcon />
                    <span>{photo.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/travel/gallery"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-[#111113] border border-[#e8e8e8]/20 text-[#f5f5f5] hover:border-[#e8e8e8]/40 hover:bg-[#1a1a1c] transition-all font-medium"
          >
            <CameraIcon />
            Explore All Photos
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={preview}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setLightboxIndex(i => (i !== null && i < preview.length - 1 ? i + 1 : i))}
        />
      )}
    </section>
  );
}
