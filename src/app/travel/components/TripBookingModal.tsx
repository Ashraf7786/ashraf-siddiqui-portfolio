"use client";

import React, { useState } from "react";
import { GroupTrip } from "../data/trips";

interface TripBookingModalProps {
  trip: GroupTrip;
  isOpen: boolean;
  onClose: () => void;
}

export default function TripBookingModal({
  trip,
  isOpen,
  onClose,
}: TripBookingModalProps) {
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
          pricePerPerson: trip.pricePerPerson,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        setErrors({ submit: data.error || "Failed to submit booking inquiry." });
      }
    } catch (err) {
      setErrors({ submit: "Network error. Please try again or WhatsApp Ashraf directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
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
      <div className="relative w-full max-w-xl bg-[#111113] border-t sm:border border-[#f5f5f5]/15 rounded-t-[28px] sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto my-0 sm:my-6 overscroll-contain">
        {/* Mobile Drag Indicator Bar */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors touch-manipulation"
          aria-label="Close modal"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6 pr-8">
              <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 font-semibold mb-1 block">
                Trip Registration Enquiry
              </span>
              <h2
                className="text-xl sm:text-2xl font-bold text-[#f5f5f5] leading-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Join {trip.title}
              </h2>
              <p className="text-xs text-[#f5f5f5]/50 mt-1">
                {trip.departureDate} &rarr; {trip.returnDate} · {trip.durationLabel} · ₹{trip.pricePerPerson.toLocaleString()} / person
              </p>
            </div>

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
                {errors.fullName && <p className="text-rose-400 text-[10px] mt-1">{errors.fullName}</p>}
              </div>

              {/* Email & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 outline-none focus:border-[#f5f5f5]/40"
                  />
                  {errors.email && <p className="text-rose-400 text-[10px] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                    WhatsApp Phone <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 outline-none focus:border-[#f5f5f5]/40 font-mono"
                  />
                  {errors.whatsapp && <p className="text-rose-400 text-[10px] mt-1">{errors.whatsapp}</p>}
                </div>
              </div>

              {/* Number of Travelers & City of Origin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                    Travelers Count
                  </label>
                  <select
                    value={formData.travelersCount}
                    onChange={(e) => setFormData({ ...formData, travelersCount: e.target.value })}
                    className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-[#f5f5f5] outline-none focus:border-[#f5f5f5]/40"
                  >
                    <option value="1">1 Person (Solo Traveler)</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4+">4+ Persons</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                    City of Origin <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai / Delhi / Jaipur"
                    value={formData.cityOfOrigin}
                    onChange={(e) => setFormData({ ...formData, cityOfOrigin: e.target.value })}
                    className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 outline-none focus:border-[#f5f5f5]/40"
                  />
                  {errors.cityOfOrigin && <p className="text-rose-400 text-[10px] mt-1">{errors.cityOfOrigin}</p>}
                </div>
              </div>

              {/* Diet & Emergency Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                    Dietary Preference
                  </label>
                  <select
                    value={formData.dietPreference}
                    onChange={(e) => setFormData({ ...formData, dietPreference: e.target.value })}
                    className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-2.5 text-[#f5f5f5] outline-none focus:border-[#f5f5f5]/40"
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Jain Food">Jain Food</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                    Emergency Contact (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Name & Contact number"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-2.5 text-[#f5f5f5] placeholder-[#f5f5f5]/30 outline-none focus:border-[#f5f5f5]/40"
                  />
                </div>
              </div>

              {/* Message / Questions */}
              <div>
                <label className="block text-[#f5f5f5]/70 font-medium mb-1">
                  Questions or Special Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your travel experience, fitness, or any questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#080808] border border-[#f5f5f5]/15 rounded-xl px-3.5 py-2 text-[#f5f5f5] placeholder-[#f5f5f5]/30 outline-none focus:border-[#f5f5f5]/40 resize-none"
                />
              </div>

              {errors.submit && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {errors.submit}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 sticky bottom-0 bg-[#111113] pb-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] py-3.5 sm:py-3 rounded-full bg-[#f5f5f5] text-[#080808] font-bold text-sm sm:text-xs hover:bg-white transition-all disabled:opacity-50 shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] touch-manipulation"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Registering Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Free Registration Inquiry</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>

            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Inquiry Registered!
            </h3>

            <p className="text-xs text-[#f5f5f5]/70 max-w-sm mx-auto leading-relaxed mb-6">
              Thank you, <strong className="text-white">{formData.fullName}</strong>. Your seat request for the <strong className="text-white">{trip.title}</strong> has been logged.
            </p>

            <div className="p-4 rounded-2xl bg-[#080808] border border-[#f5f5f5]/10 max-w-sm mx-auto text-left text-xs space-y-2 mb-6">
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
                <span className="text-[#f5f5f5]/40">Estimated Price:</span>
                <span className="text-white font-bold">₹{(trip.pricePerPerson * parseInt(formData.travelersCount, 10)).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#f5f5f5]/50 max-w-xs mx-auto mb-6">
              Ashraf or our expedition team coordinator will reach out to you directly on WhatsApp within 24 hours.
            </p>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-full bg-[#f5f5f5] text-[#080808] font-bold text-xs hover:bg-white transition-colors"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

