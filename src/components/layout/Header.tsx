"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import Link from 'next/link';
import ResumeButton from '@/components/ui/ResumeButton';
import { useLenis } from '@studio-freight/react-lenis';

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const lenis = useLenis();

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                y: -100,
                opacity: 0,
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.2,
            });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = (id: string) => {
        if (lenis) {
            lenis.scrollTo(id, {
                offset: 0,
                duration: 1.5,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
            });
        }
    };

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 pointer-events-auto mix-blend-difference"
        >
            <Link href="/" className="text-xl font-bold tracking-tighter text-[#f5f5f5]" style={{ fontFamily: 'var(--font-outfit)' }}>
                Ashraf Siddiqui
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
                <button 
                    onClick={() => scrollToSection('#projects')}
                    className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all cursor-pointer bg-transparent border-none outline-none"
                >
                    Projects
                </button>
                <button 
                    onClick={() => scrollToSection('#about')}
                    className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all cursor-pointer bg-transparent border-none outline-none"
                >
                    About Me
                </button>
                <button 
                    onClick={() => scrollToSection('#approach')}
                    className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all cursor-pointer bg-transparent border-none outline-none"
                >
                    Services
                </button>
                <button 
                    onClick={() => scrollToSection('#contact')}
                    className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all cursor-pointer bg-transparent border-none outline-none"
                >
                    Contact
                </button>
            </nav>

            <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                    <ResumeButton />
                </div>
                <button className="md:hidden text-[#f5f5f5] text-sm tracking-widest font-medium">
                    Menu
                </button>
            </div>
        </header>
    );
}

