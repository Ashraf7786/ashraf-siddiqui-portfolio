"use client";

import { useEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';

export default function ActiveSectionTracker() {
    const lenis = useLenis();

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Center-ish trigger
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const cleanUrl = id === 'hero' ? '/' : `/${id}`;
                    
                    // Update URL without hash and without reload
                    if (window.location.pathname !== cleanUrl) {
                        window.history.replaceState(null, '', cleanUrl);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return null;
}
