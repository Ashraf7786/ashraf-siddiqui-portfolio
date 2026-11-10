import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Control Center | Ashraf Siddiqui Travel",
  description: "Secure management dashboard for Ashraf Siddiqui Travel Diaries.",
  robots: { index: false, follow: false }, // Prevent search indexing of admin pages
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-[#f4f5f7] text-gray-900 selection:bg-[#155e38] selection:text-white"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}
