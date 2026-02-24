"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Line by line reveal for paragraph
            if (textRef.current) {
                const lines = textRef.current.querySelectorAll('.reveal-line');
                gsap.fromTo(lines,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 80%',
                        }
                    }
                );
            }

            // Masonry images reveal
            gsap.fromTo(imagesRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.masonry-grid',
                        start: 'top 70%',
                    }
                }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={containerRef} className="w-full min-h-screen bg-[#0a0a0a] py-20 lg:py-32 px-4 sm:px-8 flex flex-col justify-center relative z-10">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Typography */}
                <div ref={textRef} className="flex flex-col gap-4 md:gap-6 text-[7vw] sm:text-[5vw] md:text-[3vw] lg:text-[2.2vw] leading-tight font-light text-[#f5f5f5]">
                    <h2 className="text-sm font-mono tracking-widest text-[#f5f5f5]/50 uppercase mb-4 overflow-hidden">
                        <span className="block reveal-line">/ About Me</span>
                    </h2>
                    <div className="overflow-hidden">
                        <p className="reveal-line">I’m a full-stack developer</p>
                    </div>
                    <div className="overflow-hidden">
                        <p className="reveal-line">passionate about building</p>
                    </div>
                    <div className="overflow-hidden">
                        <p className="reveal-line flex items-center gap-4">
                            intelligent digital systems.
                            <span className="w-16 h-px bg-[#f5f5f5]/30 inline-block" />
                        </p>
                    </div>
                    <div className="overflow-hidden mt-6 md:mt-8 max-w-lg flex flex-col gap-4">
                        <p className="reveal-line text-[#f5f5f5]/50 text-sm sm:text-base md:text-lg">
                            With expertise in MERN Stack and Laravel, I create scalable, performance-driven applications that are clean, structured, and user-focused.
                        </p>
                        <p className="reveal-line text-[#f5f5f5]/50 text-sm sm:text-base md:text-lg">
                            Driven by my interest in AI agents and automation, I constantly explore smarter ways to build software that adapts, evolves, and delivers real impact.
                        </p>
                    </div>
                </div>

                {/* Masonry Grid */}
                <div className="masonry-grid grid grid-cols-2 gap-4 md:gap-6 h-[70vh] md:h-[80vh]">
                    <div className="flex flex-col gap-4 md:gap-6 pt-12 md:pt-24">
                        <img
                            ref={el => { imagesRef.current[0] = el }}
                            src="/img/laptop.jpeg"
                            alt="Rajasthan Travel"
                            className="w-full h-[30vh] md:h-[40vh] rounded-2xl object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <img
                            ref={el => { imagesRef.current[1] = el }}
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
                            alt="Coding"
                            className="w-full h-[25vh] rounded-2xl object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-6">
                        <img
                            ref={el => { imagesRef.current[2] = el }}
                            src="/img/ashraf2.jpeg"
                            alt="Fashion"
                            className="w-full h-[45vh] md:h-[55vh] rounded-2xl object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
