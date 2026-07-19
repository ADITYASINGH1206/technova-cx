import type { Metadata } from "next";
import { Inter, Fira_Code, Fira_Sans } from "next/font/google";
import PageTransition from "@/components/providers/PageTransition";
import { CartProvider } from "@/components/providers/CartProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

const firaSans = Fira_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "TechNova | Command Center",
  description: "Next Generation E-Commerce & CX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable} ${firaSans.variable} antialiased bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <PageTransition>
              {children}
            </PageTransition>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
