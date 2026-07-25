import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "91 Insurance Services",
  description: "Online vehicle insurance renewal platform",
  icons: {
    icon: "/images/logo/new_logo.png",
  },
  openGraph: {
    title: "91 Insurance Services",
    description: "Online vehicle insurance renewal platform",
    images: [
      {
        url: "/images/logo/new_logo.png",
        width: 512,
        height: 512,
        alt: "91 Insurance Services Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "91 Insurance Services",
    description: "Online vehicle insurance renewal platform",
    images: ["/images/logo/new_logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
