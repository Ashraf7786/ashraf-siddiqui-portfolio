"use client";

import React, { useState } from "react";
import { GroupTrip } from "../data/trips";

interface TripBookingModalProps {
  trip: GroupTrip;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "itinerary" | "register";
}

export default function TripBookingModal({
  trip,
  isOpen,
  onClose,
  initialTab = "itinerary",
}: TripBookingModalProps) {
  const [activeTab, setActiveTab] = useState<"itinerary" | "register">(initialTab);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    travelersCount: "1",
    cityOfOrigin: "",
    dietPreference: "Vegetarian",
    emergencyContact: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      errs.email = "Valid email address is required";
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 10)
      errs.whatsapp = "Valid 10-digit phone / WhatsApp number is required";
    if (!formData.cityOfOrigin.trim()) errs.cityOfOrigin = "City of departure is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/travel/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tripTitle: trip.title,
          tripSlug: trip.slug,
          pricePerPerson: trip.pricePerPerson || 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        setErrors({ submit: data.error || "Failed to submit booking inquiry." });
      }
    } catch {
      setErrors({ submit: "Network error. Please try again or WhatsApp Ashraf directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setActiveTab("itinerary");
    setFormData({
      fullName: "",
      email: "",
      whatsapp: "",
      travelersCount: "1",
      cityOfOrigin: "",
      dietPreference: "Vegetarian",
      emergencyContact: "",
      message: "",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[#111113] border-t sm:border border-[#f5f5f5]/15 rounded-t-[28px] sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto my-0 sm:my-6 overscroll-contain">
        {/* Mobile Drag Indicator Bar */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors touch-manipulation z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-5 pr-8">
              <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 font-semibold mb-1 block">
                Official Expedition Dossier
              </span>
              <h2
                className="text-xl sm:text-2xl font-bold text-[#f5f5f5] leading-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {trip.title}
              </h2>
              <p className="text-xs text-[#f5f5f5]/50 mt-1">
                {trip.departureDate} &rarr; {trip.returnDate} · {trip.durationLabel} · Curated Small Group
              </p>
            </div>

            {/* Navigation Tabs: Detailed Itinerary vs. Register Seat */}
            <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 mb-6 max-w-md">
              <button
                type="button"
                onClick={() => setActiveTab("itinerary")}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "itinerary"
                    ? "bg-white text-black shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Detailed Itinerary</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "register"
                    ? "bg-white text-black shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                <span>Register Interest</span>
              </button>
            </div>

            {/* ─── TAB 1: DETAILED ITINERARY ─── */}
            {activeTab === "itinerary" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Vision Quote Banner */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/85 italic leading-relaxed">
                    &ldquo;{trip.tagline}&rdquo;
                  </p>
                </div>

                {/* Day-by-Day Timeline List */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/40">
                      Day-by-Day Circuit Plan
                    </span>
                    <span className="text-[11px] text-white/50 font-mono">
                      {trip.durationLabel}
                    </span>
                  </div>

                  {trip.dayWiseItinerary && trip.dayWiseItinerary.length > 0 ? (
                    trip.dayWiseItinerary.map((item) => (
                      <div
                        key={item.day}
                        className="p-4 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-white/10 transition-colors space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/10">
                            Day {item.day}
                          </span>
                          {item.nightStay && (
                            <span className="text-[11px] text-white/50 font-mono">
                              Stay: {item.nightStay}
                            </span>
                          )}
                        </div>

                        <h4
                          className="text-sm sm:text-base font-bold text-white"
                          style={{ fontFamily: "var(--font-fredoka)" }}
                        >
                          {item.title}
                        </h4>

                        <p className="text-xs text-[#f5f5f5]/70 leading-relaxed">
                          {item.description}
                        </p>

                        {item.mealsIncluded && (
                          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium pt-1">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Included: {item.mealsIncluded}</span>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-white/40 border border-white/10 rounded-2xl">
                      Detailed route in final scouting reconnaissance.
                    </div>
                  )}
                </div>

                {/* Kashmiri Culinary Trail Guide */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Authentic Kashmiri Food Trail
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono text-white/40 uppercase block">
                        Lal Chowk Bazaars:
                      </span>
                      <p className="text-white/80 font-medium leading-relaxed">
                        Seekh Kebab, Girda Bread, Rajma Chawal, Kalari Kulcha &amp; Pink Noon Chai.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono text-white/40 uppercase block">
                        Dal Lake (Ghat No. 6):
                      </span>
                      <p className="text-white/80 font-medium leading-relaxed">
                        Royal Kashmiri Wazwan, Rogan Josh, Yakhni, Dum Aloo &amp; Kashmiri Pulao.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Field Travel Tips */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Expedition Field Tips
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-white/70">
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">&bull;</span>
                      <span>Carry thermal inners, windproof jackets &amp; gloves</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">&bull;</span>
                      <span>Mountain transit with certified local drivers &amp; tire chains</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">&bull;</span>
                      <span>Keep liquid cash handy for high mountain passes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">&bull;</span>
                      <span>Respect local Kashmiri traditions &amp; heritage sites</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA to Switch to Registration */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className="w-full py-3 px-6 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Reserve Seat for this Expedition</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* ─── TAB 2: REGISTER SEAT FORM ─── */}
            {activeTab === "register" && (
              <div className="animate-in fade-in duration-200">
                {/* Non-payment Notice Banner */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 flex items-start gap-2.5 text-[11px] text-[#f5f5f5]/70 leading-relaxed">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/50 shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  <span>
                    <strong>No payment is charged today.</strong> Submitting this form registers your verified seat inquiry. Ashraf&apos;s expedition team will message you directly on WhatsApp within 24 hours to confirm your spot.
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 outline-none focus:border-[#f5f5f5]/40"
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email & WhatsApp Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 outline-none focus:border-[#f5f5f5]/40"
                      />
                      {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                        WhatsApp Number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="e.g. +91 9876543210"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 outline-none focus:border-[#f5f5f5]/40"
                      />
                      {errors.whatsapp && <p className="text-[11px] text-rose-400 mt-1">{errors.whatsapp}</p>}
                    </div>
                  </div>

                  {/* Travelers & City Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                        Number of Travelers
                      </label>
                      <select
                        value={formData.travelersCount}
                        onChange={(e) => setFormData({ ...formData, travelersCount: e.target.value })}
                        className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-[#f5f5f5] outline-none focus:border-[#f5f5f5]/40"
                      >
                        <option value="1">1 Person (Solo Explorer)</option>
                        <option value="2">2 Persons (Couple / Friends)</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons (Small Group)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                        City of Departure <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai, Jaipur, Delhi"
                        value={formData.cityOfOrigin}
                        onChange={(e) => setFormData({ ...formData, cityOfOrigin: e.target.value })}
                        className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 outline-none focus:border-[#f5f5f5]/40"
                      />
                      {errors.cityOfOrigin && <p className="text-[11px] text-rose-400 mt-1">{errors.cityOfOrigin}</p>}
                    </div>
                  </div>

                  {/* Diet & Emergency Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                        Diet Preference
                      </label>
                      <select
                        value={formData.dietPreference}
                        onChange={(e) => setFormData({ ...formData, dietPreference: e.target.value })}
                        className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-[#f5f5f5] outline-none focus:border-[#f5f5f5]/40"
                      >
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian (Kashmiri Wazwan)</option>
                        <option value="Jain Food">Jain Food (No Onion/Garlic)</option>
                        <option value="Vegan">Vegan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                        Emergency Contact (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. Kin/Friend +91..."
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                        className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 outline-none focus:border-[#f5f5f5]/40"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                      Notes for Ashraf (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any health notes, questions about altitude, gear queries, etc."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 outline-none focus:border-[#f5f5f5]/40"
                    />
                  </div>

                  {errors.submit && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                      {errors.submit}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-[#f5f5f5] text-[#080808] font-bold text-xs hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-[#080808]/30 border-t-[#080808] rounded-full animate-spin" />
                          <span>Transmitting Registration...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Seat Registration Enquiry</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-[#f5f5f5]/40 mt-2">
                      Zero payment required today · Verified spots confirmed directly on WhatsApp
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          /* ─── SUCCESS SCREEN (NO COST SHOWN) ─── */
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3
              className="text-2xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Spot Enquiry Registered!
            </h3>

            <p className="text-xs text-[#f5f5f5]/70 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.fullName}</strong>. Your enquiry for{" "}
              <strong className="text-white">{trip.title}</strong> has been logged in our expedition roster.
            </p>

            <div className="p-4 rounded-2xl bg-[#080808] border border-[#f5f5f5]/10 max-w-sm mx-auto text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-[#f5f5f5]/40">Travelers:</span>
                <span className="text-white font-medium">{formData.travelersCount} Person(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f5f5f5]/40">WhatsApp:</span>
                <span className="text-white font-mono">{formData.whatsapp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f5f5f5]/40">Departure:</span>
                <span className="text-white">{trip.departureDate} ({trip.departureCity})</span>
              </div>
              <div className="flex justify-between border-t border-[#f5f5f5]/10 pt-2">
                <span className="text-[#f5f5f5]/40">Expedition Mode:</span>
                <span className="text-white font-medium">Curated Small Group (10–12 Explorers)</span>
              </div>
            </div>

            <p className="text-[11px] text-[#f5f5f5]/50 max-w-xs mx-auto mb-6">
              Ashraf or our expedition coordinator will reach out to you directly on WhatsApp within 24 hours.
            </p>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-full bg-[#f5f5f5] text-[#080808] font-bold text-xs hover:bg-white transition-colors cursor-pointer"
            >
              Done &amp; Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
