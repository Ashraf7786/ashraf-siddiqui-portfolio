import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import TravelNav from "../components/TravelNav";
import TravelFooter from "../components/TravelFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Ashraf Siddiqui Travel",
  description: "Privacy policy regarding traveler data protection, newsletter dispatches, and booking confidentiality for Ashraf Siddiqui Travel Platform.",
};

export default function PrivacyPolicyPage() {
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
          <span className="text-[#f5f5f5]/80">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-[#f5f5f5]/60 mt-3 leading-relaxed">
            Your privacy and personal safety on the road are sacred. Here is our complete commitment to how your personal information is treated.
          </p>
          <p className="text-xs text-[#f5f5f5]/40 mt-2 font-mono">
            Last Updated: February 2026
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-[#f5f5f5]/80">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              1. Information We Collect
            </h2>
            <p>
              When you use this platform, submit a group expedition inquiry, subscribe to the Travel Letter, or contact Ashraf directly, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-white/70">
              <li>Your full name and contact information (Email address, WhatsApp phone number).</li>
              <li>Trip reservation preferences, group size, origin city, and dietary needs.</li>
              <li>High-altitude emergency contact details provided voluntarily for expedition safety.</li>
              <li>Technical metrics (device type, approximate geographic region, pages visited) to ensure responsive performance.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              2. How Your Information Is Used
            </h2>
            <p>We use your information strictly for legitimate travel-related purposes:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-white/70">
              <li>To confirm, coordinate, and communicate expedition itineraries and emergency updates via WhatsApp or email.</li>
              <li>To arrange high-altitude permits (such as Inner Line Permits in Ladakh, Sikkim, or Spiti) through local district magistrates.</li>
              <li>To send editorial travel letters and newly announced tour dates (if you subscribed). You can unsubscribe with 1-click at any time.</li>
            </ul>
          </section>

          <section className="space-y-3 p-6 rounded-2xl bg-[#111113] border border-white/10">
            <h2 className="text-xl font-bold text-emerald-400" style={{ fontFamily: "var(--font-fredoka)" }}>
              3. Zero Data Selling Guarantee
            </h2>
            <p className="text-white/80">
              We do <strong>NOT</strong> sell, rent, monetize, or trade your personal email, phone number, or booking records to commercial marketing brokers, third-party telemarketers, or ad networks. Your data stays between you and Ashraf Siddiqui.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              4. Security & Data Protection
            </h2>
            <p>
              All customer booking submissions, inquiries, and subscriber lists are transmitted using modern TLS/HTTPS encryption. Administrative access to the backend control center requires cryptographic HMAC-SHA256 authenticated sessions with timing-safe password validation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              5. Contact Regarding Privacy
            </h2>
            <p>
              If you have any questions about your data or wish to have your details removed from our subscribers or inquiries records, please email:
            </p>
            <p className="font-mono text-emerald-400">
              <a href="mailto:ashrafsiddiquitravel@gmail.com">ashrafsiddiquitravel@gmail.com</a>
            </p>
          </section>
        </div>
      </main>

      <TravelFooter />
    </div>
  );
}
