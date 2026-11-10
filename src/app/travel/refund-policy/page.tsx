import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import TravelNav from "../components/TravelNav";
import TravelFooter from "../components/TravelFooter";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Ashraf Siddiqui Travel",
  description: "Transparent cancellation and refund terms for all group expeditions, overland tours, and photography treks with Ashraf Siddiqui.",
};

export default function RefundPolicyPage() {
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
          <span className="text-[#f5f5f5]/80">Cancellation & Refund Policy</span>
        </div>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Fair & Transparent Traveler Protection</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Cancellation & Refund Policy
          </h1>
          <p className="text-sm sm:text-base text-[#f5f5f5]/60 mt-3 leading-relaxed">
            We believe in complete transparency. Group expeditions in remote Himalayan terrains require extensive advance logistics, permits, and vehicle bookings. Here is exactly how cancellations and refunds are handled.
          </p>
          <p className="text-xs text-[#f5f5f5]/40 mt-2 font-mono">
            Last Updated: February 2026 · Effective for all 2026/2027 departures
          </p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-[#f5f5f5]/80">
          {/* S1: Cancelled by our side */}
          <section className="p-6 sm:p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-emerald-300" style={{ fontFamily: "var(--font-fredoka)" }}>
                  1. Trip Cancelled By Us (100% Full Refund Guarantee)
                </h2>
                <p className="text-xs text-emerald-200/70">Zero deductions · Immediate refund</p>
              </div>
            </div>
            <p className="text-emerald-100/90 text-sm">
              If, due to extreme weather warnings, sudden high-altitude road/pass closures (e.g. Rohtang or Zoji La blizzards), government safety directives, minimum group size non-fulfillment, or any unforeseen situation on our side, an expedition is cancelled by us:
            </p>
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 font-semibold text-emerald-300 text-sm sm:text-base flex items-center gap-3">
              <span className="text-xl">✓</span>
              <span>You will receive a <strong>100% FULL REFUND</strong> of the entire amount paid with absolutely ZERO cancellation fees or administrative deductions.</span>
            </div>
            <p className="text-xs text-emerald-200/70">
              Refunds are credited directly back to your original payment mode (Bank Transfer / UPI / Card) within 3 to 5 business days, or you may choose to roll over 100% of your deposit to any future departure date without penalty.
            </p>
          </section>

          {/* S2: Cancelled by Customer */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-fredoka)" }}>
              <span>2. Trip Cancelled by Traveler (Cancellation Slabs)</span>
            </h2>
            <p className="text-white/70">
              When you reserve a seat on an expedition, vehicle seating, homestay quotas, and high-altitude permits are locked in your name. If you choose to cancel your booking, the following deduction slabs apply based on the date your written cancellation is received:
            </p>

            {/* Slabs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Slab 1 */}
              <div className="p-5 rounded-2xl bg-[#111113] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 font-mono">
                    28+ Days Before
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">100% Refund</span>
                </div>
                <h3 className="font-bold text-white text-base">Cancelled &ge; 28 Days Prior</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  If you cancel your trip <strong>28 days or more</strong> before the scheduled departure date, you get a <strong>full refund</strong> (0% deduction, only minimal standard bank processing gateway charges if applicable).
                </p>
              </div>

              {/* Slab 2 */}
              <div className="p-5 rounded-2xl bg-[#111113] border border-amber-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 font-mono">
                    7 to 27 Days Before
                  </span>
                  <span className="text-xs text-amber-300 font-bold">50% Deduction</span>
                </div>
                <h3 className="font-bold text-white text-base">1 Week Before (7–27 Days)</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  If you cancel your trip between <strong>7 days and 27 days</strong> before departure, a <strong>50% cancellation fee</strong> is deductible. The remaining <strong>50% is refunded</strong> to you.
                </p>
              </div>

              {/* Slab 3 */}
              <div className="p-5 rounded-2xl bg-[#111113] border border-rose-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 font-mono">
                    1 to 6 Days Before
                  </span>
                  <span className="text-xs text-rose-300 font-bold">90% Deduction</span>
                </div>
                <h3 className="font-bold text-white text-base">1 Day Before (1–6 Days)</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  If you cancel <strong>1 to 6 days</strong> prior to departure, a <strong>90% cancellation fee</strong> is deductible (10% refunded), as vehicles, fuel logistics, and local team resources have been fully deployed.
                </p>
              </div>
            </div>

            {/* Same day */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs text-white/60 flex items-start gap-3 mt-3">
              <span className="text-amber-400 font-bold mt-0.5">ℹ</span>
              <div>
                <strong>Cancellation on Day of Departure or No-Show:</strong> Cancellations made within 24 hours of departure or failure to arrive at the designated meeting point are 100% non-refundable.
              </div>
            </div>
          </section>

          {/* S3: Summary Table */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              3. Quick Reference Summary Table
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#111113] text-white/60 uppercase font-mono text-[10px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-3.5 sm:p-4">Cancellation Window</th>
                    <th className="p-3.5 sm:p-4">Deduction Amount</th>
                    <th className="p-3.5 sm:p-4">Your Refund</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#0a0a0c]">
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Trip Cancelled by Organizer (Our Side)</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold">0% (Zero deduction)</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold">100% Full Refund</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Cancelled 28+ Days Before Starting</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold">0% (Zero deduction)</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold">100% Full Refund</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Cancelled 1 Week Before (7 to 27 Days)</td>
                    <td className="p-3.5 sm:p-4 text-amber-400 font-bold">50% Deduction</td>
                    <td className="p-3.5 sm:p-4 text-amber-400 font-bold">50% Refund</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Cancelled 1 Day Before (1 to 6 Days)</td>
                    <td className="p-3.5 sm:p-4 text-rose-400 font-bold">90% Deduction</td>
                    <td className="p-3.5 sm:p-4 text-rose-400 font-bold">10% Refund</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">&lt; 24 Hours / No-Show at Meeting Point</td>
                    <td className="p-3.5 sm:p-4 text-red-400 font-bold">100% Deduction</td>
                    <td className="p-3.5 sm:p-4 text-white/40">No Refund</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* S4: How to Initiate a Cancellation */}
          <section className="space-y-4 p-6 rounded-3xl bg-[#111113] border border-white/10">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              4. How to Request a Cancellation or Refund
            </h2>
            <p className="text-white/70">
              To request a cancellation, simply email us or send a WhatsApp message with your Booking Reference or registered email:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a
                href="mailto:ashrafsiddiquitravel@gmail.com?subject=Cancellation%20Request%20-%20Ashraf%20Siddiqui%20Expedition"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all flex items-center gap-3 text-white"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-mono block">Direct Email</span>
                  <span className="font-semibold text-xs sm:text-sm">ashrafsiddiquitravel@gmail.com</span>
                </div>
              </a>

              <Link
                href="/travel/contact"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all flex items-center gap-3 text-white"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-mono block">Web Form</span>
                  <span className="font-semibold text-xs sm:text-sm">Contact Support Desk &rarr;</span>
                </div>
              </Link>
            </div>
            <p className="text-xs text-white/50 pt-1">
              Cancellation timestamps are recorded in Indian Standard Time (IST) upon receipt of your message.
            </p>
          </section>
        </div>
      </main>

      <TravelFooter />
    </div>
  );
}
