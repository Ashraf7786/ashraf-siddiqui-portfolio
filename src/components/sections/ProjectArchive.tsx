"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// You can add all your past projects here
const ARCHIVE_PROJECTS = [
    {
        year: '2025',
        title: 'Neuro Spine Solution',
        tech: ['HTML', 'CSS', 'JS', 'Laravel'],
        link: 'https://www.neurospinesolution.com/',
    },
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
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    // Get the first image from the main projects for the archive preview
    const getPreviewImage = (title: string) => {
        if (title === 'Neuro Spine Solution') return "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400"; // Professional clinic exterior/interior
        if (title === 'SocialArch') return "/projects/socialarch-1.png";
        if (title === 'Aerocool') return "/projects/aerocool/aerocool-1.png";
        if (title === 'Adwoks Academy') return "/projects/adwoks/adwoks-1.png";
        if (title === 'Jagdamba Travels') return "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=400";
        if (title.includes("Priya")) return "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=400";
        return null;
    };

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            rowsRef.current.forEach((row, index) => {
                if (!row) return;
                
                gsap.fromTo(row, 
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 92%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }, containerRef);

        const handleGlobalMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleGlobalMouseMove);

        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, []);

    return (
        <section ref={containerRef} className="w-full py-24 md:py-48 bg-[#050505] text-white overflow-hidden relative">
            
            {/* Floating Image Preview (Premium Effect) */}
            <div 
                className="fixed pointer-events-none z-[100] w-64 h-40 rounded-xl overflow-hidden transition-opacity duration-300 ease-out shadow-2xl border border-white/10 hidden md:block"
                style={{ 
                    left: mousePos.x + 20, 
                    top: mousePos.y - 80,
                    opacity: hoveredImage ? 1 : 0,
                    transform: `rotate(${ (mousePos.x % 10) - 5 }deg) scale(${hoveredImage ? 1 : 0.8})`,
                    transition: 'opacity 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
            >
                {hoveredImage && (
                    <img 
                        src={hoveredImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-12 md:gap-24 relative z-10">
                
                {/* Sticky Side Header */}
                <div className="md:w-1/3">
                    <div className="md:sticky md:top-32 space-y-8">
                        <div className="inline-block px-4 py-1.5 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 bg-white/[0.02]">
                            Archive Catalog
                        </div>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Selected <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Archive</span>
                        </h2>
                        <p className="text-gray-400 max-w-xs text-sm md:text-base font-mono leading-relaxed opacity-60 hover:opacity-100 transition-opacity duration-500">
                            A historical record of my technical growth, from agency work to creative experiments and full-stack solutions.
                        </p>
                        
                        <div className="pt-8 hidden md:block">
                            <div className="h-[1px] w-24 bg-gradient-to-r from-white/20 via-white/40 to-transparent" />
                        </div>
                    </div>
                </div>

                {/* Scrolling List */}
                <div className="md:w-2/3 flex flex-col border-t border-white/10">
                    {ARCHIVE_PROJECTS.map((project, index) => (
                        <a 
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={el => { rowsRef.current[index] = el; }}
                            onMouseEnter={() => setHoveredImage(getPreviewImage(project.title))}
                            onMouseLeave={() => setHoveredImage(null)}
                            className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14 border-b border-white/10 hover:bg-white/[0.01] transition-all duration-500"
                        >
                            {/* Animated Background Indicator */}
                            <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1 bg-white transition-all duration-500 ease-out" />
                            
                            <div className="flex flex-col gap-2 z-10 md:pl-8 transition-transform duration-500 group-hover:translate-x-6">
                                <span className="text-[11px] font-mono text-gray-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300">
                                    {project.year}
                                </span>
                                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter group-hover:italic transition-all duration-500">
                                    {project.title}
                                </h3>
                            </div>
                            
                            <div className="flex flex-col items-start md:items-end gap-5 mt-6 md:mt-0 z-10 md:pr-8 transition-all duration-500 group-hover:-translate-x-4">
                                <div className="flex flex-wrap gap-3 md:justify-end">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-[10px] font-mono text-gray-500 uppercase tracking-widest border border-white/5 px-3 py-1 rounded-sm group-hover:border-white/20 group-hover:text-gray-300 transition-colors duration-300 bg-white/[0.02]">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 text-xs font-mono text-gray-600 group-hover:text-white transition-all duration-300 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                                    Visit Portal <ExternalLink size={14} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </a>
                    ))}
                    
                    {/* End Indicator */}
                    <div className="py-20 flex justify-center items-center gap-4 opacity-10">
                        <div className="h-[1px] w-12 bg-white" />
                        <span className="font-mono text-[10px] uppercase tracking-widest">End of Archive</span>
                        <div className="h-[1px] w-12 bg-white" />
                    </div>
                </div>

            </div>
        </section>
    );
}
