import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TechNova — Premium Electronics",
    template: "%s | TechNova",
  },
  description:
    "TechNova CX Command Center — a grounded, trust-first AI customer care system for premium electronics. Powered by NexaBot with live fact-checking and transparent citations.",
  keywords: [
    "TechNova",
    "electronics",
    "AI customer care",
    "NexaBot",
    "customer support",
  ],
  openGraph: {
    title: "TechNova — Premium Electronics",
    description:
      "Trust-first AI customer care for premium electronics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ fontFamily: "var(--font-inter), var(--font-outfit), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
