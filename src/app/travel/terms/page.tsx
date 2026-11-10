import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import TravelNav from "../components/TravelNav";
import TravelFooter from "../components/TravelFooter";

export const metadata: Metadata = {
  title: "Terms of Use | Ashraf Siddiqui Travel",
  description: "Terms and conditions for participating in curated group expeditions, itineraries, and content on Ashraf Siddiqui Travel Platform.",
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] selection:bg-white/20">
      <TravelNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#f5f5f5]/40 mb-6 font-mono">
          <Link href="/travel" className="hover:text-white transition-colors">
            Travel Diaries
          </Link>
          <span>/</span>
          <span className="text-[#f5f5f5]/80">Terms of Use</span>
        </div>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Terms of Use & Expedition Agreement
          </h1>
          <p className="text-sm sm:text-base text-[#f5f5f5]/60 mt-3 leading-relaxed">
            Please read these terms carefully before reserving an expedition or utilizing travel guides published on this platform.
          </p>
          <p className="text-xs text-[#f5f5f5]/40 mt-2 font-mono">
            Last Updated: February 2026
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-[#f5f5f5]/80">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing Ashraf Siddiqui Travel Diaries, browsing itineraries, or booking a curated group tour, you agree to comply with and be bound by these Terms of Use and our <Link href="/travel/refund-policy" className="text-emerald-400 underline hover:text-emerald-300">Cancellation & Refund Policy</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              2. Nature of High-Altitude & Wilderness Expeditions
            </h2>
            <p>
              Our expeditions take place in raw, remote regions of India, including altitudes above 14,000–18,000 feet in Spiti Valley, Ladakh, and Kashmir. By booking:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-white/70">
              <li>You confirm that you possess reasonable physical fitness and do not conceal critical cardiovascular or respiratory medical conditions.</li>
              <li>You agree to follow mandatory acclimatization schedules and mountain safety directives issued by trip leaders and local mountain guides.</li>
              <li>You acknowledge that weather in high passes is unpredictable. The trip leader reserves the right to alter routes or halt progress if personal safety is compromised.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              3. Booking, Payments & Cancellation
            </h2>
            <p>
              Seat reservations are confirmed upon receipt of the booking advance. All cancellations are strictly governed by our published <Link href="/travel/refund-policy" className="text-emerald-400 underline hover:text-emerald-300">Cancellation & Refund Policy</Link>:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-white/70">
              <li>100% full refund if cancelled from our side.</li>
              <li>100% full refund if cancelled by traveler 28+ days before trip start.</li>
              <li>50% deduction if cancelled 1 week before departure (7–27 days).</li>
              <li>90% deduction if cancelled 1 day before departure (1–6 days).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              4. Code of Conduct & Leave No Trace
            </h2>
            <p>
              We practice and enforce strict <strong>Leave No Trace</strong> environmental ethics across every state we explore:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-white/70">
              <li>No plastic dumping in mountain passes, rivers, or desert camps. All non-biodegradable waste is packed out.</li>
              <li>Respect local cultural sensitivities, monasteries, temples, and village customs.</li>
              <li>Disruptive, abusive, or dangerous behavior toward fellow travelers or local staff will result in immediate termination of participation without refund.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              5. Intellectual Property
            </h2>
            <p>
              All editorial articles, drone visuals, photography, video dispatches, and route maps are the intellectual property of Ashraf Siddiqui. Unauthorized commercial reproduction, distribution, or scrapings are prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              6. Governing Law & Contact
            </h2>
            <p>
              Any disputes arising from these terms are subject to the jurisdiction of the courts of Jaipur, Rajasthan, India.
            </p>
            <p className="font-mono text-emerald-400">
              Contact: <a href="mailto:ashrafsiddiquitravel@gmail.com">ashrafsiddiquitravel@gmail.com</a>
            </p>
          </section>
        </div>
      </main>

      <TravelFooter />
    </div>
  );
}
