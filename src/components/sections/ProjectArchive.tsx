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
    const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Animate rows on scroll
            rowsRef.current.forEach((row, index) => {
                if (!row) return;
                
                gsap.fromTo(row, 
                    { 
                        opacity: 0, 
                        y: 20 
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full py-24 md:py-32 bg-[#050505] text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                
                {/* Section Header */}
                <div className="mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Project <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Archive</span>
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-2xl text-sm md:text-base font-mono">
                        A complete list of other web projects, applications, and experiments I've built.
                    </p>
                </div>

                {/* Table Header (Hidden on Mobile) */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs font-mono text-gray-500 uppercase tracking-widest">
                    <div className="col-span-2">Year</div>
                    <div className="col-span-5">Project</div>
                    <div className="col-span-4">Built with</div>
                    <div className="col-span-1 text-right">Link</div>
                </div>

                {/* Project Rows */}
                <div className="flex flex-col">
                    {ARCHIVE_PROJECTS.map((project, index) => (
                        <a 
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={el => { rowsRef.current[index] = el; }}
                            className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-300 items-center relative overflow-hidden cursor-none"
                        >
                            {/* Hover effect background highlight */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                            <div className="md:col-span-2 text-sm text-gray-400 font-mono">
                                {project.year}
                            </div>
                            
                            <div className="md:col-span-5 text-xl md:text-2xl font-bold group-hover:text-white group-hover:translate-x-2 transition-transform duration-300">
                                {project.title}
                            </div>
                            
                            <div className="md:col-span-4 flex flex-wrap gap-2 hidden md:flex">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded-full group-hover:text-gray-300 transition-colors duration-300">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="md:col-span-1 flex md:justify-end items-center opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="md:hidden text-xs font-mono text-gray-500 mr-2 flex-1">
                                    {project.tech.join(' · ')}
                                </span>
                                <ExternalLink size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
}
