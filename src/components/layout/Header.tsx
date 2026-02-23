"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import Link from 'next/link';

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);

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

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 pointer-events-auto mix-blend-difference"
        >
            <Link href="/" className="text-xl font-bold tracking-tighter text-[#f5f5f5]" style={{ fontFamily: 'var(--font-outfit)' }}>
                Ashraf Siddiqui
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
                <Link href="#projects" className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all">Projects</Link>
                <Link href="#about" className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all">About Me</Link>
                <Link href="#services" className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all">Services</Link>
                <Link href="#contact" className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:-translate-y-0.5 transition-all">Contact</Link>
            </nav>

            <button className="md:hidden text-[#f5f5f5] text-sm tracking-widest font-medium">
                Menu
            </button>
        </header>
    );
}
