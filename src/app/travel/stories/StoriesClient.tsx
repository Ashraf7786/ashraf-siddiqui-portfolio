"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TravelNav from "../components/TravelNav";
import TravelFooter from "../components/TravelFooter";
import { TRAVEL_STORIES, TravelStory } from "../data/stories";

const CATEGORIES = [
  "All Stories",
  "Mountain Stories",
  "Road Adventures",
  "Hidden India",
  "Northeast Trails",
];

interface StoriesClientProps {
  initialStories?: TravelStory[];
}

export default function StoriesClient({ initialStories }: StoriesClientProps) {
  const [stories, setStories] = useState<TravelStory[]>(initialStories || TRAVEL_STORIES);
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchDynamicStories() {
      try {
        const res = await fetch(`/api/travel/stories?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.stories) && data.stories.length > 0) {
            setStories(data.stories);
          }
        }
      } catch {
        // Fallback silently to initial
      }
    }
    fetchDynamicStories();
  }, []);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchCat =
        selectedCategory === "All Stories" || story.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [stories, selectedCategory, searchQuery]);

  const featuredStory = stories[0] || TRAVEL_STORIES[0];

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5]">
      <TravelNav />
      <div className="pt-24 sm:pt-28 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#f5f5f5]/40 mb-6">
          <Link href="/travel" className="hover:text-white transition-colors flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Travel Diaries
          </Link>
          <span>/</span>
          <span className="text-[#f5f5f5]/80 font-medium">Stories</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/50">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f5f5f5]/40 font-medium">
                Field Notes & Dispatches
              </p>
            </div>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Stories from the Road
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-[#f5f5f5]/50 max-w-xl leading-relaxed">
              Real, unembellished accounts from high-altitude Himalayan passes, living root bridges, and desert camps.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search stories, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111113] text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 pl-9 pr-3 py-2.5 rounded-xl border border-[#f5f5f5]/10 outline-none focus:border-[#f5f5f5]/40"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#f5f5f5]/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar border-b border-[#f5f5f5]/10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#f5f5f5] text-[#080808] font-bold shadow-md"
                  : "bg-[#111113] text-[#f5f5f5]/50 hover:text-white border border-[#f5f5f5]/10 hover:border-[#f5f5f5]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Story Hero */}
        {selectedCategory === "All Stories" && !searchQuery && featuredStory && (
          <div className="mb-14">
            <Link
              href={`/travel/stories/${featuredStory.slug}`}
              className="group block relative rounded-3xl overflow-hidden border border-[#f5f5f5]/10 bg-[#111113] hover:border-[#f5f5f5]/30 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
                <div className="lg:col-span-7 relative h-64 lg:h-full min-h-[300px]">
                  <Image
                    src={featuredStory.coverImage}
                    alt={featuredStory.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[#f5f5f5] text-[#080808] shadow-lg">
                      Featured Story
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#f5f5f5]/60 mb-3 font-medium">
                      <span>{featuredStory.category}</span>
                      <span>·</span>
                      <span className="text-[#f5f5f5]/40">{featuredStory.readTime}</span>
                    </div>

                    <h2
                      className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] group-hover:text-white transition-colors leading-tight mb-3"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      {featuredStory.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#f5f5f5]/60 leading-relaxed line-clamp-3 mb-6">
                      {featuredStory.excerpt}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {featuredStory.tags.map((t) => (
                        <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#f5f5f5]/5 text-[#f5f5f5]/40 border border-[#f5f5f5]/10">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#f5f5f5]/90 group-hover:text-white group-hover:translate-x-1 transition-all">
                      Read full story
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <Link
              key={story.id}
              href={`/travel/stories/${story.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-[#f5f5f5]/10 bg-[#111113] hover:border-[#f5f5f5]/30 transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-black/60 text-[#f5f5f5] backdrop-blur-md border border-[#f5f5f5]/10">
                    {story.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 text-[10px] text-white/70 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  {story.readTime}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#f5f5f5]/50 mb-2">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{story.destination} · {story.year}</span>
                  </div>

                  <h3
                    className="text-base font-bold text-[#f5f5f5] group-hover:text-white transition-colors leading-snug mb-2"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {story.title}
                  </h3>

                  <p className="text-xs text-[#f5f5f5]/50 leading-relaxed line-clamp-3 mb-4">
                    {story.excerpt}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {story.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-[#f5f5f5]/5 text-[#f5f5f5]/40 border border-[#f5f5f5]/5">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#f5f5f5]/10 text-xs">
                    <span className="text-[#f5f5f5]/40 text-[11px]">{story.author.name}</span>
                    <span className="inline-flex items-center gap-1 text-[#f5f5f5]/80 group-hover:text-white font-semibold group-hover:translate-x-1 transition-all">
                      Read
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="py-20 text-center rounded-3xl bg-[#111113] border border-[#f5f5f5]/5 p-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-[#f5f5f5]/30 mb-3">
              <circle cx="12" cy="12" r="10"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <p className="text-sm text-[#f5f5f5]/60 font-medium">No stories found matching your criteria</p>
            <button
              onClick={() => {
                setSelectedCategory("All Stories");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#f5f5f5] text-[#080808] text-xs font-semibold hover:bg-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
        </div>
      </div>
      <TravelFooter />
    </div>
  );
}
