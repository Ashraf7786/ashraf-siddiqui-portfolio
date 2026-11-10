"use client";

import React, { useState } from "react";
import Link from "next/link";
import TravelNav from "../components/TravelNav";
import TravelFooter from "../components/TravelFooter";

/* ─── Collaboration Types ─── */
const COLLAB_TYPES = [
  {
    title: "Brand Collaborations",
    description: "Hotel stays, gear reviews, travel products & destination campaigns",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    title: "Instagram Reels",
    description: "Cinematic short-form reels for destinations, tourism boards & brands",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Group Trips",
    description: "Co-lead group expeditions to Kashmir, Ladakh, Spiti & Northeast India",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Travel Writing",
    description: "Long-form destination guides, itinerary blogs & editorial features",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "Photography",
    description: "Travel photography for tourism boards, resorts & lifestyle brands",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    title: "Speaking",
    description: "Travel talks, campus events & panel discussions on solo travel",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

/* ─── FAQ Data ─── */
const FAQS = [
  {
    q: "What types of brands do you work with?",
    a: "Travel, lifestyle, outdoor gear, hotels & tourism boards that align with authentic, immersive travel experiences.",
  },
  {
    q: "How long does a collaboration campaign take?",
    a: "Typically 1-4 weeks from briefing to final delivery, depending on scope and content format.",
  },
  {
    q: "Do you travel internationally?",
    a: "Currently focused on exploring all 28 Indian states. International collaborations are open for discussion on a case-by-case basis.",
  },
  {
    q: "What is included in group trips?",
    a: "Accommodation, ground transport, local guide, photography sessions, and exclusive access to off-the-beaten-path locations.",
  },
  {
    q: "How do I book a group trip slot?",
    a: "Fill the contact form above selecting Group Trip as the collaboration type, or send a DM on Instagram. Limited slots per expedition.",
  },
];

/* ─── Social / Contact Links ─── */
const CONTACT_LINKS = [
  {
    label: "Instagram",
    value: "@ashraf._siddiqui",
    href: "https://instagram.com/ashraf._siddiqui",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "ashrafsiddiquitravel@gmail.com",
    href: "mailto:ashrafsiddiquitravel@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Jaipur, India",
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Website",
    value: "iamashraf.in",
    href: "https://iamashraf.in",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

type CollabType =
  | "Brand"
  | "Reels"
  | "Group Trip"
  | "Writing"
  | "Photography"
  | "Speaking"
  | "Other"
  | "";

interface FormState {
  name: string;
  email: string;
  collabType: CollabType;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  collabType?: string;
  subject?: string;
  message?: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─── FAQ Accordion Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#1e1e20] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-[#111113] hover:bg-[#161618] transition-colors gap-4"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-[#f5f5f5]">{q}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`shrink-0 text-[#f5f5f5]/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <div className="px-5 py-4 text-sm text-[#f5f5f5]/60 leading-relaxed bg-[#0d0d0f] border-t border-[#1e1e20]">
          {a}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ContactClient() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    collabType: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!validateEmail(form.email)) e.email = "Enter a valid email address";
    if (!form.collabType) e.collabType = "Please select a collaboration type";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/travel/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          whatsapp: "",
          collabType: form.collabType,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrors((prev) => ({ ...prev, message: data.error || "Failed to send message." }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, message: "Network error. Please try emailing directly." }));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "bg-[#0d0d0f] border border-[#1e1e20] rounded-xl px-4 py-3 text-[#f5f5f5] placeholder-[#f5f5f5]/20 focus:border-[#444446] focus:outline-none w-full text-sm transition-colors";
  const errorClass = "mt-1 text-xs text-red-400";

  return (
    <>
      <TravelNav />
      <main className="min-h-screen bg-[#080808] text-[#f5f5f5]">

        {/* ─── Section 1: Hero Header ─── */}
        <section
          className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1e1e20 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/60 via-transparent to-[#080808] pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5f5f5]/30 font-medium mb-4">
              Contact &amp; Collaborate
            </p>
            <h1
              className="text-4xl sm:text-6xl font-bold text-[#f5f5f5] leading-tight mb-5"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Let&apos;s Create Together
            </h1>
            <p className="text-base sm:text-lg text-[#f5f5f5]/60 leading-relaxed mb-8 max-w-xl mx-auto">
              Open for brand collaborations, travel partnerships, and group trip enquiries
            </p>
            <a
              href="mailto:ashrafsiddiquitravel@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1e1e20] bg-[#111113] hover:border-[#333335] text-sm text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              ashrafsiddiquitravel@gmail.com
            </a>
          </div>
        </section>

        {/* ─── Section 2: Collaboration Types ─── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5f5f5]/30 font-medium mb-2">
              What I offer
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Ways to Collaborate
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLLAB_TYPES.map((item) => (
              <div
                key={item.title}
                className="bg-[#111113] border border-[#1e1e20] rounded-2xl p-6 hover:border-[#333335] transition-colors"
              >
                <div className="text-[#e8e8e8] mb-4">{item.icon}</div>
                <h3 className="text-sm font-semibold text-[#f5f5f5] mb-2">{item.title}</h3>
                <p className="text-xs text-[#f5f5f5]/50 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 3: Contact Form ─── */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-20">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5f5f5]/30 font-medium mb-2">
              Get in touch
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Send a Message
            </h2>
          </div>

          <div className="bg-[#111113] border border-[#1e1e20] rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#1e1e20] flex items-center justify-center mb-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#e8e8e8]">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#f5f5f5]" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Message Received
                </h3>
                <p className="text-sm text-[#f5f5f5]/60 max-w-sm leading-relaxed">
                  Thank you! Ashraf will reply within 48 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", collabType: "", subject: "", message: "" }); }}
                  className="mt-4 text-xs text-[#f5f5f5]/50 hover:text-[#f5f5f5] transition-colors border border-[#1e1e20] rounded-xl px-4 py-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#f5f5f5]/50 mb-1.5">
                      Full Name <span className="text-[#f5f5f5]/30">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                    />
                    {errors.name && <p className={errorClass}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f5f5f5]/50 mb-1.5">
                      Email Address <span className="text-[#f5f5f5]/30">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                    {errors.email && <p className={errorClass}>{errors.email}</p>}
                  </div>
                </div>

                {/* Collab Type + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#f5f5f5]/50 mb-1.5">
                      Collaboration Type <span className="text-[#f5f5f5]/30">*</span>
                    </label>
                    <select
                      name="collabType"
                      value={form.collabType}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select type...</option>
                      <option value="Brand">Brand Collaboration</option>
                      <option value="Reels">Instagram Reels</option>
                      <option value="Group Trip">Group Trip</option>
                      <option value="Writing">Travel Writing</option>
                      <option value="Photography">Photography</option>
                      <option value="Speaking">Speaking</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.collabType && <p className={errorClass}>{errors.collabType}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f5f5f5]/50 mb-1.5">
                      Subject <span className="text-[#f5f5f5]/30">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Brief subject"
                      className={inputClass}
                    />
                    {errors.subject && <p className={errorClass}>{errors.subject}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-[#f5f5f5]/50 mb-1.5">
                    Message <span className="text-[#f5f5f5]/30">*</span>
                    <span className="ml-2 text-[#f5f5f5]/20 font-normal">(min. 150 characters suggested)</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe your collaboration idea, timeline, and any other relevant details..."
                    className={`${inputClass} resize-none`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.message && <p className={errorClass}>{errors.message}</p>}
                    <span className={`ml-auto text-[10px] ${form.message.length >= 150 ? "text-[#f5f5f5]/30" : "text-[#f5f5f5]/20"}`}>
                      {form.message.length} / 150
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#f5f5f5] text-[#080808] font-semibold text-sm hover:bg-[#e0e0e0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ─── Section 4: Social & Direct Contact ─── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-20">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5f5f5]/30 font-medium mb-2">
              Find me online
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Direct Contact
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTACT_LINKS.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-[#111113] border border-[#1e1e20] rounded-xl p-4 hover:border-[#333335] transition-colors flex flex-col gap-3"
                >
                  <div className="text-[#e8e8e8]">{item.icon}</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/30 mb-0.5">{item.label}</p>
                    <p className="text-sm text-[#f5f5f5]/80 font-medium break-all">{item.value}</p>
                  </div>
                </a>
              ) : (
                <div
                  key={item.label}
                  className="bg-[#111113] border border-[#1e1e20] rounded-xl p-4 flex flex-col gap-3"
                >
                  <div className="text-[#e8e8e8]">{item.icon}</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/30 mb-0.5">{item.label}</p>
                    <p className="text-sm text-[#f5f5f5]/80 font-medium">{item.value}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* ─── Section 5: FAQ Accordion ─── */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-28">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5f5f5]/30 font-medium mb-2">
              Common questions
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Frequently Asked
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          {/* CTA at bottom */}
          <div className="mt-10 text-center">
            <p className="text-sm text-[#f5f5f5]/40 mb-4">
              Still have questions? Reach out directly.
            </p>
            <Link
              href="mailto:ashrafsiddiquitravel@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1e1e20] bg-[#111113] hover:border-[#333335] text-sm text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email Ashraf
            </Link>
          </div>
        </section>
      </main>
      <TravelFooter />
    </>
  );
}
