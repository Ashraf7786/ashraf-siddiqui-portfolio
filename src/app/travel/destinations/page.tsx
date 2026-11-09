import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DESTINATIONS_DATA, TRAVEL_TIMELINE } from "../data/destinations";

export const metadata: Metadata = {
  title: "Destinations & Journey Timeline | Ashraf Siddiqui Travel",
  description:
    "Explore Ashraf Siddiqui travel journey across 24 Indian states and beyond. Detailed destination guides, itineraries, and chronological travel timeline.",
};

export default function DestinationsIndexPage() {
  const destinations = Object.values(DESTINATIONS_DATA);

  return (
    <div
      className="min-h-screen bg-[#080808] text-[#f5f5f5] overflow-x-hidden"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 bg-[#080808]/90 backdrop-blur-md border-b border-[#f5f5f5]/5 flex items-center justify-between">
        <Link
          href="/travel"
          className="text-xs uppercase tracking-widest text-[#f5f5f5]/70 hover:text-white transition-colors"
        >
          ← Back to Travel Diaries
        </Link>
        <span
          className="text-base font-bold text-[#f5f5f5]"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Destinations & Journey
        </span>
        <Link
          href="/travel#journey"
          className="text-xs px-4 py-1.5 rounded-full border border-[#f5f5f5]/20 hover:border-[#f5f5f5]/60 text-[#f5f5f5] transition-all"
        >
          India Map
        </Link>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-24 space-y-20">
        {/* Title */}
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[#f5f5f5]/30 mb-2">
            Exploration Archives
          </p>
          <h1
            className="text-4xl sm:text-6xl font-bold text-[#f5f5f5]"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Featured Destination Guides
          </h1>
          <p className="text-sm md:text-base text-[#f5f5f5]/60 max-w-2xl mt-3 leading-relaxed">
            Honest, curated guides from real expeditions across 24 states in India. Includes
            transport logistics, day-wise itineraries, field notes, and transparent budget estimates.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <section className="grid sm:grid-cols-2 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/travel/destinations/${dest.slug}`}
              className="group relative rounded-3xl overflow-hidden border border-[#f5f5f5]/10 bg-[#111113] hover:border-[#f5f5f5]/25 transition-all flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={dest.heroImage}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {dest.state} · {dest.yearVisited}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3
                  className="text-2xl font-bold text-[#f5f5f5] group-hover:text-blue-400 transition-colors"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {dest.name}
                </h3>
                <p className="text-xs text-[#f5f5f5]/50 italic">
                  &ldquo;{dest.tagline}&rdquo;
                </p>
                <p className="text-xs text-[#f5f5f5]/65 leading-relaxed line-clamp-2">
                  {dest.overview}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-blue-400">
                  <span>View Complete Guide</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Chronological Travel Timeline */}
        <section className="space-y-8 pt-8 border-t border-[#f5f5f5]/10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#f5f5f5]/30 mb-2">
              Chronological Archives
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Journey Timeline (2021 – 2026)
            </h2>
            <p className="text-xs text-[#f5f5f5]/50 mt-2">
              State-wise and milestone journeys documented in chronological order.
            </p>
          </div>

          <div className="space-y-4">
            {TRAVEL_TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#111113] border border-[#f5f5f5]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#f5f5f5]/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-xl font-bold text-[#f5f5f5] shrink-0"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {item.year}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f5f5f5]/5 text-[#f5f5f5]/60 border border-[#f5f5f5]/10">
                        {item.region}
                      </span>
                      {item.isInternational && (
                        <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                          ✦ 1st International Country
                        </span>
                      )}
                    </div>
                    <h4
                      className="text-lg font-bold text-[#f5f5f5]"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#f5f5f5]/50 mt-1">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {item.slug && (
                  <Link
                    href={`/travel/destinations/${item.slug}`}
                    className="self-start sm:self-center px-4 py-2 rounded-xl text-xs font-semibold text-[#080808] bg-[#f5f5f5] hover:bg-white hover:scale-105 transition-all whitespace-nowrap"
                  >
                    Read Guide →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

