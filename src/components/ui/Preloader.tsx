"use client";

import React, { useState, useEffect } from "react";
import TravelLoader from "./TravelLoader";

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Complete smoothly after travel sequence (2.5s)
        const loadingTimer = setTimeout(() => {
            setLoading(false);
        }, 2600);

        // Completely unmount after fade out
        const visibilityTimer = setTimeout(() => {
            setVisible(false);
        }, 3100);

        return () => {
            clearTimeout(loadingTimer);
            clearTimeout(visibilityTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808] transition-opacity duration-500 ease-in-out ${
                loading ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <TravelLoader onFinish={() => setLoading(false)} />
        </div>
    );
}
