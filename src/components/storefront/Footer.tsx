import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "Laptops", href: "/shop?category=Laptops" },
    { label: "Phones", href: "/shop?category=Phones" },
    { label: "Headphones", href: "/shop?category=Headphones" },
    { label: "Smartwatches", href: "/shop?category=Smartwatches" },
  ],
  Support: [
    { label: "NexaBot Chat", href: "/support" },
    { label: "Track Order", href: "/account/dashboard" },
    { label: "Returns & Refunds", href: "/policies" },
    { label: "Warranty", href: "/policies" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "/policies" },
    { label: "Terms of Service", href: "/policies" },
  ],
};

export default function StorefrontFooter() {
  return (
    <footer className="bg-surface-secondary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">TN</span>
              </div>
              <span className="font-display text-xl font-bold text-text-primary tracking-tight">
                Tech<span className="gradient-text">Nova</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Premium electronics with trust-first AI customer care. Every support answer is grounded, cited, and fact-checked.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-text-primary mb-4 text-sm uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-brand-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            © 2026 TechNova. All rights reserved. Built for the FlowZint AI Hackathon.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-tertiary">Powered by</span>
            <span className="text-xs font-semibold gradient-text">NexaBot AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
