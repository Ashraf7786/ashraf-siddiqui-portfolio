"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import Link from 'next/link';
import { useLenis } from '@studio-freight/react-lenis';

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const lenis = useLenis();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                y: -60,
                opacity: 0,
                duration: 1.0,
                ease: 'power3.out',
                delay: 0.1,
            });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = (id: string) => {
        setMobileOpen(false);
        if (lenis) {
            lenis.scrollTo(id, {
                offset: 0,
                duration: 1.5,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
            });
        } else {
            const el = document.querySelector(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <header
                ref={headerRef}
                className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 transition-all duration-300 pointer-events-auto ${
                    scrolled
                        ? 'py-3.5 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 shadow-xl'
                        : 'py-5 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-white/[0.06]'
                }`}
            >
                <Link
                    href="/"
                    className="text-lg sm:text-xl font-bold tracking-tighter text-[#f5f5f5] hover:text-white transition-colors"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                >
                    Ashraf Siddiqui
                </Link>

                <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm tracking-wide text-[#f5f5f5]/75">
                    <button 
                        onClick={() => scrollToSection('#projects')}
                        className="hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all cursor-pointer bg-transparent border-none outline-none"
                    >
                        Projects
                    </button>
                    <button 
                        onClick={() => scrollToSection('#about')}
                        className="hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all cursor-pointer bg-transparent border-none outline-none"
                    >
                        About Me
                    </button>
                    <button 
                        onClick={() => scrollToSection('#approach')}
                        className="hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all cursor-pointer bg-transparent border-none outline-none"
                    >
                        Services
                    </button>
                    <button 
                        onClick={() => scrollToSection('#contact')}
                        className="hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all cursor-pointer bg-transparent border-none outline-none"
                    >
                        Contact
                    </button>
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href="/travel"
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#f5f5f5] bg-white/5 border border-white/15 hover:border-white/40 hover:bg-white/10 transition-all flex items-center gap-1.5"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Travel Diaries</span>
                    </Link>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-[#f5f5f5]"
                        aria-label="Toggle menu"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {mobileOpen ? (
                                <path d="M18 6L6 18M6 6l12 12" />
                            ) : (
                                <path d="M3 12h18M3 6h18M3 18h18" />
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Drawer Menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden animate-in fade-in duration-200">
                    <div className="flex flex-col gap-6 text-2xl font-bold">
                        <button
                            onClick={() => scrollToSection('#projects')}
                            className="text-left text-[#f5f5f5]/80 hover:text-white transition-colors"
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => scrollToSection('#about')}
                            className="text-left text-[#f5f5f5]/80 hover:text-white transition-colors"
                        >
                            About Me
                        </button>
                        <button
                            onClick={() => scrollToSection('#approach')}
                            className="text-left text-[#f5f5f5]/80 hover:text-white transition-colors"
                        >
                            Services
                        </button>
                        <button
                            onClick={() => scrollToSection('#contact')}
                            className="text-left text-[#f5f5f5]/80 hover:text-white transition-colors"
                        >
                            Contact
                        </button>
                        <Link
                            href="/travel"
                            onClick={() => setMobileOpen(false)}
                            className="text-left text-emerald-400 hover:text-emerald-300 transition-colors pt-4 border-t border-white/10 flex items-center gap-2"
                        >
                            <span>Explore Travel Diaries</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
