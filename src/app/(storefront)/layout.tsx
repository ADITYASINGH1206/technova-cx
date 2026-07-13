import type { Metadata } from "next";
import StorefrontNavbar from "@/components/storefront/Navbar";
import StorefrontFooter from "@/components/storefront/Footer";

export const metadata: Metadata = {
  title: {
    default: "TechNova — Premium Electronics",
    template: "%s | TechNova",
  },
};

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <StorefrontNavbar />
      <main className="flex-1 pt-24">{children}</main>
      <StorefrontFooter />
    </div>
  );
}
