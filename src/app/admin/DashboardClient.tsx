"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TravelStory, StorySection } from "@/app/travel/data/stories";
import { CloudinaryUploadButton } from "./components/CloudinaryUploadButton";
import GalleryBatchUploader from "./components/GalleryBatchUploader";

// ── Types ──────────────────────────────────────────────────────────────────────
type AdminTab = "hero" | "gallery" | "reels" | "trips" | "stories" | "enquiries";

interface MetricPill {
  label: string;
  value: string;
  highlight?: boolean;
}

interface BannerSlide {
  id: string;
  tripSlug?: string;
  mediaType?: "photo" | "video";
  eyebrow?: string;
  badgeLabel?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  posterImage: string;
  imageAlt?: string;
  videoUrl?: string;
  metrics: MetricPill[];
  primaryCta?: {
    enabled?: boolean;
    label: string;
    action: string;
    target: string;
  };
  secondaryCta?: {
    enabled?: boolean;
    label: string;
    action: string;
    target: string;
  };
  isActive: boolean;
  sortOrder: number;
}

interface GalleryPhotoItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  state: string;
  year: number;
  category: string;
  orientation: "landscape" | "portrait" | "square";
  tags: string[];
  notes?: string;
}

interface ReelItem {
  id: string;
  slug: string;
  title: string;
  caption: string;
  destination: string;
  destinationSlug: string;
  state: string;
  category: string;
  localVideoUrl: string;
  posterUrl: string;
  videoUrl: string;
  duration: string;
  views: string;
  likes: number;
  commentsCount: number;
  soundtrack: string;
  locationName: string;
  publishedDate: string;
  tags: string[];
  relatedGuideSlug?: string;
  instagramHandle?: string;
}

export interface TripDayItineraryItem {
  day: number;
  title: string;
  description: string;
  mealsIncluded: string;
  nightStay: string;
}

export interface TripFAQItem {
  question: string;
  answer: string;
}

interface GroupTripItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  destination: string;
  destinationSlug: string;
  state: string;
  coverImage: string;
  gallery: string[];
  departureDate: string;
  returnDate: string;
  durationDays: number;
  durationLabel: string;
  departureCity: string;
  pricePerPerson: number;
  currency: string;
  maxGroupSize: number;
  availableSeats: number;
  totalSeats: number;
  difficulty: string;
  status: string;
  isConfirmed: boolean;
  isUpcoming?: boolean;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  dayWiseItinerary?: TripDayItineraryItem[];
  faqs?: TripFAQItem[];
}

interface LeadEnquiryItem {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  whatsapp: string;
  travelersCount: number;
  cityOfOrigin: string;
  dietPreference: string;
  emergencyContact: string;
  message: string;
  tripTitle: string;
  tripSlug: string;
  pricePerPerson?: number;
  status: "New" | "Contacted" | "Confirmed" | "Archived";
}

// ── Pure SVG Icons ─────────────────────────────────────────────────────────────
const SlidersIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

const CameraIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const FilmIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </svg>
);

const CompassIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const InboxIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const BookOpenIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ── Image & Video Inspector Helpers ─────────────────────────────────────────────
function VideoInspectorBadge({
  videoUrl,
  targetType,
}: {
  videoUrl: string;
  targetType: "reels" | "hero";
}) {
  const [meta, setMeta] = useState<{
    width?: number;
    height?: number;
    status: "idle" | "loading" | "valid" | "error";
    errorMsg?: string;
  }>({ status: "idle" });

  useEffect(() => {
    if (!videoUrl) {
      setMeta({ status: "idle" });
      return;
    }

    setMeta({ status: "loading" });
    const video = document.createElement("video");
    video.src = videoUrl;
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      setMeta({
        status: "valid",
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };

    video.onerror = () => {
      setMeta({
        status: "error",
        errorMsg: `Could not load video from "${videoUrl}". Ensure file is in /public/videos/ and encoded in H.264 MP4 format.`,
      });
    };
  }, [videoUrl]);

  if (!videoUrl) return null;

  if (meta.status === "loading") {
    return (
      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-[11px] text-white/60">
        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <span>Inspecting video resolution & mobile responsiveness...</span>
      </div>
    );
  }

  if (meta.status === "error") {
    return (
      <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 text-red-400">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <p className="font-bold text-red-200">Video Alert: Playback Failed</p>
          <p className="text-[11px] opacity-90 mt-0.5">{meta.errorMsg}</p>
        </div>
      </div>
    );
  }

  if (meta.status === "valid" && meta.width && meta.height) {
    const isVertical = meta.height > meta.width;
    const ratio = Math.round((meta.width / meta.height) * 100) / 100;

    // Checks for Reels (must be strictly vertical 9:16)
    if (targetType === "reels") {
      if (!isVertical) {
        return (
          <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 text-amber-400">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <p className="font-bold text-amber-300">Non-Responsive Aspect Ratio Alert!</p>
              <p className="text-[11px] opacity-90 mt-0.5">
                This video is <strong>{meta.width}×{meta.height} (Landscape {ratio}:1)</strong>. Reels require <strong>Vertical 9:16 (1080×1920)</strong>. On mobile phone screens, this video will appear letterboxed with black bars on top and bottom.
              </p>
            </div>
          </div>
        );
      }
      return (
        <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400 shrink-0">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-[11px]">
            <strong>Mobile Responsive Verified:</strong> {meta.width}×{meta.height} (Vertical 9:16). Perfectly optimized for mobile phone viewports.
          </span>
        </div>
      );
    }

    // Checks for Hero Banner (prefers 16:9 Landscape)
    if (targetType === "hero") {
      if (isVertical) {
        return (
          <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 text-amber-400">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <p className="font-bold text-amber-300">Hero Aspect Ratio Notice</p>
              <p className="text-[11px] opacity-90 mt-0.5">
                Video is <strong>{meta.width}×{meta.height} (Vertical)</strong>. For a cinematic full-width hero header across desktop monitors & laptops, <strong>1920×1080 (16:9 Landscape)</strong> is recommended.
              </p>
            </div>
          </div>
        );
      }
      return (
        <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400 shrink-0">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-[11px]">
            <strong>Responsive Verified:</strong> {meta.width}×{meta.height} ({ratio}:1 Landscape). Covers widescreen & mobile viewports smoothly.
          </span>
        </div>
      );
    }
  }

  return null;
}

function ImageInspectorBadge({
  src,
  suggestedSize,
  suggestedDimensions,
  expectedRatio,
}: {
  src: string;
  suggestedSize: string;
  suggestedDimensions: string;
  expectedRatio?: "landscape" | "portrait" | "square";
}) {
  const [dim, setDim] = useState<{ width?: number; height?: number; error?: boolean } | null>(null);

  useEffect(() => {
    if (!src) {
      setDim(null);
      return;
    }
    const img = new Image();
    img.src = src;
    img.onload = () => setDim({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => setDim({ error: true });
  }, [src]);

  return (
    <div className="p-2.5 rounded-xl bg-[#080808] border border-white/10 space-y-1 text-[11px]">
      <div className="flex flex-wrap items-center justify-between gap-1">
        <span className="text-white/40 uppercase font-mono font-semibold text-[10px]">
          Target Size Guide
        </span>
        <span className="text-emerald-400 font-mono text-[10px] font-semibold">
          {suggestedSize}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-1 text-white/70">
        <span>Recommended Dimensions:</span>
        <strong className="text-white font-mono">{suggestedDimensions}</strong>
      </div>
      {dim && (
        <div className="pt-1 border-t border-white/5 flex items-center justify-between text-[10px]">
          {dim.error ? (
            <span className="text-red-400 flex items-center gap-1">
              <span>Could not load image file from {src}</span>
            </span>
          ) : (
            <span className="text-white/60">
              Current File: <strong className="text-white">{dim.width}×{dim.height} px</strong>
              {expectedRatio === "landscape" && dim.width! < dim.height! && (
                <span className="text-amber-400 ml-1.5 font-semibold">(Notice: Image is vertical but category is Landscape)</span>
              )}
              {expectedRatio === "portrait" && dim.width! > dim.height! && (
                <span className="text-amber-400 ml-1.5 font-semibold">(Notice: Image is horizontal but category is Portrait)</span>
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard Component ──────────────────────────────────────────────────
export default function DashboardClient({ adminUsername }: { adminUsername: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Status and loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Tab 1: Hero Banner State
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

  // Tab 2: Gallery State
  const [photos, setPhotos] = useState<GalleryPhotoItem[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [gallerySearch, setGallerySearch] = useState("");

  // Tab 3: Reels State
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [selectedReelIndex, setSelectedReelIndex] = useState(0);

  // Tab 4: Trips State
  const [trips, setTrips] = useState<GroupTripItem[]>([]);
  const [selectedTripIndex, setSelectedTripIndex] = useState(0);

  // Tab 5: Stories State
  const [stories, setStories] = useState<TravelStory[]>([]);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [storyFilter, setStoryFilter] = useState("All");
  const [storySearch, setStorySearch] = useState("");

  // Tab 6: Enquiries State
  const [enquiries, setEnquiries] = useState<LeadEnquiryItem[]>([]);
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>("All");
  const [enquirySearch, setEnquirySearch] = useState("");

  // Fetch all initial data
  useEffect(() => {
    async function loadAllData() {
      setIsLoading(true);
      try {
        const now = Date.now();
        const [heroRes, galRes, reelsRes, tripsRes, storiesRes, enqRes] = await Promise.all([
          fetch(`/api/admin/hero?t=${now}`, { cache: "no-store" }),
          fetch(`/api/admin/gallery?t=${now}`, { cache: "no-store" }),
          fetch(`/api/admin/reels?t=${now}`, { cache: "no-store" }),
          fetch(`/api/admin/trips?t=${now}`, { cache: "no-store" }),
          fetch(`/api/admin/stories?t=${now}`, { cache: "no-store" }),
          fetch(`/api/admin/enquiries?t=${now}`, { cache: "no-store" }),
        ]);

        if (heroRes.ok) {
          const d = await heroRes.json();
          if (Array.isArray(d.slides)) {
            const normalized = d.slides.map((s: any) => ({
              ...s,
              mediaType: s.mediaType || (s.videoUrl ? "video" : "photo"),
              eyebrow: s.eyebrow !== undefined ? s.eyebrow : "ASHRAF SIDDIQUI · SOLO TRAVELLER · JAIPUR, INDIA",
              metrics: Array.isArray(s.metrics) ? s.metrics : [],
              primaryCta: {
                enabled: s.primaryCta?.enabled !== false,
                label: s.primaryCta?.label ?? "View Trip Details & Reserve",
                action: s.primaryCta?.action ?? "openModal",
                target: s.primaryCta?.target ?? "",
              },
              secondaryCta: {
                enabled: s.secondaryCta?.enabled !== false,
                label: s.secondaryCta?.label ?? "Explore All Expeditions",
                action: s.secondaryCta?.action ?? "scroll",
                target: s.secondaryCta?.target ?? "#group-tours",
              },
            }));
            setSlides(normalized);
          }
        }
        if (galRes.ok) {
          const d = await galRes.json();
          if (d.photos) setPhotos(d.photos);
        }
        if (reelsRes.ok) {
          const d = await reelsRes.json();
          if (d.reels) setReels(d.reels);
        }
        if (tripsRes.ok) {
          const d = await tripsRes.json();
          if (d.trips) setTrips(d.trips);
        }
        if (storiesRes.ok) {
          const d = await storiesRes.json();
          if (d.stories) setStories(d.stories);
        }
        if (enqRes.ok) {
          const d = await enqRes.json();
          if (d.enquiries) setEnquiries(d.enquiries);
        }
      } catch (err) {
        setStatusMessage({ type: "error", text: "Failed to load admin resources." });
      } finally {
        setIsLoading(false);
      }
    }
    loadAllData();
  }, []);

  // Auto-dismiss status toast
  useEffect(() => {
    if (!statusMessage) return;
    const timer = setTimeout(() => setStatusMessage(null), 4500);
    return () => clearTimeout(timer);
  }, [statusMessage]);

  const newEnquiriesCount = useMemo(() => {
    return enquiries.filter((e) => e.status === "New").length;
  }, [enquiries]);

  // ── Save Handlers ─────────────────────────────────────────────────────────────
  const handleSaveHero = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "Hero banner updated and published live!" });
      } else {
        setStatusMessage({ type: "error", text: data.error || "Save failed." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error while saving hero." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveGallery = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "Photo gallery updated and published live!" });
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to save gallery." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error saving gallery." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveReels = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reels }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "Reels & dispatches updated and published live!" });
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to save reels." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error saving reels." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTrips = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trips }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "Group expeditions updated and published live!" });
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to save trips." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error saving expeditions." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveStories = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stories }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "Travel stories updated and published live!" });
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to save stories." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error saving travel stories." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateEnquiryStatus = async (id: string, newStatus: LeadEnquiryItem["status"]) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        setStatusMessage({ type: "success", text: `Status updated to ${newStatus}.` });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Failed to update lead status." });
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        setStatusMessage({ type: "success", text: "Enquiry deleted." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Failed to delete enquiry." });
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // ── Helper: Safe Selected Items ───────────────────────────────────────────────
  const currentSlide = slides[selectedSlideIndex] || slides[0];
  const currentPhoto = photos[selectedPhotoIndex] || photos[0];
  const currentReel = reels[selectedReelIndex] || reels[0];
  const currentTrip = trips[selectedTripIndex] || trips[0];
  const currentStory = stories[selectedStoryIndex] || stories[0];

  const filteredStories = useMemo(() => {
    return stories.filter((s) => {
      const matchCat = storyFilter === "All" || s.category === storyFilter;
      const matchSearch =
        !storySearch.trim() ||
        s.title.toLowerCase().includes(storySearch.toLowerCase()) ||
        s.subtitle.toLowerCase().includes(storySearch.toLowerCase()) ||
        s.destination.toLowerCase().includes(storySearch.toLowerCase()) ||
        s.state.toLowerCase().includes(storySearch.toLowerCase()) ||
        (Array.isArray(s.tags) && s.tags.some((t) => t.toLowerCase().includes(storySearch.toLowerCase())));
      return matchCat && matchSearch;
    });
  }, [stories, storyFilter, storySearch]);

  const updateCurrentStory = (updater: (s: TravelStory) => TravelStory) => {
    setStories((prev) => {
      const copy = [...prev];
      if (copy[selectedStoryIndex]) {
        copy[selectedStoryIndex] = updater(copy[selectedStoryIndex]);
      }
      return copy;
    });
  };

  const handleAddStory = () => {
    const newStory: TravelStory = {
      id: `story-${Date.now()}`,
      slug: `new-journey-${stories.length + 1}`,
      title: "New Travel Dispatch",
      subtitle: "Raw field notes and editorial accounts from high-altitude trails.",
      category: "Mountain Stories",
      destination: "Himalayas",
      destinationSlug: "himalayas",
      state: "Himachal Pradesh",
      year: "2026",
      publishedAt: "March 2026",
      readTime: "6 min read",
      author: {
        name: "Ashraf Siddiqui",
        role: "Solo Explorer & Storyteller",
        avatar: "/img/travel/kashmir_hero.jpg",
        bio: "24 states explored across India. Documenting raw mountain passes, ancient trails, and local lives.",
      },
      coverImage: "/img/travel/kashmir_hero.jpg",
      tagColor: "#38bdf8",
      tags: ["Mountains", "Expedition", "Field Notes"],
      excerpt: "A new story from remote trails and high mountain passes across India.",
      sections: [
        {
          id: "intro-dispatch",
          heading: "1. The Cold Whispers at First Light",
          content: [
            "The morning began in frozen stillness before the mountain winds started their daily roar.",
            "Stepping onto the ridge, the expansive Himalayan horizon unfolded with crystal clarity.",
          ],
          quote: "You do not visit the mountains to escape reality; you visit to discover what reality feels like when stripped of artificial noise.",
          fieldNote: {
            title: "Field Note: High-Altitude Acclimatization",
            text: "Take slow rhythmic breaths, maintain constant hydration, and never ignore early altitude signals.",
          },
        },
      ],
    };
    setStories((prev) => [newStory, ...prev]);
    setSelectedStoryIndex(0);
  };

  const handleDeleteStory = (index: number) => {
    if (stories.length <= 1) {
      alert("At least one travel story must remain in the archive.");
      return;
    }
    if (!confirm("Are you sure you want to delete this travel story?")) return;
    setStories((prev) => prev.filter((_, idx) => idx !== index));
    setSelectedStoryIndex(0);
  };

  const handleMoveStory = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= stories.length) return;
    setStories((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
    setSelectedStoryIndex(targetIndex);
  };

  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      const matchCat = galleryFilter === "All" || p.category.toLowerCase() === galleryFilter.toLowerCase();
      const matchSearch =
        !gallerySearch.trim() ||
        p.title.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        p.location.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        p.state.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        (p.notes && p.notes.toLowerCase().includes(gallerySearch.toLowerCase())) ||
        p.tags.some((t) => t.toLowerCase().includes(gallerySearch.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [photos, galleryFilter, gallerySearch]);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchStatus = enquiryStatusFilter === "All" || e.status === enquiryStatusFilter;
      const matchSearch =
        !enquirySearch.trim() ||
        e.fullName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
        e.email.toLowerCase().includes(enquirySearch.toLowerCase()) ||
        e.whatsapp.includes(enquirySearch) ||
        e.tripTitle.toLowerCase().includes(enquirySearch.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [enquiries, enquiryStatusFilter, enquirySearch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-sm text-[#f5f5f5]/60 font-medium">Loading Control Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] flex flex-col pb-20 lg:pb-0">
      {/* Toast Notification */}
      {statusMessage && (
        <div
          className={`fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold backdrop-blur-xl border transition-all ${
            statusMessage.type === "success"
              ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/30"
              : "bg-red-950/90 text-red-300 border-red-500/30"
          }`}
        >
          {statusMessage.type === "success" ? <CheckIcon /> : null}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="h-16 border-b border-white/10 bg-[#0c0c0e]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
            title="Toggle Menu"
            aria-label="Toggle modules menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse hidden sm:block" />
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-fredoka)" }}>
              Ashraf Siddiqui · CMS Control Center
            </h1>
            <p className="text-[11px] text-[#f5f5f5]/50 hidden sm:block">
              Logged in as <span className="text-white font-mono font-semibold">@{adminUsername}</span> · In-Memory Fast Cache Enabled
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/travel"
            target="_blank"
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#f5f5f5]/80 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <span className="hidden sm:inline">View Live Website</span>
            <span className="sm:hidden">Live</span>
            <ExternalLinkIcon />
          </Link>
          <button
            onClick={handleLogout}
            title="Log out of CMS"
            className="p-2 rounded-full bg-white/5 border border-white/10 text-[#f5f5f5]/70 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <LogoutIcon />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation (When toggled) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0c0e] border-b border-white/10 p-4 space-y-2 z-30">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#f5f5f5]/40 block mb-1">
            Switch Module
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "hero", label: "Hero Banner", count: `${slides.length} Slides`, icon: <SlidersIcon /> },
              { id: "gallery", label: "Photo Gallery", count: `${photos.length} Photos`, icon: <CameraIcon /> },
              { id: "reels", label: "Reels & Dispatches", count: `${reels.length} Clips`, icon: <FilmIcon /> },
              { id: "trips", label: "Expeditions", count: `${trips.length} Tours`, icon: <CompassIcon /> },
              { id: "stories", label: "Travel Stories", count: `${stories.length} Articles`, icon: <BookOpenIcon /> },
              { id: "enquiries", label: "Tour Leads", count: `${enquiries.length} Inquiries`, icon: <InboxIcon />, badge: newEnquiriesCount },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as AdminTab);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl text-left border flex items-center gap-2.5 transition-all ${
                  activeTab === item.id
                    ? "bg-white text-black border-white shadow-md font-bold"
                    : "bg-white/[0.03] text-white/70 border-white/5"
                }`}
              >
                <div className="shrink-0">{item.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs truncate">{item.label}</div>
                  <div className={`text-[9px] ${activeTab === item.id ? "text-black/60" : "text-white/40"}`}>{item.count}</div>
                </div>
                {item.badge ? (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500 text-black">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Navigation Sidebar (Desktop) */}
        <aside className="w-full lg:w-64 bg-[#0a0a0c] border-b lg:border-b-0 lg:border-r border-white/10 p-3 sm:p-4 shrink-0 hidden lg:flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#f5f5f5]/40 px-3 mb-2 block">
              Website Modules
            </span>
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {/* Tab 1: Hero Banner */}
              <button
                onClick={() => setActiveTab("hero")}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer text-left w-full ${
                  activeTab === "hero"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-[#f5f5f5]/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <SlidersIcon />
                <div className="flex-1">
                  <div className="leading-tight">Hero Banner</div>
                  <div className={`text-[10px] ${activeTab === "hero" ? "text-black/60" : "text-[#f5f5f5]/40"}`}>
                    {slides.length} Dynamic Slides
                  </div>
                </div>
              </button>

              {/* Tab 2: Visual Gallery */}
              <button
                onClick={() => setActiveTab("gallery")}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer text-left w-full ${
                  activeTab === "gallery"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-[#f5f5f5]/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <CameraIcon />
                <div className="flex-1">
                  <div className="leading-tight">Visual Gallery</div>
                  <div className={`text-[10px] ${activeTab === "gallery" ? "text-black/60" : "text-[#f5f5f5]/40"}`}>
                    {photos.length} Photos & Notes
                  </div>
                </div>
              </button>

              {/* Tab 3: Reels & Videos */}
              <button
                onClick={() => setActiveTab("reels")}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer text-left w-full ${
                  activeTab === "reels"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-[#f5f5f5]/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FilmIcon />
                <div className="flex-1">
                  <div className="leading-tight">Reels & Dispatches</div>
                  <div className={`text-[10px] ${activeTab === "reels" ? "text-black/60" : "text-[#f5f5f5]/40"}`}>
                    {reels.length} Video Clips
                  </div>
                </div>
              </button>

              {/* Tab 4: Group Tours */}
              <button
                onClick={() => setActiveTab("trips")}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer text-left w-full ${
                  activeTab === "trips"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-[#f5f5f5]/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <CompassIcon />
                <div className="flex-1">
                  <div className="leading-tight">Group Expeditions</div>
                  <div className={`text-[10px] ${activeTab === "trips" ? "text-black/60" : "text-[#f5f5f5]/40"}`}>
                    {trips.length} Tours Active
                  </div>
                </div>
              </button>

              {/* Tab 5: Stories & Editorial Journal */}
              <button
                onClick={() => setActiveTab("stories")}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer text-left w-full ${
                  activeTab === "stories"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-[#f5f5f5]/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <BookOpenIcon />
                <div className="flex-1">
                  <div className="leading-tight">Travel Stories</div>
                  <div className={`text-[10px] ${activeTab === "stories" ? "text-black/60" : "text-[#f5f5f5]/40"}`}>
                    {stories.length} Field Dispatches
                  </div>
                </div>
              </button>

              {/* Tab 6: Booking Leads & Enquiries */}
              <button
                onClick={() => setActiveTab("enquiries")}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer text-left w-full ${
                  activeTab === "enquiries"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-[#f5f5f5]/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <InboxIcon />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <div className="leading-tight">Tour Enquiries</div>
                    <div className={`text-[10px] ${activeTab === "enquiries" ? "text-black/60" : "text-[#f5f5f5]/40"}`}>
                      {enquiries.length} Inquiries
                    </div>
                  </div>
                  {newEnquiriesCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-black">
                      {newEnquiriesCount}
                    </span>
                  )}
                </div>
              </button>
            </nav>
          </div>

          {/* Sidebar Footer info */}
          <div className="hidden lg:block pt-6 border-t border-white/5 px-2">
            <div className="text-[11px] text-[#f5f5f5]/40 space-y-1">
              <p className="font-semibold text-[#f5f5f5]/60">Optimization & Cache</p>
              <p>In-memory file mtime cache</p>
              <p>Edge Cache-Control 60s</p>
              <p>Automatic format & ratio inspector</p>
            </div>
          </div>
        </aside>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* ══════════════════════════════════════════════════════════════════════
              TAB 1: HERO BANNER
              ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "hero" && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Dynamic Hero Banner
                  </h2>
                  <p className="text-xs text-[#f5f5f5]/50 mt-0.5">
                    Configure high-altitude expedition slides, video backgrounds, transparent metrics and action buttons.
                  </p>
                </div>
                <button
                  onClick={handleSaveHero}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg cursor-pointer shrink-0"
                >
                  <CheckIcon />
                  <span>{isSaving ? "Publishing..." : "Publish Banner Changes"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Slide Selector */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="p-4 rounded-3xl bg-[#111113] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#f5f5f5]/60">
                        Slides ({slides.length})
                      </span>
                      <button
                        onClick={() => {
                          const newSlide: BannerSlide = {
                            id: `slide-${Date.now()}`,
                            tripSlug: "",
                            mediaType: "photo",
                            badgeLabel: "NEW EXPEDITION",
                            eyebrow: "ASHRAF SIDDIQUI · SOLO TRAVELLER · JAIPUR, INDIA",
                            titleLine1: "NEW EXPEDITION",
                            titleLine2: "EXPLORATION.",
                            subtitle: "Experience high-altitude beauty with Ashraf Siddiqui.",
                            posterImage: "/img/travel/kashmir_hero.jpg",
                            imageAlt: "New Expedition",
                            videoUrl: "",
                            metrics: [
                              { label: "DATES", value: "TBA 2026" },
                              { label: "DURATION", value: "7 Days" },
                              { label: "ALTITUDE", value: "12,000 ft" },
                              { label: "GROUP SIZE", value: "12 Travellers" },
                              { label: "STARTING", value: "₹25,000", highlight: true },
                              { label: "AVAILABLE", value: "12 Seats Left", highlight: true },
                            ],
                            primaryCta: { enabled: true, label: "View Trip Details & Reserve", action: "openModal", target: "" },
                            secondaryCta: { enabled: true, label: "Explore All Expeditions", action: "scroll", target: "#group-tours" },
                            isActive: true,
                            sortOrder: slides.length + 1,
                          };
                          setSlides([...slides, newSlide]);
                          setSelectedSlideIndex(slides.length);
                        }}
                        className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
                      >
                        <PlusIcon />
                        <span>Add Slide</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {slides.map((s, idx) => (
                        <div
                          key={s.id}
                          onClick={() => setSelectedSlideIndex(idx)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            selectedSlideIndex === idx
                              ? "bg-white/10 border-white/30 text-white shadow-lg"
                              : "bg-white/[0.02] border-white/5 text-[#f5f5f5]/70 hover:bg-white/5"
                          }`}
                        >
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-white/40">#{idx + 1}</span>
                              <p className="text-xs font-bold truncate">{s.titleLine1 || "Untitled Slide"}</p>
                            </div>
                            <p className="text-[10px] text-[#f5f5f5]/40 truncate">{s.badgeLabel}</p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                            {idx > 0 && (
                              <button
                                onClick={() => {
                                  const arr = [...slides];
                                  const temp = arr[idx];
                                  arr[idx] = arr[idx - 1];
                                  arr[idx - 1] = temp;
                                  setSlides(arr);
                                  setSelectedSlideIndex(idx - 1);
                                }}
                                className="p-1 rounded text-white/50 hover:text-white"
                                title="Move Up"
                              >
                                <ArrowUpIcon />
                              </button>
                            )}
                            {idx < slides.length - 1 && (
                              <button
                                onClick={() => {
                                  const arr = [...slides];
                                  const temp = arr[idx];
                                  arr[idx] = arr[idx + 1];
                                  arr[idx + 1] = temp;
                                  setSlides(arr);
                                  setSelectedSlideIndex(idx + 1);
                                }}
                                className="p-1 rounded text-white/50 hover:text-white"
                                title="Move Down"
                              >
                                <ArrowDownIcon />
                              </button>
                            )}
                            {slides.length > 1 && (
                              <button
                                onClick={() => {
                                  if (confirm("Delete this slide?")) {
                                    const next = slides.filter((_, i) => i !== idx);
                                    setSlides(next);
                                    setSelectedSlideIndex(Math.max(0, idx - 1));
                                  }
                                }}
                                className="p-1 rounded text-white/30 hover:text-red-400"
                                title="Delete Slide"
                              >
                                <TrashIcon />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Slide Editor & Live Mini-Preview */}
                <div className="lg:col-span-8 space-y-6">
                  {currentSlide && (
                    <>
                      {/* Mini Preview Box */}
                      {(() => {
                        const isPhoto = (currentSlide.mediaType === "photo") || (!currentSlide.mediaType && !currentSlide.videoUrl);
                        const hasBadge = Boolean(currentSlide.badgeLabel?.trim());
                        const eyebrowText = currentSlide.eyebrow !== undefined ? currentSlide.eyebrow.trim() : "ASHRAF SIDDIQUI · SOLO TRAVELLER · JAIPUR, INDIA";
                        const hasTitle1 = Boolean(currentSlide.titleLine1?.trim());
                        const hasTitle2 = Boolean(currentSlide.titleLine2?.trim());
                        const hasSubtitle = Boolean(currentSlide.subtitle?.trim());
                        const hasPrimary = currentSlide.primaryCta?.enabled !== false && Boolean(currentSlide.primaryCta?.label?.trim());
                        const hasSecondary = currentSlide.secondaryCta?.enabled !== false && Boolean(currentSlide.secondaryCta?.label?.trim());

                        return (
                          <>
                            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black min-h-[300px] sm:min-h-[340px] shadow-2xl flex flex-col justify-end p-6 text-center">
                              {!isPhoto && currentSlide.videoUrl ? (
                                <video
                                  key={currentSlide.videoUrl}
                                  src={currentSlide.videoUrl}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  className="absolute inset-0 w-full h-full object-cover brightness-75 contrast-105"
                                />
                              ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={currentSlide.posterImage || "/img/travel/kashmir_hero.jpg"}
                                  alt=""
                                  className="absolute inset-0 w-full h-full object-cover brightness-75"
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/50" />

                              <div className="relative z-10 max-w-xl mx-auto space-y-2 py-4">
                                {/* Live Media Badge */}
                                <div className="flex items-center justify-center gap-2 mb-1">
                                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90">
                                    <span className={`w-1.5 h-1.5 rounded-full ${isPhoto ? "bg-sky-400" : "bg-emerald-400"}`} />
                                    {isPhoto ? "Photo Banner Mode" : "Video Background Mode"}
                                  </span>
                                </div>

                                {hasBadge && (
                                  <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80">
                                    {currentSlide.badgeLabel}
                                  </span>
                                )}

                                {eyebrowText && (
                                  <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#f5f5f5]/60 font-semibold">
                                    {eyebrowText}
                                  </p>
                                )}

                                {(hasTitle1 || hasTitle2) && (
                                  <h3
                                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide leading-none"
                                    style={{ fontFamily: "var(--font-fredoka)" }}
                                  >
                                    {hasTitle1 && <div>{currentSlide.titleLine1}</div>}
                                    {hasTitle2 && <div className="banner-outline-text text-transparent">{currentSlide.titleLine2}</div>}
                                  </h3>
                                )}

                                {hasSubtitle && (
                                  <p className="text-[11px] text-[#f5f5f5]/70 line-clamp-2 max-w-md mx-auto">
                                    {currentSlide.subtitle}
                                  </p>
                                )}

                                {/* Metric Pills in Preview */}
                                {currentSlide.metrics && currentSlide.metrics.length > 0 && (
                                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                                    {currentSlide.metrics.slice(0, 4).map((m, i) => (
                                      <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-black/50 border border-white/10 text-white/80">
                                        <span className="text-white/40">{m.label}:</span> <strong className="text-white">{m.value}</strong>
                                      </span>
                                    ))}
                                    {currentSlide.metrics.length > 4 && (
                                      <span className="text-[9px] px-1.5 py-0.5 text-white/40">+{currentSlide.metrics.length - 4} more</span>
                                    )}
                                  </div>
                                )}

                                {/* CTAs in Preview */}
                                {(hasPrimary || hasSecondary) && (
                                  <div className="flex items-center justify-center gap-2 pt-2">
                                    {hasPrimary && (
                                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white text-black">
                                        {currentSlide.primaryCta?.label}
                                      </span>
                                    )}
                                    {hasSecondary && (
                                      <span className="text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20 text-white">
                                        {currentSlide.secondaryCta?.label}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Video Responsiveness Inspector Alert — ONLY shown when video mode is active */}
                            {!isPhoto && currentSlide.videoUrl && (
                              <VideoInspectorBadge videoUrl={currentSlide.videoUrl} targetType="hero" />
                            )}
                          </>
                        );
                      })()}

                      {/* Form Fields Container */}
                      <div className="p-6 rounded-3xl bg-[#111113] border border-white/10 space-y-6">
                        {/* Header with active toggle */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-mono text-xs font-bold">
                              Slide #{selectedSlideIndex + 1}
                            </span>
                            <h3 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                              {currentSlide.titleLine1 || "Untitled Slide"}
                            </h3>
                          </div>

                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#f5f5f5]/80">
                              <input
                                type="checkbox"
                                checked={currentSlide.isActive}
                                onChange={(e) => {
                                  const updated = [...slides];
                                  updated[selectedSlideIndex].isActive = e.target.checked;
                                  setSlides(updated);
                                }}
                                className="rounded bg-black border-white/20 text-white focus:ring-0 cursor-pointer"
                              />
                              <span className="font-medium">Active on Live Site</span>
                            </label>
                          </div>
                        </div>

                        {/* 1. MEDIA FORMAT SELECTION (Photo Only vs Video) */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/60 font-bold">
                              Background Media Format
                            </label>
                            <span className="text-[10px] text-white/40">Select Photo or Video for this slide</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...slides];
                                updated[selectedSlideIndex].mediaType = "photo";
                                setSlides(updated);
                              }}
                              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3.5 cursor-pointer ${
                                (currentSlide.mediaType || (!currentSlide.videoUrl ? "photo" : "video")) === "photo"
                                  ? "bg-white text-black border-white shadow-xl"
                                  : "bg-[#080808] text-[#f5f5f5]/70 border-white/10 hover:border-white/30 hover:text-white"
                              }`}
                            >
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                  (currentSlide.mediaType || (!currentSlide.videoUrl ? "photo" : "video")) === "photo"
                                    ? "bg-black text-white"
                                    : "bg-white/10 text-white"
                                }`}
                              >
                                <CameraIcon />
                              </div>
                              <div>
                                <div className="text-xs font-bold">Photo Only (Image Banner)</div>
                                <div
                                  className={`text-[10px] ${
                                    (currentSlide.mediaType || (!currentSlide.videoUrl ? "photo" : "video")) === "photo"
                                      ? "text-black/70"
                                      : "text-white/40"
                                  }`}
                                >
                                  Fastest load · High-res photo · No video warnings
                                </div>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...slides];
                                updated[selectedSlideIndex].mediaType = "video";
                                setSlides(updated);
                              }}
                              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3.5 cursor-pointer ${
                                (currentSlide.mediaType || (!currentSlide.videoUrl ? "photo" : "video")) === "video"
                                  ? "bg-white text-black border-white shadow-xl"
                                  : "bg-[#080808] text-[#f5f5f5]/70 border-white/10 hover:border-white/30 hover:text-white"
                              }`}
                            >
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                  (currentSlide.mediaType || (!currentSlide.videoUrl ? "photo" : "video")) === "video"
                                    ? "bg-black text-white"
                                    : "bg-white/10 text-white"
                                }`}
                              >
                                <FilmIcon />
                              </div>
                              <div>
                                <div className="text-xs font-bold">Video Background</div>
                                <div
                                  className={`text-[10px] ${
                                    (currentSlide.mediaType || (!currentSlide.videoUrl ? "photo" : "video")) === "video"
                                      ? "text-black/70"
                                      : "text-white/40"
                                  }`}
                                >
                                  Cinematic looped MP4 footage + Fallback poster
                                </div>
                              </div>
                            </button>
                          </div>

                          {/* Conditional Media Inputs */}
                          {((currentSlide.mediaType || (!currentSlide.videoUrl ? "photo" : "video")) === "photo") ? (
                            /* PHOTO ONLY INPUTS */
                            <div className="p-4 rounded-2xl bg-[#080808] border border-white/10 space-y-3">
                              <div className="flex items-center justify-between">
                                <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/60 font-bold">
                                  Banner Photo Image URL
                                </label>
                                <div className="flex items-center gap-2">
                                  <CloudinaryUploadButton
                                    folder="ashraf-travel/hero"
                                    onSuccess={(url) => {
                                      const updated = [...slides];
                                      updated[selectedSlideIndex].posterImage = url;
                                      setSlides(updated);
                                    }}
                                  />
                                  <span className="text-[10px] text-emerald-400 font-semibold">Photo Mode</span>
                                </div>
                              </div>
                              <input
                                type="text"
                                value={currentSlide.posterImage || ""}
                                onChange={(e) => {
                                  const updated = [...slides];
                                  updated[selectedSlideIndex].posterImage = e.target.value;
                                  setSlides(updated);
                                }}
                                placeholder="/img/travel/kashmir_hero.jpg"
                                className="w-full bg-[#111113] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:border-white/40 outline-none"
                              />
                              <ImageInspectorBadge
                                src={currentSlide.posterImage || "/img/travel/kashmir_hero.jpg"}
                                suggestedSize="< 500 KB"
                                suggestedDimensions="1920×1080 (16:9 Landscape)"
                                expectedRatio="landscape"
                              />
                            </div>
                          ) : (
                            /* VIDEO BACKGROUND INPUTS */
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#080808] border border-white/10">
                              <div className="space-y-2">
                                <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/60 font-bold">
                                  Background Video URL (.mp4)
                                </label>
                                <input
                                  type="text"
                                  value={currentSlide.videoUrl || ""}
                                  onChange={(e) => {
                                    const updated = [...slides];
                                    updated[selectedSlideIndex].videoUrl = e.target.value;
                                    setSlides(updated);
                                  }}
                                  placeholder="/videos/reels/travelashraf1.mp4"
                                  className="w-full bg-[#111113] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:border-white/40 outline-none font-mono"
                                />
                                <div className="p-2.5 rounded-xl bg-[#111113] border border-white/10 space-y-1 text-[11px]">
                                  <div className="flex justify-between text-white/50">
                                    <span>Suggested Video Specs:</span>
                                    <span className="text-emerald-400 font-mono font-bold">&lt; 15 MB</span>
                                  </div>
                                  <p className="text-white/70">
                                    Resolution: <strong className="text-white">1920×1080 (16:9 Landscape)</strong> · 30 fps MP4
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/60 font-bold">
                                    Fallback Poster Image
                                  </label>
                                  <CloudinaryUploadButton
                                    folder="ashraf-travel/hero"
                                    onSuccess={(url) => {
                                      const updated = [...slides];
                                      updated[selectedSlideIndex].posterImage = url;
                                      setSlides(updated);
                                    }}
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={currentSlide.posterImage || ""}
                                  onChange={(e) => {
                                    const updated = [...slides];
                                    updated[selectedSlideIndex].posterImage = e.target.value;
                                    setSlides(updated);
                                  }}
                                  placeholder="/img/travel/kashmir_hero.jpg"
                                  className="w-full bg-[#111113] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:border-white/40 outline-none"
                                />
                                <ImageInspectorBadge
                                  src={currentSlide.posterImage || "/img/travel/kashmir_hero.jpg"}
                                  suggestedSize="< 400 KB"
                                  suggestedDimensions="1920×1080 (16:9 Landscape)"
                                  expectedRatio="landscape"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 2. HEADINGS & LABELS (ALL OPTIONAL) */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5f5f5]/70">
                              Slide Typography & Badges
                            </h4>
                            <span className="text-[10px] text-white/40">All fields are optional</span>
                          </div>

                          {/* Top Badge & Eyebrow */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                                Top Badge Pill <span className="text-white/30 lowercase">(optional)</span>
                              </label>
                              <input
                                type="text"
                                value={currentSlide.badgeLabel || ""}
                                onChange={(e) => {
                                  const updated = [...slides];
                                  updated[selectedSlideIndex].badgeLabel = e.target.value;
                                  setSlides(updated);
                                }}
                                placeholder="e.g. Official Announcement · High-Altitude Expedition"
                                className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:border-white/40 outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                                Slide Eyebrow Text <span className="text-white/30 lowercase">(optional)</span>
                              </label>
                              <input
                                type="text"
                                value={currentSlide.eyebrow ?? "ASHRAF SIDDIQUI · SOLO TRAVELLER · JAIPUR, INDIA"}
                                onChange={(e) => {
                                  const updated = [...slides];
                                  updated[selectedSlideIndex].eyebrow = e.target.value;
                                  setSlides(updated);
                                }}
                                placeholder="ASHRAF SIDDIQUI · SOLO TRAVELLER · JAIPUR, INDIA"
                                className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:border-white/40 outline-none"
                              />
                            </div>
                          </div>

                          {/* Title Lines */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                                Title Line 1 (Solid White) <span className="text-white/30 lowercase">(optional)</span>
                              </label>
                              <input
                                type="text"
                                value={currentSlide.titleLine1 || ""}
                                onChange={(e) => {
                                  const updated = [...slides];
                                  updated[selectedSlideIndex].titleLine1 = e.target.value;
                                  setSlides(updated);
                                }}
                                placeholder="e.g. WINTER SPITI 4×4"
                                className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:border-white/40 outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                                Title Line 2 (Outlined Text) <span className="text-white/30 lowercase">(optional)</span>
                              </label>
                              <input
                                type="text"
                                value={currentSlide.titleLine2 || ""}
                                onChange={(e) => {
                                  const updated = [...slides];
                                  updated[selectedSlideIndex].titleLine2 = e.target.value;
                                  setSlides(updated);
                                }}
                                placeholder="e.g. WHITE EXPEDITION."
                                className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:border-white/40 outline-none"
                              />
                            </div>
                          </div>

                          {/* Subtitle / Description */}
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                              Slide Subtitle / Description <span className="text-white/30 lowercase">(optional)</span>
                            </label>
                            <textarea
                              rows={2}
                              value={currentSlide.subtitle || ""}
                              onChange={(e) => {
                                const updated = [...slides];
                                updated[selectedSlideIndex].subtitle = e.target.value;
                                setSlides(updated);
                              }}
                              placeholder="e.g. Cross 15,000-ft frozen Himalayan passes, ancient cliff monasteries & ride across white Spiti plains."
                              className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:border-white/40 outline-none resize-none"
                            />
                          </div>

                          {/* Linked Group Trip */}
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                              Associated Group Trip <span className="text-white/30 lowercase">(optional - for reservation modal)</span>
                            </label>
                            <select
                              value={currentSlide.tripSlug || ""}
                              onChange={(e) => {
                                const updated = [...slides];
                                updated[selectedSlideIndex].tripSlug = e.target.value;
                                setSlides(updated);
                              }}
                              className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:border-white/40 outline-none cursor-pointer"
                            >
                              <option value="">No linked trip (Manual or General Slide)</option>
                              {trips.map((t) => (
                                <option key={t.slug} value={t.slug}>
                                  {t.title} ({t.departureDate}) — ₹{t.pricePerPerson.toLocaleString("en-IN")}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* 3. METRIC PILLS MANAGER (DYNAMIC & OPTIONAL) */}
                        <div className="space-y-3 pt-4 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5f5f5]/70">
                                Slide Metric Pills ({currentSlide.metrics?.length || 0})
                              </h4>
                              <p className="text-[10px] text-white/40">
                                Add, edit or remove pills (Dates, Duration, Altitude, Price, Seats). Entirely optional.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...slides];
                                const existing = updated[selectedSlideIndex].metrics || [];
                                updated[selectedSlideIndex].metrics = [
                                  ...existing,
                                  { label: "LABEL", value: "Value", highlight: false },
                                ];
                                setSlides(updated);
                              }}
                              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <PlusIcon />
                              <span>Add Metric Pill</span>
                            </button>
                          </div>

                          {currentSlide.metrics && currentSlide.metrics.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {currentSlide.metrics.map((m, mIdx) => (
                                <div key={mIdx} className="p-3 rounded-2xl bg-[#080808] border border-white/10 space-y-2 relative group">
                                  <div className="flex items-center justify-between">
                                    <input
                                      type="text"
                                      value={m.label}
                                      onChange={(e) => {
                                        const updated = [...slides];
                                        updated[selectedSlideIndex].metrics[mIdx].label = e.target.value;
                                        setSlides(updated);
                                      }}
                                      placeholder="LABEL"
                                      className="text-[10px] uppercase font-mono font-bold bg-transparent text-[#f5f5f5]/50 border-b border-transparent focus:border-white/30 outline-none w-24"
                                    />
                                    <div className="flex items-center gap-2">
                                      <label className="text-[9px] text-white/40 flex items-center gap-1 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={Boolean(m.highlight)}
                                          onChange={(e) => {
                                            const updated = [...slides];
                                            updated[selectedSlideIndex].metrics[mIdx].highlight = e.target.checked;
                                            setSlides(updated);
                                          }}
                                          className="rounded bg-black border-white/20 text-emerald-400 focus:ring-0"
                                        />
                                        <span>Highlight</span>
                                      </label>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = [...slides];
                                          updated[selectedSlideIndex].metrics = updated[selectedSlideIndex].metrics.filter((_, i) => i !== mIdx);
                                          setSlides(updated);
                                        }}
                                        className="text-white/30 hover:text-red-400 p-0.5 transition-colors cursor-pointer"
                                        title="Remove Pill"
                                      >
                                        <TrashIcon />
                                      </button>
                                    </div>
                                  </div>
                                  <input
                                    type="text"
                                    value={m.value}
                                    onChange={(e) => {
                                      const updated = [...slides];
                                      updated[selectedSlideIndex].metrics[mIdx].value = e.target.value;
                                      setSlides(updated);
                                    }}
                                    placeholder="e.g. 10 Jun – 18 Jun 2026"
                                    className="w-full bg-[#111113] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold focus:border-white/30 outline-none"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 rounded-2xl bg-[#080808]/50 border border-dashed border-white/10 text-center text-xs text-white/40">
                              No metric pills added for this slide. Click &quot;Add Metric Pill&quot; above to add any stat pill.
                            </div>
                          )}
                        </div>

                        {/* 4. CALL-TO-ACTION BUTTONS (DYNAMIC & OPTIONAL) */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5f5f5]/70">
                              Slide Action Buttons (CTAs)
                            </h4>
                            <span className="text-[10px] text-white/40">Enable, disable, or customize buttons</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Primary Button */}
                            <div className="p-4 rounded-2xl bg-[#080808] border border-white/10 space-y-3">
                              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                                <span className="text-xs font-bold text-white">Primary Button (Solid)</span>
                                <label className="flex items-center gap-1.5 text-xs text-white/70 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={currentSlide.primaryCta?.enabled !== false}
                                    onChange={(e) => {
                                      const updated = [...slides];
                                      if (!updated[selectedSlideIndex].primaryCta) {
                                        updated[selectedSlideIndex].primaryCta = { label: "View Trip Details & Reserve", action: "openModal", target: "" };
                                      }
                                      updated[selectedSlideIndex].primaryCta!.enabled = e.target.checked;
                                      setSlides(updated);
                                    }}
                                    className="rounded bg-black border-white/20 text-white focus:ring-0 cursor-pointer"
                                  />
                                  <span>Enabled</span>
                                </label>
                              </div>

                              <div className="space-y-2">
                                <div>
                                  <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">
                                    Button Label
                                  </label>
                                  <input
                                    type="text"
                                    value={currentSlide.primaryCta?.label ?? "View Trip Details & Reserve"}
                                    onChange={(e) => {
                                      const updated = [...slides];
                                      if (!updated[selectedSlideIndex].primaryCta) {
                                        updated[selectedSlideIndex].primaryCta = { label: "", action: "openModal", target: "" };
                                      }
                                      updated[selectedSlideIndex].primaryCta!.label = e.target.value;
                                      setSlides(updated);
                                    }}
                                    placeholder="View Trip Details & Reserve"
                                    className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-white/40 outline-none"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Secondary Button */}
                            <div className="p-4 rounded-2xl bg-[#080808] border border-white/10 space-y-3">
                              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                                <span className="text-xs font-bold text-white">Secondary Button (Outlined)</span>
                                <label className="flex items-center gap-1.5 text-xs text-white/70 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={currentSlide.secondaryCta?.enabled !== false}
                                    onChange={(e) => {
                                      const updated = [...slides];
                                      if (!updated[selectedSlideIndex].secondaryCta) {
                                        updated[selectedSlideIndex].secondaryCta = { label: "Explore All Expeditions", action: "scroll", target: "#group-tours" };
                                      }
                                      updated[selectedSlideIndex].secondaryCta!.enabled = e.target.checked;
                                      setSlides(updated);
                                    }}
                                    className="rounded bg-black border-white/20 text-white focus:ring-0 cursor-pointer"
                                  />
                                  <span>Enabled</span>
                                </label>
                              </div>

                              <div className="space-y-2">
                                <div>
                                  <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">
                                    Button Label
                                  </label>
                                  <input
                                    type="text"
                                    value={currentSlide.secondaryCta?.label ?? "Explore All Expeditions"}
                                    onChange={(e) => {
                                      const updated = [...slides];
                                      if (!updated[selectedSlideIndex].secondaryCta) {
                                        updated[selectedSlideIndex].secondaryCta = { label: "", action: "scroll", target: "#group-tours" };
                                      }
                                      updated[selectedSlideIndex].secondaryCta!.label = e.target.value;
                                      setSlides(updated);
                                    }}
                                    placeholder="Explore All Expeditions"
                                    className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-white/40 outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 2: VISUAL GALLERY
              ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "gallery" && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Visual Photo Gallery
                  </h2>
                  <p className="text-xs text-[#f5f5f5]/50 mt-0.5">
                    Manage high-resolution images, places, states, categories, orientation, and field notes.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newPhoto: GalleryPhotoItem = {
                        id: `g-${Date.now()}`,
                        src: "/img/travel/kashmir_hero.jpg",
                        alt: "New Travel Photo",
                        title: "Untitled Photograph",
                        location: "Location, India",
                        state: "India",
                        year: 2026,
                        category: "Mountains",
                        orientation: "landscape",
                        tags: ["travel", "india"],
                        notes: "Field notes & story behind the photograph.",
                      };
                      setPhotos([newPhoto, ...photos]);
                      setSelectedPhotoIndex(0);
                    }}
                    className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <PlusIcon />
                    <span>Add Photo</span>
                  </button>
                  <button
                    onClick={handleSaveGallery}
                    disabled={isSaving}
                    className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <CheckIcon />
                    <span>{isSaving ? "Saving..." : "Publish Gallery"}</span>
                  </button>
                </div>
              </div>

              {/* Fast Drag-and-Drop Batch Uploader */}
              <GalleryBatchUploader
                onPhotosAdded={(newPhotos) => {
                  setPhotos([...newPhotos, ...photos]);
                  setSelectedPhotoIndex(0);
                }}
              />

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by title, place, state, or notes..."
                    value={gallerySearch}
                    onChange={(e) => setGallerySearch(e.target.value)}
                    className="w-full bg-[#111113] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-white/30 outline-none focus:border-white/30"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {["All", "Mountains", "Roads", "Cultures", "Cities", "Nature", "People"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                        galleryFilter === cat
                          ? "bg-white text-black font-semibold"
                          : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Split layout: Photos List + Detail Editor */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Thumbnails Grid List */}
                <div className="lg:col-span-5 space-y-2 max-h-[720px] overflow-y-auto pr-1">
                  {filteredPhotos.map((p, idx) => {
                    const originalIdx = photos.findIndex((item) => item.id === p.id);
                    const isSelected = selectedPhotoIndex === originalIdx;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPhotoIndex(originalIdx)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? "bg-white/10 border-white/40 text-white shadow-lg"
                            : "bg-[#111113] border-white/5 text-[#f5f5f5]/70 hover:bg-white/5"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 relative border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.src} alt={p.alt} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate text-white">{p.title || "Untitled"}</p>
                          <p className="text-[10px] text-[#f5f5f5]/50 truncate">{p.location} · {p.state}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[9px] font-semibold text-white/70">
                              {p.category}
                            </span>
                            <span className="text-[10px] text-white/40">{p.year}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("Delete this photo?")) {
                              setPhotos(photos.filter((_, i) => i !== originalIdx));
                              setSelectedPhotoIndex(0);
                            }
                          }}
                          className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete photo"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Photo Detail Editor */}
                <div className="lg:col-span-7">
                  {currentPhoto ? (
                    <div className="p-6 rounded-3xl bg-[#111113] border border-white/10 space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#f5f5f5]/70">
                          Editing Photo: {currentPhoto.title}
                        </h3>
                        <span className="text-[11px] font-mono text-white/40">ID: {currentPhoto.id}</span>
                      </div>

                      {/* Image Preview & Src */}
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-full sm:w-44 h-32 rounded-2xl overflow-hidden bg-black border border-white/15 relative shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={currentPhoto.src} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 w-full space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold">
                                Image URL / Path
                              </label>
                              <CloudinaryUploadButton
                                folder="ashraf-travel/gallery"
                                onSuccess={(url) => {
                                  const arr = [...photos];
                                  arr[selectedPhotoIndex].src = url;
                                  setPhotos(arr);
                                }}
                              />
                            </div>
                            <input
                              type="text"
                              value={currentPhoto.src}
                              onChange={(e) => {
                                const arr = [...photos];
                                arr[selectedPhotoIndex].src = e.target.value;
                                setPhotos(arr);
                              }}
                              className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                            />
                          </div>

                          {/* Image Size Inspector with Suggested Dimensions */}
                          <ImageInspectorBadge
                            src={currentPhoto.src}
                            suggestedSize={
                              currentPhoto.orientation === "landscape"
                                ? "< 600 KB"
                                : currentPhoto.orientation === "portrait"
                                ? "< 500 KB"
                                : "< 400 KB"
                            }
                            suggestedDimensions={
                              currentPhoto.orientation === "landscape"
                                ? "1920×1280 (3:2) or 1920×1080 (16:9)"
                                : currentPhoto.orientation === "portrait"
                                ? "1080×1350 (4:5) or 1080×1920 (9:16)"
                                : "1080×1080 (1:1 Square)"
                            }
                            expectedRatio={currentPhoto.orientation}
                          />
                        </div>
                      </div>

                      {/* Title & Category */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Photograph Title
                          </label>
                          <input
                            type="text"
                            value={currentPhoto.title}
                            onChange={(e) => {
                              const arr = [...photos];
                              arr[selectedPhotoIndex].title = e.target.value;
                              setPhotos(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Category
                          </label>
                          <select
                            value={currentPhoto.category}
                            onChange={(e) => {
                              const arr = [...photos];
                              arr[selectedPhotoIndex].category = e.target.value;
                              setPhotos(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          >
                            {["Mountains", "Roads", "Cultures", "Cities", "Nature", "People"].map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Location, State, Year, Orientation */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Location / Place
                          </label>
                          <input
                            type="text"
                            value={currentPhoto.location}
                            onChange={(e) => {
                              const arr = [...photos];
                              arr[selectedPhotoIndex].location = e.target.value;
                              setPhotos(arr);
                            }}
                            placeholder="e.g. Dal Lake, Srinagar"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            value={currentPhoto.state}
                            onChange={(e) => {
                              const arr = [...photos];
                              arr[selectedPhotoIndex].state = e.target.value;
                              setPhotos(arr);
                            }}
                            placeholder="e.g. Kashmir"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Year
                          </label>
                          <input
                            type="number"
                            value={currentPhoto.year}
                            onChange={(e) => {
                              const arr = [...photos];
                              arr[selectedPhotoIndex].year = Number(e.target.value) || 2026;
                              setPhotos(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 font-mono"
                          />
                        </div>
                      </div>

                      {/* Field Notes (Crucial request) */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                          Field Notes & Story Behind the Shot
                        </label>
                        <textarea
                          rows={3}
                          value={currentPhoto.notes || ""}
                          onChange={(e) => {
                            const arr = [...photos];
                            arr[selectedPhotoIndex].notes = e.target.value;
                            setPhotos(arr);
                          }}
                          placeholder="Write notes about the moment, conditions, or story behind this photograph..."
                          className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 resize-none leading-relaxed"
                        />
                      </div>

                      {/* Tags & Orientation */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Tags (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={currentPhoto.tags.join(", ")}
                            onChange={(e) => {
                              const arr = [...photos];
                              arr[selectedPhotoIndex].tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                              setPhotos(arr);
                            }}
                            placeholder="kashmir, dal lake, sunrise, mountains"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Orientation (Horizontal vs Vertical)
                          </label>
                          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#080808] border border-white/15 rounded-xl">
                            <button
                              type="button"
                              onClick={() => {
                                const arr = [...photos];
                                arr[selectedPhotoIndex].orientation = "landscape";
                                setPhotos(arr);
                              }}
                              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                                currentPhoto.orientation === "landscape"
                                  ? "bg-white text-black shadow-sm"
                                  : "text-white/60 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              Horizontal (16:9)
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const arr = [...photos];
                                arr[selectedPhotoIndex].orientation = "portrait";
                                setPhotos(arr);
                              }}
                              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                                currentPhoto.orientation === "portrait"
                                  ? "bg-white text-black shadow-sm"
                                  : "text-white/60 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              Vertical (3:4)
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const arr = [...photos];
                                arr[selectedPhotoIndex].orientation = "square";
                                setPhotos(arr);
                              }}
                              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                                currentPhoto.orientation === "square"
                                  ? "bg-white text-black shadow-sm"
                                  : "text-white/60 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              Square (1:1)
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-white/40 bg-[#111113] rounded-3xl border border-white/5">
                      Select a photo from the left to edit its details.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 3: REELS & VIDEOS
              ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "reels" && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Reels & Video Dispatches
                  </h2>
                  <p className="text-xs text-[#f5f5f5]/50 mt-0.5">
                    Manage vertical travel reels, MP4 videos, Instagram captions, sound tracks, and engagement stats.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newReel: ReelItem = {
                        id: `reel-${Date.now()}`,
                        slug: `new-reel-${Date.now()}`,
                        title: "New Video Dispatch",
                        caption: "Travel story and caption for Instagram & web.",
                        destination: "Himalayas",
                        destinationSlug: "himalayas",
                        state: "India",
                        category: "Road Adventures",
                        localVideoUrl: "/videos/reels/travelashraf1.mp4",
                        posterUrl: "/img/travel/kashmir_hero.jpg",
                        videoUrl: "/videos/reels/travelashraf1.mp4",
                        duration: "0:45",
                        views: "25K",
                        likes: 2500,
                        commentsCount: 88,
                        soundtrack: "Original Audio · ashraf._siddiqui",
                        locationName: "High Altitude Pass",
                        publishedDate: "2026",
                        tags: ["Himalayas", "SoloTravel"],
                        instagramHandle: "@ashraf._siddiqui",
                      };
                      setReels([newReel, ...reels]);
                      setSelectedReelIndex(0);
                    }}
                    className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <PlusIcon />
                    <span>Add Reel</span>
                  </button>
                  <button
                    onClick={handleSaveReels}
                    disabled={isSaving}
                    className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <CheckIcon />
                    <span>{isSaving ? "Saving..." : "Publish Reels"}</span>
                  </button>
                </div>
              </div>

              {/* Split layout: Reel List + Reel Editor */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Reels List */}
                <div className="lg:col-span-5 space-y-2 max-h-[720px] overflow-y-auto pr-1">
                  {reels.map((r, idx) => {
                    const isSelected = selectedReelIndex === idx;
                    return (
                      <div
                        key={r.id}
                        onClick={() => setSelectedReelIndex(idx)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? "bg-white/10 border-white/40 text-white shadow-lg"
                            : "bg-[#111113] border-white/5 text-[#f5f5f5]/70 hover:bg-white/5"
                        }`}
                      >
                        <div className="w-14 h-20 rounded-xl overflow-hidden bg-black shrink-0 relative border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.posterUrl} alt="" className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-[8px] font-mono font-bold text-white">
                            {r.duration}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate text-white">{r.title}</p>
                          <p className="text-[10px] text-[#f5f5f5]/50 truncate">{r.locationName}</p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-white/50">
                            <span>{r.views} views</span>
                            <span>·</span>
                            <span>{r.likes.toLocaleString()} likes</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("Delete this reel?")) {
                              setReels(reels.filter((_, i) => i !== idx));
                              setSelectedReelIndex(0);
                            }
                          }}
                          className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete reel"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Reel Editor */}
                <div className="lg:col-span-7">
                  {currentReel ? (
                    <div className="p-6 rounded-3xl bg-[#111113] border border-white/10 space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#f5f5f5]/70">
                          Editing Reel: {currentReel.title}
                        </h3>
                        <span className="text-[11px] font-mono text-white/40">{currentReel.id}</span>
                      </div>

                      {/* Video Player Preview */}
                      <div className="relative rounded-2xl overflow-hidden bg-black border border-white/15 h-56 flex items-center justify-center">
                        <video
                          key={currentReel.localVideoUrl || currentReel.videoUrl}
                          src={currentReel.localVideoUrl || currentReel.videoUrl}
                          controls
                          className="h-full object-contain"
                        />
                      </div>

                      {/* Live Video Responsiveness Alert */}
                      <VideoInspectorBadge
                        videoUrl={currentReel.localVideoUrl || currentReel.videoUrl}
                        targetType="reels"
                      />

                      {/* Title & Category */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Reel Title
                          </label>
                          <input
                            type="text"
                            value={currentReel.title}
                            onChange={(e) => {
                              const arr = [...reels];
                              arr[selectedReelIndex].title = e.target.value;
                              setReels(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Category
                          </label>
                          <input
                            type="text"
                            value={currentReel.category}
                            onChange={(e) => {
                              const arr = [...reels];
                              arr[selectedReelIndex].category = e.target.value;
                              setReels(arr);
                            }}
                            placeholder="Road Adventures, Mountain Passes, etc."
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>
                      </div>

                      {/* Video URLs & Poster with Dimension Guide */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Video URL (.mp4)
                          </label>
                          <input
                            type="text"
                            value={currentReel.localVideoUrl}
                            onChange={(e) => {
                              const arr = [...reels];
                              arr[selectedReelIndex].localVideoUrl = e.target.value;
                              arr[selectedReelIndex].videoUrl = e.target.value;
                              setReels(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 font-mono"
                          />
                          <div className="p-2.5 rounded-xl bg-[#080808] border border-white/10 space-y-1 text-[11px]">
                            <div className="flex justify-between text-white/50">
                              <span>Reel Format Target:</span>
                              <span className="text-emerald-400 font-mono font-bold">&lt; 25 MB</span>
                            </div>
                            <p className="text-white/70">
                              Strictly Vertical: <strong className="text-white">1080×1920 (9:16 Aspect Ratio)</strong> · 30-60 fps MP4
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Poster Image URL
                          </label>
                          <input
                            type="text"
                            value={currentReel.posterUrl}
                            onChange={(e) => {
                              const arr = [...reels];
                              arr[selectedReelIndex].posterUrl = e.target.value;
                              setReels(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                          <ImageInspectorBadge
                            src={currentReel.posterUrl}
                            suggestedSize="< 350 KB"
                            suggestedDimensions="1080×1920 (9:16 Vertical)"
                            expectedRatio="portrait"
                          />
                        </div>
                      </div>

                      {/* Caption */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                          Reel Caption & Story
                        </label>
                        <textarea
                          rows={3}
                          value={currentReel.caption}
                          onChange={(e) => {
                            const arr = [...reels];
                            arr[selectedReelIndex].caption = e.target.value;
                            setReels(arr);
                          }}
                          className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 resize-none leading-relaxed"
                        />
                      </div>

                      {/* Location & Soundtrack */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Location Name
                          </label>
                          <input
                            type="text"
                            value={currentReel.locationName}
                            onChange={(e) => {
                              const arr = [...reels];
                              arr[selectedReelIndex].locationName = e.target.value;
                              setReels(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Soundtrack / Audio
                          </label>
                          <input
                            type="text"
                            value={currentReel.soundtrack}
                            onChange={(e) => {
                              const arr = [...reels];
                              arr[selectedReelIndex].soundtrack = e.target.value;
                              setReels(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>
                      </div>

                      {/* Stats: Views, Likes, Duration */}
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Views Count
                          </label>
                          <input
                            type="text"
                            value={currentReel.views}
                            onChange={(e) => {
                              const arr = [...reels];
                              arr[selectedReelIndex].views = e.target.value;
                              setReels(arr);
                            }}
                            placeholder="140K"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Likes Count
                          </label>
                          <input
                            type="number"
                            value={currentReel.likes}
                            onChange={(e) => {
                              const arr = [...reels];
                              arr[selectedReelIndex].likes = Number(e.target.value) || 0;
                              setReels(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={currentReel.duration}
                            onChange={(e) => {
                              const arr = [...reels];
                              arr[selectedReelIndex].duration = e.target.value;
                              setReels(arr);
                            }}
                            placeholder="0:58"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-white/40 bg-[#111113] rounded-3xl border border-white/5">
                      Select a reel from the left to edit.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 4: GROUP EXPEDITIONS
              ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "trips" && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Group Expeditions & Tours
                  </h2>
                  <p className="text-xs text-[#f5f5f5]/50 mt-0.5">
                    Manage upcoming group departures, seats availability, pricing, duration, and inclusions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newTrip: GroupTripItem = {
                        id: `trip-${Date.now()}`,
                        slug: `expedition-${Date.now()}`,
                        title: "New Himalayan Expedition",
                        tagline: "High-altitude curated adventure with Ashraf Siddiqui.",
                        destination: "Ladakh",
                        destinationSlug: "ladakh",
                        state: "Ladakh",
                        coverImage: "/img/travel/ladakh.jpg",
                        gallery: ["/img/travel/ladakh.jpg"],
                        departureDate: "10 Jun 2026",
                        returnDate: "18 Jun 2026",
                        durationDays: 9,
                        durationLabel: "9 Days / 8 Nights",
                        departureCity: "Leh",
                        pricePerPerson: 32000,
                        currency: "INR (₹)",
                        maxGroupSize: 12,
                        availableSeats: 6,
                        totalSeats: 12,
                        difficulty: "Challenging",
                        status: "Open for Booking",
                        isConfirmed: true,
                        overview: "Detailed trip overview description.",
                        highlights: ["High-altitude passes", "Stargazing at Pangong", "Monastery visits"],
                        inclusions: ["All Stays", "Breakfast & Dinner", "Dedicated 4x4 Transit", "Permits"],
                        exclusions: ["Flights to departure city", "Lunches", "Personal gear"],
                        dayWiseItinerary: [
                          {
                            day: 1,
                            title: "Arrival & Base Camp Check-In",
                            description: "Welcome gathering, acclimatization walk, and evening welcome dinner.",
                            mealsIncluded: "Welcome Dinner",
                            nightStay: "Heritage Mountain Stay",
                          },
                          {
                            day: 2,
                            title: "High-Altitude Pass & Lake Circuit",
                            description: "Scenic 4x4 expedition through mountain corridors with curated photo stops.",
                            mealsIncluded: "Breakfast & Dinner",
                            nightStay: "Alpine Stargazing Camp",
                          },
                        ],
                      };
                      setTrips([newTrip, ...trips]);
                      setSelectedTripIndex(0);
                    }}
                    className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <PlusIcon />
                    <span>Add Expedition</span>
                  </button>
                  <button
                    onClick={handleSaveTrips}
                    disabled={isSaving}
                    className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <CheckIcon />
                    <span>{isSaving ? "Saving..." : "Publish Expeditions"}</span>
                  </button>
                </div>
              </div>

              {/* Split layout: Trips List + Trip Editor */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Trips List */}
                <div className="lg:col-span-5 space-y-2 max-h-[720px] overflow-y-auto pr-1">
                  {trips.map((t, idx) => {
                    const isSelected = selectedTripIndex === idx;
                    const isUpcoming = t.isUpcoming || t.status === "Upcoming";
                    return (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTripIndex(idx)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? "bg-white/10 border-white/40 text-white shadow-lg"
                            : "bg-[#111113] border-white/5 text-[#f5f5f5]/70 hover:bg-white/5"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 relative border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={t.coverImage} alt="" className={`w-full h-full object-cover ${isUpcoming ? "opacity-60 grayscale-[30%]" : ""}`} />
                          {isUpcoming && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-amber-400">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate text-white flex items-center gap-1.5">
                            {isUpcoming && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white font-mono font-bold shrink-0 flex items-center gap-1">
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <span>UPCOMING</span>
                              </span>
                            )}
                            <span className="truncate">{t.title}</span>
                          </p>
                          <p className="text-[10px] text-[#f5f5f5]/50 truncate">{t.departureDate} · {t.durationLabel}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {isUpcoming ? (
                              <span className="text-[10px] text-amber-400 font-semibold">
                                Locked Preview (Tagline Only)
                              </span>
                            ) : (
                              <>
                                <span className="text-[11px] font-bold text-white">
                                  ₹{t.pricePerPerson.toLocaleString()}
                                </span>
                                <span className="text-[10px] text-emerald-400 font-semibold">
                                  {t.availableSeats} / {t.totalSeats} seats
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("Delete this expedition?")) {
                              setTrips(trips.filter((_, i) => i !== idx));
                              setSelectedTripIndex(0);
                            }
                          }}
                          className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete trip"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Trip Editor */}
                <div className="lg:col-span-7">
                  {currentTrip ? (
                    <div className="p-6 rounded-3xl bg-[#111113] border border-white/10 space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#f5f5f5]/70">
                          Editing: {currentTrip.title}
                        </h3>
                        <span className="text-[11px] font-mono text-white/40">{currentTrip.id}</span>
                      </div>

                      {/* Expedition Mode Selector: Live vs Upcoming */}
                      <div className="p-4 rounded-2xl bg-[#080808] border border-white/10 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold block">
                              Expedition Status Mode
                            </span>
                            <p className="text-xs text-white/60">
                              Toggle between live booking mode or upcoming locked preview.
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const arr = [...trips];
                                arr[selectedTripIndex].isUpcoming = false;
                                if (arr[selectedTripIndex].status === "Upcoming") {
                                  arr[selectedTripIndex].status = "Open for Booking";
                                }
                                setTrips(arr);
                              }}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                                !currentTrip.isUpcoming && currentTrip.status !== "Upcoming"
                                  ? "bg-emerald-500 text-black font-bold shadow-md"
                                  : "bg-white/5 text-white/60 hover:text-white"
                              }`}
                            >
                              <div className="w-2 h-2 rounded-full bg-current" />
                              <span>Live Mode</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const arr = [...trips];
                                arr[selectedTripIndex].isUpcoming = true;
                                arr[selectedTripIndex].status = "Upcoming";
                                setTrips(arr);
                              }}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                                currentTrip.isUpcoming || currentTrip.status === "Upcoming"
                                  ? "bg-amber-400 text-black font-bold shadow-md"
                                  : "bg-white/5 text-white/60 hover:text-white"
                              }`}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              </svg>
                              <span>Upcoming (Locked)</span>
                            </button>
                          </div>
                        </div>

                        {currentTrip.isUpcoming || currentTrip.status === "Upcoming" ? (
                          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400 shrink-0 mt-0.5">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <div>
                              <p className="font-bold text-amber-300">Upcoming Locked Mode Active</p>
                              <p className="text-[11px] opacity-90 mt-0.5">
                                This trip will show with <strong>opacity &amp; lock icon</strong>. Dates, price, and seats are <strong>hidden</strong>; visitors will <strong>only see the tagline</strong>.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-[11px] flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>
                              <strong>Live Mode Active:</strong> Travelers see full dates, transparent pricing, remaining seats, and can book directly via the modal.
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Title & Tagline */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Expedition Title
                          </label>
                          <input
                            type="text"
                            value={currentTrip.title}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].title = e.target.value;
                              setTrips(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Short Tagline / Teaser
                          </label>
                          <input
                            type="text"
                            value={currentTrip.tagline}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].tagline = e.target.value;
                              setTrips(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>
                      </div>

                      {/* Dates, Duration, Destination */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Departure Date
                          </label>
                          <input
                            type="text"
                            value={currentTrip.departureDate}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].departureDate = e.target.value;
                              setTrips(arr);
                            }}
                            placeholder="14 Feb 2026"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Return Date
                          </label>
                          <input
                            type="text"
                            value={currentTrip.returnDate}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].returnDate = e.target.value;
                              setTrips(arr);
                            }}
                            placeholder="21 Feb 2026"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Duration Label
                          </label>
                          <input
                            type="text"
                            value={currentTrip.durationLabel}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].durationLabel = e.target.value;
                              setTrips(arr);
                            }}
                            placeholder="8 Days / 7 Nights"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>
                      </div>

                      {/* Pricing & Seats */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Price (₹ Per Person)
                          </label>
                          <input
                            type="number"
                            value={currentTrip.pricePerPerson}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].pricePerPerson = Number(e.target.value) || 0;
                              setTrips(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Seats Left Available
                          </label>
                          <input
                            type="number"
                            value={currentTrip.availableSeats}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].availableSeats = Number(e.target.value) || 0;
                              setTrips(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Status Badge
                          </label>
                          <input
                            type="text"
                            value={currentTrip.status}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].status = e.target.value;
                              setTrips(arr);
                            }}
                            placeholder="Open for Booking, Almost Full"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>
                      </div>

                      {/* Cover Image & Destination with Image Size Guide */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold">
                              Cover Image Path
                            </label>
                            <CloudinaryUploadButton
                              folder="ashraf-travel/trips"
                              onSuccess={(url) => {
                                const arr = [...trips];
                                arr[selectedTripIndex].coverImage = url;
                                setTrips(arr);
                              }}
                            />
                          </div>
                          <input
                            type="text"
                            value={currentTrip.coverImage}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].coverImage = e.target.value;
                              setTrips(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                          <ImageInspectorBadge
                            src={currentTrip.coverImage}
                            suggestedSize="< 500 KB"
                            suggestedDimensions="1600×900 (16:9 Landscape)"
                            expectedRatio="landscape"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Destination & State
                          </label>
                          <input
                            type="text"
                            value={`${currentTrip.destination}, ${currentTrip.state}`}
                            onChange={(e) => {
                              const parts = e.target.value.split(",");
                              const arr = [...trips];
                              arr[selectedTripIndex].destination = (parts[0] || "").trim();
                              arr[selectedTripIndex].state = (parts[1] || "").trim();
                              setTrips(arr);
                            }}
                            placeholder="Kashmir, Jammu and Kashmir"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>
                      </div>

                      {/* Inclusions & Exclusions */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Inclusions (one item per line)
                          </label>
                          <textarea
                            rows={4}
                            value={(currentTrip.inclusions || []).join("\n")}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].inclusions = e.target.value.split("\n").filter(Boolean);
                              setTrips(arr);
                            }}
                            placeholder="All Stays&#10;Breakfast & Dinner&#10;Dedicated 4x4 Transit&#10;Permits & Fees"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 font-mono resize-none leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Exclusions (one item per line)
                          </label>
                          <textarea
                            rows={4}
                            value={(currentTrip.exclusions || []).join("\n")}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].exclusions = e.target.value.split("\n").filter(Boolean);
                              setTrips(arr);
                            }}
                            placeholder="Flights to departure city&#10;Lunches&#10;Personal gear & shopping"
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 font-mono resize-none leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Highlights */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                          Trip Highlights (one bullet point per line)
                        </label>
                        <textarea
                          rows={3}
                          value={(currentTrip.highlights || []).join("\n")}
                          onChange={(e) => {
                            const arr = [...trips];
                            arr[selectedTripIndex].highlights = e.target.value.split("\n").filter(Boolean);
                            setTrips(arr);
                          }}
                          placeholder="Frozen Dal Lake and wooden houseboats&#10;Cable car to Apharwat Peak 14,000 ft&#10;Saffron Kehwa by evening bonfires"
                          className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 resize-none leading-relaxed"
                        />
                      </div>

                      {/* ══════════════════════════════════════════════════════════
                          IN-DEPTH DAY-BY-DAY ITINERARY PLANNER (DYNAMIC)
                          ══════════════════════════════════════════════════════════ */}
                      <div className="pt-4 border-t border-white/10 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                                <span>Day-by-Day Trip Plan</span>
                              </h4>
                              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-xs font-semibold">
                                {(currentTrip.dayWiseItinerary || []).length} Days
                              </span>
                            </div>
                            <p className="text-xs text-white/50 mt-0.5">
                              Edit, add, or delete days for the in-depth itinerary shown in the traveler booking modal.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const arr = [...trips];
                              const currentItinerary = arr[selectedTripIndex].dayWiseItinerary || [];
                              const nextDayNum = currentItinerary.length + 1;
                              const newDay: TripDayItineraryItem = {
                                day: nextDayNum,
                                title: `Day ${nextDayNum} Route & Exploration`,
                                description: "Detailed day route, viewpoints, local meals, and activities.",
                                mealsIncluded: "Breakfast & Dinner",
                                nightStay: "Base Stay / Hotel",
                              };
                              arr[selectedTripIndex].dayWiseItinerary = [...currentItinerary, newDay];
                              setTrips(arr);
                            }}
                            className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
                          >
                            <PlusIcon />
                            <span>Add Day</span>
                          </button>
                        </div>

                        {/* List of Day Cards */}
                        <div className="space-y-3">
                          {(currentTrip.dayWiseItinerary || []).length > 0 ? (
                            (currentTrip.dayWiseItinerary || []).map((dayItem, dIdx) => (
                              <div
                                key={dIdx}
                                className="p-4 rounded-2xl bg-[#080808] border border-white/10 space-y-3 relative group"
                              >
                                {/* Card Header with Day Badge & Actions */}
                                <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-mono text-xs font-bold border border-white/10">
                                      Day {dayItem.day || dIdx + 1}
                                    </span>
                                    <span className="text-xs text-white/40 font-mono">
                                      Stage #{dIdx + 1}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1">
                                    {/* Move Up */}
                                    <button
                                      type="button"
                                      disabled={dIdx === 0}
                                      onClick={() => {
                                        if (dIdx === 0) return;
                                        const arr = [...trips];
                                        const itin = [...(arr[selectedTripIndex].dayWiseItinerary || [])];
                                        const temp = itin[dIdx];
                                        itin[dIdx] = itin[dIdx - 1];
                                        itin[dIdx - 1] = temp;
                                        // Renumber days
                                        itin.forEach((item, i) => { item.day = i + 1; });
                                        arr[selectedTripIndex].dayWiseItinerary = itin;
                                        setTrips(arr);
                                      }}
                                      className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-20 cursor-pointer"
                                      title="Move Day Up"
                                    >
                                      ▲
                                    </button>

                                    {/* Move Down */}
                                    <button
                                      type="button"
                                      disabled={dIdx === (currentTrip.dayWiseItinerary?.length || 0) - 1}
                                      onClick={() => {
                                        const itin = [...(currentTrip.dayWiseItinerary || [])];
                                        if (dIdx >= itin.length - 1) return;
                                        const arr = [...trips];
                                        const temp = itin[dIdx];
                                        itin[dIdx] = itin[dIdx + 1];
                                        itin[dIdx + 1] = temp;
                                        // Renumber days
                                        itin.forEach((item, i) => { item.day = i + 1; });
                                        arr[selectedTripIndex].dayWiseItinerary = itin;
                                        setTrips(arr);
                                      }}
                                      className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-20 cursor-pointer"
                                      title="Move Day Down"
                                    >
                                      ▼
                                    </button>

                                    {/* Delete Day */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (confirm(`Delete Day ${dayItem.day}?`)) {
                                          const arr = [...trips];
                                          const itin = (arr[selectedTripIndex].dayWiseItinerary || []).filter((_, i) => i !== dIdx);
                                          // Renumber days
                                          itin.forEach((item, i) => { item.day = i + 1; });
                                          arr[selectedTripIndex].dayWiseItinerary = itin;
                                          setTrips(arr);
                                        }
                                      }}
                                      className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors ml-1 cursor-pointer"
                                      title="Delete this Day"
                                    >
                                      <TrashIcon />
                                    </button>
                                  </div>
                                </div>

                                {/* Day Title & Night Stay */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">
                                      Day Title
                                    </label>
                                    <input
                                      type="text"
                                      value={dayItem.title || ""}
                                      onChange={(e) => {
                                        const arr = [...trips];
                                        const itin = [...(arr[selectedTripIndex].dayWiseItinerary || [])];
                                        itin[dIdx] = { ...itin[dIdx], title: e.target.value };
                                        arr[selectedTripIndex].dayWiseItinerary = itin;
                                        setTrips(arr);
                                      }}
                                      placeholder="e.g. Transit to Srinagar & Dal Lake Welcome"
                                      className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40 font-semibold"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">
                                      Night Stay / Accommodation
                                    </label>
                                    <input
                                      type="text"
                                      value={dayItem.nightStay || ""}
                                      onChange={(e) => {
                                        const arr = [...trips];
                                        const itin = [...(arr[selectedTripIndex].dayWiseItinerary || [])];
                                        itin[dIdx] = { ...itin[dIdx], nightStay: e.target.value };
                                        arr[selectedTripIndex].dayWiseItinerary = itin;
                                        setTrips(arr);
                                      }}
                                      placeholder="e.g. Srinagar Hotel / Cedar Houseboat"
                                      className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
                                    />
                                  </div>
                                </div>

                                {/* Meals Included */}
                                <div>
                                  <label className="block text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">
                                    Meals Included
                                  </label>
                                  <input
                                    type="text"
                                    value={dayItem.mealsIncluded || ""}
                                    onChange={(e) => {
                                      const arr = [...trips];
                                      const itin = [...(arr[selectedTripIndex].dayWiseItinerary || [])];
                                      itin[dIdx] = { ...itin[dIdx], mealsIncluded: e.target.value };
                                      arr[selectedTripIndex].dayWiseItinerary = itin;
                                      setTrips(arr);
                                    }}
                                    placeholder="e.g. Welcome Kehwa & Dinner, Breakfast & Dinner"
                                    className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40 text-emerald-400 font-mono"
                                  />
                                </div>

                                {/* Day Description & Route Activities */}
                                <div>
                                  <label className="block text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">
                                    Route Activities &amp; Experience Details
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={dayItem.description || ""}
                                    onChange={(e) => {
                                      const arr = [...trips];
                                      const itin = [...(arr[selectedTripIndex].dayWiseItinerary || [])];
                                      itin[dIdx] = { ...itin[dIdx], description: e.target.value };
                                      arr[selectedTripIndex].dayWiseItinerary = itin;
                                      setTrips(arr);
                                    }}
                                    placeholder="Describe the day's route, scenic viewpoints, photo stops, and local interactions..."
                                    className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40 resize-none leading-relaxed"
                                  />
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-8 text-center bg-[#080808] border border-dashed border-white/15 rounded-2xl space-y-3">
                              <p className="text-xs text-white/50">
                                No daily itinerary days defined for this trip yet.
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  const arr = [...trips];
                                  arr[selectedTripIndex].dayWiseItinerary = [
                                    {
                                      day: 1,
                                      title: "Day 1 Welcome & Base Check-In",
                                      description: "Arrive at destination, meet the group, and settle into your stay.",
                                      mealsIncluded: "Welcome Dinner",
                                      nightStay: "Heritage Base Stay",
                                    },
                                  ];
                                  setTrips(arr);
                                }}
                                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all cursor-pointer"
                              >
                                + Add First Day to Itinerary
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-white/40 bg-[#111113] rounded-3xl border border-white/5">
                      Select an expedition to edit.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 5: TRAVEL STORIES & FIELD DISPATCHES
              ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "stories" && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Travel Stories & Field Notes
                  </h2>
                  <p className="text-xs text-[#f5f5f5]/50 mt-0.5">
                    Draft, publish, and curate multi-section editorial accounts, high-altitude field notes, and photo galleries.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddStory}
                    className="px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusIcon />
                    <span>New Story</span>
                  </button>
                  <button
                    onClick={handleSaveStories}
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg cursor-pointer shrink-0"
                  >
                    <CheckIcon />
                    <span>{isSaving ? "Publishing..." : "Publish All Stories"}</span>
                  </button>
                </div>
              </div>

              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Search stories by title, destination, state, or tags..."
                    value={storySearch}
                    onChange={(e) => setStorySearch(e.target.value)}
                    className="w-full bg-[#111113] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-white/30 outline-none focus:border-white/30"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {["All", "Mountain Stories", "Road Adventures", "Hidden India", "Northeast Trails"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setStoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                        storyFilter === cat
                          ? "bg-white text-black font-semibold"
                          : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Stories Editor Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Stories List */}
                <div className="lg:col-span-5 space-y-2 max-h-[760px] overflow-y-auto pr-1">
                  {filteredStories.map((story, idx) => {
                    const actualIdx = stories.findIndex((s) => s.id === story.id);
                    const isSelected = selectedStoryIndex === actualIdx;
                    return (
                      <div
                        key={story.id}
                        onClick={() => setSelectedStoryIndex(actualIdx)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? "bg-white/10 border-white/40 text-white shadow-lg"
                            : "bg-[#111113] border-white/5 text-[#f5f5f5]/70 hover:bg-white/5"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 relative border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={story.coverImage} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate text-white">{story.title}</p>
                          <p className="text-[10px] text-[#f5f5f5]/50 truncate mt-0.5">
                            {story.destination} · {story.readTime}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: `${story.tagColor || "#38bdf8"}20`, color: story.tagColor || "#38bdf8" }}
                            >
                              {story.category}
                            </span>
                            <span className="text-[10px] text-white/40">
                              {story.sections?.length || 0} sections
                            </span>
                          </div>
                        </div>

                        {/* Order & Delete */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveStory(actualIdx, "up");
                            }}
                            disabled={actualIdx === 0}
                            className="p-1.5 rounded-lg text-white/40 hover:text-white disabled:opacity-20 hover:bg-white/10 transition-colors"
                            title="Move story up"
                          >
                            <ArrowUpIcon />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveStory(actualIdx, "down");
                            }}
                            disabled={actualIdx === stories.length - 1}
                            className="p-1.5 rounded-lg text-white/40 hover:text-white disabled:opacity-20 hover:bg-white/10 transition-colors"
                            title="Move story down"
                          >
                            <ArrowDownIcon />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteStory(actualIdx);
                            }}
                            className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete story"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: Active Story Comprehensive Editor */}
                <div className="lg:col-span-7">
                  {currentStory ? (
                    <div className="p-6 rounded-3xl bg-[#111113] border border-white/10 space-y-6">
                      {/* Editor Top Bar */}
                      <div className="flex items-center justify-between pb-4 border-b border-white/5">
                        <div className="min-w-0 pr-3">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-[#f5f5f5]/70 truncate">
                            Editing: {currentStory.title}
                          </h3>
                          <span className="text-[11px] font-mono text-white/40">ID: {currentStory.id}</span>
                        </div>
                        <Link
                          href={`/travel/stories/${currentStory.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-white flex items-center gap-1.5 shrink-0"
                        >
                          <span>Read Live Article</span>
                          <ExternalLinkIcon />
                        </Link>
                      </div>

                      {/* 1. Article Headline & URL Slug */}
                      <div className="space-y-3 p-4 rounded-2xl bg-[#080808] border border-white/10">
                        <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold block">
                          1. Headline & Unique URL
                        </span>
                        <div>
                          <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Article Title</label>
                          <input
                            type="text"
                            value={currentStory.title}
                            onChange={(e) => updateCurrentStory((s) => ({ ...s, title: e.target.value }))}
                            placeholder="e.g. Kashmir — Where the Mountains Breathe and Time Stands Still"
                            className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40 font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Subtitle / Editorial Hook</label>
                          <textarea
                            rows={2}
                            value={currentStory.subtitle}
                            onChange={(e) => updateCurrentStory((s) => ({ ...s, subtitle: e.target.value }))}
                            placeholder="From solitary shikara drifts on frozen Dal Lake to high-altitude powder runs at Apharwat Peak."
                            className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2 text-base sm:text-xs text-white outline-none focus:border-white/40 resize-none leading-relaxed"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <div className="flex-1">
                            <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">URL Slug</label>
                            <input
                              type="text"
                              value={currentStory.slug}
                              onChange={(e) => updateCurrentStory((s) => ({ ...s, slug: e.target.value }))}
                              placeholder="kashmir-heaven-on-earth"
                              className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white font-mono outline-none focus:border-white/40"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const autoSlug = currentStory.title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)/g, "");
                              updateCurrentStory((s) => ({ ...s, slug: autoSlug }));
                            }}
                            className="sm:mt-5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 shrink-0 font-medium"
                          >
                            Sync from Title
                          </button>
                        </div>
                      </div>

                      {/* 2. Category & Journey Metadata */}
                      <div className="space-y-3 p-4 rounded-2xl bg-[#080808] border border-white/10">
                        <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold block">
                          2. Category & Journey Metadata
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Category</label>
                            <select
                              value={currentStory.category}
                              onChange={(e) => updateCurrentStory((s) => ({ ...s, category: e.target.value as any }))}
                              className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                            >
                              <option value="Mountain Stories">Mountain Stories</option>
                              <option value="Road Adventures">Road Adventures</option>
                              <option value="Hidden India">Hidden India</option>
                              <option value="Northeast Trails">Northeast Trails</option>
                              <option value="Rail Diaries">Rail Diaries</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Destination</label>
                            <input
                              type="text"
                              value={currentStory.destination}
                              onChange={(e) => updateCurrentStory((s) => ({ ...s, destination: e.target.value }))}
                              placeholder="Kashmir"
                              className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">State</label>
                            <input
                              type="text"
                              value={currentStory.state}
                              onChange={(e) => updateCurrentStory((s) => ({ ...s, state: e.target.value }))}
                              placeholder="Jammu and Kashmir"
                              className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Publication Date</label>
                            <input
                              type="text"
                              value={currentStory.publishedAt}
                              onChange={(e) => updateCurrentStory((s) => ({ ...s, publishedAt: e.target.value }))}
                              placeholder="February 2026"
                              className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Read Time</label>
                            <input
                              type="text"
                              value={currentStory.readTime}
                              onChange={(e) => updateCurrentStory((s) => ({ ...s, readTime: e.target.value }))}
                              placeholder="8 min read"
                              className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Year</label>
                            <input
                              type="text"
                              value={currentStory.year}
                              onChange={(e) => updateCurrentStory((s) => ({ ...s, year: e.target.value }))}
                              placeholder="2026"
                              className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 3. Cover Media & Excerpt */}
                      <div className="space-y-3 p-4 rounded-2xl bg-[#080808] border border-white/10">
                        <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold block">
                          3. Cover Imagery & Card Excerpt
                        </span>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-[11px] text-[#f5f5f5]/50">Cover Image URL</label>
                            <CloudinaryUploadButton
                              folder="ashraf-travel/stories"
                              onSuccess={(url) => updateCurrentStory((s) => ({ ...s, coverImage: url }))}
                            />
                          </div>
                          <input
                            type="text"
                            value={currentStory.coverImage}
                            onChange={(e) => updateCurrentStory((s) => ({ ...s, coverImage: e.target.value }))}
                            className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                          <div className="mt-2">
                            <ImageInspectorBadge
                              src={currentStory.coverImage}
                              suggestedSize="< 800 KB"
                              suggestedDimensions="1920×1080 (16:9 Landscape)"
                              expectedRatio="landscape"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Card Excerpt / Search Teaser</label>
                          <textarea
                            rows={2}
                            value={currentStory.excerpt}
                            onChange={(e) => updateCurrentStory((s) => ({ ...s, excerpt: e.target.value }))}
                            placeholder="Brief summary displayed on homepage cards and search listings..."
                            className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2 text-base sm:text-xs text-white outline-none focus:border-white/40 resize-none leading-relaxed"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">
                              Tags (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={Array.isArray(currentStory.tags) ? currentStory.tags.join(", ") : ""}
                              onChange={(e) =>
                                updateCurrentStory((s) => ({
                                  ...s,
                                  tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                                }))
                              }
                              placeholder="Mountains, Lakes, Himalayas"
                              className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Accent Tag Color</label>
                            <div className="flex items-center gap-2">
                              {["#38bdf8", "#8b5cf6", "#f59e0b", "#10b981", "#ec4899"].map((c) => (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => updateCurrentStory((s) => ({ ...s, tagColor: c }))}
                                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                                    currentStory.tagColor === c ? "scale-110 border-white" : "border-transparent"
                                  }`}
                                  style={{ backgroundColor: c }}
                                  title={c}
                                />
                              ))}
                              <input
                                type="text"
                                value={currentStory.tagColor || "#38bdf8"}
                                onChange={(e) => updateCurrentStory((s) => ({ ...s, tagColor: e.target.value }))}
                                className="w-24 bg-[#111113] border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4. Author Attribution */}
                      <div className="space-y-3 p-4 rounded-2xl bg-[#080808] border border-white/10">
                        <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold block">
                          4. Author Attribution
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Author Name</label>
                            <input
                              type="text"
                              value={currentStory.author?.name || "Ashraf Siddiqui"}
                              onChange={(e) =>
                                updateCurrentStory((s) => ({
                                  ...s,
                                  author: { ...s.author, name: e.target.value },
                                }))
                              }
                              className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Author Role</label>
                            <input
                              type="text"
                              value={currentStory.author?.role || "Solo Explorer & Storyteller"}
                              onChange={(e) =>
                                updateCurrentStory((s) => ({
                                  ...s,
                                  author: { ...s.author, role: e.target.value },
                                }))
                              }
                              className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Author Avatar URL</label>
                          <input
                            type="text"
                            value={currentStory.author?.avatar || "/img/travel/kashmir_hero.jpg"}
                            onChange={(e) =>
                              updateCurrentStory((s) => ({
                                ...s,
                                author: { ...s.author, avatar: e.target.value },
                              }))
                            }
                            className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/40"
                          />
                          <div className="mt-2">
                            <ImageInspectorBadge
                              src={currentStory.author?.avatar || "/img/travel/kashmir_hero.jpg"}
                              suggestedSize="< 150 KB"
                              suggestedDimensions="400×400 (1:1 Square)"
                              expectedRatio="square"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-[#f5f5f5]/50 mb-1">Author Bio</label>
                          <textarea
                            rows={2}
                            value={currentStory.author?.bio || ""}
                            onChange={(e) =>
                              updateCurrentStory((s) => ({
                                ...s,
                                author: { ...s.author, bio: e.target.value },
                              }))
                            }
                            placeholder="24 states explored across India. Documenting raw mountain passes, ancient trails, and local lives."
                            className="w-full bg-[#111113] border border-white/15 rounded-xl px-3 py-2 text-base sm:text-xs text-white outline-none focus:border-white/40 resize-none leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* 5. Editorial Article Sections (Table of Contents & Story Text) */}
                      <div className="space-y-4 p-4 rounded-2xl bg-[#080808] border border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold block">
                              5. Article Content Sections ({currentStory.sections?.length || 0})
                            </span>
                            <p className="text-[11px] text-white/40">
                              Each section maps to an in-article Table of Contents milestone with paragraph copy, pull quotes, and field notes.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newSection: StorySection = {
                                id: `sec-${Date.now()}`,
                                heading: `${(currentStory.sections?.length || 0) + 1}. Unfolding Horizons`,
                                content: ["Write the detailed paragraph content for this section of your dispatch..."],
                              };
                              updateCurrentStory((s) => ({
                                ...s,
                                sections: [...(s.sections || []), newSection],
                              }));
                            }}
                            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white font-bold flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <PlusIcon />
                            <span>Add Section</span>
                          </button>
                        </div>

                        <div className="space-y-4 pt-2">
                          {(currentStory.sections || []).map((sec, sIdx) => (
                            <div
                              key={sec.id || sIdx}
                              className="p-4 rounded-xl bg-[#111113] border border-white/10 space-y-3"
                            >
                              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                                <span className="text-xs font-bold text-white flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-white/10 text-[10px] flex items-center justify-center font-mono">
                                    {sIdx + 1}
                                  </span>
                                  <span>{sec.heading || `Section ${sIdx + 1}`}</span>
                                </span>

                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    disabled={sIdx === 0}
                                    onClick={() => {
                                      const copy = [...currentStory.sections];
                                      const temp = copy[sIdx];
                                      copy[sIdx] = copy[sIdx - 1];
                                      copy[sIdx - 1] = temp;
                                      updateCurrentStory((s) => ({ ...s, sections: copy }));
                                    }}
                                    className="p-1 rounded text-white/40 hover:text-white disabled:opacity-20"
                                    title="Move section up"
                                  >
                                    <ArrowUpIcon />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={sIdx === currentStory.sections.length - 1}
                                    onClick={() => {
                                      const copy = [...currentStory.sections];
                                      const temp = copy[sIdx];
                                      copy[sIdx] = copy[sIdx + 1];
                                      copy[sIdx + 1] = temp;
                                      updateCurrentStory((s) => ({ ...s, sections: copy }));
                                    }}
                                    className="p-1 rounded text-white/40 hover:text-white disabled:opacity-20"
                                    title="Move section down"
                                  >
                                    <ArrowDownIcon />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (currentStory.sections.length <= 1) {
                                        alert("An article must contain at least one section.");
                                        return;
                                      }
                                      updateCurrentStory((s) => ({
                                        ...s,
                                        sections: s.sections.filter((_, i) => i !== sIdx),
                                      }));
                                    }}
                                    className="p-1 rounded text-white/30 hover:text-red-400"
                                    title="Delete section"
                                  >
                                    <TrashIcon />
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[10px] text-[#f5f5f5]/50 mb-1">Section Heading</label>
                                  <input
                                    type="text"
                                    value={sec.heading}
                                    onChange={(e) => {
                                      const copy = [...currentStory.sections];
                                      copy[sIdx].heading = e.target.value;
                                      updateCurrentStory((s) => ({ ...s, sections: copy }));
                                    }}
                                    placeholder="e.g. 1. The Cold Whispers of Dal Lake"
                                    className="w-full bg-[#080808] border border-white/10 rounded-xl px-3 py-2 text-base sm:text-xs text-white outline-none focus:border-white/30"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] text-[#f5f5f5]/50 mb-1">Anchor ID (for TOC)</label>
                                  <input
                                    type="text"
                                    value={sec.id}
                                    onChange={(e) => {
                                      const copy = [...currentStory.sections];
                                      copy[sIdx].id = e.target.value;
                                      updateCurrentStory((s) => ({ ...s, sections: copy }));
                                    }}
                                    placeholder="first-light"
                                    className="w-full bg-[#080808] border border-white/10 rounded-xl px-3 py-2 text-base sm:text-xs text-white font-mono outline-none focus:border-white/30"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[10px] text-[#f5f5f5]/50 mb-1">
                                  Section Paragraphs (separate paragraphs with a double Enter / empty line)
                                </label>
                                <textarea
                                  rows={5}
                                  value={Array.isArray(sec.content) ? sec.content.join("\n\n") : String(sec.content || "")}
                                  onChange={(e) => {
                                    const copy = [...currentStory.sections];
                                    copy[sIdx].content = e.target.value.split(/\n\n+/).filter(Boolean);
                                    updateCurrentStory((s) => ({ ...s, sections: copy }));
                                  }}
                                  placeholder="Describe the atmosphere, conversations, scents, and mountain vistas in detail..."
                                  className="w-full bg-[#080808] border border-white/10 rounded-xl px-3 py-2.5 text-base sm:text-xs text-white outline-none focus:border-white/30 font-sans resize-none leading-relaxed"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-[#f5f5f5]/50 mb-1">Optional Pull Quote (Italic callout)</label>
                                <input
                                  type="text"
                                  value={sec.quote || ""}
                                  onChange={(e) => {
                                    const copy = [...currentStory.sections];
                                    copy[sIdx].quote = e.target.value;
                                    updateCurrentStory((s) => ({ ...s, sections: copy }));
                                  }}
                                  placeholder="You do not visit Kashmir to escape reality; you visit to discover what reality feels like..."
                                  className="w-full bg-[#080808] border border-white/10 rounded-xl px-3 py-2 text-base sm:text-xs text-white italic outline-none focus:border-white/30"
                                />
                              </div>

                              {/* Optional Field Note Box */}
                              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                                  Practical Field Note (Optional)
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    value={sec.fieldNote?.title || ""}
                                    onChange={(e) => {
                                      const copy = [...currentStory.sections];
                                      copy[sIdx].fieldNote = {
                                        title: e.target.value,
                                        text: copy[sIdx].fieldNote?.text || "",
                                      };
                                      updateCurrentStory((s) => ({ ...s, sections: copy }));
                                    }}
                                    placeholder="Note Title (e.g. Field Note: Shikara Etiquette)"
                                    className="w-full bg-[#080808] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                                  />
                                  <input
                                    type="text"
                                    value={sec.fieldNote?.text || ""}
                                    onChange={(e) => {
                                      const copy = [...currentStory.sections];
                                      copy[sIdx].fieldNote = {
                                        title: copy[sIdx].fieldNote?.title || "Field Note",
                                        text: e.target.value,
                                      };
                                      updateCurrentStory((s) => ({ ...s, sections: copy }));
                                    }}
                                    placeholder="Field Advice (e.g. Dress in at least three layers with windproof gloves...)"
                                    className="w-full bg-[#080808] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 6. Live Reader Preview Card */}
                      <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold block">
                            6. Live Article Header Preview (As rendered in Reader)
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">Updates As You Type</span>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 space-y-4">
                          <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
                            <span>Travel</span>
                            <span>/</span>
                            <span>Stories</span>
                            <span>/</span>
                            <span className="text-white/70">{currentStory.destination || "Destination"}</span>
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <span
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                              style={{
                                backgroundColor: `${currentStory.tagColor || "#38bdf8"}20`,
                                color: currentStory.tagColor || "#38bdf8",
                              }}
                            >
                              {currentStory.category}
                            </span>
                            <span className="text-white/40 text-[11px]">· {currentStory.readTime || "5 min read"}</span>
                            <span className="text-white/40 text-[11px]">· {currentStory.publishedAt || "2026"}</span>
                          </div>

                          <h2
                            className="text-2xl sm:text-3xl font-bold text-white leading-tight"
                            style={{ fontFamily: "var(--font-fredoka)" }}
                          >
                            {currentStory.title}
                          </h2>

                          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                            {currentStory.subtitle}
                          </p>

                          {/* Author Mini Card Preview */}
                          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-black shrink-0 border border-white/10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={currentStory.author?.avatar || "/img/travel/kashmir_hero.jpg"}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-white">{currentStory.author?.name || "Ashraf Siddiqui"}</p>
                                <p className="text-[10px] text-white/50">{currentStory.author?.role || "Solo Explorer"}</p>
                              </div>
                            </div>
                            <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                              Author Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-white/40 bg-[#111113] rounded-3xl border border-white/5">
                      Select a story from the left list to begin editing.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 6: BOOKING ENQUIRIES & LEADS INBOX
              ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "enquiries" && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Group Tour Inquiries & Leads Inbox
                  </h2>
                  <p className="text-xs text-[#f5f5f5]/50 mt-0.5">
                    Live bookings submitted by travelers through mobile & web forms. One-click WhatsApp and email contact.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                    {newEnquiriesCount} Pending New
                  </span>
                </div>
              </div>

              {/* Status Filter Tabs & Search */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Search leads by name, WhatsApp, email, or trip..."
                    value={enquirySearch}
                    onChange={(e) => setEnquirySearch(e.target.value)}
                    className="w-full bg-[#111113] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-white/30 outline-none focus:border-white/30"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {["All", "New", "Contacted", "Confirmed", "Archived"].map((status) => {
                    const count =
                      status === "All"
                        ? enquiries.length
                        : enquiries.filter((e) => e.status === status).length;
                    return (
                      <button
                        key={status}
                        onClick={() => setEnquiryStatusFilter(status)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                          enquiryStatusFilter === status
                            ? "bg-white text-black font-semibold"
                            : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span>{status}</span>
                        <span className="text-[10px] opacity-60">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Inquiries Cards Grid */}
              <div className="space-y-3">
                {filteredEnquiries.length === 0 ? (
                  <div className="p-12 sm:p-16 text-center rounded-3xl bg-[#111113] border border-white/5 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-white/5 text-white/40 flex items-center justify-center mx-auto mb-2">
                      <InboxIcon />
                    </div>
                    <p className="text-sm font-bold text-white">No inquiries found in this view</p>
                    <p className="text-xs text-white/40">
                      When travelers submit the booking modal on mobile or desktop, inquiries appear here instantly.
                    </p>
                  </div>
                ) : (
                  filteredEnquiries.map((enq) => {
                    const whatsappDigits = enq.whatsapp.replace(/[^0-9]/g, "");
                    const formattedDate = new Date(enq.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <div
                        key={enq.id}
                        className={`p-4 sm:p-5 rounded-3xl border transition-all ${
                          enq.status === "New"
                            ? "bg-[#111113] border-emerald-500/30 shadow-lg shadow-emerald-500/5"
                            : "bg-[#111113]/80 border-white/5"
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          {/* Traveler Core Info */}
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm sm:text-base font-bold text-white">{enq.fullName}</h3>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  enq.status === "New"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : enq.status === "Contacted"
                                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                    : enq.status === "Confirmed"
                                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                    : "bg-white/10 text-white/50 border border-white/10"
                                }`}
                              >
                                {enq.status}
                              </span>
                              <span className="text-[11px] text-white/40">{formattedDate}</span>
                            </div>

                            {/* Trip title & Details */}
                            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-white tracking-wide">{enq.tripTitle}</span>
                                {enq.pricePerPerson && (
                                  <span className="font-mono text-emerald-400 font-semibold text-xs">
                                    ₹{(enq.pricePerPerson * enq.travelersCount).toLocaleString()} ({enq.travelersCount} pax)
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#f5f5f5]/60">
                                <span>City: <strong className="text-white">{enq.cityOfOrigin || "Not specified"}</strong></span>
                                <span>Travelers: <strong className="text-white">{enq.travelersCount} Person(s)</strong></span>
                                <span>Diet: <strong className="text-white">{enq.dietPreference}</strong></span>
                                {enq.emergencyContact && (
                                  <span>Emergency: <strong className="text-white">{enq.emergencyContact}</strong></span>
                                )}
                              </div>
                            </div>

                            {/* Custom Message */}
                            {enq.message && (
                              <p className="text-xs text-[#f5f5f5]/80 bg-[#080808] p-3 rounded-xl border border-white/5 italic">
                                &ldquo;{enq.message}&rdquo;
                              </p>
                            )}
                          </div>

                          {/* Quick Action Buttons & Status Changer */}
                          <div className="flex flex-wrap sm:flex-nowrap md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto">
                            {/* WhatsApp Direct Chat */}
                            <a
                              href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
                                `Hi ${enq.fullName}! Ashraf Siddiqui here regarding your booking inquiry for ${enq.tripTitle}. I'd love to assist you!`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 sm:flex-none px-3.5 py-2 sm:py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all touch-manipulation min-h-[38px]"
                            >
                              <WhatsAppIcon />
                              <span>WhatsApp</span>
                            </a>

                            {/* Email Direct Client */}
                            <a
                              href={`mailto:${enq.email}?subject=${encodeURIComponent(
                                `Ashraf Siddiqui Expeditions — Confirmation for ${enq.tripTitle}`
                              )}`}
                              className="flex-1 sm:flex-none px-3.5 py-2 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all touch-manipulation min-h-[38px]"
                            >
                              <MailIcon />
                              <span>Email</span>
                            </a>

                            {/* Status Changer Dropdown */}
                            <select
                              value={enq.status}
                              onChange={(e) =>
                                handleUpdateEnquiryStatus(enq.id, e.target.value as LeadEnquiryItem["status"])
                              }
                              className="w-full sm:w-auto bg-[#080808] border border-white/15 rounded-xl px-2.5 py-2 sm:py-1.5 text-xs text-white outline-none cursor-pointer min-h-[38px]"
                            >
                              <option value="New">Status: New</option>
                              <option value="Contacted">Status: Contacted</option>
                              <option value="Confirmed">Status: Confirmed</option>
                              <option value="Archived">Status: Archived</option>
                            </select>

                            {/* Delete Lead */}
                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="text-[11px] text-white/30 hover:text-red-400 px-2 py-1 transition-colors flex items-center gap-1 ml-auto md:ml-0"
                              title="Delete enquiry"
                            >
                              <TrashIcon />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating Sticky Mobile Publish Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-[#0c0c0e]/95 backdrop-blur-md border-t border-white/10 z-30 flex items-center justify-between gap-3 shadow-2xl">
        <div className="text-xs">
          <span className="text-white/40 block text-[10px] uppercase font-bold">Module</span>
          <span className="font-bold text-white capitalize">{activeTab}</span>
        </div>
        {activeTab === "hero" && (
          <button
            onClick={handleSaveHero}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-lg touch-manipulation"
          >
            <CheckIcon />
            <span>{isSaving ? "Saving..." : "Publish Banner"}</span>
          </button>
        )}
        {activeTab === "gallery" && (
          <button
            onClick={handleSaveGallery}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-lg touch-manipulation"
          >
            <CheckIcon />
            <span>{isSaving ? "Saving..." : "Publish Gallery"}</span>
          </button>
        )}
        {activeTab === "reels" && (
          <button
            onClick={handleSaveReels}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-lg touch-manipulation"
          >
            <CheckIcon />
            <span>{isSaving ? "Saving..." : "Publish Reels"}</span>
          </button>
        )}
        {activeTab === "trips" && (
          <button
            onClick={handleSaveTrips}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-lg touch-manipulation"
          >
            <CheckIcon />
            <span>{isSaving ? "Saving..." : "Publish Trips"}</span>
          </button>
        )}
        {activeTab === "stories" && (
          <button
            onClick={handleSaveStories}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-lg touch-manipulation"
          >
            <CheckIcon />
            <span>{isSaving ? "Saving..." : "Publish Stories"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
