import type { Metadata } from "next";
import { Inter, Fira_Code, Fira_Sans } from "next/font/google";
import PageTransition from "@/components/providers/PageTransition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fira-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechNova — Premium Electronics",
  description: "Experience the future of electronics with TechNova.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} ${firaSans.variable}`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col bg-[var(--color-sf-background)] text-[var(--color-sf-foreground)]">
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
