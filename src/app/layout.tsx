import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
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

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
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
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable}`}
    >
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} font-sans antialiased bg-surface-primary text-text-primary min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
