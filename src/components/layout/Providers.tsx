"use client";

import React, { useState, useEffect } from 'react';
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <>
            <Preloader />
            <CustomCursor />
            <SmoothScroll>
                {children}
            </SmoothScroll>
        </>
    );
}
