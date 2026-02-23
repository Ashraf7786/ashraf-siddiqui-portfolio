"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PLAYGROUND_PROJECTS = [
    {
        id: 1,
        title: "E-Commerce Experience",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
        link: "#",
    },
    {
        id: 2,
        title: "Fashion Editorial",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
        link: "#",
    },
    {
        id: 3,
        title: "Automotive Landing",
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800",
        link: "#",
    },
    {
        id: 4,
        title: "Dark Mode Dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        link: "#",
    },
    {
        id: 5,
        title: "Travel Platform",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
        link: "#",
    },
    {
        id: 6,
        title: "Architecture Portfolio",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
        link: "#",
    }
];

export default function Playground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [viewOption, setViewOption] = useState<'GRID' | 'MARQUEE'>('MARQUEE');

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Text reveal animation
            if (textRef.current) {
                gsap.fromTo(textRef.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 75%',
                        }
                    }
                );
            }

            // Marquee Animation
            if (viewOption === 'MARQUEE' && marqueeRef.current) {
                const marqueeContent = marqueeRef.current.querySelector('.marquee-track');
                if (marqueeContent) {
                    // Clone items for seamless loop
                    const items = Array.from(marqueeContent.children);
                    items.forEach(item => {
                        const clone = item.cloneNode(true);
                        marqueeContent.appendChild(clone);
                    });

                    // Calculate total width of one set of items
                    const itemWidth = (items[0] as HTMLElement).offsetWidth;
                    const gap = 24; // 6rem gap
                    const totalWidth = (itemWidth + gap) * items.length;

                    gsap.fromTo(marqueeContent,
                        { x: 0 },
                        {
                            x: -totalWidth,
                            duration: 20,
                            ease: "none",
                            repeat: -1,
                            modifiers: {
                                x: gsap.utils.unitize(x => parseFloat(x as string) % totalWidth)
                            }
                        }
                    );
                }
            }
        }, containerRef);

        return () => ctx.revert();
    }, [viewOption]);

    return (
        <section ref={containerRef} className="w-full min-h-screen bg-[#111111] py-20 lg:py-32 flex flex-col justify-center relative overflow-hidden z-10 border-t border-white/5">
            {/* Top Text Content */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 flex flex-col items-center md:items-start md:flex-row gap-6 sm:gap-8 md:gap-24 mb-12 sm:mb-20">
                {/* Visual spacer to push text to the right like in the screenshot */}
                <div className="hidden md:block md:w-1/4"></div>

                <div ref={textRef} className="md:w-3/4 flex flex-col gap-6 sm:gap-8 px-2 sm:px-0">
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.5vw] leading-[1.3] font-light text-[#f5f5f5] tracking-wide" style={{ fontFamily: 'var(--font-outfit)' }}>
                        I specialize in crafting elegant, high-performance websites that are as functional as they are memorable. Beyond development, I’m driven by motion and interaction—explore my latest experiments in the Playground.
                    </p>

                    {/* View Options Toggle */}
                    <div className="flex items-center gap-6 mt-8">
                        <span className="text-xs font-mono tracking-widest text-white/40 uppercase">View Options:</span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setViewOption('GRID')}
                                className={`text-xs font-mono tracking-widest uppercase transition-colors ${viewOption === 'GRID' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                            >
                                {viewOption === 'GRID' ? '( GRID )' : 'GRID'}
                            </button>
                            <button
                                onClick={() => setViewOption('MARQUEE')}
                                className={`text-xs font-mono tracking-widest uppercase transition-colors ${viewOption === 'MARQUEE' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                            >
                                {viewOption === 'MARQUEE' ? '( MARQUEE )' : 'MARQUEE'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="w-full mt-10">
                {viewOption === 'MARQUEE' ? (
                    <div ref={marqueeRef} className="w-full overflow-hidden flex whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <div className="marquee-track flex gap-6 px-6 relative w-max">
                            {PLAYGROUND_PROJECTS.map((project, idx) => (
                                <a key={idx} href={project.link} className="block relative group w-[70vw] md:w-[45vw] lg:w-[30vw] h-[30vh] md:h-[40vh] lg:h-[45vh] overflow-hidden rounded-[20px] md:rounded-[30px] flex-shrink-0 cursor-pointer">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                    <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 flex justify-between items-end opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                                        <h3 className="text-white text-xl md:text-3xl font-medium tracking-wide drop-shadow-md" style={{ fontFamily: 'var(--font-outfit)' }}>
                                            {project.title}
                                        </h3>
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PLAYGROUND_PROJECTS.map((project, idx) => (
                            <a key={idx} href={project.link} className="block relative group w-full h-[30vh] md:h-[35vh] overflow-hidden rounded-[20px] md:rounded-[30px] cursor-pointer">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>
                                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10">
                                    <h3 className="text-white text-xl md:text-2xl font-medium tracking-wide" style={{ fontFamily: 'var(--font-outfit)' }}>
                                        {project.title}
                                    </h3>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
