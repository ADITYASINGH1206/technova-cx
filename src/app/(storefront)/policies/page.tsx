import { GlassCard } from "@/components/ui/GlassCard";
import { kbPolicies, getAllPolicyCategories, getPoliciesByCategory } from "@/lib/seed-data";

export default function PoliciesPage() {
  const categories = getAllPolicyCategories();

  return (
    <div className="py-12 max-w-4xl mx-auto space-y-12 px-4">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-sf-foreground)]">Trust Center & Policies</h1>
        <p className="text-[var(--color-sf-muted)] text-lg max-w-2xl mx-auto">
          Everything you need to know about our shipping, returns, warranties, and how we protect your data.
        </p>
      </header>

      <div className="space-y-16">
        {categories.map((category) => (
          <section key={category} className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--color-sf-primary)] border-b border-[var(--color-sf-border)] pb-2">
              {category}
            </h2>
            <div className="grid gap-6">
              {getPoliciesByCategory(category).map((policy) => (
                <GlassCard key={policy.id} id={policy.id} className="p-6 scroll-mt-24 transition-colors hover:border-[var(--color-sf-accent)]/50">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-[var(--color-sf-foreground)]">{policy.title}</h3>
                    <span className="text-xs font-mono px-2 py-1 bg-[var(--color-sf-background)] rounded text-[var(--color-sf-muted)] border border-[var(--color-sf-border)]">
                      {policy.id} v{policy.version}
                    </span>
                  </div>
                  <p className="text-[var(--color-sf-foreground)] opacity-80 leading-relaxed">
                    {policy.body}
                  </p>
                </GlassCard>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
