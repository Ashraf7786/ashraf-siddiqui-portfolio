"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const steps = [
    {
        id: '01',
        title: 'Strategy & Discovery',
        description: 'Before writing a single line of code, I dive deep into understanding your goals, target audience, and the problem we are solving. This phase sets the foundation for a scalable architecture.',
        tags: ['Requirements Gathering', 'Technical Scoping', 'Feasibility Study'],
    },
    {
        id: '02',
        title: 'System Architecture',
        description: 'Designing robust systems that stand the test of time. I plan the database schema, API structure, and frontend state management to ensure seamless performance and maintainability.',
        tags: ['Database Design', 'API Endpoints', 'Component Architecture'],
    },
    {
        id: '03',
        title: 'Agile Development',
        description: 'Building the core product with modern technologies. I write clean, modular, and typed code while keeping a close eye on performance, security, and accessibility standards.',
        tags: ['Full-Stack Engineering', 'Responsive UI/UX', 'Continuous Integration'],
    },
    {
        id: '04',
        title: 'Optimization & Scaling',
        description: 'A launch is just the beginning. I rigorously test, optimize web vitals, implement caching strategies, and ensure your infrastructure can handle traffic spikes elegantly.',
        tags: ['Performance Tuning', 'SEO Optimization', 'Deployment Pipelines'],
    }
];

export default function Approach() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Animate the central line
            gsap.fromTo(lineRef.current,
                { height: '0%' },
                {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 1,
                    }
                }
            );

            // Animate each card
            cardsRef.current.forEach((card, index) => {
                if (!card) return;
                
                const isLeft = index % 2 === 0;
                
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        x: isLeft ? -50 : 50,
                        y: 50
                    },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-24 md:py-40 bg-[#050505] text-white overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20 md:mb-32">
                    <h2 className="text-sm md:text-base font-mono text-white/50 tracking-widest uppercase mb-4">My Methodology</h2>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Excellence</span>
                    </h3>
                </div>

                <div className="relative">
                    {/* The glowing center line for desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
                        <div ref={lineRef} className="w-full bg-gradient-to-b from-white via-white/50 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                    </div>

                    <div className="flex flex-col gap-12 md:gap-0">
                        {steps.map((step, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div key={step.id} className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'} w-full md:min-h-[40vh]`}>
                                    
                                    {/* Mobile/Tablet Line element */}
                                    <div className="md:hidden absolute left-8 top-0 bottom-[-3rem] w-[2px] bg-white/10 z-0">
                                        <div className="h-1/2 w-full bg-gradient-to-b from-white to-transparent" />
                                    </div>

                                    {/* Center Node (Desktop only) */}
                                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0a0a0a] border border-white/20 rounded-full items-center justify-center z-10 group transition-colors hover:border-white/60">
                                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:scale-150 transition-transform" />
                                    </div>

                                    <div 
                                        ref={el => { cardsRef.current[index] = el; }}
                                        className={`w-full md:w-[45%] relative z-10 pl-20 md:pl-0 ${isLeft ? 'md:pr-16 text-left' : 'md:pl-16 text-left'}`}
                                    >
                                        {/* Mobile Number Node */}
                                        <div className="md:hidden absolute left-4 top-0 w-10 h-10 bg-[#0a0a0a] border border-white/20 rounded-full flex items-center justify-center z-10">
                                            <span className="text-xs font-mono text-white/70">{step.id}</span>
                                        </div>

                                        <div className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 backdrop-blur-sm">
                                            <span className="hidden md:block text-6xl font-black text-white/5 mb-4 group-hover:text-white/10 transition-colors duration-500" style={{ fontFamily: 'var(--font-outfit)' }}>
                                                {step.id}
                                            </span>
                                            <h4 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>{step.title}</h4>
                                            <p className="text-white/60 leading-relaxed mb-6">
                                                {step.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {step.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-white/70 border border-white/10">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
