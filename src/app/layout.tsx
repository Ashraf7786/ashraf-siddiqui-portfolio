import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./tw-animate.css";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Ashraf Siddiqui | Web Developer",
  description: "Modern portfolio of Ashraf Siddiqui, a specialized Web Developer in Laravel, PHP, and Shopify.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#f5f5f5] selection:text-[#0a0a0a] cursor-none`}>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
