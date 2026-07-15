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
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col pt-20">
      <StorefrontNavbar />
      <div className="flex-1 w-full">{children}</div>
      <StorefrontFooter />
    </div>
  );
}
