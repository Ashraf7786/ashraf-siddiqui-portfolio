"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: '01',
        title: 'SocialArch',
        desc: 'A premium results-driven digital marketing agency helping brands dominate with powerful SEO and high-converting creative websites.',
        tech: ['Next.js', 'GSAP', 'SEO', 'Tailwind'],
        link: 'https://socialarchmedia.com/',
        color: '#120404', // Deep dark red matching SocialArch brand
        images: [
            "/projects/socialarch-1.png",
            "/projects/socialarch-2.png",
            "/projects/socialarch-3.png",
            "/projects/socialarch-4.png",
        ]
    },
    {
        id: '02',
        title: 'Aerocool',
        desc: 'A modern AC service agency website featuring comprehensive service booking, live chatbot integration, and certified technician profiles.',
        tech: ['React.js', 'Next.js', 'HTML', 'CSS', 'JS'],
        link: 'https://www.aerocooljaipur.in/',
        color: '#1e3a8a', // dark blue matching the Aerocool brand
        images: [
            "/projects/aerocool/aerocool-1.png",
            "/projects/aerocool/aerocool-2.png",
            "/projects/aerocool/aerocool-3.png",
            "/projects/aerocool/aerocool-4.png",
            "/projects/aerocool/aerocool-5.png",
        ]
    },
    {
        id: '03',
        title: 'Adwoks Academy',
        desc: 'An immersive educational platform driving student engagement with modern design and high performance.',
        tech: ['Laravel', 'Vue.js', 'Tailwind'],
        link: 'https://www.adwoksacademy.com/',
        color: '#0f172a', // dark slate
        images: [
            "/projects/adwoks/adwoks-1.png",
            "/projects/adwoks/adwoks-2.png",
            "/projects/adwoks/adwoks-3.png",
            "/projects/adwoks/adwoks-4.png",
        ]
    },
    {
        id: '04',
        title: 'Jagdamba Travels',
        desc: 'A premium taxi rental and tour booking platform offering luxury travel experiences, seamless booking flows, and executive mobility services.',
        tech: ['React Js', 'HTML', 'CSS', 'JS'],
        link: '#',
        color: '#0e2417', // deep forest green matching the brand identity
        images: [
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000", // Car interior/luxury
            "https://images.unsplash.com/photo-1600104310591-b2239e50d4d0?auto=format&fit=crop&q=80&w=1000", // Travel/tourism
            "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000", // Executive car
        ]
    },
];

const ProjectImageCarousel = ({ images, link }: { images: string[], link: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Transitions every 3 seconds
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="absolute inset-0 w-full h-full perspective-[1000px]">
            {images.map((img, i) => {
                const position = (i - currentIndex + images.length) % images.length;

                let yOffset = 0;
                let scale = 1;
                let zIndex = 30;
                let blur = 0;
                let opacity = 1;

                if (position === 0) {
                    yOffset = 0;
                    scale = 1;
                    zIndex = 30;
                    blur = 0;
                    opacity = 1;
                } else if (position === 1) {
                    yOffset = -24;
                    scale = 0.94;
                    zIndex = 20;
                    blur = 3;
                    opacity = 0.7;
                } else if (position === 2) {
                    yOffset = -48;
                    scale = 0.88;
                    zIndex = 10;
                    blur = 6;
                    opacity = 0.3;
                }

                return (
                    <div
                        key={i}
                        className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
                        style={{
                            transform: `translateY(${yOffset}px) scale(${scale})`,
                            zIndex,
                            opacity,
                            filter: `blur(${blur}px)`,
                            transformOrigin: 'top center'
                        }}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img src={img} alt="Project photo" className="w-full h-full object-cover" />
                    </div>
                );
            })}

            <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 ease-out text-black hover:bg-white/90"
            >
                <ExternalLink size={24} />
                <span className="sr-only">Visit</span>
            </a>
        </div>
    );
};

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.project-panel');
            const container = containerRef.current;
            const scrollWrapper = scrollWrapperRef.current;

            if (!container || !scrollWrapper) return;

            const getScrollAmount = () => scrollWrapper.scrollWidth - window.innerWidth;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => `+=${getScrollAmount() + window.innerWidth}`,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                }
            });

            tl.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                duration: 1
            }, 0);

            PROJECTS.forEach((proj, index) => {
                if (index > 0) {
                    tl.to(container, {
                        backgroundColor: proj.color,
                        ease: "none",
                        duration: 1 / (PROJECTS.length - 1)
                    }, (index - 1) * (1 / (PROJECTS.length - 1)));
                }
            });

            tl.to({}, { duration: 0.2 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="projects" className="h-screen w-full overflow-hidden bg-[#0f172a] flex items-center pt-8">
            <div
                ref={scrollWrapperRef}
                className="flex h-full"
                style={{ width: `${PROJECTS.length * 100}vw` }}
            >
                {PROJECTS.map((project) => (
                    <div
                        key={project.id}
                        className="project-panel w-screen h-[100dvh] flex items-center justify-center p-4 sm:p-8 md:p-24 relative"
                    >
                        <div className="absolute top-[10%] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 text-[40vw] font-black text-white/[0.03] select-none pointer-events-none" style={{ fontFamily: 'var(--font-outfit)' }}>
                            {project.id}
                        </div>

                        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-24 items-center z-10 mt-16 md:mt-0">
                            <div className="flex flex-col gap-4 md:gap-6">
                                <div className="uppercase tracking-widest text-[#f5f5f5]/50 text-xs sm:text-sm font-mono flex items-center gap-4">
                                    <span className="w-8 sm:w-12 h-px bg-[#f5f5f5]/30 block" /> {project.id}
                                </div>
                                <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#f5f5f5] leading-[0.9] tracking-tighter" style={{ fontFamily: 'var(--font-outfit)' }}>
                                    {project.title}
                                </h3>
                                <p className="text-[#f5f5f5]/70 text-base sm:text-lg md:text-xl font-light max-w-md">
                                    {project.desc}
                                </p>
                                <div className="flex flex-wrap gap-3 mt-4">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-5 py-2 rounded-full border border-[#f5f5f5]/20 text-xs text-[#f5f5f5] backdrop-blur-sm">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full relative group cursor-none mt-4 sm:mt-8 md:mt-0 aspect-video md:aspect-[4/3]">
                                <ProjectImageCarousel images={project.images} link={project.link} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
