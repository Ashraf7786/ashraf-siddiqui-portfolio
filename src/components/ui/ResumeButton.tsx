"use client";

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { Download, X, CheckCircle2 } from 'lucide-react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

export default function ResumeButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleModal = () => {
        if (!isOpen) {
            setIsOpen(true);
            // Animation for opening
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            gsap.fromTo(modalRef.current, 
                { scale: 0.8, opacity: 0, y: 20 }, 
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
            );
        } else {
            // Animation for closing
            gsap.to(modalRef.current, { scale: 0.8, opacity: 0, y: 20, duration: 0.3, ease: "power2.in", onComplete: () => setIsOpen(false) });
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
        }
    };

    const handleDownload = () => {
        // Trigger actual download
        const link = document.createElement('a');
        link.href = '/Ashraf-Siddiqui-Resume.pdf'; // Path to the resume file
        link.download = 'Ashraf-Siddiqui-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Close modal and show success
        toggleModal();
        setShowSuccess(true);

        // Flash message animation
        setTimeout(() => {
            gsap.fromTo(successRef.current, 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
            
            // Auto hide success message
            setTimeout(() => {
                gsap.to(successRef.current, { 
                    y: -20, 
                    opacity: 0, 
                    duration: 0.5, 
                    ease: "power3.in",
                    onComplete: () => setShowSuccess(false)
                });
            }, 3000);
        }, 100);
    };

    // Magnetic effect for the button
    useIsomorphicLayoutEffect(() => {
        if (!buttonRef.current) return;
        
        const btn = buttonRef.current;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        };
        
        const handleMouseLeave = () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <>
            {/* Main Button */}
            <button
                ref={buttonRef}
                onClick={toggleModal}
                className="group relative flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm tracking-tight overflow-hidden transition-all hover:scale-105 active:scale-95 z-40"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                <span>Resume</span>
            </button>

            {/* Confirmation Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        ref={overlayRef}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                        onClick={toggleModal}
                    />
                    
                    <div 
                        ref={modalRef}
                        className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl text-center"
                    >
                        <button 
                            onClick={toggleModal}
                            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Download size={40} className="text-white" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Download Resume?</h3>
                        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                            You are about to download the professional resume of <span className="text-white font-semibold">Ashraf Siddiqui</span>. 
                            It contains detailed work history, technical skills, and contact information.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                                onClick={toggleModal}
                                className="flex-1 px-6 py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all text-sm"
                            >
                                Not Now
                            </button>
                            <button 
                                onClick={handleDownload}
                                className="flex-1 px-6 py-4 rounded-2xl bg-white text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                Download Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Flash Message */}
            {showSuccess && (
                <div 
                    ref={successRef}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-3 px-6 py-4 bg-white text-black rounded-2xl shadow-2xl font-bold"
                >
                    <CheckCircle2 size={20} className="text-green-600" />
                    <span>Thank you for downloading my resume!</span>
                </div>
            )}
        </>
    );
}
