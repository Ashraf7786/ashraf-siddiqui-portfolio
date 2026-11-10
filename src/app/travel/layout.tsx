import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://iamashraf.in'),
};

export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
