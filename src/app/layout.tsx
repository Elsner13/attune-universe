import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Attune — The Science of Skill Acquisition",
    template: "%s — Attune",
  },
  description:
    "Ecological dynamics reveals why most practice fails. Attune gives you the science, the system, and the community to learn the way your brain was designed to.",
  keywords: [
    "ecological dynamics",
    "skill acquisition",
    "motor learning",
    "coaching science",
    "perception-action coupling",
    "constraints-led approach",
  ],
  metadataBase: new URL("https://attune.world"),
  openGraph: {
    title: "Attune — The Science of Skill Acquisition",
    description:
      "Ecological dynamics reveals why most practice fails. Attune gives you the science, the system, and the community to learn the way your brain was designed to.",
    url: "https://attune.world",
    siteName: "Attune",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Attune — The Science of Skill Acquisition",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Attune — The Science of Skill Acquisition",
    description:
      "Ecological dynamics reveals why most practice fails. Attune gives you the science, the system, and the community to learn the way your brain was designed to.",
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
          colorPrimary: "#c8ff3c",
          colorBackground: "#0a0a0a",
          colorInputBackground: "#161616",
          colorInputText: "#e8e8e8",
          borderRadius: "0px",
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${dmSans.variable} ${instrumentSerif.variable} antialiased`}
        >
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
