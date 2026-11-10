"use client";

import React, { useState, useEffect } from 'react';
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import PortalChoiceModal from "@/components/ui/PortalChoiceModal";

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
            <PortalChoiceModal />
            <SmoothScroll>
                {children}
            </SmoothScroll>
        </>
    );
}
