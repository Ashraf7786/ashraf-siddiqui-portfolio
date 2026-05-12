import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./tw-animate.css";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "Ashraf Siddiqui | Best Full Stack Web Developer in India",
    template: "%s | Ashraf Siddiqui"
  },
  description: "Portfolio of Ashraf Siddiqui, the best Full Stack Web Developer in India. Serving clients in Jaipur, Patna, Kolkata, Delhi, and globally. Specialized in React, Next.js, Laravel, PHP, and high-performance web applications.",
  keywords: [
    "Ashraf Siddiqui",
    "Best Web Developer in India",
    "Web Developer in Jaipur",
    "Web Developer in Patna",
    "Web Developer in Kolkata",
    "Web Developer in Delhi",
    "Full Stack Developer India",
    "Software Engineer Jaipur",
    "React Developer Kolkata",
    "Next.js Expert Delhi",
    "Laravel Developer Patna",
    "Freelance Web Developer India",
    "Portfolio",
    "SEO India"
  ],
  authors: [{ name: "Ashraf Siddiqui", url: "https://iamashraf.in" }],
  creator: "Ashraf Siddiqui",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://iamashraf.in",
    title: "Ashraf Siddiqui | Best Full Stack Web Developer in India",
    description: "Portfolio of Ashraf Siddiqui. Specialized in creating fast, accessible, and dynamic web experiences using React, Next.js, Laravel, and Shopify in India.",
    siteName: "Ashraf Siddiqui Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashraf Siddiqui | Full Stack Web Developer India",
    description: "Portfolio of Ashraf Siddiqui. Specialized in creating fast, accessible, and dynamic web experiences in India.",
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        className={cn(
          inter.variable,
          outfit.variable,
          "antialiased bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#f5f5f5] selection:text-[#0a0a0a] cursor-none"
        )}
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
