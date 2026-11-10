"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NewsletterPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const isValid = validateEmail(email);
  const showError = touched && !isValid && email.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/travel/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setServerMsg(data.message || "Next dispatch will find its way to your inbox. Safe travels.");
        setSubmitted(true);
        setTimeout(() => {
          gsap.from(".nl-success", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" });
        }, 50);
      } else {
        alert(data.error || "Subscription failed. Please check your email and try again.");
      }
    } catch {
      alert("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nl-content", {
        y: 50,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="newsletter" ref={sectionRef} className="py-20 sm:py-24 md:py-28 bg-[#080808] border-b border-[#f5f5f5]/5">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="nl-content">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f5f5f5]/5 border border-[#f5f5f5]/10 mb-4 sm:mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/80">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>

          <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#f5f5f5]/30 mb-2 sm:mb-3">Get The Travel Letter</p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-3 sm:mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Stories, before they go public.
          </h2>
          <p className="text-[#f5f5f5]/50 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto">
            Travel dispatches from the road — destination deep-dives, honest itineraries, group-tour announcements. No spam, ever.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  disabled={isSubmitting}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className={`w-full px-5 py-3 rounded-full text-xs sm:text-sm text-[#f5f5f5] placeholder-[#f5f5f5]/30 bg-[#111113] border transition-all duration-200 outline-none ${
                    showError ? "border-red-400/60" : "border-[#f5f5f5]/10 focus:border-[#f5f5f5]/30"
                  } disabled:opacity-50`}
                />
                {showError && (
                  <p role="alert" className="absolute -bottom-5 left-4 text-[10px] text-red-400">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 border border-[#f5f5f5]/20 rounded-full text-xs sm:text-sm text-[#f5f5f5]/80 hover:border-[#f5f5f5]/60 hover:text-[#f5f5f5] transition-all backdrop-blur-sm hover:bg-white/5 whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "Subscribing..." : "Subscribe"}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          ) : (
            <div className="nl-success py-6 px-8 rounded-2xl border border-[#f5f5f5]/10 bg-[#111113] flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-[#f5f5f5] mb-1">You&apos;re on the list!</p>
              <p className="text-xs text-[#f5f5f5]/50 max-w-sm">
                {serverMsg || "Next dispatch will find its way to your inbox. Safe travels."}
              </p>
            </div>
          )}
          <p className="mt-5 sm:mt-6 text-[10px] text-[#f5f5f5]/30">Direct dispatches from the road · Unsubscribe anytime with one click</p>
        </div>
      </div>
    </section>
  );
}
