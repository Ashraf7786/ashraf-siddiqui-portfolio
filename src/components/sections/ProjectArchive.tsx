"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// You can add all your past projects here
const ARCHIVE_PROJECTS = [
    {
        year: '2025',
        title: 'SocialArch',
        tech: ['Next.js', 'GSAP', 'SEO', 'Tailwind'],
        link: 'https://socialarchmedia.com/',
    },
    {
        year: '2025',
        title: 'Aerocool',
        tech: ['React.js', 'Next.js', 'Matter.js', 'Tailwind'],
        link: 'https://www.aerocooljaipur.in/',
    },
    {
        year: '2025',
        title: 'Adwoks Academy',
        tech: ['Laravel', 'Vue.js', 'Tailwind', 'PHP'],
        link: 'https://www.adwoksacademy.com/',
    },
    {
        year: '2024',
        title: 'Jagdamba Travels',
        tech: ['React', 'Next.js', 'Tailwind'],
        link: 'https://indiajagdambatours.com/',
    },
    {
        year: '2025',
        title: "Dr. Priya's Skin Clinics",
        tech: ['Laravel', 'PHP', 'MySQL', 'JS', 'HTML/CSS'],
        link: 'https://www.drpriyaenhanceskinclinics.com/',
    },
    {
        year: '2025',
        title: 'Books Duniya',
        tech: ['Shopify', 'Liquid JS', 'Tailwind'],
        link: '#',
    },
    {
        year: '2024',
        title: 'Qkart Ecommerce',
        tech: ['React', 'Node.js', 'MongoDB'],
        link: '#',
    },
    {
        year: '2024',
        title: 'Photography Dashboard',
        tech: ['Next.js', 'Tailwind', 'Framer Motion'],
        link: '#',
    },
    {
        year: '2023',
        title: 'AI Assistant Interface',
        tech: ['React', 'OpenAI API', 'CSS Modules'],
        link: '#',
    },
    {
        year: '2023',
        title: 'Corporate Landing Page',
        tech: ['HTML', 'SCSS', 'JS'],
        link: '#',
    }
];

export default function ProjectArchive() {
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Animate rows on scroll with a staggered entrance
            rowsRef.current.forEach((row, index) => {
                if (!row) return;
                
                gsap.fromTo(row, 
                    { 
                        opacity: 0, 
                        x: 20 
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 95%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // If we wanted to pin the whole section, we could do it here
            // but a side-by-side sticky layout is often cleaner for lists.
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full py-24 md:py-40 bg-[#050505] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-12 md:gap-24">
                
                {/* Sticky Side Header */}
                <div className="md:w-1/3">
                    <div className="md:sticky md:top-32 space-y-6">
                        <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">
                            The Collection
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Project <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Archive</span>
                        </h2>
                        <p className="text-gray-400 max-w-xs text-sm font-mono leading-relaxed">
                            A curated selection of experiments, applications, and legacy projects developed over the years.
                        </p>
                        
                        <div className="pt-8 hidden md:block">
                            <div className="h-[1px] w-20 bg-gradient-to-r from-white/40 to-transparent" />
                        </div>
                    </div>
                </div>

                {/* Scrolling List */}
                <div ref={listRef} className="md:w-2/3 flex flex-col border-t border-white/10">
                    {ARCHIVE_PROJECTS.map((project, index) => (
                        <a 
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={el => { rowsRef.current[index] = el; }}
                            className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-b border-white/10 hover:bg-white/[0.01] transition-all duration-500 cursor-none"
                        >
                            {/* Animated Background Indicator */}
                            <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1 bg-white transition-all duration-500 ease-expo" />
                            
                            <div className="flex flex-col gap-1 z-10 md:pl-6 transition-transform duration-500 group-hover:translate-x-4">
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                    {project.year}
                                </span>
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                                    {project.title}
                                </h3>
                            </div>
                            
                            <div className="flex flex-col items-start md:items-end gap-3 mt-4 md:mt-0 z-10 md:pr-6 transition-all duration-500 group-hover:-translate-x-2">
                                <div className="flex flex-wrap gap-2 md:justify-end">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-[9px] font-mono text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-sm group-hover:border-white/30 group-hover:text-gray-300 transition-colors duration-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 group-hover:text-white transition-colors duration-300 uppercase tracking-[0.2em]">
                                    View Project <ExternalLink size={10} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </div>
                            </div>
                        </a>
                    ))}
                    
                    {/* End Indicator */}
                    <div className="py-12 flex justify-center opacity-20">
                        <div className="w-1 h-1 rounded-full bg-white mx-1" />
                        <div className="w-1 h-1 rounded-full bg-white mx-1" />
                        <div className="w-1 h-1 rounded-full bg-white mx-1" />
                    </div>
                </div>

            </div>
        </section>
    );
}
