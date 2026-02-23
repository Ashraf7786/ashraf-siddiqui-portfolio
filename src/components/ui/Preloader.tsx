"use client";

import React, { useState, useEffect } from "react";
import Loader from "./sending-loader";

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Ensure the animation is fully shown, simulating load time
        const loadingTimer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        // Completely remove the element from DOM after fade out
        const visibilityTimer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => {
            clearTimeout(loadingTimer);
            clearTimeout(visibilityTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-500 ease-in-out ${loading ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <Loader />
        </div>
    );
}
