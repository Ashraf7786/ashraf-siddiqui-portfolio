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
    const triggerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768;
            
            if (!isMobile) {
                const totalWidth = sectionRef.current!.scrollWidth;
                const viewportWidth = window.innerWidth;
                const scrollAmount = totalWidth - viewportWidth + 200; // Extra breathing room

                gsap.to(sectionRef.current, {
                    x: -scrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        pin: true,
                        start: "top top",
                        end: () => `+=${scrollAmount}`,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative bg-[#050505] overflow-hidden">
            {/* Scroll Trigger Wrapper */}
            <div ref={triggerRef} className="min-h-screen flex flex-col justify-center py-20 md:py-0">
                
                {/* Header - Stays relatively static or follows slightly */}
                <div className="px-6 md:px-20 mb-12 md:mb-0 md:absolute md:top-24 md:left-0 z-20">
                    <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-4">
                        The Full Collection
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Project <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Archive</span>
                    </h2>
                </div>

                {/* Horizontal Section */}
                <div className="relative w-full flex items-center overflow-x-auto md:overflow-x-visible no-scrollbar px-6 md:px-0">
                    <div 
                        ref={sectionRef} 
                        className="flex gap-6 md:gap-12 px-0 md:pl-[40vw] py-10"
                    >
                        {ARCHIVE_PROJECTS.map((project, index) => (
                            <div 
                                key={index}
                                className="flex-shrink-0 w-[80vw] md:w-[450px] group"
                            >
                                <a 
                                    href={project.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block relative p-8 md:p-12 bg-white/[0.03] border border-white/10 rounded-3xl hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-4 cursor-none overflow-hidden h-[300px] md:h-[400px] flex flex-col justify-between"
                                >
                                    {/* Animated Glow on Hover */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:bg-white/10 transition-all duration-700" />
                                    
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-mono text-gray-500 tracking-[0.2em]">
                                                {project.year}
                                            </span>
                                            <ExternalLink size={18} className="text-gray-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-bold leading-tight group-hover:text-white transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <div className="space-y-6 relative z-10">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded-md border border-white/5 group-hover:border-white/20 transition-all">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">
                                            Explore Work <div className="h-[1px] w-8 bg-gray-700 group-hover:w-12 group-hover:bg-white transition-all duration-500" />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}

                        {/* Filler for end space */}
                        <div className="flex-shrink-0 w-[20vw] hidden md:block" />
                    </div>
                </div>

            </div>
        </section>
    );
}
