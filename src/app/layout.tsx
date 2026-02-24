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
  title: {
    default: "Ashraf Siddiqui | Full Stack Web Developer & Software Engineer",
    template: "%s | Ashraf Siddiqui"
  },
  description: "Portfolio of Ashraf Siddiqui, a specialized Full Stack Web Developer. Expert in React, Next.js, Laravel, PHP, Shopify, and modern scalable web applications.",
  keywords: [
    "Ashraf Siddiqui",
    "Web Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "Next.js Expert",
    "Laravel Developer",
    "PHP Developer",
    "Shopify Expert",
    "Software Engineer",
    "Portfolio",
    "Ashraf",
    "Freelance Developer",
    "SEO"
  ],
  authors: [{ name: "Ashraf Siddiqui", url: "https://ashrafsiddiqui.com" }],
  creator: "Ashraf Siddiqui",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashrafsiddiqui.com",
    title: "Ashraf Siddiqui | Full Stack Web Developer",
    description: "Portfolio of Ashraf Siddiqui. Specialized in creating fast, accessible, and dynamic web experiences using React, Next.js, Laravel, and Shopify.",
    siteName: "Ashraf Siddiqui Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashraf Siddiqui | Full Stack Web Developer",
    description: "Portfolio of Ashraf Siddiqui. Specialized in creating fast, accessible, and dynamic web experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
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
