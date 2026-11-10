import type { Metadata } from "next";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iamashraf.in'),
};

export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={fredoka.variable}>
      {children}
    </div>
  );
}
