import { Fredoka } from "next/font/google";
import type { Metadata } from "next";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Control Center | Ashraf Siddiqui Travel",
  description: "Secure management dashboard for Ashraf Siddiqui Travel Diaries.",
  robots: { index: false, follow: false }, // Prevent search indexing of admin pages
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fredoka.variable} min-h-screen bg-[#080808] text-[#f5f5f5] selection:bg-white/20`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}

