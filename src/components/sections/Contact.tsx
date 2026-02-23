"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const updateTimer = () => {
            const time = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }).format(new Date());
            setCurrentTime(`${time} — Jaipur, Rajasthan, India`);
        };

        updateTimer(); // initial call
        const timer = setInterval(updateTimer, 1000); // update every second

        return () => clearInterval(timer);
    }, []);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Endless Marquee Animation
            if (marqueeRef.current) {
                const textElement = marqueeRef.current.querySelector('.marquee-text');
                if (textElement) {
                    // Clone it a few times to ensure it covers screens of all sizes when repeating
                    ['1', '2'].forEach(() => {
                        const clone = textElement.cloneNode(true);
                        marqueeRef.current?.appendChild(clone);
                    });

                    const tl = gsap.to(marqueeRef.current.children, {
                        xPercent: -100,
                        repeat: -1,
                        duration: 10,
                        ease: "none",
                    });

                    // Reverse slightly on scroll
                    ScrollTrigger.create({
                        trigger: document.body,
                        start: "top top",
                        end: "bottom bottom",
                        onUpdate: (self) => {
                            if (self.direction === -1) { // scrolling up
                                tl.timeScale(-1.5); // reverse speed slightly
                            } else { // scrolling down
                                tl.timeScale(1.5);
                            }
                            // reset back to normal speed after a timeout
                            gsap.to(tl, { timeScale: 1, duration: 0.5, delay: 0.1 });
                        }
                    });
                }
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            ref={containerRef}
            id="contact"
            className="w-full bg-[#0a0a0a] text-[#f5f5f5] pt-20 md:pt-32 pb-8 flex flex-col justify-between relative overflow-hidden z-10"
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16 md:mb-24 z-10">

                {/* Email & Title */}
                <div className="flex flex-col gap-4 w-full">
                    <p className="text-[#f5f5f5]/50 font-mono tracking-widest text-xs sm:text-sm uppercase">Ready to elevate your digital presence?</p>
                    <div className="flex flex-col gap-2 w-full">
                        <a href="mailto:ashrafsiddiqui6378@gmail.com" className="text-xl sm:text-3xl md:text-5xl lg:text-[4vw] font-black tracking-tighter hover:text-gray-400 transition-colors leading-[0.9] break-words sm:break-normal w-full" style={{ fontFamily: 'var(--font-outfit)' }}>
                            ashrafsiddiqui6378@gmail.com
                        </a>
                        {currentTime && (
                            <p className="text-[#f5f5f5]/60 font-mono tracking-widest text-[10px] sm:text-xs mt-2 uppercase">
                                Local Time: {currentTime}
                            </p>
                        )}
                    </div>
                    <div className="mt-6 md:mt-8 max-w-xl">
                        <p className="text-[#f5f5f5]/70 text-base md:text-lg mb-6 leading-relaxed">
                            Let’s build something remarkable together. I’m currently available for agency partnerships, freelance commissions, and impactful remote roles.
                        </p>
                        <a href="mailto:ashrafsiddiqui6378@gmail.com" className="group inline-flex items-center gap-3 px-8 py-4 bg-[#f5f5f5] text-[#0a0a0a] text-sm uppercase tracking-widest font-bold font-mono rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 mix-blend-difference cursor-none shadow-[0_0_0_0_rgba(245,245,245,0.4)] hover:shadow-[0_0_20px_0_rgba(245,245,245,0.4)]">
                            <span>Let's Work Together</span>
                            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-lg leading-none">↗</span>
                        </a>
                    </div>
                </div>

                {/* Socials & Top Btn */}
                <div className="flex flex-col items-start md:items-end gap-8 shrink-0">
                    <div className="flex gap-8 text-sm uppercase tracking-widest font-mono">
                        <a href="https://www.instagram.com/ashraf._siddiqui" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors relative group">
                            Instagram
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a href="#" className="hover:text-white transition-colors relative group">
                            LinkedIn
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                        </a>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="w-16 h-16 rounded-full border border-[#f5f5f5]/20 flex items-center justify-center hover:bg-white hover:text-black transition-all group mix-blend-difference z-50 cursor-none mt-4"
                    >
                        <span className="group-hover:-translate-y-1 transition-transform">↑</span>
                        <span className="sr-only">Back to Top</span>
                    </button>
                </div>

            </div>

            {/* Infinite Scrolling Marquee */}
            <div className="w-full border-t border-b border-[#f5f5f5]/10 py-4 md:py-8 overflow-hidden relative flex whitespace-nowrap opacity-20 select-none pointer-events-none" ref={marqueeRef}>
                <div className="marquee-text flex items-center shrink-0 pr-8">
                    <h2 className="text-[15vw] font-black uppercase leading-[0.85] tracking-tighter" style={{ fontFamily: 'var(--font-outfit)' }}>
                        || Ashraf || Ashraf || Ashraf&nbsp;
                    </h2>
                </div>
            </div>

            <div className="w-full mt-8 flex flex-col items-center justify-center gap-3 h-auto px-4 text-center">
                <div className="text-[#f5f5f5]/30 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
                    © {new Date().getFullYear()} Ashraf Siddiqui. All Rights Reserved.
                </div>
                <div className="text-[#f5f5f5]/50 text-[10px] sm:text-xs font-mono lowercase tracking-widest px-4 py-2 border border-[#f5f5f5]/10 rounded bg-[#0a0a0a]">
                    {"<"} designed and developed by ashraf siddiqui {"/>"}
                </div>
            </div>
        </footer>
    );
}
