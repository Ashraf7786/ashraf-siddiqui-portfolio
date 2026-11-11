"use client";

import React, { useState, useEffect } from 'react';
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import PortalChoiceModal from "@/components/ui/PortalChoiceModal";
import SecurityGuard from "@/components/common/SecurityGuard";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <>
                <SecurityGuard />
                {children}
            </>
        );
    }

    return (
        <>
            <SecurityGuard />
            <Preloader />
            <CustomCursor />
            <PortalChoiceModal />
            <SmoothScroll>
                {children}
            </SmoothScroll>
        </>
    );
}
