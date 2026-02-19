import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Inter_Tight,
} from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Attune | Master Any Skill via Ecological Psychology",
  description:
    "Master any domain faster than traditional methods. Use the Attune OS and Ecological Psychology to align your perception and action for elite performance.",
  keywords: [
    "Ecological Psychology",
    "Skill Acquisition",
    "Attune OS",
    "Personal Brand",
    "Learning Framework",
  ],
  metadataBase: new URL("https://attune.world"),
  openGraph: {
    title: "Attune | Master Any Skill via Ecological Psychology",
    description:
      "Master any domain faster than traditional methods. Use the Attune OS and Ecological Psychology to align your perception and action for elite performance.",
    url: "https://attune.world",
    siteName: "Attune",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Attune — Ecological Mastery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Attune | Master Any Skill via Ecological Psychology",
    description:
      "Master any domain faster than traditional methods. Use the Attune OS and Ecological Psychology to align your perception and action for elite performance.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#00F0FF",
          colorBackground: "#0a0a0a",
          colorInputBackground: "#121212",
          colorInputText: "#f8fafc",
          borderRadius: "0.625rem",
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${interTight.variable} antialiased`}
        >
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
