import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4">
      <div className="text-center">
        <p className="text-8xl font-display font-bold gradient-text mb-4">404</p>
        <h1 className="text-2xl font-display font-bold text-text-primary mb-2">
          Page not found
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl gradient-brand text-white font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/support"
            className="px-6 py-3 rounded-xl border border-border-default text-text-secondary font-medium hover:border-brand-300 transition-all"
          >
            Get Help
          </Link>
        </div>
      </div>
    </div>
  );
}
