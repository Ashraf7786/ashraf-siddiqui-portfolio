"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────────
type AdminTab = "hero" | "gallery" | "reels" | "trips" | "enquiries";

interface MetricPill {
  label: string;
  value: string;
  highlight?: boolean;
}

interface BannerSlide {
  id: string;
  tripSlug: string;
  badgeLabel: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  posterImage: string;
  imageAlt: string;
  videoUrl?: string;
  metrics: MetricPill[];
  primaryCta: {
    label: string;
    action: string;
    target: string;
  };
  secondaryCta: {
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
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
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

export default function DashboardClient({ adminUsername }: { adminUsername: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("hero");

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

  // Tab 5: Enquiries State
  const [enquiries, setEnquiries] = useState<LeadEnquiryItem[]>([]);
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>("All");
  const [enquirySearch, setEnquirySearch] = useState("");

  // Fetch all initial data
  useEffect(() => {
    async function loadAllData() {
      setIsLoading(true);
      try {
        const [heroRes, galRes, reelsRes, tripsRes, enqRes] = await Promise.all([
          fetch("/api/admin/hero"),
          fetch("/api/admin/gallery"),
          fetch("/api/admin/reels"),
          fetch("/api/admin/trips"),
          fetch("/api/admin/enquiries"),
        ]);

        if (heroRes.ok) {
          const d = await heroRes.json();
          if (d.slides) setSlides(d.slides);
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
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] flex flex-col">
      {/* Toast Notification */}
      {statusMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold backdrop-blur-xl border transition-all ${
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
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-fredoka)" }}>
              Ashraf Siddiqui · CMS Control Center
            </h1>
            <p className="text-[11px] text-[#f5f5f5]/50 hidden sm:block">
              Logged in as <span className="text-white font-mono font-semibold">@{adminUsername}</span> · Local Persistent Store
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/travel"
            target="_blank"
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#f5f5f5]/80 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <span>View Live Website</span>
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

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-[#0a0a0c] border-b lg:border-b-0 lg:border-r border-white/10 p-3 sm:p-4 shrink-0 flex flex-col justify-between">
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

              {/* Tab 5: Booking Leads & Enquiries */}
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
              <p className="font-semibold text-[#f5f5f5]/60">Security & Storage</p>
              <p>Timing-safe authentication</p>
              <p>HMAC-SHA256 session token</p>
              <p>Persistent JSON database</p>
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
                            badgeLabel: "NEW EXPEDITION",
                            titleLine1: "NEW EXPEDITION",
                            titleLine2: "EXPLORATION.",
                            subtitle: "Experience high-altitude beauty with Ashraf Siddiqui.",
                            posterImage: "/img/travel/kashmir_hero.jpg",
                            imageAlt: "New Expedition",
                            videoUrl: "/videos/reels/travelashraf1.mp4",
                            metrics: [
                              { label: "DATES", value: "TBA 2026" },
                              { label: "DURATION", value: "7 Days" },
                              { label: "ALTITUDE", value: "12,000 ft" },
                              { label: "GROUP SIZE", value: "12 Travellers" },
                              { label: "STARTING", value: "₹25,000", highlight: true },
                              { label: "AVAILABLE", value: "12 Seats Left", highlight: true },
                            ],
                            primaryCta: { label: "View Trip Details & Reserve", action: "openModal", target: "" },
                            secondaryCta: { label: "Explore All Expeditions", action: "scroll", target: "#group-tours" },
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
                      <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black h-64 sm:h-72 shadow-2xl flex flex-col justify-end p-6 text-center">
                        {currentSlide.videoUrl ? (
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
                            src={currentSlide.posterImage}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover brightness-75"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

                        <div className="relative z-10 max-w-xl mx-auto space-y-2">
                          <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80">
                            {currentSlide.badgeLabel}
                          </span>
                          <h3
                            className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide leading-none"
                            style={{ fontFamily: "var(--font-fredoka)" }}
                          >
                            <div>{currentSlide.titleLine1}</div>
                            <div className="banner-outline-text text-transparent">{currentSlide.titleLine2}</div>
                          </h3>
                          <p className="text-[11px] text-[#f5f5f5]/70 line-clamp-2 max-w-md mx-auto">
                            {currentSlide.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="p-6 rounded-3xl bg-[#111113] border border-white/10 space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-white/5">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-[#f5f5f5]/70">
                            Editing Slide #{selectedSlideIndex + 1}
                          </h3>
                          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#f5f5f5]/80">
                            <input
                              type="checkbox"
                              checked={currentSlide.isActive}
                              onChange={(e) => {
                                const updated = [...slides];
                                updated[selectedSlideIndex].isActive = e.target.checked;
                                setSlides(updated);
                              }}
                              className="rounded bg-black border-white/20 text-white focus:ring-0"
                            />
                            <span>Active on Live Site</span>
                          </label>
                        </div>

                        {/* Title Lines */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                              Title Line 1 (Solid White)
                            </label>
                            <input
                              type="text"
                              value={currentSlide.titleLine1}
                              onChange={(e) => {
                                const updated = [...slides];
                                updated[selectedSlideIndex].titleLine1 = e.target.value;
                                setSlides(updated);
                              }}
                              className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:border-white/40 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                              Title Line 2 (Outlined Text)
                            </label>
                            <input
                              type="text"
                              value={currentSlide.titleLine2}
                              onChange={(e) => {
                                const updated = [...slides];
                                updated[selectedSlideIndex].titleLine2 = e.target.value;
                                setSlides(updated);
                              }}
                              className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:border-white/40 outline-none"
                            />
                          </div>
                        </div>

                        {/* Badge & Subtitle */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                              Top Badge Pill
                            </label>
                            <input
                              type="text"
                              value={currentSlide.badgeLabel}
                              onChange={(e) => {
                                const updated = [...slides];
                                updated[selectedSlideIndex].badgeLabel = e.target.value;
                                setSlides(updated);
                              }}
                              className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:border-white/40 outline-none"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                              Slide Subtitle / Description
                            </label>
                            <input
                              type="text"
                              value={currentSlide.subtitle}
                              onChange={(e) => {
                                const updated = [...slides];
                                updated[selectedSlideIndex].subtitle = e.target.value;
                                setSlides(updated);
                              }}
                              className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:border-white/40 outline-none"
                            />
                          </div>
                        </div>

                        {/* Video & Poster Media */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
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
                              className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:border-white/40 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                              Fallback Poster Image
                            </label>
                            <input
                              type="text"
                              value={currentSlide.posterImage}
                              onChange={(e) => {
                                const updated = [...slides];
                                updated[selectedSlideIndex].posterImage = e.target.value;
                                setSlides(updated);
                              }}
                              placeholder="/img/travel/kashmir_hero.jpg"
                              className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:border-white/40 outline-none"
                            />
                          </div>
                        </div>

                        {/* Metric Pills */}
                        <div className="pt-2 border-t border-white/5 space-y-3">
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold">
                            Trip Metric Pills (Dates, Altitude, Price, Seats)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {currentSlide.metrics.map((m, mIdx) => (
                              <div key={mIdx} className="p-2.5 rounded-xl bg-[#080808] border border-white/10 space-y-1">
                                <span className="text-[10px] text-[#f5f5f5]/40 uppercase font-mono font-bold block">
                                  {m.label}
                                </span>
                                <input
                                  type="text"
                                  value={m.value}
                                  onChange={(e) => {
                                    const updated = [...slides];
                                    updated[selectedSlideIndex].metrics[mIdx].value = e.target.value;
                                    setSlides(updated);
                                  }}
                                  className="w-full bg-transparent border-b border-white/15 text-xs text-white font-semibold focus:border-white/40 outline-none pb-0.5"
                                />
                              </div>
                            ))}
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
                    Manage high-resolution images, places, states, categories, and field notes.
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
                    className="w-full bg-[#111113] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-white/30"
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
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                              Image URL / Path
                            </label>
                            <input
                              type="text"
                              value={currentPhoto.src}
                              onChange={(e) => {
                                const arr = [...photos];
                                arr[selectedPhotoIndex].src = e.target.value;
                                setPhotos(arr);
                              }}
                              className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                              Alt Text (Accessibility & SEO)
                            </label>
                            <input
                              type="text"
                              value={currentPhoto.alt}
                              onChange={(e) => {
                                const arr = [...photos];
                                arr[selectedPhotoIndex].alt = e.target.value;
                                setPhotos(arr);
                              }}
                              className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
                            />
                          </div>
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                          className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-white/40 resize-none leading-relaxed"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Orientation
                          </label>
                          <select
                            value={currentPhoto.orientation}
                            onChange={(e) => {
                              const arr = [...photos];
                              arr[selectedPhotoIndex].orientation = e.target.value as any;
                              setPhotos(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
                          >
                            <option value="landscape">Landscape (Horizontal)</option>
                            <option value="portrait">Portrait (Vertical)</option>
                            <option value="square">Square</option>
                          </select>
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
                    Manage vertical travel reels, local MP4 videos, Instagram captions, sound tracks, and engagement stats.
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
                      <div className="relative rounded-2xl overflow-hidden bg-black border border-white/15 h-48 flex items-center justify-center">
                        <video
                          key={currentReel.localVideoUrl || currentReel.videoUrl}
                          src={currentReel.localVideoUrl || currentReel.videoUrl}
                          controls
                          className="h-full object-contain"
                        />
                      </div>

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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>
                      </div>

                      {/* Video URLs & Poster */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40 font-mono"
                          />
                        </div>

                        <div>
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                          className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-white/40 resize-none leading-relaxed"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                          <img src={t.coverImage} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate text-white">{t.title}</p>
                          <p className="text-[10px] text-[#f5f5f5]/50 truncate">{t.departureDate} · {t.durationLabel}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-bold text-white">
                              ₹{t.pricePerPerson.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-semibold">
                              {t.availableSeats} / {t.totalSeats} seats
                            </span>
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40 font-bold"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40 font-mono font-bold"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>
                      </div>

                      {/* Cover Image & Destination */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                            Cover Image Path
                          </label>
                          <input
                            type="text"
                            value={currentTrip.coverImage}
                            onChange={(e) => {
                              const arr = [...trips];
                              arr[selectedTripIndex].coverImage = e.target.value;
                              setTrips(arr);
                            }}
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
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
                            className="w-full bg-[#080808] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
                          />
                        </div>
                      </div>

                      {/* Inclusions (newline-separated) */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 font-bold mb-1">
                          Inclusions (one item per line)
                        </label>
                        <textarea
                          rows={4}
                          value={currentTrip.inclusions.join("\n")}
                          onChange={(e) => {
                            const arr = [...trips];
                            arr[selectedTripIndex].inclusions = e.target.value.split("\n").filter(Boolean);
                            setTrips(arr);
                          }}
                          className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-white/40 font-mono resize-none leading-relaxed"
                        />
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
              TAB 5: BOOKING ENQUIRIES & LEADS INBOX
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
                    Live bookings submitted by travelers through the website booking form. One-click WhatsApp and email.
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
                    className="w-full bg-[#111113] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-white/30"
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
                  <div className="p-16 text-center rounded-3xl bg-[#111113] border border-white/5 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-white/5 text-white/40 flex items-center justify-center mx-auto mb-2">
                      <InboxIcon />
                    </div>
                    <p className="text-sm font-bold text-white">No inquiries found in this view</p>
                    <p className="text-xs text-white/40">
                      When visitors fill out the trip booking modal on the website, they will appear here instantly.
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
                        className={`p-5 rounded-3xl border transition-all ${
                          enq.status === "New"
                            ? "bg-[#111113] border-emerald-500/30 shadow-lg shadow-emerald-500/5"
                            : "bg-[#111113]/80 border-white/5"
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          {/* Traveler Core Info */}
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base font-bold text-white">{enq.fullName}</h3>
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
                                  <span className="font-mono text-emerald-400 font-semibold">
                                    ₹{(enq.pricePerPerson * enq.travelersCount).toLocaleString()} (for {enq.travelersCount} pax)
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
                          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                            {/* WhatsApp Direct Chat */}
                            <a
                              href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
                                `Hi ${enq.fullName}! Ashraf Siddiqui here regarding your booking inquiry for ${enq.tripTitle}. I'd love to assist you!`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                            >
                              <WhatsAppIcon />
                              <span>WhatsApp</span>
                            </a>

                            {/* Email Direct Client */}
                            <a
                              href={`mailto:${enq.email}?subject=${encodeURIComponent(
                                `Ashraf Siddiqui Expeditions — Confirmation for ${enq.tripTitle}`
                              )}`}
                              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
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
                              className="bg-[#080808] border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none cursor-pointer"
                            >
                              <option value="New">Status: New</option>
                              <option value="Contacted">Status: Contacted</option>
                              <option value="Confirmed">Status: Confirmed</option>
                              <option value="Archived">Status: Archived</option>
                            </select>

                            {/* Delete Lead */}
                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="text-[11px] text-white/30 hover:text-red-400 px-2 py-1 transition-colors flex items-center gap-1"
                              title="Delete enquiry"
                            >
                              <TrashIcon />
                              <span className="hidden sm:inline">Delete</span>
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
    </div>
  );
}
