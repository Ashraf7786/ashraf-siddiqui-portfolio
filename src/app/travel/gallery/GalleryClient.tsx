'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import TravelNav from '../components/TravelNav';
import TravelFooter from '../components/TravelFooter';
import { TRAVEL_PHOTOS, GALLERY_CATEGORIES, type GalleryPhoto } from '../data/gallery';

// SVG Icons
const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

// Lightbox
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

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#f5f5f5] transition-colors cursor-pointer"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <XIcon />
      </button>

      <button
        className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-[#f5f5f5] transition-colors disabled:opacity-30 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={index === 0}
        aria-label="Previous photo"
      >
        <ChevronLeft />
      </button>

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

      <button
        className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-[#f5f5f5] transition-colors disabled:opacity-30 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={index === photos.length - 1}
        aria-label="Next photo"
      >
        <ChevronRight />
      </button>

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
            <span className="ml-2 font-mono text-xs">{photo.year}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {photo.tags.map(tag => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#e8e8e8]/80 text-xs">
                #{tag}
              </span>
            ))}
          </div>
          {photo.notes && (
            <p className="mt-2.5 text-xs text-[#e8e8e8]/80 italic max-w-2xl bg-white/5 p-2 rounded-lg border-l-2 border-white/30">
              &ldquo;{photo.notes}&rdquo;
            </p>
          )}
          <p className="mt-3 text-[#e8e8e8]/50 text-xs font-mono">
            {index + 1} / {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GalleryClient() {
  const [photosList, setPhotosList] = useState<GalleryPhoto[]>(TRAVEL_PHOTOS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [orientationFilter, setOrientationFilter] = useState<'all' | 'landscape' | 'portrait'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) setActiveCategory(cat);
      const ori = params.get("orientation");
      if (ori === "landscape" || ori === "portrait") setOrientationFilter(ori);
    }

    fetch("/api/travel/gallery")
      .then((r) => r.json())
      .then((d) => {
        if (d.photos && Array.isArray(d.photos) && d.photos.length > 0) {
          setPhotosList(d.photos);
        }
      })
      .catch(() => {});
  }, []);

  const searched = useMemo(() => {
    let photos = photosList;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      photos = photos.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        (p.notes && p.notes.toLowerCase().includes(q)) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (activeCategory !== 'All') {
      photos = photos.filter(p => p.category === activeCategory);
    }
    return photos;
  }, [photosList, activeCategory, searchQuery]);

  const landscapePhotos = useMemo(() => {
    return searched.filter(p => p.orientation === 'landscape');
  }, [searched]);

  const portraitPhotos = useMemo(() => {
    return searched.filter(p => p.orientation === 'portrait' || p.orientation === 'square');
  }, [searched]);

  const activePhotosList = useMemo(() => {
    if (orientationFilter === 'landscape') return landscapePhotos;
    if (orientationFilter === 'portrait') return portraitPhotos;
    return [...landscapePhotos, ...portraitPhotos];
  }, [orientationFilter, landscapePhotos, portraitPhotos]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') setLightboxIndex(null);
    if (e.key === 'ArrowLeft') setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i));
    if (e.key === 'ArrowRight') setLightboxIndex(i => (i !== null && i < activePhotosList.length - 1 ? i + 1 : i));
  }, [lightboxIndex, activePhotosList.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (photo: GalleryPhoto) => {
    const idx = activePhotosList.findIndex(p => p.id === photo.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5]">
      <TravelNav />

      {/* Page Hero */}
      <div className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#111113] text-white/70 border border-white/10">
            <CameraIcon />
          </div>
          <span className="text-xs uppercase tracking-widest text-white/50 font-mono font-medium">
            Photo Gallery
          </span>
        </div>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5]"
          style={{ fontFamily: 'var(--font-fredoka)' }}
        >
          Frames from the Road
        </h1>
        <p className="text-white/60 max-w-2xl text-xs sm:text-sm leading-relaxed">
          A visual diary across 24 Indian states — organized into wide horizontal vistas and tall vertical portraits.
        </p>
      </div>

      {/* Controls & Filter Bar */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl bg-[#111113] border border-white/10">
          
          {/* Format / Orientation Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 w-fit">
            <button
              type="button"
              onClick={() => setOrientationFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                orientationFilter === 'all'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span>All Formats</span>
              <span className="text-[10px] font-mono opacity-70">({searched.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setOrientationFilter('landscape')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                orientationFilter === 'landscape'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2" />
              </svg>
              <span>Horizontal ({landscapePhotos.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setOrientationFilter('portrait')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                orientationFilter === 'portrait'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" />
              </svg>
              <span>Vertical ({portraitPhotos.length})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search by location, state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mr-1 font-mono">
            Topic:
          </span>
          {GALLERY_CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white/20 text-white font-medium border border-white/30'
                  : 'bg-white/[0.03] text-white/60 hover:text-white border border-white/5 hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Photos Area */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 space-y-12">
        
        {/* Horizontal (Landscape) Grid */}
        {(orientationFilter === 'all' || orientationFilter === 'landscape') && landscapePhotos.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                </svg>
                <h2 className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  Horizontal Frames · Wide Horizons (16:9)
                </h2>
              </div>
              <span className="text-xs font-mono text-white/40">
                {landscapePhotos.length} {landscapePhotos.length === 1 ? 'Photo' : 'Photos'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {landscapePhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="cursor-pointer group relative overflow-hidden rounded-2xl bg-[#111113] border border-white/10 hover:border-white/25 transition-all duration-300 shadow-md"
                  onClick={() => openLightbox(photo)}
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/70 font-semibold mb-0.5">
                        {photo.category}
                      </span>
                      <h3 className="text-white font-bold text-sm leading-snug" style={{ fontFamily: 'var(--font-fredoka)' }}>
                        {photo.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1 text-white/70 text-xs">
                        <MapPinIcon />
                        <span>{photo.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vertical (Portrait) Grid */}
        {(orientationFilter === 'all' || orientationFilter === 'portrait') && portraitPhotos.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                </svg>
                <h2 className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  Vertical Frames · Portraits &amp; Stories (3:4)
                </h2>
              </div>
              <span className="text-xs font-mono text-white/40">
                {portraitPhotos.length} {portraitPhotos.length === 1 ? 'Photo' : 'Photos'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {portraitPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="cursor-pointer group relative overflow-hidden rounded-2xl bg-[#111113] border border-white/10 hover:border-white/25 transition-all duration-300 shadow-md"
                  onClick={() => openLightbox(photo)}
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/70 font-semibold mb-0.5">
                        {photo.category}
                      </span>
                      <h3 className="text-white font-bold text-xs sm:text-sm leading-snug" style={{ fontFamily: 'var(--font-fredoka)' }}>
                        {photo.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1 text-white/70 text-[11px]">
                        <MapPinIcon />
                        <span className="truncate">{photo.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {landscapePhotos.length === 0 && portraitPhotos.length === 0 && (
          <div className="text-center py-20 p-8 rounded-3xl bg-[#111113] border border-white/10 space-y-2">
            <p className="text-white font-bold text-base">No photos found</p>
            <p className="text-xs text-white/50">Try clearing the search query or selecting a different category.</p>
          </div>
        )}

      </div>

      <TravelFooter />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={activePhotosList}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setLightboxIndex(i => (i !== null && i < activePhotosList.length - 1 ? i + 1 : i))}
        />
      )}
    </div>
  );
}
