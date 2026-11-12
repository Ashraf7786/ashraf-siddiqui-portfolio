"use client";

import React from 'react';
import TravelLoader from './TravelLoader';

interface TerminalLoaderProps {
    text?: string;
    className?: string;
}

export const Component: React.FC<TerminalLoaderProps> = ({
    className = ""
}) => {
    return <TravelLoader className={className} />;
};

export default Component;
